using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Answers
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int QtionId { get; set; }
        public int? Answer { get; set; }
        public bool? IsCorrect { get; set; }
        public DateTime? UpdateDay { get; set; }
        public int? TopicId { get; set; }
        public int? TestResultId { get; set; }

        public Qtions Qtion { get; set; }
        public TestResults TestResult { get; set; }
        public Topics Topic { get; set; }
        public Users User { get; set; }
    }
}
