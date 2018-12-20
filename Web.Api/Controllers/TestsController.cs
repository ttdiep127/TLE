using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.AppModels;
using Entities.Models;
using Entities.Utilities;
using Microsoft.AspNetCore.Mvc;
using Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    [Route("api/[controller]")]
    public class TestsController : Controller
    {

        private readonly TestService _service;

        public TestsController(TestService service)
        {
            _service = service;
        }

        [HttpGet("practice/{topicId}")]
        public async Task<ResponseOutput> Get(int topicId)
        {
            return await _service.GetTest(TestTypesEnum.Topic, topicId);
        }

        [HttpGet("answers/{testGuidId}")]
        public async Task<IList<QuestionViewModel>> Get(string testGuidId)
        {
            return await _service.GetAnswers(testGuidId);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ResponseOutput> GetTest([FromBody]TestTypeModel testType)
        {
            return await _service.GetTest(TestTypesEnum.Part, testType.Part.Value);
        }

        // POST api/<controller>
        [HttpPost("add")]
        public async Task<ResponseOutput> AddTest([FromBody]TestInputModel test)
        {
            return await _service.AddTest(test);
        }

        // POST api/<controller>
        [HttpPost("result")]
        public async Task<ResponseOutput> GetResult([FromBody]ResultRequest resultRequest)
        {
            return await _service.GetResult(resultRequest);
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
