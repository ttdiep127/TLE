using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class TestResults
    {
        public TestResults()
        {
            Answers = new HashSet<Answers>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public int TestId { get; set; }
        public int CorrectAnswer { get; set; }
        public DateTime ExamedAt { get; set; }
        public int TotalQuestion { get; set; }
        public long TotalTime { get; set; }
        public string GuidId { get; set; }

        public Tests Test { get; set; }
        public Users User { get; set; }
        public ICollection<Answers> Answers { get; set; }
    }
}
