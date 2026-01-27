using SalaryCalculatorApi.Models;

public interface ICalculationService
{
    SalaryResponse CalculateSalary(SalaryRequest request);
}