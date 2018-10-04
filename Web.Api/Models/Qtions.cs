﻿using System;
using System.Collections.Generic;

namespace Web.Api.Models
{
    public partial class Qtions
    {
        public Qtions()
        {
            Answers = new HashSet<Answers>();
            TagQtions = new HashSet<TagQtions>();
            TestQtions = new HashSet<TestQtions>();
        }

        public int Id { get; set; }
        public string Qtion { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public string Answer4 { get; set; }
        public int? CorrectAnswer { get; set; }
        public int? Part { get; set; }

        public ICollection<Answers> Answers { get; set; }
        public ICollection<TagQtions> TagQtions { get; set; }
        public ICollection<TestQtions> TestQtions { get; set; }
    }
}