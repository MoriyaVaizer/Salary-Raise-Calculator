namespace SalaryCalculatorApi.Models
{
    public class SalaryResponse
    {
        public double BaseSalaryByPercentage { get; init; }
        public double SeniorityBonusPercent { get; init; }
        public double SeniorityBonusAmount { get; init; }
        public double LegalBonusAmount { get; init; }
        public double TotalBeforeIncrease { get; init; }
        public double IncreaseRatePercent { get; init; }
        public double IncreaseAmount { get; init; }
        public double TotalAfterIncrease { get; init; }
    }
}
