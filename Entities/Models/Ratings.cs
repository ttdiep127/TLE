using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Ratings
    {
        public Ratings()
        {
            Answers = new HashSet<Answers>();
        }

        public int UserId { get; set; }
        public int TopicId { get; set; }
        public double? Percentage { get; set; }
        public DateTime? UpdateDay { get; set; }
        public int Id { get; set; }

        public Topics Topic { get; set; }
        public ICollection<Answers> Answers { get; set; }
    }
}
