using System;
using System.Collections.Generic;

namespace Web.Api.Models
{
    public partial class Ratings
    {
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public int? Precentage { get; set; }
        public DateTime? UpdateDay { get; set; }
        public int Id { get; set; }

        public Topics Topic { get; set; }
        public Users User { get; set; }
    }
}
