export interface User {
    id: string;
    email: string;
    name: string;
    userType: 'agent' | 'human';
    avatar?: string;
    createdAt: string;
    verified: boolean;
    rating?: number;
    completedJobs?: number;
}
export interface HumanProfile extends User {
    userType: 'human';
    bio?: string;
    hourlyRateMin?: number;
    hourlyRateMax?: number;
    timezone?: string;
    languages: string[];
    location?: {
        city: string;
        country: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    availability: {
        [key: string]: {
            available: boolean;
            startTime?: string;
            endTime?: string;
        };
    };
    skills: Skill[];
    portfolio?: PortfolioItem[];
    totalEarnings: number;
    successRate: number;
}
export interface AgentProfile extends User {
    userType: 'agent';
    organization?: string;
    apiQuotaMonthly: number;
    apiQuotaUsed: number;
    spendingLimitMonthly?: number;
    spendingCurrentMonth: number;
    billingTier: 'free' | 'professional' | 'enterprise';
}
export interface Skill {
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    verified: boolean;
    category: 'digital' | 'physical' | 'professional' | 'creative';
}
export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    fileUrl?: string;
    category: string;
    createdAt: string;
}
export interface Job {
    id: string;
    agentId: string;
    title: string;
    description: string;
    category: string;
    subcategory?: string;
    skillsRequired: string[];
    experienceLevel: 'entry' | 'mid' | 'senior' | 'expert';
    budgetMin: number;
    budgetMax: number;
    budgetType: 'fixed' | 'hourly' | 'milestone';
    durationEstimate?: number;
    deadline?: string;
    locationType: 'remote' | 'on-site' | 'hybrid';
    locationDetails?: any;
    status: 'draft' | 'active' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
    urgent: boolean;
    confidential: boolean;
    attachments?: string[];
    proposalsCount: number;
    viewsCount: number;
    createdAt: string;
    updatedAt: string;
}
export interface Proposal {
    id: string;
    jobId: string;
    humanId: string;
    message: string;
    proposedRate: number;
    estimatedDuration?: number;
    portfolioLinks?: string[];
    status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
    createdAt: string;
}
export interface JobMatch {
    job: Job;
    human: HumanProfile;
    matchScore: number;
    reasons: string[];
}
export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderType: 'agent' | 'human';
    content: string;
    attachments?: MessageAttachment[];
    timestamp: string;
    read: boolean;
}
export interface MessageAttachment {
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
}
export interface Conversation {
    id: string;
    jobId?: string;
    agentId: string;
    humanId: string;
    lastMessage?: Message;
    unreadCount: number;
    createdAt: string;
    updatedAt: string;
}
export interface Payment {
    id: string;
    jobId: string;
    agentId: string;
    humanId: string;
    amount: number;
    currency: string;
    type: 'escrow' | 'release' | 'refund';
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    stripePaymentIntentId?: string;
    createdAt: string;
    releasedAt?: string;
}
export interface Review {
    id: string;
    jobId: string;
    reviewerId: string;
    revieweeId: string;
    reviewerType: 'agent' | 'human';
    rating: number;
    comment: string;
    createdAt: string;
}
export interface Notification {
    id: string;
    userId: string;
    type: 'job_proposal' | 'message' | 'payment' | 'job_update' | 'review';
    title: string;
    content: string;
    read: boolean;
    actionUrl?: string;
    createdAt: string;
}
export interface JobSearchFilters {
    category?: string;
    subcategory?: string;
    skillsRequired?: string[];
    experienceLevel?: string;
    budgetMin?: number;
    budgetMax?: number;
    budgetType?: string;
    locationType?: string;
    urgent?: boolean;
    deadline?: string;
    sortBy?: 'relevance' | 'budget' | 'deadline' | 'created';
    sortOrder?: 'asc' | 'desc';
}
export interface HumanSearchFilters {
    skills?: string[];
    categories?: string[];
    minRate?: number;
    maxRate?: number;
    location?: string;
    availability?: string;
    rating?: number;
    experienceLevel?: string;
    sortBy?: 'rating' | 'rate' | 'availability' | 'recent';
    sortOrder?: 'asc' | 'desc';
}
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
