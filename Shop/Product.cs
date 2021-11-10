using Microsoft.AspNetCore.Http;
using System;

namespace Shop
{
    public class Product
    {
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public byte[] Picture { get; set; }
        public int Category { get; set; }
        public int Amount { get; set; }
    }
}
