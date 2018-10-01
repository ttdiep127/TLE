using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLE.Entities.Repositories;
using TLE.Entities.Service;
using TLE.Entities.UnitOfWork;

namespace TLE.Service
{
    public abstract class BaseService<TEntity> : IBaseService<TEntity> where TEntity : class
    {
        protected readonly IRepository<TEntity> Repository;

        protected readonly IUnitOfWork UnitOfWork;

        protected BaseService(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
            Repository = UnitOfWork.Repository<TEntity>();
        }
        public virtual void Delete(object id)
        {
            Repository.Delete(id);
        }

        public void Delete(TEntity entity)
        {
            Repository.Delete(entity);
        }

        public TEntity Find(params object[] keyValues)
        {
            return Repository.Find(keyValues);
        }

        public void Insert(TEntity entity)
        {
            Repository.Insert(entity);
        }

        public void Update(TEntity entity)
        {
            Repository.Update(entity);
        }
    }
}
