


namespace SalaryCalculator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalaryController : ControllerBase
    {
        public readonly ISalaryService _salaryService;
        public SalaryController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate([FromBody] SalaryRequest request)
        {
            if (request == null)
                return BadRequest();
            var res = await _salaryService.CalculateSalary(request);
            return Ok(res);
        }

    }

}