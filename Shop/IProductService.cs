using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop
{
    public interface IProductService
    {
        public IEnumerable<Product> GetProducts(int categoryId);
        public bool IsOnStock(Buy[] buy);
        public string Buy(Buy[] buy);
    }
}
