using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Paragraphs
    {
        public Paragraphs()
        {
            ParagraphQuestions = new HashSet<ParagraphQuestions>();
        }

        public int Id { get; set; }
        public string ContentP1 { get; set; }
        public string ContentP2 { get; set; }
        public int? Part { get; set; }

        public ICollection<ParagraphQuestions> ParagraphQuestions { get; set; }
    }
}
