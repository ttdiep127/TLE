using Entities.AppModels;
using Entities.Models;
using Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLE.Entities.Repositories;
using TLE.Entities.UnitOfWork;
using TLE.Service;

namespace Service
{
    public class QtionService: BaseService<Qtions>
    {
        private readonly IRepository<Qtions> _repository;

        public QtionService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
        }

        public async Task<IEnumerable<QtionModel>> Get(int part)
        {
            try
            {
                var question = await _repository.Get(part);

               
               

                return question;

            }
            catch (System.Exception ex)
            {

                throw;
            }
        }

    }
}
