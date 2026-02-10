using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeerLogic.DTOs
{
    public class BeerDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double AvgRating { get; set; }
        public double AlcPrecentage { get; set; }
        public string Label { get; set; }
        public string Brewery { get; set; }
        public string Country { get; set; }
    }
}
