using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class ArticleViews
    {
        public int ArticleId { get; set; }
        public int? Views { get; set; }

        public Articles Article { get; set; }
    }
}
