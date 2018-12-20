using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class QuestionsRequest
    {
        public ICollection<QuestionViewModel> Questions { get; set; }
    }
}
