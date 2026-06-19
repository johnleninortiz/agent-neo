// Rent-A-Human Application Types

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'human';
  avatar?: string;
  verified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface HumanWorker extends User {
  role: 'human';
  displayName: string;
  bio?: string;
  hourlyRate: number;
  location: {
    city: string;
    country: string;
    timezone: string;
  };
  skills: Skill[];
  languages: string[];
  portfolio: PortfolioItem[];
  rating: number;
  reviewCount: number;
  completedJobs: number;
  responseTime: string; // e.g., "2 hours"
  availability: Availability[];
  badges: Badge[];
}

export interface AIAgent extends User {
  role: 'agent';
  organization: string;
  apiQuota: {
    monthly: number;
    used: number;
    resetDate: string;
  };
  billingTier: 'free' | 'professional' | 'enterprise';
  spendingLimit: number;
  currentMonthSpending: number;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verified: boolean;
  category: string;
  yearsOfExperience?: number;
  certification?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
  createdAt: string;
  rating?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
  timezone: string;
}

export interface Job {
  id: string;
  agentId: string;
  title: string;
  description: string;
  category: JobCategory;
  subcategory: string;
  skillsRequired: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'expert';
  budget: {
    min: number;
    max: number;
    type: 'fixed' | 'hourly' | 'milestone';
    currency: string;
  };
  duration: number; // estimated hours
  deadline: string;
  locationType: 'remote' | 'on-site' | 'hybrid';
  locationDetails?: any;
  status: JobStatus;
  urgent: boolean;
  confidential: boolean;
  attachments: string[];
  proposalsCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export type JobCategory = 
  | 'creative'
  | 'analytical'
  | 'physical'
  | 'research'
  | 'technical'
  | 'administrative'
  | 'consulting'
  | 'writing'
  | 'design'
  | 'development'
  | 'translation'
  | 'data'
  | 'marketing'
  | 'legal'
  | 'other';

export type JobStatus = 
  | 'draft'
  | 'active'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export interface Proposal {
  id: string;
  jobId: string;
  workerId: string;
  worker: HumanWorker;
  proposedRate: number;
  estimatedDuration: number;
  coverLetter: string;
  portfolioLinks: string[];
  milestones?: Milestone[];
  status: ProposalStatus;
  submittedAt: string;
  respondedAt?: string;
}

export type ProposalStatus = 
  | 'pending'
  | 'shortlisted'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export interface Contract {
  id: string;
  jobId: string;
  workerId: string;
  agentId: string;
  status: ContractStatus;
  terms: ContractTerms;
  milestones: Milestone[];
  startDate: string;
  endDate?: string;
  totalAmount: number;
  paidAmount: number;
  createdAt: string;
}

export type ContractStatus = 
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'disputed'
  | 'paused';

export interface ContractTerms {
  scope: string;
  deliverables: string[];
  revisionLimit: number;
  paymentSchedule: 'upfront' | 'milestone' | 'completion';
  cancellationPolicy: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: MilestoneStatus;
  approvedAt?: string;
  paidAt?: string;
  workSubmitted?: string[];
}

export type MilestoneStatus = 
  | 'pending'
  | 'in_progress'
  | 'submitted'
  | 'approved'
  | 'paid'
  | 'revision_requested';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'agent' | 'human';
  text: string;
  attachments: MessageAttachment[];
  timestamp: string;
  readAt?: string;
}

export interface MessageAttachment {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
}

export interface Conversation {
  id: string;
  participants: {
    agentId: string;
    workerId: string;
  };
  jobId?: string;
  contractId?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  contractId: string;
  milestoneId?: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: string;
  type: 'escrow' | 'release' | 'refund';
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  description: string;
  createdAt: string;
  processedAt?: string;
}

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface Review {
  id: string;
  contractId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  workQuality: number;
  communication: number;
  professionalism: number;
  wouldRecommend: boolean;
  createdAt: string;
}

export interface SearchFilters {
  query?: string;
  categories?: JobCategory[];
  experienceLevels?: string[];
  budgetRange?: {
    min: number;
    max: number;
  };
  location?: string;
  skills?: string[];
  rating?: number;
  availability?: 'now' | 'this_week' | 'this_month' | 'any';
  languages?: string[];
  sortBy?: 'relevance' | 'rating' | 'price_low' | 'price_high' | 'availability' | 'newest';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Navigation and UI Types
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  roles: ('agent' | 'human')[];
  badge?: string | number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'job_proposal' | 'message' | 'payment' | 'job_update' | 'review' | 'system';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

// Form Types
export interface CreateJobForm {
  title: string;
  description: string;
  category: JobCategory;
  subcategory: string;
  skillsRequired: string[];
  experienceLevel: string;
  budget: {
    min: number;
    max: number;
    type: 'fixed' | 'hourly' | 'milestone';
  };
  duration: number;
  deadline: string;
  locationType: string;
  urgent: boolean;
  confidential: boolean;
  attachments: File[];
}

export interface CreateProfileForm {
  displayName: string;
  bio: string;
  hourlyRate: number;
  location: {
    city: string;
    country: string;
    timezone: string;
  };
  skills: {
    name: string;
    level: string;
    yearsOfExperience?: number;
  }[];
  languages: string[];
  portfolio: {
    title: string;
    description: string;
    url?: string;
    category: string;
    tags: string[];
  }[];
}