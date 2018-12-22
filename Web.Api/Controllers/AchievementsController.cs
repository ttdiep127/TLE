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
    public class AchievementsController : Controller
    {

        private readonly AchievementService _service;

        public AchievementsController(AchievementService service)
        {
            _service = service;
        }

        // GET: api/<controller>
        [HttpGet("current/{userId}")]
        public async Task<IList<RatingModel>> GetUserCurrentRatings(int userId)
        {
            return await _service.GetCurrentRating(userId);
        }

        // GET api/<controller>/5
        [HttpGet("rating/{guidId}")]
        public async Task<IList<RatingModel>> GetRatings(string guidId)
        {
            return await _service.GetRating(guidId);
        }

        // GET api/<controller>/5
        [HttpGet("user/{userId}")]
        public async Task<ResponseOutput> GetUserRatings(int userId)
        {
            return await _service.GetUserRating(userId);
        }

        [HttpGet("recommend/{userId}")]
        public List<ArticleOutput> RecommendArticles(int userId)
        {
            return _service.RecommendArticles(userId);
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
