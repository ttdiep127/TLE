using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class ParagraphOutput
    {
        public int Id { get; set; }
        public string ContentP1 { get; set; }
        public string ContentP2 { get; set; }
        public int? Part { get; set; }

        public IEnumerable<QtionOutput> Questions{get; set;}
    }
}
