using System;
using System.Collections.Generic;

namespace Web.Api.Models
{
    public partial class Answers
    {
        public int UserId { get; set; }
        public int QtionId { get; set; }
        public int? Answer { get; set; }
        public bool? IsCorrect { get; set; }
        public DateTime? UpdateDay { get; set; }

        public Qtions Qtion { get; set; }
        public Users User { get; set; }
    }
}
