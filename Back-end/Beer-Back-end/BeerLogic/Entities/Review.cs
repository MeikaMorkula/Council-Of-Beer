using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.Entities
{
    public class Review
    {
        public int Id { get; set; }
        public int BeerId { get; set; }
        public int UserId { get; set; }
        public double Score { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
    }
}
