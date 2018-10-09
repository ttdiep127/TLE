using Entities.AppModels;
using Entities.Models;
using Entities.Resources;
using Repositories.Repositories;
using System;
using System.Threading.Tasks;
using TLE.Entities.Repositories;
using TLE.Entities.Service;
using TLE.Entities.UnitOfWork;

namespace TLE.Service
{
    public class UserService: BaseService<Users>, IUserService
    {
        private readonly IRepository<Users> _repository;
        private readonly IRepository<Answers> _answerRepo;

        public UserService(IUnitOfWork unitOfWork): base(unitOfWork)
        {
            _repository = Repository;
            _answerRepo = UnitOfWork.Repository<Answers>();
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

        public async Task<ResponseOutput> Login(LoginModel authenticationInput)
        {
            // Login with email and password
            var user = await _repository.Get(authenticationInput.EmailAddress);
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
            var hashedPassword = authenticationInput.Password;

            if (hashedPassword != user.Password)
            {
                return new ResponseOutput
                {
                    Success = false,
                    Message = ErrorMessages.IncorrectPassword,
                    obj = null
                };
            }

            return new ResponseOutput
            {
                Success = true,
                Message = null,
                obj = user
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
