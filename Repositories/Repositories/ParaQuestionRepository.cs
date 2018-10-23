using Entities.AppModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLE.Entities.Repositories;
using TLE.Repositories;

namespace Repositories.Repositories
{
    public static class ParaQuestionRepository
    {
        public static async Task<ICollection<ParagraphQuestions>> GetByParaId(this IRepository<ParagraphQuestions> repository, int paraId)
        {
            return await repository.Entities.Where(_ => _.IdParagraph == paraId).ToListAsync();
        }

    }
}
