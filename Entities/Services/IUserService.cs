using Entities.AppModels;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TLE.Entities.Service
{
    public interface IUserService: IBaseService<Users>
    {
        Task<Response> Login(LoginModel authenticationInput);
        Task<Users> Add(Users userInput);
    }
}
