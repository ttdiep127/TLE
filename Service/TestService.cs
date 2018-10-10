using Entities.AppModels;
using Entities.Models;
using Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLE.Entities.Repositories;
using TLE.Entities.UnitOfWork;
using TLE.Service;

namespace Service
{
    public class TestService : BaseService<Tests>
    {
        private readonly IRepository<Tests> _repository;
        private readonly IRepository<Paragraphs> _paraRepo;
        private readonly IRepository<ParagraphQuestion> _paraQuestionRepo;
        private readonly IRepository<Qtions> _questionRepo;

        public TestService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
            _paraRepo = UnitOfWork.Repository<Paragraphs>();
            _paraQuestionRepo = UnitOfWork.Repository<ParagraphQuestion>();
            _questionRepo = UnitOfWork.Repository<Qtions>();
        }


        public async Task<ResponseOutput> AddTest(TestInputModel testInput)
        {
            if (testInput == null)
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
                var test = new Tests
                {
                    Id = 0,
                    Title = testInput.Title,
                    TypeId = testInput.Type
                };

                var questions = new List<Qtions>();
                foreach (var qtion in testInput.Questions)
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
                    };
                    questions.Add(temp);
                }

                await _repository.InsertAsync(test);
                await UnitOfWork.SaveChangesAsync();

                _questionRepo.InsertRange(questions);
                await UnitOfWork.SaveChangesAsync();

                response.Success = await InsertParagraphs(testInput.Paragraphs);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<bool> InsertParagraphs(IEnumerable<ParagraphOutput> paragraphsInput)
        {
            try
            {
                var paragraphs = new List<Paragraphs>();
                UnitOfWork.BeginTransaction();
                foreach (var para in paragraphsInput)
                {

                    var paraTemp = new Paragraphs
                    {
                        Id = 0,
                        ContentP1 = para.ContentP1,
                        ContentP2 = para.ContentP2,
                    };

                    await _paraRepo.InsertAsync(paraTemp);

                    var qtionsTemp = new List<Qtions>();
                    para.Questions = para.Questions.OrderBy(_ => _.Position);

                    foreach (var qtion in para.Questions)
                    {
                        var qtionTemp = new Qtions
                        {
                            Id = 0,
                            ContentQ = qtion.ContentQ,
                            Answer1 = qtion.Answer1,
                            Answer2 = qtion.Answer2,
                            Answer3 = qtion.Answer3,
                            Answer4 = qtion.Answer4,
                            Part = qtion.Part,
                        };
                        qtionsTemp.Add(qtionTemp);
                    }
                    _questionRepo.InsertRange(qtionsTemp);

                    var paraQtions = new List<ParagraphQuestion>();

                    var index = 1;
                    foreach (var qtion in qtionsTemp)
                    {
                        var paraQtion = new ParagraphQuestion
                        {
                            IdParagraph = paraTemp.Id,
                            IdQuestion = qtion.Id,
                            Position = index++
                        };

                        paraQtions.Add(paraQtion);
                    }
                    var exist = _paraQuestionRepo.GetByParaId(paraTemp.Id);

                    if (exist != null)
                    {
                        _paraQuestionRepo.InsertRange(paraQtions);
                    }
                }
                await UnitOfWork.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                UnitOfWork.RollbackTransaction();
                return false; ;
            }
        }
    }
}
