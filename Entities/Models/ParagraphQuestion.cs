using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class ParagraphQuestion
    {
        public int IdParagraph { get; set; }
        public int IdQuestion { get; set; }
        public int Position { get; set; }

        public Paragraphs IdParagraphNavigation { get; set; }
        public Qtions IdQuestionNavigation { get; set; }
    }
}
