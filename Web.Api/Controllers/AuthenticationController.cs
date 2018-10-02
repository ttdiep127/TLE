using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.AppModels;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using TLE.Entities.Service;
using TLE.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    [Route("api/authentication")]
    public class AuthenticationController : Controller
    {
        private readonly UserService _userService;

        public AuthenticationController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<Users> Get()
        {
            return await _userService.Get(2);
            //return new string[] { "authentication" };
        }

        [HttpPost("/login")]
        public async Task<Response> Post([FromBody]LoginModel input)
        {
            return await _userService.Login(input);
        }

    }
}
