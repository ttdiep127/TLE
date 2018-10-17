using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class AnswersRequest
    {
        public ICollection<UserAnswer> Answers { get; set; }
    }
}
