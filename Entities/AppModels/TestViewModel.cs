using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class TestViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int TypeId { get; set; }
        public int TopicId { get; set; }
        public int Part { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserOuput CreatBy { get; set; }
        public List<QuestionViewModel> Questions { get; set; }
        public List<ParagraphOutput> Paragraphs { get; set; }
    }
}
