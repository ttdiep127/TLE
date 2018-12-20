using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Ratings
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public int TotalAnswer { get; set; }
        public int CorrectAnswer { get; set; }
        public double Percentage { get; set; }
        public DateTime UpdateDay { get; set; }
        public string TestGuid { get; set; }

        public Topics Topic { get; set; }
        public Users User { get; set; }
    }
}
