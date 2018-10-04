using System;
using System.Collections.Generic;

namespace Web.Api.Models
{
    public partial class TestQtions
    {
        public int TestId { get; set; }
        public int QtionId { get; set; }
        public int Part { get; set; }

        public Qtions Qtion { get; set; }
        public Tests Test { get; set; }
    }
}
