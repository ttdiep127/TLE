using Entities.AppModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
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
        private readonly IRepository<Topics> _topicRepo;

        public ArticleService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _repository = Repository;
            _articleViewsRepo = UnitOfWork.Repository<ArticleViews>();
            _topicRepo = UnitOfWork.Repository<Topics>();
        }

        internal List<ArticleOutput> GetArtiles(List<Ratings> topRatings)
        {

            var articles = new List<ArticleOutput>();
            foreach (var rating in topRatings)
            {
                articles.AddRange(_articleViewsRepo.Entities.Where(_ => _.Article.TopicId == rating.TopicId).Select(_ => new ArticleOutput
                {
                    Id = _.ArticleId,
                    TopicId = _.Article.TopicId,
                    CreatedBy = _.Article.CreatedBy,
                    CreatedDay = _.Article.CreatedDay,
                    Description = _.Article.Description,
                    Title = _.Article.Title,
                    Views = _.Views
                }));
                if (articles.Count > 8)
                {
                    break;
                }
            }
            if (articles.Count >= 8)
            {
                return articles;
            }
            else
            {
                var articlesTop = GetTopArticles();
                return articles.Concat(articlesTop).Take(8).ToList();
            }
        }

        public ArticleOutput GetArticle(int articleId)
        {
            return _repository.Entities.Where(_ => _.Id == articleId).Select(_ => new ArticleOutput
            {
                Id = _.Id,
                Title = _.Title,
                TopicId = _.TopicId,
                ContentArticles = _.ContentArticles,
                CreatedBy = _.CreatedBy,
                CreatedDay = _.CreatedDay,
                Description = _.Description,
                Views = _.ArticleViews.Views
            }).FirstOrDefault();
        }

        public async Task<IList<ArticleOutput>> GetAllArticle()
        {
            return await _repository.Entities
                 .Select(_ => new ArticleOutput
                 {
                     Id = _.Id,
                     Title = _.Title,
                     TopicId = _.TopicId,
                     ContentArticles = _.ContentArticles,
                     CreatedBy = _.CreatedBy,
                     CreatedDay = _.CreatedDay,
                     Description = _.Description,
                     Views = _.ArticleViews.Views
                 })
            .OrderBy(_ => new Guid())
            .ToListAsync();
        }

        public async Task<IList<ArticleOutput>> GetArticleByTopicId(int topicId)
        {
            return await _repository.Entities.Where(_ => _.TopicId == topicId)
                 .Select(_ => new ArticleOutput
                 {
                     Id = _.Id,
                     Title = _.Title,
                     TopicId = _.TopicId,
                     ContentArticles = _.ContentArticles,
                     CreatedBy = _.CreatedBy,
                     CreatedDay = _.CreatedDay,
                     Description = _.Description,
                     Views = _.ArticleViews.Views
                 })
            .OrderBy(_ => new Guid())
            .Take(10)
            .ToListAsync();
        }

        public async Task<IList<TopicArticles>> GetTopicsArticles(IList<int> topicIds)
        {
            var result = new List<TopicArticles>();
            foreach (var topicId in topicIds)
            {
                var articles = await GetArticleByTopicId(topicId);
                var topic = await _topicRepo.Entities.FirstOrDefaultAsync(_ => _.Id == topicId);
                result.Add(new TopicArticles
                {
                    TopicId = topicId,
                    Articles = articles,
                    TopicName = topic.Name
                });
            }
            return result;
        }

        internal List<ArticleOutput> GetTopArticles()
        {
            var topicIds = new List<int> { 1, 2, 5, 6 };

            return _repository.Entities.Where(_ => topicIds.Any(t => t == _.TopicId))
                .Select(_ => new ArticleOutput
                {
                    Id = _.Id,
                    Title = _.Title,
                    TopicId = _.TopicId,
                    ContentArticles = _.ContentArticles,
                    CreatedBy = _.CreatedBy,
                    CreatedDay = _.CreatedDay,
                    Description = _.Description,
                    Views = _.ArticleViews.Views
                }).Take(8).ToList();
        }
    }
}
