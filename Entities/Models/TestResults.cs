using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class TestResults
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TestId { get; set; }
        public int? Scored { get; set; }
        public DateTime? DateTime { get; set; }

        public Tests Test { get; set; }
        public Users User { get; set; }
    }
}
