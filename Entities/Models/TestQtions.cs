using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class TestQtions
    {
        public int TestId { get; set; }
        public int ItemId { get; set; }
        public int Part { get; set; }
        public bool IsPara { get; set; }
        public int Position { get; set; }

        public Qtions Item { get; set; }
        public Tests Test { get; set; }
    }
}
