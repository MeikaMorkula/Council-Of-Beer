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
        public double AlcPrecentage { get; set; }
        public string Brewery { get; set; }
        public string Country { get; set; }
        public List<string> Labels { get; set; } = new();
        public string Barcode { get; set; } = string.Empty;
        public string Url { get; set; } =string.Empty;
    }
}
