using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Topics
    {
        public Topics()
        {
            Articles = new HashSet<Articles>();
            Qtions = new HashSet<Qtions>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? TopicLevel { get; set; }
        public int? Languages { get; set; }

        public ICollection<Articles> Articles { get; set; }
        public ICollection<Qtions> Qtions { get; set; }
    }
}
