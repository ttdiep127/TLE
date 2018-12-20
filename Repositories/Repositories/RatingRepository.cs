using Entities.AppModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLE.Entities.Repositories;

namespace Repositories.Repositories
{
    public static class RatingRepository
    {
        public static async Task<IList<RatingModel>> GetTopRating(this IRepository<Ratings> repository, int userId, int take)
        {
            var ratings = await repository.Entities
                .Where(_ => _.UserId == userId)
                .Select(_ => new RatingModel
                {
                    UserId = _.UserId,
                    Id = _.Id,
                    Percentage = _.Percentage,
                    TopicId = _.TopicId,
                    UpdateDay = _.UpdateDay,
                    TopicName = _.Topic.Name
                }).ToListAsync();
            var userTopics = ratings.Select(_ => _.TopicId).Distinct().ToList();
            var topRatings = new List<RatingModel>();
            if (ratings != null)
            {
                
                foreach (var topicId in userTopics)
                {
                    var lastRating = ratings.OrderByDescending(_ => _.UpdateDay).ToList().FirstOrDefault(_ => _.TopicId == topicId);
                    topRatings.Add(lastRating);
                }
                topRatings = topRatings.OrderBy(_ => _.Percentage).Take(10).ToList();
            }
            return topRatings;
        }
    }
}
