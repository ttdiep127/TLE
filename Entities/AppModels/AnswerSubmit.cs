using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class AnswerSubmit
    {
        public int UserId { get; set; }
        public int QuestionId { get; set; }
        public int? UserAnswer { get; set; }
        public bool? IsCorrect { get; set; }
        public int TopicId { get; set; }
    }
}
