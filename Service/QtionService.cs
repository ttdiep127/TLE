using Entities.AppModels;
using Entities.Models;
using Repositories;
using Repositories.Repositories;
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
        private readonly IRepository<Paragraphs> _paraRepo;
        private readonly IRepository<ParagraphQuestion> _paraQuestionRepo;

        public QtionService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
            _paraRepo = UnitOfWork.Repository<Paragraphs>();

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

        public async Task<Paragraphs> GetPara(int part)
        {
            try
            {
                var para = await _paraRepo.Get(part);
                var questions = await _paraQuestionRepo.GetByPara(para.Id);
                return para;
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
