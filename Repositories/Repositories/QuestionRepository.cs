using Entities.AppModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLE.Entities.Repositories;

namespace Repositories
{
    public static class QuestionRepository
    {
        public static async Task<Qtions> GetById(this IRepository<Qtions> repository, int questionId)
        {
            return await repository.Entities.FirstOrDefaultAsync(_ => _.Id == questionId);
        }
        public static async Task<IList<QuestionViewModel>> Get(this IRepository<Qtions> repository, int part)
        {
            return await repository.Entities
                .Where(_ => _.Part == part)
                .Select(
                    _ => new QuestionViewModel
                    {
                        Id = _.Id,
                        ContentQ = _.ContentQ,
                        Answer1 = _.Answer1,
                        Answer2 = _.Answer2,
                        Answer3 = _.Answer3,
                        Answer4 = _.Answer4,
                        CorrectAnswer = _.CorrectAnswer.Value,
                        Part = _.Part.Value,
                        TopicId = _.TopicId.Value,
                    }).OrderBy(_ => Guid.NewGuid()).Take(40).ToListAsync();

        }
    }
}
