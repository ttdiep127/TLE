using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class TopicArticles
    {
        public int TopicId { get; set; }
        public IList<ArticleOutput> Articles { get; set; }
        public string TopicName { get; set; }
    }
}
