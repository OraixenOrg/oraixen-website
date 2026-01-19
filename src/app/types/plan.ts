export interface PlanType {
  type: string;
  price: {
    monthly: number;
    yearly: number;
  };
  desc: string;
  option: string[];
}
