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
    public static class ParaQuestionRepository
    {
        public static async Task<IEnumerable<ParagraphQuestion>> GetByParaId(this IRepository<ParagraphQuestion> repository, int paraId)
        {

            var  a = await repository.Entities.Where(_ => _.IdParagraph == paraId).ToListAsync();
            return await repository.Entities.Where(_ => _.IdParagraph == paraId).ToListAsync();
        }
    }
}
