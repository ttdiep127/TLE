using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class ParagraphQuestion
    {
        public int ParagraphId { get; set; }
        public int QuestionId { get; set; }
        public int Position { get; set; }

        public Paragraph Paragraph { get; set; }
        public Qtions Question { get; set; }
    }
}
