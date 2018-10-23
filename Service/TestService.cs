using Entities.AppModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories;
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
        private readonly IRepository<ParagraphQuestions> _paraQuestionRepo;
        private readonly IRepository<Qtions> _questionRepo;
        private readonly IRepository<TestTypes> _testTypesRepo;
        private readonly IRepository<TestQtions> _testQuestionsRepo;

        public TestService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
            _paraRepo = UnitOfWork.Repository<Paragraphs>();
            _paraQuestionRepo = UnitOfWork.Repository<ParagraphQuestions>();
            _questionRepo = UnitOfWork.Repository<Qtions>();
            _testTypesRepo = UnitOfWork.Repository<TestTypes>();
            _testQuestionsRepo = UnitOfWork.Repository<TestQtions>();
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
                        TopicId = qtion.TopicId
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
                            TopicId = qtion.TopicId
                        };
                        qtionsTemp.Add(qtionTemp);
                    }
                    _questionRepo.InsertRange(qtionsTemp);
                    await UnitOfWork.SaveChangesAsync();

                    var paraQtions = new List<ParagraphQuestions>();

                    var index = 1;
                    foreach (var qtion in qtionsTemp)
                    {
                        var paraQtion = new ParagraphQuestions
                        {
                            IdParagraph = paraTemp.Id,
                            IdQuestion = qtion.Id,
                            Position = index++
                        };

                        paraQtions.Add(paraQtion);
                    }
                    var exist = _paraQuestionRepo.GetByParaId(paraTemp.Id);

                    if (exist == null)
                    {
                        _paraQuestionRepo.InsertRange(paraQtions);
                        await UnitOfWork.SaveChangesAsync();
                        return true;
                    }
                }
            }
            catch (Exception)
            {

            }
            UnitOfWork.RollbackTransaction();
            return false;
        }

        public async Task<ResponseOutput> GetTest(int testType) {

            if (_testTypesRepo.Entities.FirstOrDefault(_ => _.Id == testType) == null)
            {
                return new ResponseOutput(false, "TestType is invalid!");
            } else
            {
                var test = await _repository.Entities.Where(_ => _.TypeId == testType).OrderBy(_ => Guid.NewGuid()).FirstOrDefaultAsync();

                var questions = new List<QtionOutput>();
                var paras = new List<ParagraphOutput>();
                if (test != null)
                {
                    var testQuestions = _testQuestionsRepo.Entities.Where(_ => _.TestId == test.Id);

                    foreach (var item in testQuestions)
                    {
                        if (item.IsPara)
                        {
                            paras.Add( await GetParaById(item.ItemId));
                        }
                        else
                        {
                            questions.Add(await GetQuestionByIdAsync(item.ItemId));
                        }
                    }

                    var testOutput = new TestOutput
                    {
                        Id = test.Id,
                        Title = test.Title,
                        TypeId = test.TypeId,
                        Paragraphs = paras,
                        Questions = questions
                    };

                    return new ResponseOutput(true, "", testOutput);
                }
                else
                {
                    //genarate test
                    
                }
                return new ResponseOutput(false, "Error When get a test");
            }
        }

        private async Task<QtionOutput> GetQuestionByIdAsync(int itemId)
        {
            var temp = await _questionRepo.GetById(itemId);
            return new QtionOutput {
                Id = temp.Id,
                Answer1 = temp.Answer1,
                Answer2 = temp.Answer2,
                Answer3 = temp.Answer3,
                Answer4 = temp.Answer4,
                ContentQ = temp.ContentQ,
                CorrectAnswer = temp.CorrectAnswer,
                Part = temp.Part,
                TopicId = temp.TopicId};
        }

        private async Task<ParagraphOutput> GetParaById(int paraId)
        {
            var para = await _paraRepo.GetById(paraId);
            para.ParagraphQuestions = await _paraQuestionRepo.GetByParaId(para.Id);

            var paraQuestions = new List<QtionOutput>();
            foreach (var qtion in para.ParagraphQuestions)
            {
                var temp = await _questionRepo.GetById(qtion.IdQuestion);
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
