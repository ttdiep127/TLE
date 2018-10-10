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
    public static class ParagraphRepository
    {
        public static async Task<Paragraphs> Get(this IRepository<Paragraphs> repository,int part)
        {
            return await repository.Entities.Where(_ => _.Part == part).OrderBy(_ => Guid.NewGuid()).FirstOrDefaultAsync();
        }

        //public static async Task<Paragraphs> Add(this IRepository<Paragraphs> repository, Paragraphs para)
        //{
        //    return await repository.Entities.InsertAsync(para);
        //}
    }
}
