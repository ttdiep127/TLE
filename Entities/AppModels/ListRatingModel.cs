using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.AppModels
{
    public class ListRatingModel
    {
        public int TopicId { get; set; }
        public string TopicName { get; set; }
        public List<RatingModel> Ratings { get; set; }
    }
}
