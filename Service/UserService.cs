using Entities.AppModels;
using Entities.Models;
using Repositories.Repositories;
using System.Threading.Tasks;
using TLE.Entities.Repositories;
using TLE.Entities.Resource;
using TLE.Entities.Service;
using TLE.Entities.UnitOfWork;

namespace TLE.Service
{
    public class UserService: BaseService<Users>, IUserService
    {
        private readonly IRepository<Users> _repository;

        public UserService(IUnitOfWork unitOfWork): base(unitOfWork)
        {
            _repository = Repository;
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

        public async Task<Response> Login(LoginModel authenticationInput)
        {
            // Login with email and password
            var user = await _repository.Get(authenticationInput.EmailAddress);
            if (user == null)
            {
                return new Response {
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
                return new Response
                {
                    Success = false,
                    Message = ErrorMessages.IncorrectPassword,
                    obj = null
                };
            }

            return new Response
            {
                Success = true,
                Message = null,
                obj = user
            };
        }
    }
}
