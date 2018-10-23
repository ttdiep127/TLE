using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.AppModels;
using Entities.Models;
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
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{testType}")]
        public async Task<ResponseOutput> GetTest(int testType)
        {
            return await _service.GetTest(testType);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ResponseOutput> AddTest([FromBody]TestInputModel test)
        {
            return await _service.AddTest(test);
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
