export interface SalaryRequest {
  percentage: number;
  profLevel: string; 
  adminLevel: number;
  seniority: number;
  eligibleForLaw: boolean;
  bonusGroup?: string; 
}