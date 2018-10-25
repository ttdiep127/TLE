using Entities.AppModels;
using Entities.Models;
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
    public class ArticleService : BaseService<Articles>
    {
        private readonly IRepository<Articles> _repository;
        private readonly IRepository<ArticleViews> _articleViewsRepo;

        public ArticleService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
            _articleViewsRepo = UnitOfWork.Repository<ArticleViews>();
        }

        internal List<ArticleInfo> getArtiles(List<Ratings> topRatings)
        {

            var articles = new List<ArticleInfo>();
            foreach (var rating in topRatings)
            {

                articles.AddRange(_articleViewsRepo.Entities.Where(_ => _.Article.TopicId == rating.TopicId).Select(_ => new ArticleInfo
                {
                    Id = _.ArticleId,
                    TopicId = _.Article.TopicId,
                    CreatedBy = _.Article.CreatedBy,
                    CreatedDay = _.Article.CreatedDay,
                    Description = _.Article.Description,
                    Title = _.Article.Title,
                    Views = _.Views
                }));
                if (articles.Count > 20)
                {
                    break;
                }
            }
            return articles;
        }
    }
}
