using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class TestRequest
    {
        public int Id { get; set; }
        public int TypeId { get; set; }
        public List<UserAnswer> Answers { get; set; }
    }
}
