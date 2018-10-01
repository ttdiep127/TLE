using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TLE.Entities.Service
{
    public interface IBaseService<TEntity> where TEntity: class
    {
        TEntity Find(params object[] keyValues);
        void Insert(TEntity entity);
        void Update(TEntity entity);
        void Delete(object id);
        void Delete(TEntity entity);
    }
}
