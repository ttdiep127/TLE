using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.AppModels;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    [Route("api/[controller]")]
    public class QuestionsController : Controller
    {
        private readonly QtionService _service;

        public QuestionsController(QtionService service)
        {
            _service = service;
        }

        // GET: api/<controller>
        [HttpGet]
        [HttpGet("para/{part}")]
        public async Task<ParagraphOutput> GetPara(int part)
        {
            return await _service.GetPara(part);
        }

        // GET api/question/5
        [HttpGet("{part}")]
        public async Task<IEnumerable<QtionOutput>> Get(int part)
        {
            int userId = 2;
            return await _service.Get(userId, part);
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
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
