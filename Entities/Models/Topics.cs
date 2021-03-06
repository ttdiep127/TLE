﻿using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Topics
    {
        public Topics()
        {
            Answers = new HashSet<Answers>();
            Articles = new HashSet<Articles>();
            Qtions = new HashSet<Qtions>();
            Ratings = new HashSet<Ratings>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? TopicLevel { get; set; }
        public int? Languages { get; set; }

        public ICollection<Answers> Answers { get; set; }
        public ICollection<Articles> Articles { get; set; }
        public ICollection<Qtions> Qtions { get; set; }
        public ICollection<Ratings> Ratings { get; set; }
    }
}
