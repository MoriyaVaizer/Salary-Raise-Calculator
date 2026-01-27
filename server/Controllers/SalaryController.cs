using Microsoft.AspNetCore.Mvc;
using SalaryCalculatorApi.Models;

namespace SalaryCalculator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalaryController : ControllerBase

    {
        public readonly ICalculationService _calculationService;
        public SalaryController(ICalculationService calculationService)
        {
            _calculationService = calculationService;
        }
        [HttpPost("calculate")]
        public IActionResult Calculate([FromBody] SalaryRequest request)
        {
            if (request == null) 
                return BadRequest();
            var res = _calculationService.CalculateSalary(request);

            return Ok(res);
        }


    }


}