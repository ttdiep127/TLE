using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Ratings
    {
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public double? Percentage { get; set; }
        public DateTime? UpdateDay { get; set; }
        public int Id { get; set; }
    }
}
