using Entities.AppModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
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
    }
}
