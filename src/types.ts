export interface PatientData {
  name: string;
  age: number;
  sex: "male" | "female";
  chestPainType: "typical" | "atypical" | "non-anginal" | "asymptomatic";
  restingBP: number;
  cholesterol: number;
  fastingBS: boolean;
  restingECG: "normal" | "ST" | "LVH";
  maxHR: number;
  exerciseAngina: boolean;
  oldpeak: number;
}

export interface PredictionResult {
  id?: string;
  timestamp?: any;
  riskScore: number;
  clinicalInsights?: {
    summary: string;
    riskFactors: string[];
    recommendations: string[];
  };
}
