using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IProductService productService;

        public ProductController(ILogger<ProductController> logger, 
            IProductService productService)
        {
            _logger = logger;
            this.productService = productService;
        }

        [HttpGet("{category}")]
        public IEnumerable<Product> Get(int category)
        {
            return productService.GetProducts(category);
        }

        [HttpGet("product/{guid}")]
        public Product GetProduct(Guid guid)
        {
            return productService.GetProduct(guid);
        }

        [HttpPost("Stock")]
        public bool Stock([FromBody] Buy[] buy)
        {
            return productService.IsOnStock(buy);
        }

        [HttpPost("Buy")]
        public string Buy([FromBody] Buy[] buy)
        {
            return productService.Buy(buy); ;
        }
    }
}
