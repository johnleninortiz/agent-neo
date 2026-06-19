import type { User, HumanProfile, AgentProfile, Job, Proposal, JobMatch, Message, Conversation, Payment, Review, Notification, JobSearchFilters, HumanSearchFilters, PaginatedResponse } from '../types/rent-a-human';
declare class RentAHumanAPI {
    private getAuthHeaders;
    private handleResponse;
    login(email: string, password: string): Promise<{
        user: User;
        token: string;
    }>;
    register(userData: {
        email: string;
        password: string;
        name: string;
        userType: 'agent' | 'human';
    }): Promise<{
        user: User;
        token: string;
    }>;
    verifyEmail(token: string): Promise<{
        success: boolean;
    }>;
    getUserProfile(userId: string): Promise<User>;
    updateUserProfile(userId: string, data: Partial<User>): Promise<User>;
    getHumanProfile(humanId: string): Promise<HumanProfile>;
    updateHumanProfile(humanId: string, data: Partial<HumanProfile>): Promise<HumanProfile>;
    getAgentProfile(agentId: string): Promise<AgentProfile>;
    updateAgentProfile(agentId: string, data: Partial<AgentProfile>): Promise<AgentProfile>;
    createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'proposalsCount' | 'viewsCount'>): Promise<Job>;
    getJob(jobId: string): Promise<Job>;
    updateJob(jobId: string, data: Partial<Job>): Promise<Job>;
    deleteJob(jobId: string): Promise<{
        success: boolean;
    }>;
    searchJobs(filters: JobSearchFilters, page?: number, limit?: number): Promise<PaginatedResponse<Job>>;
    getJobsByAgent(agentId: string, page?: number, limit?: number): Promise<PaginatedResponse<Job>>;
    getRecommendedJobs(humanId: string, page?: number, limit?: number): Promise<PaginatedResponse<Job>>;
    searchHumans(filters: HumanSearchFilters, page?: number, limit?: number): Promise<PaginatedResponse<HumanProfile>>;
    getJobMatches(jobId: string): Promise<JobMatch[]>;
    getRecommendedHumans(jobId: string, limit?: number): Promise<JobMatch[]>;
    createProposal(proposalData: {
        jobId: string;
        message: string;
        proposedRate: number;
        estimatedDuration?: number;
        portfolioLinks?: string[];
    }): Promise<Proposal>;
    getProposals(jobId: string): Promise<Proposal[]>;
    getProposalsByHuman(humanId: string, page?: number, limit?: number): Promise<PaginatedResponse<Proposal>>;
    updateProposalStatus(proposalId: string, status: 'accepted' | 'rejected'): Promise<Proposal>;
    getConversations(userId: string): Promise<Conversation[]>;
    getConversation(conversationId: string): Promise<Conversation>;
    createConversation(conversationData: {
        jobId?: string;
        agentId: string;
        humanId: string;
    }): Promise<Conversation>;
    getMessages(conversationId: string): Promise<Message[]>;
    sendMessage(conversationId: string, content: string, attachments?: File[]): Promise<Message>;
    createPayment(paymentData: {
        jobId: string;
        humanId: string;
        amount: number;
        currency: string;
        type: 'escrow';
    }): Promise<Payment>;
    releasePayment(paymentId: string): Promise<Payment>;
    getPayments(userId: string, type?: 'agent' | 'human'): Promise<Payment[]>;
    createReview(reviewData: {
        jobId: string;
        revieweeId: string;
        rating: number;
        comment: string;
    }): Promise<Review>;
    getReviews(userId: string, type?: 'agent' | 'human'): Promise<Review[]>;
    getNotifications(userId: string, page?: number, limit?: number): Promise<PaginatedResponse<Notification>>;
    markNotificationAsRead(notificationId: string): Promise<{
        success: boolean;
    }>;
    markAllNotificationsAsRead(userId: string): Promise<{
        success: boolean;
    }>;
    uploadFile(file: File, type: 'avatar' | 'portfolio' | 'attachment'): Promise<{
        url: string;
    }>;
}
export declare const rentAHumanAPI: RentAHumanAPI;
export {};
