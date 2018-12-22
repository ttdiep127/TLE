using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.AppModels;
using Microsoft.AspNetCore.Mvc;
using Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Api.Controllers
{
    [Route("api/[controller]")]
    public class GrammarController : Controller
    {
        private readonly ArticleService _service;

        public GrammarController(ArticleService service)
        {
            _service = service;
        }

        // GET api/<controller>/5
        [HttpGet("all")]
        public async Task<IEnumerable<ArticleOutput>> GetAll()
        {
            return await _service.GetAllArticle();
        }

        // GET: api/<controller>
        [HttpGet("topic/{topicId}")]
        public async Task<IEnumerable<ArticleOutput>> GetByTopicId(int topicId)
        {
            return await _service.GetArticleByTopicId(topicId);
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public ArticleOutput Get(int id)
        {
            return _service.GetArticle(id);
        }

        // POST api/<controller>
        [HttpPost("topics")]
        public async Task<IList<TopicArticles>> Post([FromBody]IList<int> topics)
        {
            return await _service.GetTopicsArticles(topics);
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
