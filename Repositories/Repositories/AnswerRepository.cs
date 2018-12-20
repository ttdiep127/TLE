using Entities.AppModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLE.Entities.Repositories;

namespace Repositories.Repositories
{
    public static class AnswerRepository
    {
        public static async Task<Answers> Get(this IRepository<Answers> repository, int userId, int qtionId)
        {
            return await repository.Entities
                .Where(_ => _.QtionId == qtionId && _.UserId == userId).FirstOrDefaultAsync();
        }

        public static async Task<IEnumerable<Answers>> GetTop(this IRepository<Answers> repository, int userId, int part)
        {
            return await repository.Entities.Where(_ => _.UserId == userId && _.Qtion.Part == part).OrderByDescending(_ => _.UpdateDay).Take(30).ToListAsync();
        }

        public static async Task<IEnumerable<Answers>> GetAnswers(this IRepository<Answers> repository, int topicId,int userId)
        {
            return null;
        }

    }
}
