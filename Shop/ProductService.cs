using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Shop
{
    public class ProductService : IProductService
    {
        private List<Product> products = Init();

        private static List<Product> Init()
        {
            List<Product> productList = new();

            string[] fileEntries = Directory.GetFiles(Environment.CurrentDirectory + @"\ProductImages");

            foreach (string fileName in fileEntries)
                using (var ms = new MemoryStream())
                {
                    Image imageIn = Image.FromFile(Path.Combine(Environment.CurrentDirectory, @"ProductImages\", fileName));
                    imageIn.Save(ms, imageIn.RawFormat);
                    //images.Add(fileName, ms.ToArray());
                    productList.Add(
                        new Product()
                        {
                            Name = "Product Name" + int.Parse(fileName.Split('\\').Last().Split('.')[0]),
                            Price = 300,
                            Picture = ms.ToArray(),
                            Category = 1,//int.Parse(fileName.Split('\\').Last().Split('.')[0]),
                            Amount = 5
                        }
                        ); ;
                }

            return productList;
        }

        public string Buy(Buy[] buy)
        {
            if (IsOnStock(buy))
            {
                foreach (Buy b in buy)
                {
                    products.First(p => p.Guid == b.Guid).Amount -= b.Amount;
                }

                return "Thank you!";
            }
            else
            {
                return "Some of products from the basket are currently out of stock";
            }
        }

        public IEnumerable<Product> GetProducts(int category)
        {
            return products.Where(p => p.Category == category);
        }

        public bool IsOnStock(Buy[] buy)
        {
            foreach (Buy b in buy)
            {
                if (!products.Exists(p => p.Guid == b.Guid && p.Amount >= b.Amount))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
