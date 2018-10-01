using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Answers
    {
        public int UserId { get; set; }
        public int QtionId { get; set; }
        public bool? Answer { get; set; }
        public DateTime? UpdateDay { get; set; }

        public Qtions Qtion { get; set; }
        public Users User { get; set; }
    }
}
