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
        public static async Task<IEnumerable<QtionModel>> Get(this IRepository<Qtions> repository, int part)
        {
            return await repository.Entities
                .Where(_ => _.Part == part)
                .Select(
                    _ => new QtionModel
                    {
                        Id = _.Id,
                        ContentQ = _.ContentQ,
                        Answer1 = _.Answer1,
                        Answer2 = _.Answer2,
                        Answer3 = _.Answer3,
                        Answer4 = _.Answer4,
                        CorrectAnswer = _.CorrectAnswer,
                        Part = _.Part
                    }).ToListAsync();

        }

    }
}
