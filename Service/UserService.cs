using Entities.AppModels;
using Entities.Models;
using Entities.Resources;
using Entities.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TLE.Entities.Helpers;
using TLE.Entities.Repositories;
using TLE.Entities.Service;
using TLE.Entities.UnitOfWork;

namespace TLE.Service
{
    public class UserService : BaseService<Users>, IUserService
    {
        private readonly IRepository<Users> _repository;
        private readonly IRepository<Answers> _answerRepo;
        private readonly IRepository<Ratings> _ratingRepo;
        private readonly AppSettings _appSettings;
        private readonly IRepository<TestResults> _testResultRepo;
        private readonly IRepository<Tests> _testRepo;
        private readonly IRepository<Qtions> _qtionRepo;


        public UserService(IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            _repository = Repository;
            _answerRepo = UnitOfWork.Repository<Answers>();
            _appSettings = appSettings.Value;
            _ratingRepo = UnitOfWork.Repository<Ratings>();
            _testResultRepo = UnitOfWork.Repository<TestResults>();
            _testRepo = UnitOfWork.Repository<Tests>();
            _qtionRepo = UnitOfWork.Repository<Qtions>();
        }

        public async Task<IList<RatingModel>> GetRating(int userId)
        {
            return await _ratingRepo.GetTopRating(userId, 5);
        }

