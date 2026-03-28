namespace BeerLogic.Entities
{
    public class Beer
    {
        public int Id { get; set; }
        public string Name {  get; set; }
        public double AlcPrecentage { get; set; }
        public string Brewery { get; set; }
        public string Country { get; set; }
        public List<string> Labels { get; set; } = new();
        public string Barcode { get; set; }
        public string Url { get; set; }
    }
}
