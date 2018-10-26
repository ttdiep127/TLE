using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class ArticleInfo 
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDay { get; set; }
        public int? CreatedBy { get; set; }
        public int TopicId { get; set; }
        public int? Views { get; set; }
    }
}
