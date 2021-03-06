﻿using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Users
    {
        public Users()
        {
            Answers = new HashSet<Answers>();
            Ratings = new HashSet<Ratings>();
            TestResults = new HashSet<TestResults>();
        }

        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public int? Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public bool Disable { get; set; }
        public DateTime? TokenCreatedDate { get; set; }
        public string Token { get; set; }
        public DateTime? JoinedDate { get; set; }
        public string AvtSrc { get; set; }

        public ICollection<Answers> Answers { get; set; }
        public ICollection<Ratings> Ratings { get; set; }
        public ICollection<TestResults> TestResults { get; set; }
    }
}
