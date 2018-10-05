using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Paragraphs
    {
        public Paragraphs()
        {
            ParagraphQuestion = new HashSet<ParagraphQuestion>();
        }

        public int Id { get; set; }
        public string ContentP1 { get; set; }
        public string ContentP2 { get; set; }
        public int? Part { get; set; }

        public ICollection<ParagraphQuestion> ParagraphQuestion { get; set; }
    }
}
