using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Paragraph
    {
        public Paragraph()
        {
            ParagraphQuestion = new HashSet<ParagraphQuestion>();
        }

        public int Id { get; set; }
        public string ContentP { get; set; }

        public ICollection<ParagraphQuestion> ParagraphQuestion { get; set; }
    }
}
