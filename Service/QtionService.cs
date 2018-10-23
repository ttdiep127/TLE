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
        private readonly IRepository<ParagraphQuestions> _paraQuestionRepo;
        private readonly IRepository<Answers> _answerRepo;

        public QtionService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
            _paraRepo = UnitOfWork.Repository<Paragraphs>();
            _paraQuestionRepo = UnitOfWork.Repository<ParagraphQuestions>();
            _answerRepo = UnitOfWork.Repository<Answers>();
        }

        public async Task<IEnumerable<QtionOutput>> Get(int part)
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

        public ResponseOutput AddQuestion(ICollection<QtionOutput> qtions)
        {
            if (qtions == null || qtions.Count == 0)
            {
                return new ResponseOutput
                {
                    Success = false,
                    Message = "Object null"
                };
            }

            var response = new ResponseOutput();

            try
            {
                var questions = new List<Qtions>();
                foreach (var qtion in qtions)
                {
                    var temp = new Qtions
                    {
                        Id = 0,
                        ContentQ = qtion.ContentQ,
                        Answer1 = qtion.Answer1,
                        Answer2 = qtion.Answer2,
                        Answer3 = qtion.Answer3,
                        Answer4 = qtion.Answer4,
                        Part = qtion.Part,
                        TopicId = qtion.TopicId
                    };
                    questions.Add(temp);
                }
                _repository.InsertRange(questions);
                UnitOfWork.SaveChanges();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ParagraphOutput> GetPara(int part)
        {
            var para = await _paraRepo.Get(part);
            para.ParagraphQuestions = await _paraQuestionRepo.GetByParaId(para.Id);

            var paraQuestions = new List<QtionOutput>();
            foreach (var qtion in para.ParagraphQuestions)
            {
                var temp = await _repository.GetById(qtion.IdQuestion);
                paraQuestions.Add(new QtionOutput
                {
                    Id = temp.Id,
                    Answer1 = temp.Answer1,
                    Answer2 = temp.Answer2,
                    Answer3 = temp.Answer3,
                    Answer4 = temp.Answer4,
                    ContentQ = temp.ContentQ,
                    CorrectAnswer = temp.CorrectAnswer,
                    Part = temp.Part,
                    Position = qtion.Position,
                    TopicId = temp.TopicId
                });
            }

            return new ParagraphOutput
            {
                Id = para.Id,
                ContentP1 = para.ContentP1,
                ContentP2 = para.ContentP2,
                Part = para.Part,
                Questions = paraQuestions
            };
        }

       
    }
}
