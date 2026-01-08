export enum ProjectType {
  LOAN = 'LOAN',
  CREDIT_CARD = 'CREDIT_CARD',
  SYSTEM = 'SYSTEM' // New type for system settings
}

export interface AppConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  zaloSupport: string;
  adminPassword?: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  logoUrl: string;
  displayOrder: number;
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
  referralCode?: string; // New field
  tutorialVideoUrl?: string; // New field
  tutorialFileUrl?: string; // New field
  eligibility: string[]; // New field
  bankPhone?: string; // New field
  bankWebsite?: string; // New field
  bankIntro?: string; // New field
  paymentChannels?: string[]; // New field
  steps: {
    title: string;
    description: string;
    image: string;
  }[];
  status: 'Published' | 'Draft';
  order: number;
  rating?: number;
  userCount?: string;
  // Optional: Extended props for storing settings in a "Project" wrapper
  appConfig?: AppConfig;
}

export interface NavigationState {
  activeTab: 'home' | 'loans' | 'cards' | 'comparison' | 'calc' | 'profile';
}
