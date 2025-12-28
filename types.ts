
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export type ViewState = 'how-it-works' | 'pricing' | 'ai-helper';
