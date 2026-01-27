using System.ComponentModel.DataAnnotations;

namespace SalaryCalculatorApi.Models
{
    public class SalaryRequest
    {
        [Range(0, 100)]
        public double Percentage { get; set; }

        [Required]
        public string ProfLevel { get; set; }

        [Range(0, 4)]
        public int AdminLevel { get; set; }

        [Range(0, 50)]
        public double Seniority { get; set; }

        public bool EligibleForLaw { get; set; }

        [Required]
        public string BonusGroup { get; set; }
    }

}
