using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class RatingModel
    {
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public double? Percentage { get; set; }
        public DateTime? UpdateDay { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
