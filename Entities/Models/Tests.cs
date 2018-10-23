﻿using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Tests
    {
        public Tests()
        {
            TestQtions = new HashSet<TestQtions>();
            TestResults = new HashSet<TestResults>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public int TypeId { get; set; }

        public TestTypes Type { get; set; }
        public ICollection<TestQtions> TestQtions { get; set; }
        public ICollection<TestResults> TestResults { get; set; }
    }
}