        public async Task<Users> Get(int userId)
        {
            try
            {
                return await _repository.GetById(userId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        public async Task<Users> Add(Users userInput)
        {
            var user = await _repository.GetById(userInput.Id);

            if (user != null)
            {
                if (user.Disable)
                {
                    user.Disable = false;
                    _repository.Update(user);
                    await UnitOfWork.SaveChangesAsync();
                }
            }
            else
            {
                user = userInput;
                user.Id = 0;
                await _repository.InsertAsync(user);
            }

            return user;
        }

        public async Task<ResponseOutput> SumbitTest(TestSumbitModel testRequest)
        {
            var answers = testRequest.Answers;
            var test = _testRepo.Entities.FirstOrDefault(_ => _.Id == testRequest.Id);
            if (test != null && testRequest.Answers != null)
            {
                var numberCorrect = answers.Where(_ => _.IsCorrect == true).ToList().Count;
                var userId = answers[0].UserId;

                var guidId = Guid.NewGuid();

                // save test result
                var testResult = new TestResults
                {
                    TestId = testRequest.Id,
                    UserId = userId,
                    CorrectAnswer = numberCorrect,
                    ExamedAt = DateTime.Now,
                    GuidId = guidId.ToString(),
                    TotalQuestion = answers.Count,
                    TotalTime = testRequest.TotalTime,
                };

                _testResultRepo.Insert(testResult);
                UnitOfWork.SaveChanges();

                // Save answer
                var answersDB = new List<Answers>();
                foreach (var answer in answers)
                {
                    var answerDB = new Answers
                    {
                        UserId = answer.UserId,
                        TopicId = answer.TopicId,
                        IsCorrect = answer.IsCorrect,
                        QtionId = answer.QuestionId,
                        UpdateDay = DateTime.Now,
                        TestResultId = testResult.Id,
                        Answer = answer.UserAnswer
                    };
                    answersDB.Add(answerDB);
                }

                _answerRepo.InsertRange(answersDB);
                UnitOfWork.SaveChanges();


                await CalculateProficient(answers, testResult.GuidId, userId);

                var topicIds = GetTopics(answers);
                await CalculateProficientTop(topicIds, testResult.Id, userId);

                return new ResponseOutput(true, "", guidId.ToString());
            }

            return new ResponseOutput(false, "array is emtpy.");
        }

        private async Task<bool> CalculateProficient(List<AnswerSubmit> answers, string resultTestGuid, int userId)
        {
            try
            {
                var topicIds = GetTopics(answers);

                foreach (var topicId in topicIds)
                {
                    var topicAnswers = answers.Where(_ => _.TopicId == topicId).ToList();
                    var correctNumber = topicAnswers.Where(_ => _.IsCorrect == true).ToList().Count;

                    var percentage = Math.Floor((float) correctNumber / topicAnswers.Count*100);
                    await _ratingRepo.InsertAsync(new Ratings
                    {
                        TopicId = topicId,
                        Percentage = percentage,
                        UserId = userId,
                        TotalAnswer = topicAnswers.Count,
                        CorrectAnswer = correctNumber,
                        UpdateDay = DateTime.Now,
                        TestGuid = resultTestGuid
                    });

                    UnitOfWork.SaveChanges();
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private async Task<bool> CalculateProficientTop(List<int> topicIds, int testResultId, int userId)
        {
            try
            {
                var tenTestRecentlys = _testResultRepo.Entities
                    .Where(_ => _.UserId == userId)
                    .OrderByDescending(_ => _.ExamedAt)
                    .Take(10).Select(_ => _.Id)
                    .ToList();

                foreach (var topicId in topicIds)
                {
                    //rating for top 10 testing

                   var answers = await _answerRepo.Entities
                       .Where(_ => tenTestRecentlys.Any(t => _.TestResultId == t)
                                   && _.TopicId == topicId
                                   && _.UserId == userId)
                       .ToListAsync();

                    if (answers.Count >= 20)
                        {
                            var correctNumber = answers.Where(_ => _.IsCorrect == true).ToList().Count;

                            await _ratingRepo.InsertAsync(new Ratings
                            {
                                TopicId = topicId,
                                Percentage = Math.Floor((float) correctNumber / answers.Count* 100),
                                UserId = userId,
                                TotalAnswer = answers.Count,
                                CorrectAnswer = correctNumber,
                                UpdateDay = DateTime.Now,
                                TestGuid = null

                            });

                            UnitOfWork.SaveChanges();
                        }
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private bool CalculatePercentageProficientCyclical(int userId, int topicId, TypeUpdate typeUpdate, bool isUpdate)
        {
            var today = DateTime.Now;

            var dayNumber = 0;
            switch (typeUpdate)
            {
                case TypeUpdate.Day:
                    dayNumber = 1;
                    break;
                case TypeUpdate.Week:
                    dayNumber = 7;
                    break;
                case TypeUpdate.Month:
                    dayNumber = 30;
                    break;
            }

            var allanswers = _answerRepo.Entities
                .Where(_ => _.UserId == userId && _.Qtion.TopicId == topicId
                && _.UpdateDay > today.AddDays(-dayNumber))
                .ToList();

            if (allanswers == null || allanswers.Count < 20)
            {
                return false;
            }

            var numberCorrectAnswer = 0;
            foreach (var answer in allanswers)
            {
                if (answer.IsCorrect == true) numberCorrectAnswer++;
            }

            var percentageProgicient = (float)numberCorrectAnswer / allanswers.Count();

            if (isUpdate)
            {
                var lastUpdate = _ratingRepo.Entities
                                        .Where(_ => _.TopicId == topicId && _.UserId == userId)
                                        .OrderByDescending(_ => _.UpdateDay)
                                        .FirstOrDefault();
                lastUpdate.CorrectAnswer = numberCorrectAnswer;
                lastUpdate.TotalAnswer = allanswers.Count;
                lastUpdate.Percentage = percentageProgicient;
                UnitOfWork.SaveChanges();
            }
            else
            {
                _ratingRepo.Insert(new Ratings
                {
                    UserId = userId,
                    TopicId = topicId,
                    TotalAnswer = allanswers.Count,
                    CorrectAnswer = numberCorrectAnswer,
                    Percentage = percentageProgicient,
                    UpdateDay = DateTime.Now,
                });
                UnitOfWork.SaveChanges();
            }
            return false;

        }

        private List<int> GetTopics(List<AnswerSubmit> answers)
        {
            return answers.Select(_ => _.TopicId).Distinct().ToList();
        }

        public async Task<ResponseOutput> Login(LoginModel input)
        {
            // Login with email and password
            var user = await _repository.GetByEmail(input.EmailAddress);
            if (user == null)
            {
                return new ResponseOutput
                {
                    Success = false,
                    Message = ErrorMessages.InvalidUserName,
                    Data = null,
                };
            }

            //// Verify user active or not
            //if (!user.EmailVerified && !user.SmsVerified)
            //{
            //    throw new AppException(ErrorMessages.UserHasntVerifyAccount);
            //}

            //
            // Check password

            // authentication successful so generate jwt token
            var hashedPassword = input.Password;

            if (hashedPassword == user.Password)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);
                UnitOfWork.SaveChanges();
                return new ResponseOutput
                {
                    Success = true,
                    Message = null,
                    Data = new UserOuput
                    {
                        Id = user.Id,
                        EmailAddress = user.EmailAddress,
                        FullName = user.FullName,
                        LastName = user.LastName,
                        FirstName = user.FirstName,
                        Gender = user.Gender,
                        JoinedDate = user.JoinedDate,
                        Token = user.Token,
                        AvtSrc = user.AvtSrc
                    }
                };
            }

            return new ResponseOutput
            {
                Success = false,
                Message = ErrorMessages.IncorrectPassword,
                Data = null
            };
        }

        public async Task<ResponseOutput> Answer(AnswerSubmit answerQuestion)
        {
            try
            {
                var question = await _qtionRepo.Entities.FirstOrDefaultAsync(_ => _.Id == answerQuestion.QuestionId);

                if (question == null)
                {
                    return new ResponseOutput(true, "Question is not exist.");
                }

                if (answerQuestion.UserAnswer != null)
                {
                    var answer = new Answers
                    {
                        UserId = answerQuestion.UserId,
                        QtionId = answerQuestion.QuestionId,
                        Answer = answerQuestion.UserAnswer,
                        IsCorrect = answerQuestion.IsCorrect,
                        UpdateDay = DateTime.Now
                    };
                    _answerRepo.Insert(answer);
                    UnitOfWork.SaveChanges();
                    return new ResponseOutput
                    {
                        Success = true,
                        Message = null,
                        Data = null
                    };
                }
                return new ResponseOutput
                {
                    Success = false,
                    Message = "Error when add answer",
                    Data = null
                };
            }
            catch (System.Exception ex)
            {
                return new ResponseOutput
                {
                    Success = false,
                    Message = ErrorMessages.ErrorAddAnswer,
                    Data = null
                };
            }
        }

        public async Task<ResponseOutput> Register(RegisterModel registerInfo)
        {
            // add new user
            var user = new Users
            {
                EmailAddress = registerInfo.Email,
                FirstName = registerInfo.FirstName,
                LastName = registerInfo.LastName,
                FullName = registerInfo.LastName + ' ' + registerInfo.FirstName,
                Password = registerInfo.Password,
            };

            await _repository.InsertAsync(user);
            UnitOfWork.SaveChanges();
            // generta email content
            // send email

            return new ResponseOutput(true);
        }

        public Task SendEmailAsync(RegisterModel registerInfo, string subject,string linkConfirm)
        {
            var client = new SmtpClient("smtp.gmail.com")
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("tuilearnenglish2018@gmail.com", "english127")
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("ttdiep127@gmail.com")
            };
            var htmlMessage = "";
            mailMessage.To.Add(registerInfo.Email);
            mailMessage.Subject = subject;
            mailMessage.Body = htmlMessage;
            return client.SendMailAsync(mailMessage);
        }
    }
}
