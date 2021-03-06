﻿using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Qtions
    {
        public Qtions()
        {
            Answers = new HashSet<Answers>();
            TestQtions = new HashSet<TestQtions>();
        }

        public int Id { get; set; }
        public string ContentQ { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public string Answer4 { get; set; }
        public int? CorrectAnswer { get; set; }
        public int? Part { get; set; }
        public int? TopicId { get; set; }

        public Topics Topic { get; set; }
        public ICollection<Answers> Answers { get; set; }
        public ICollection<TestQtions> TestQtions { get; set; }
    }
}
