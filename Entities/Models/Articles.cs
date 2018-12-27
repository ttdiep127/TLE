using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Articles
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ContentArticles { get; set; }
        public DateTime? CreatedDay { get; set; }
        public int? CreatedBy { get; set; }
        public int TopicId { get; set; }

        public Topics Topic { get; set; }
    }
}
