using Entities.AppModels;
using Entities.Models;
using Entities.Resources;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TLE.Entities.Helpers;
using TLE.Entities.Repositories;
using TLE.Entities.Service;
using TLE.Entities.UnitOfWork;

namespace TLE.Service
{
    public class UserService: BaseService<Users>, IUserService
    {
        private readonly IRepository<Users> _repository;
        private readonly IRepository<Answers> _answerRepo;
        private readonly AppSettings _appSettings;


        public UserService(IUnitOfWork unitOfWork, IOptions<AppSettings> appSettings): base(unitOfWork)
        {
            _repository = Repository;
            _answerRepo = UnitOfWork.Repository<Answers>();
            _appSettings = appSettings.Value;
        }

        public async Task<Users> Get(int userId)
        {
            try
            {
                return await _repository.Get(userId);

            }
            catch (System.Exception ex)
            {

                throw;
            }
        }
        public async Task<Users> Add(Users userInput)
        {
            var user = await _repository.Get(userInput.Id);

            if(user != null)
            {
                if (user.Disable)
                {
                    user.Disable = false;
                    _repository.Update(user);
                    await UnitOfWork.SaveChangesAsync();
                }
            } else
            {
                user = userInput;
                user.Id = 0;
                await _repository.InsertAsync(user);
            }

            return user;
        }

        public ResponseOutput Answers(ICollection<UserAnswer> answers)
        {
            var count = 0; 
            if (answers != null)
            {
                foreach (var answer in answers)
                {
                    var response = Answer(answer);
                    if (response.Result.Success) count++;
                }

                if (count == answers.Count)
                {
                    return new ResponseOutput(true);
                }
                else if (count > 0)
                {
                    return new ResponseOutput
                    (false, "Didn't save all answers.");
                }
            }
            
            return new ResponseOutput(false, "array is emtpy.");
        }

        public async Task<ResponseOutput> Login(LoginModel input)
        {
            // Login with email and password
            var user = await _repository.Get(input.EmailAddress);
            if (user == null)
            {
                return new ResponseOutput {
                    Success = false,
                    Message = ErrorMessages.InvalidUserName,
                    obj = null,
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
                    obj = new UserOuput
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
                obj = null
            };
        }

        public async Task<ResponseOutput> Answer(UserAnswer answerQuestion)
        {
            try
            {
                var savedAnswer = await _answerRepo.Get(answerQuestion.UserId, answerQuestion.QtionId);
                if (savedAnswer != null)
                {
                    savedAnswer.Answer = answerQuestion.Answer;
                    savedAnswer.IsCorrect = answerQuestion.IsCorrect;
                    savedAnswer.UpdateDay = DateTime.Now;
                    _answerRepo.Update(savedAnswer);
                    await UnitOfWork.SaveChangesAsync();
                } else
                {
                    var answer = new Answers
                    {
                        UserId = answerQuestion.UserId,
                        QtionId = answerQuestion.QtionId,
                        Answer = answerQuestion.Answer,
                        IsCorrect = answerQuestion.IsCorrect,
                        UpdateDay = DateTime.Now
                    };
                    await _answerRepo.InsertAsync(answer);
                    await UnitOfWork.SaveChangesAsync();
                }
                
                return new ResponseOutput
                {
                    Success = true,
                    Message = null,
                    obj = null
                };
            }
            catch (System.Exception ex)
            {
                return new ResponseOutput
                {
                    Success = false,
                    Message = ErrorMessages.ErrorAddAnswer,
                    obj = null
                };
            }
            
        }
    }
}
