using SalaryCalculatorApi.Models;

public class CalculationService : ICalculationService
{
    // Example calculation: some CPU-light async operation
  

    public SalaryResponse CalculateSalary(SalaryRequest request)
    {
        // א. חישוב שכר יסוד שעתי
        double hourlyRate = request.ProfLevel == "Experienced" ? 120 : 100;

        // תוספת ניהולית לשכר השעתי (20 ש"ח לכל דרגה)
        int adminLevelValue = request.AdminLevel;
        hourlyRate += (adminLevelValue * 20);

        // שכר יסוד חודשי לפי חלקיות משרה (משרה מלאה = 170 שעות)
        double baseSalary = (request.Percentage / 100.0) * 170 * hourlyRate;

        // ב. תוספת וותק (1.25% לכל שנה מלאה)
        int seniorityYears = (int)Math.Floor(request.Seniority);
        double seniorityPercent = seniorityYears * 1.25;
        double seniorityBonus = (seniorityPercent / 100.0) * baseSalary;

        // ג. תוספת עבודה מתוקף חוק
        double lawBonus = 0;
        if (request.EligibleForLaw)
        {
            double lawPercent = request.BonusGroup == "A" ? 1.0 : 0.5;
            lawBonus = (lawPercent / 100.0) * baseSalary;
        }

        // ד. שכר בסיס לפני העלאה
        double totalBaseBeforeIncrease = baseSalary + seniorityBonus + lawBonus;

        // ה. חישוב שיעור העלאת שכר
        double increasePercent = 0;
        if (totalBaseBeforeIncrease <= 20000) increasePercent = 1.5;
        else if (totalBaseBeforeIncrease <= 30000) increasePercent = 1.25;
        else increasePercent = 1.0;

        // תוספת ניהולית להעלאה (0.1% לכל רמה)
        increasePercent += (adminLevelValue * 0.1);

        double increaseAmount = (increasePercent / 100.0) * totalBaseBeforeIncrease;

        // ו. שכר בסיס חדש
        double newBaseSalary = totalBaseBeforeIncrease + increaseAmount;

        return new SalaryResponse
        {
            BaseSalaryByPercentage = baseSalary,
            SeniorityBonusPercent = seniorityPercent,
            SeniorityBonusAmount = seniorityBonus,
            LegalBonusAmount = lawBonus,
            TotalBeforeIncrease = totalBaseBeforeIncrease,
            IncreaseRatePercent = increasePercent,
            IncreaseAmount = increaseAmount,
            TotalAfterIncrease = newBaseSalary
        };
    }   

   
}