using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class TestOutput
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int TypeId { get; set; }

        public List<QtionOutput> Questions { get; set; }
        public List<ParagraphOutput> Paragraphs { get; set; }
    }
}
