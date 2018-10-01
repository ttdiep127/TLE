using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class TestTypes
    {
        public TestTypes()
        {
            Tests = new HashSet<Tests>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Tests> Tests { get; set; }
    }
}
