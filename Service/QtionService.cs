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
        private readonly IRepository<Answers> _answerRepo;

        public QtionService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
            _paraRepo = UnitOfWork.Repository<Paragraphs>();
            _paraQuestionRepo = UnitOfWork.Repository<ParagraphQuestion>();
            _answerRepo = UnitOfWork.Repository<Answers>();
        }

        public async Task<IEnumerable<QtionOutput>> Get(int userId, int part)
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

        public async Task<ParagraphOutput> GetPara(int part)
        {
            try
            {
                var para = await _paraRepo.Get(part);
                if (para == null) return null;
                var questionsPara = await _paraQuestionRepo.GetByParaId(para.Id);
                var questions = new List<QtionOutput>();
                foreach (var item in questionsPara)
                {
                    var question = await _repository.GetById(item.IdQuestion);
                    questions.Add(new QtionOutput
                    {
                        Id = question.Id,
                        Answer1 = question.Answer1,
                        Answer2 = question.Answer2,
                        Answer3 = question.Answer3,
                        Answer4 = question.Answer4,
                        ContentQ = question.ContentQ,
                        CorrectAnswer = question.CorrectAnswer,
                        Part = question.Part,
                        Position = item.Position,
                    });
                }

                return new ParagraphOutput{
                    Id = para.Id,
                    Part = para .Part,
                    ContentP1 = para.ContentP1,
                    ContentP2 = para.ContentP2,
                    Questions = questions
                };
            }
            catch (Exception e)
            {

                throw;
            }
        }

    }
}
