
public class SalaryService : ISalaryService
{
    public async Task<SalaryResponse> CalculateSalary(SalaryRequest request)
    {
        // חישוב שכר יסוד שעתי
        double hourlyRate = request.ProfLevel == ProfLevel.Experienced ? 120 : 100;

        // תוספת ניהולית לשכר השעתי 
        int adminLevelValue = request.AdminLevel;
        hourlyRate += (adminLevelValue * 20);

        // שכר יסוד חודשי לפי חלקיות משרה 
        double baseSalary = (request.Percentage / 100.0) * 170 * hourlyRate;

        // תוספת וותק    
        int seniorityYears = (int)Math.Floor(request.Seniority);
        double seniorityPercent = seniorityYears * 1.25;
        double seniorityBonus = (seniorityPercent / 100.0) * baseSalary;

        // תוספת עבודה מתוקף חוק
        double lawBonus = 0;
        if (request.EligibleForLaw)
        {
            double lawPercent = request.BonusGroup == BonusGroup.GroupA ? 1.0 : 0.5;
            lawBonus = (lawPercent / 100.0) * baseSalary;
        }

        //  שכר בסיס לפני העלאה
        double totalBaseBeforeIncrease = baseSalary + seniorityBonus + lawBonus;

        // חישוב שיעור העלאת שכר
        double increasePercent = 0;
        if (totalBaseBeforeIncrease <= 20000) increasePercent = 1.5;
        else if (totalBaseBeforeIncrease <= 30000) increasePercent = 1.25;
        else increasePercent = 1.0;

        // תוספת ניהולית להעלאה 
        increasePercent += (adminLevelValue * 0.1);

        double increaseAmount = (increasePercent / 100.0) * totalBaseBeforeIncrease;

        // שכר בסיס חדש
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