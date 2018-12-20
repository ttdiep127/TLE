using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class TestResultsView
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TestId { get; set; }
        public int CorrectAnswer { get; set; }
        public DateTime ExamedAt { get; set; }
        public int TotalQuestion { get; set; }
        public long TotalTime { get; set; }
        public string GuidId { get; set; }
        public string TestName { get; set; }
        public int TypeTestId { get; set; }
    }
}
