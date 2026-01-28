public interface ISalaryService
{
    Task<SalaryResponse> CalculateSalary(SalaryRequest request);
}