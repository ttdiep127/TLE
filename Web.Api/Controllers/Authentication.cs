using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.AppModels;
using Microsoft.AspNetCore.Mvc;
using TLE.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    [Route("api/[controller]")]
    public class Authentication : Controller
    {
        private readonly UserService _userService;

        [HttpPost("/login")]
        public async Task<Response> Post([FromBody]LoginModel input)
        {
            return await _userService.Login(input);
        }

    }
}
