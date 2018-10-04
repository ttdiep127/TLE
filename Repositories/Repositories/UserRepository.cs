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
    public static class UserRepository
    {
        public static async Task<Users> Get(this IRepository<Users> repository, int userId)
        {
            try
            {

                return await repository.Entities.Where(_ => _.Id == userId).FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {


                throw;
            }
        }

        public static async Task<Users> Get(this IRepository<Users> repository, string email)
        {
            return await repository.Entities.Where(_ => _.EmailAddress == email).FirstOrDefaultAsync();
        }

        
    }
}
