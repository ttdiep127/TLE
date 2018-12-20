using Entities.AppModels;
using Entities.Models;
using Entities.Utilities;
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
        private readonly IRepository<TestResults> _testResultRepo;
        private readonly IRepository<Answers> _answerRepo;
        private readonly IRepository<Topics> _topicRepo;


        public TestService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
            _paraRepo = UnitOfWork.Repository<Paragraphs>();
            _paraQuestionRepo = UnitOfWork.Repository<ParagraphQuestions>();
            _questionRepo = UnitOfWork.Repository<Qtions>();
            _testTypesRepo = UnitOfWork.Repository<TestTypes>();
            _testQuestionsRepo = UnitOfWork.Repository<TestQtions>();
            _testResultRepo = UnitOfWork.Repository<TestResults>();
            _answerRepo = UnitOfWork.Repository<Answers>();
            _topicRepo = UnitOfWork.Repository<Topics>();
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

                response.Success = true; // await InsertParagraphs(testInput.Paragraphs);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

        //public async Task<bool> InsertParagraphs(IEnumerable<ParagraphOutput> paragraphsInput)
        //{
        //    try
        //    {
        //        var paragraphs = new List<Paragraphs>();
        //        UnitOfWork.BeginTransaction();
        //        foreach (var para in paragraphsInput)
        //        {

        //            var paraTemp = new Paragraphs
        //            {
        //                Id = 0,
        //                ContentP1 = para.ContentP1,
        //                ContentP2 = para.ContentP2,
        //            };

        //            await _paraRepo.InsertAsync(paraTemp);

        //            var qtionsTemp = new List<Qtions>();
        //            para.Questions = para.Questions.OrderBy(_ => _.Position);

        //            foreach (var qtion in para.Questions)
        //            {
        //                var qtionTemp = new Qtions
        //                {
        //                    Id = 0,
        //                    ContentQ = qtion.ContentQ,
        //                    Answer1 = qtion.Answer1,
        //                    Answer2 = qtion.Answer2,
        //                    Answer3 = qtion.Answer3,
        //                    Answer4 = qtion.Answer4,
        //                    Part = qtion.Part,
        //                    TopicId = qtion.TopicId
        //                };
        //                qtionsTemp.Add(qtionTemp);
        //            }
        //            _questionRepo.InsertRange(qtionsTemp);
        //            await UnitOfWork.SaveChangesAsync();

        //            var paraQtions = new List<ParagraphQuestions>();

        //            var index = 1;
        //            foreach (var qtion in qtionsTemp)
        //            {
        //                var paraQtion = new ParagraphQuestions
        //                {
        //                    IdParagraph = paraTemp.Id,
        //                    IdQuestion = qtion.Id,
        //                    Position = index++
        //                };

        //                paraQtions.Add(paraQtion);
        //            }
        //            var exist = _paraQuestionRepo.GetByParaId(paraTemp.Id);

        //            if (exist == null)
        //            {
        //                _paraQuestionRepo.InsertRange(paraQtions);
        //                await UnitOfWork.SaveChangesAsync();
        //                return true;
        //            }
        //        }
        //    }
        //    catch (Exception)
        //    {

        //    }
        //    UnitOfWork.RollbackTransaction();
        //    return false;
        //}

        public async Task<ResponseOutput> GetTest(TestTypesEnum testTypeId, int param)
        {
            var type = _testTypesRepo.Entities.FirstOrDefault(_ => _.Id == (int)testTypeId);
            var test = new Tests();
            if (type == null)
            {
                return new ResponseOutput(false, "TestType is invalid!");
            }
            var questions = new List<QuestionViewModel>();
            if (testTypeId == TestTypesEnum.Part)
            {
                test = await _repository.Entities
                    .Where(_ => _.TypeId == (int)testTypeId && _.Part == param)
                    .OrderBy(_ => Guid.NewGuid())
                    .FirstOrDefaultAsync();
            }

            if (testTypeId == TestTypesEnum.Topic)
            {
                test = await CreateTest(param);
            }

            if (test != null)
            {
                var testQuestions = _testQuestionsRepo.Entities.Where(_ => _.TestId == test.Id).ToList();

                foreach (var item in testQuestions)
                {
                    var question = await GetQuestionByIdAsync(item.ItemId);
                    question.Index = item.Position;
                    questions.Add(question);
                }

                var testOutput = new TestViewModel
                {
                    Id = test.Id,
                    Title = test.Title,
                    TypeId = test.TypeId,
                    Questions = questions,
                };

                return new ResponseOutput(true, "", testOutput);
            }
            return new ResponseOutput(false);
        }
        private async Task<Tests> CreateTest(int topicId)
        {
            var topic = await _topicRepo.Entities.FirstOrDefaultAsync(_ => _.Id == topicId);
            var test = new Tests
            {
                TopicId = topicId,
                Title = "Bài luyện tập " + topic.Name,
                TypeId = (int)TestTypesEnum.Topic,
            };
            _repository.Insert(test);
            UnitOfWork.SaveChanges();
            var testQuestions = _questionRepo.Entities.Where(_ => _.TopicId == topicId)
                .OrderBy(_ => new Guid())
                .Take(40)
                .Select(_ => new TestQtions
                {
                    IsPara = false,
                    ItemId = _.Id,
                    Part = 5,
                    TestId = test.Id,
                }).ToList();

            var index = 1;
            foreach (var testQuestion in testQuestions)
            {
                testQuestion.Position = index++;
            }

            _testQuestionsRepo.InsertRangeAsync(testQuestions);
            UnitOfWork.SaveChanges();

            return test;
        }
        public async Task<IList<QuestionViewModel>> GetAnswers(string testGuidId)
        {
            var testResult = await _testResultRepo.Entities.FirstOrDefaultAsync(_ => _.GuidId == testGuidId);
            return _answerRepo.Entities.Where(_ => _.TestResultId == testResult.Id).Select(temp => new QuestionViewModel
            {
                Id = temp.Id,
                Answer1 = temp.Qtion.Answer1,
                Answer2 = temp.Qtion.Answer2,
                Answer3 = temp.Qtion.Answer3,
                Answer4 = temp.Qtion.Answer4,
                ContentQ = temp.Qtion.ContentQ,
                CorrectAnswer = temp.Qtion.CorrectAnswer.Value,
                Part = temp.Qtion.Part.Value,
                TopicId = temp.TopicId.Value,
                IsCorrect = temp.IsCorrect,
                UserAnswer = temp.Answer
            }
          ).ToList();
        }

        private async Task<QuestionViewModel> GetQuestionByIdAsync(int itemId)
        {
            var temp = await _questionRepo.GetById(itemId);
            return new QuestionViewModel
            {
                Id = temp.Id,
                Answer1 = temp.Answer1,
                Answer2 = temp.Answer2,
                Answer3 = temp.Answer3,
                Answer4 = temp.Answer4,
                ContentQ = temp.ContentQ,
                CorrectAnswer = temp.CorrectAnswer.Value,
                Part = temp.Part.Value,
                TopicId = temp.TopicId.Value,
            };
        }

        public async Task<ResponseOutput> GetResult(ResultRequest resultRequest)
        {
            var result = await _testResultRepo.Entities.FirstOrDefaultAsync(_ => _.GuidId == resultRequest.GuidId);

            var test = await _repository.Entities.FirstOrDefaultAsync(_ => _.Id == result.TestId);


            if (test == null || result == null)
            {
                return new ResponseOutput(false, "Cannot found result of test");
            }

            var resultOutput = new TestResultsView
            {
                Id = result.Id,
                ExamedAt = result.ExamedAt,
                CorrectAnswer = result.CorrectAnswer,
                GuidId = result.GuidId,
                TestId = result.TestId,
                TestName = test.Title,
                TotalQuestion = result.TotalQuestion,
                TotalTime = result.TotalTime,
                UserId = result.UserId,
                TypeTestId = test.TypeId
            };

            if (resultRequest.UserId.HasValue && resultRequest.UserId == result.UserId)
            {
                return new ResponseOutput(true, resultOutput);
            }

            if (!resultRequest.UserId.HasValue && result.ExamedAt.CompareTo(DateTime.Now.AddDays(-1)) == 1)
            {
                return new ResponseOutput(true, resultOutput);
            }

            return new ResponseOutput(false, "Cannot find result of test ");
        }
        //private async Task<ParagraphOutput> GetParaById(int paraId)
        //{
        //    var para = await _paraRepo.GetById(paraId);
        //    para.ParagraphQuestions = await _paraQuestionRepo.GetByParaId(para.Id);

        //    var paraQuestions = new List<QuestionViewModel>();
        //    foreach (var qtion in para.ParagraphQuestions)
        //    {
        //        var temp = await _questionRepo.GetById(qtion.IdQuestion);
        //        paraQuestions.Add(new QuestionViewModel
        //        {
        //            Id = temp.Id,
        //            Answer1 = temp.Answer1,
        //            Answer2 = temp.Answer2,
        //            Answer3 = temp.Answer3,
        //            Answer4 = temp.Answer4,
        //            ContentQ = temp.ContentQ,
        //            CorrectAnswer = temp.CorrectAnswer,
        //            Part = temp.Part,
        //            Position = qtion.Position,
        //            TopicId = temp.TopicId
        //        });
        //    }

        //    return new ParagraphOutput
        //    {
        //        Id = para.Id,
        //        ContentP1 = para.ContentP1,
        //        ContentP2 = para.ContentP2,
        //        Part = para.Part,
        //        Questions = paraQuestions
        //    };

        //}
    }
}
