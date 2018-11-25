using Entities.AppModels;
using Entities.Models;
using Repositories.Repositories;
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
        public AchievementService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _ratingRepo = Repository;
            _articleService = new ArticleService(unitOfWork);
        }

        public async Task<IList<RatingModel>> GetRating(int userId)
        {
            return await _ratingRepo.GetTopRating(userId, 5);
        }

        public List<ArticleOutput> GetRecommend(int userId)
        {
            if (userId > 0)
            {
                var ratings = _ratingRepo.Entities.Where(_ => _.UserId == userId).ToList();
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
            return null;
        }
    }
}
