using System;
using System.Collections.Generic;

namespace Web.Api.Models
{
    public partial class Topics
    {
        public Topics()
        {
            Ratings = new HashSet<Ratings>();
            TagQtions = new HashSet<TagQtions>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? TopicLevel { get; set; }
        public int? Languages { get; set; }

        public ICollection<Ratings> Ratings { get; set; }
        public ICollection<TagQtions> TagQtions { get; set; }
    }
}
