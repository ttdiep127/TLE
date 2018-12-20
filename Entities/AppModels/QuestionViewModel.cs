using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class QuestionViewModel
    {
        public int Id { get; set; }
        public string ContentQ { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public string Answer4 { get; set; }
        public int CorrectAnswer { get; set; }
        public int TopicId { get; set; }
        public int Part { get; set; }
        public int Index { get; set; }
        public int? UserAnswer { get; set; }
        public bool? IsCorrect { get; set; }
    }
}
