
export enum ProjectType {
  LOAN = 'LOAN',
  CREDIT_CARD = 'CREDIT_CARD'
}

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  logo: string;
  coverImage: string;
  limit: string;
  interestRate: string;
  interestFreePeriod?: string;
  description: string;
  advantages: string[];
  promo: string;
  affiliateLink: string;
  referralCode?: string;
  tutorialVideoUrl?: string;
  tutorialFileUrl?: string; // Trường mới cho link file hướng dẫn
  eligibility: string[];
  bankPhone?: string;
  bankWebsite?: string;
  bankIntro?: string;
  paymentChannels?: string[];
  steps: {
    title: string;
    description: string;
    image: string;
  }[];
  status: 'Published' | 'Draft';
  order: number;
  rating?: number;
  userCount?: string;
}

export interface NavigationState {
  activeTab: 'home' | 'loans' | 'cards' | 'comparison' | 'calc' | 'profile';
}
