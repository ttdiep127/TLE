using Entities.AppModels;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using TLE.Entities.Repositories;
using TLE.Entities.UnitOfWork;
using TLE.Service;

namespace Service
{
    public class AchievementService: BaseService<Ratings>
    {
        private readonly IRepository<Ratings> _repository;
        private readonly ArticleService _achievementService;
        public AchievementService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
            _achievementService = new ArticleService(unitOfWork);
        }
            public List<Ratings> GetRating(int userId)
        {
           return _repository.Entities.Where(_ => _.UserId == userId).ToList();
        }

        public List<ArticleInfo> GetRecommend(int userId)
        {
            if (userId > 0)
            {
                var ratings = _repository.Entities.Where(_ => _.UserId == userId).ToList();
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

                    return _achievementService.getArtiles(topRatings);
                }
            }
            return null;
        }
    }
}
