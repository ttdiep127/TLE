﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        [HttpGet("{partNumber}")]
        public async Task<IEnumerable<QuestionViewModel>> Get(int partNumber)
        {
            return await _service.Get(partNumber);
        }

        // GET api/question/5
        [HttpGet("topic/{topicId}")]
        public async Task<IEnumerable<QuestionViewModel>> GetByTopicId(int topicId)
        {
            return await _service.GetByTopicId(topicId);
        }

        // POST api/<controller>
        [HttpPost]
        public ResponseOutput Post([FromBody]QuestionsRequest questions)
        {
            return _service.AddQuestion(questions.Questions);
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
