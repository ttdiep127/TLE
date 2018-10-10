using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class TestInputModel
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public int Type { get; set; }
        public IEnumerable<QtionOutput> Questions { get; set; }
        public IEnumerable<ParagraphOutput> Paragraphs { get; set; }
    }
}
