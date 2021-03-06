﻿using System;
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
    public class UsersController : Controller
    {
        private UserService _service;

        public UsersController(UserService service)
        {
            _service = service;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/user/{userId}/rating
        [HttpGet("{userId}/rating")]
        public async Task<IList<RatingModel>> Get(int userId)
        {
            return await _service.GetRating(userId);
        }

        // POST api/<controller>
        [HttpPost]
        [Route("answer")]
        public Task<ResponseOutput> AnswerAQuestion([FromBody]AnswerSubmit answerModel)
        {
            return _service.Answer(answerModel);
        }

        [HttpPost]
        [Route("submit")]
        public async Task<ResponseOutput> SumbitTest([FromBody]TestSumbitModel input)
        {
            return await _service.SumbitTest(input);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
