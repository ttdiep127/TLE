using System;
using System.Collections.Generic;

namespace Web.Api.Models
{
    public partial class TagQtions
    {
        public int QtionId { get; set; }
        public int TopicId { get; set; }

        public Qtions Qtion { get; set; }
        public Topics Topic { get; set; }
    }
}
