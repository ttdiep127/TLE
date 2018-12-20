using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class TestSumbitModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public long TotalTime { get; set; }
        public List<AnswerSubmit> Answers { get; set; }
    }
}
