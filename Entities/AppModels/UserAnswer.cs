using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class UserAnswer
    {
        public int UserId { get; set; }
        public int QtionId { get; set; }
        public int? Answer { get; set; }
        public bool? IsCorrect { get; set; }
        public DateTime? UpdateDay { get; set; }
    }
}
