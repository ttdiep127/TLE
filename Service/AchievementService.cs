using Entities.AppModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TLE.Entities.Repositories;
using TLE.Entities.UnitOfWork;
using TLE.Service;

namespace Service
{
    public class AchievementService : BaseService<Ratings>
    {
        private readonly IRepository<Ratings> _ratingRepo;
        private readonly ArticleService _articleService;
        private readonly IRepository<Topics> _topicRepo;

        public AchievementService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _ratingRepo = Repository;
            _articleService = new ArticleService(unitOfWork);
            _topicRepo = UnitOfWork.Repository<Topics>();
        }

        public async Task<ResponseOutput> GetUserRating(int userId)
        {
            var timeNow = DateTime.Now;
            var topicIds = new List<int> { 1, 6, 5, 2, 7 };
            var listRatings = new List<ListRatingModel>();
            foreach (var topicId in topicIds)
            {
                var topic = _topicRepo.Entities.FirstOrDefault(_ => _.Id == topicId);
                var ratings = await _ratingRepo.Entities
                .Where(_ => _.UserId == userId && _.TestGuid == null && _.TopicId == topic.Id && _.UpdateDay.CompareTo(timeNow.AddYears(-1)) > 0)
                .OrderByDescending(_ => _.UpdateDay)
                .Take(20)
                .Select(_ => new RatingModel
                {
                    Id = _.Id,
                    TopicId = _.TopicId,
                    TopicName = _.Topic.Name,
                    Percentage = _.Percentage,
                    CorrectNumber = _.CorrectAnswer,
                    TotalAnswers = _.TotalAnswer,
                    TestGuid = _.TestGuid,
                    UpdateDay = _.UpdateDay,
                    UserId = _.UserId
                })
                .ToListAsync();

                listRatings.Add(new ListRatingModel
                {
                    TopicId = topic.Id,
                    Ratings = ratings,
                    TopicName = topic.Name
                });
            }
            return new ResponseOutput(true, listRatings);
        }

        public async Task<IList<RatingModel>> GetRating(string resultGuidId)
        {
            var ratings =  await _ratingRepo.Entities.Where(_ => _.TestGuid == resultGuidId)
                .Select(_ => new RatingModel
                {
                    Id = _.Id,
                    TopicId = _.TopicId,
                    TopicName = _.Topic.Name,
                    Percentage = _.Percentage,
                    CorrectNumber = _.CorrectAnswer,
                    TotalAnswers = _.TotalAnswer,
                    TestGuid = _.TestGuid,
                    UpdateDay = _.UpdateDay,
                    UserId = _.UserId
                }).ToListAsync();

            // Topic Test
            if (ratings.Count == 1)
            {
                var oldRatings = await _ratingRepo.Entities
                    .Where(_ => _.TopicId == ratings[0].TopicId && _.TestGuid == null)
                    .Select(_ => new RatingModel
                    {
                        Id = _.Id,
                        TopicId = _.TopicId,
                        TopicName = _.Topic.Name,
                        TotalAnswers = _.TotalAnswer,
                        UpdateDay = _.UpdateDay,
                        Percentage = _.Percentage,
                        CorrectNumber = _.CorrectAnswer,
                        UserId = _.UserId,
                    })
                    .OrderByDescending(_ => _.UpdateDay)
                    .Take(2)
                    .ToListAsync();
                return oldRatings;
            } else
            {
                return ratings;
            }
        }

        public async Task<IList<RatingModel>> GetRatings(int topicId, int userId)
        {
            var ratings = await _ratingRepo.Entities.Where(_ => _.TopicId == topicId && _.UserId == userId).Select(_ => new RatingModel
            {
                Id =  _.Id,
                TopicId = _.TopicId,
                Percentage = _.Percentage,
                UpdateDay = _.UpdateDay,
                UserId = _.UserId
            }).OrderByDescending(_ => _.UpdateDay).Take(10).ToListAsync();

            return ratings;
        }

        public List<ArticleOutput> RecommendArticles(int userId)
        {
            if (userId > 0)
            {
                var ratings = _ratingRepo.Entities.Where(_ => _.UserId == userId && _.TestGuid == null).ToList();
                if (ratings != null)
                {
                    var recommendTopic = new List<Topics>();
                    var topRatings = new List<Ratings>();
                    var userTopics = ratings.Select(_ => _.TopicId).Distinct().ToList();
                    foreach (var topicId in userTopics)
                    {
                        var lastRating = ratings.OrderByDescending(_ => _.UpdateDay).ToList().FirstOrDefault(_ => _.TopicId == topicId);
                        topRatings.Add(lastRating);
                    }
                    topRatings = topRatings.OrderBy(_ => _.Percentage).Take(10).ToList();

                    return _articleService.GetArtiles(topRatings);
                }
            }
            return _articleService.GetTopArticles();
        }
    }
}
