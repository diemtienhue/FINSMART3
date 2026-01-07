
import { supabase } from './supabase';
import { Project, ProjectType } from '../types';

// Helper to convert snake_case DB to camelCase JS
const mapToProject = (data: any): Project => ({
    id: data.id,
    name: data.name,
    type: data.type as ProjectType,
    logo: data.logo,
    coverImage: data.cover_image,
    limit: data.limit,
    interestRate: data.interest_rate,
    interestFreePeriod: data.interest_free_period,
    description: data.description,
    advantages: data.advantages || [],
    promo: data.promo,
    affiliateLink: data.affiliate_link,
    referralCode: data.referral_code,
    tutorialVideoUrl: data.tutorial_video_url,
    tutorialFileUrl: data.tutorial_file_url,
    eligibility: data.eligibility || [],
    bankPhone: data.bank_phone,
    bankWebsite: data.bank_website,
    bankIntro: data.bank_intro,
    paymentChannels: data.payment_channels || [],
    steps: data.steps || [],
    status: data.status,
    order: data.order,
    rating: data.rating,
    userCount: data.user_count
});

// Helper to convert camelCase JS to snake_case DB
const mapToDb = (project: Project) => ({
    id: project.id.length === 36 ? project.id : undefined, // Let DB generate ID if not valid UUID
    name: project.name,
    type: project.type,
    logo: project.logo,
    cover_image: project.coverImage,
    "limit": project.limit,
    interest_rate: project.interestRate,
    interest_free_period: project.interestFreePeriod,
    description: project.description,
    advantages: project.advantages,
    promo: project.promo,
    affiliate_link: project.affiliateLink,
    referral_code: project.referralCode,
    tutorial_video_url: project.tutorialVideoUrl,
    tutorial_file_url: project.tutorialFileUrl,
    eligibility: project.eligibility,
    bank_phone: project.bankPhone,
    bank_website: project.bankWebsite,
    bank_intro: project.bankIntro,
    payment_channels: project.paymentChannels,
    steps: project.steps,
    status: project.status,
    "order": project.order,
    rating: project.rating,
    user_count: project.userCount
});

export const projectService = {
    async getAll() {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('order', { ascending: true });

        if (error) throw error;
        return (data || []).map(mapToProject);
    },

    async upsert(project: Project) {
        const dbData = mapToDb(project);
        // If ID is not UUID, delete it so Supabase generates a new one (for new items)
        // However, our input might have temp IDs like "p-123". 
        // If it's a new item (temp ID), we should remove ID or handle it.
        // Ideally, for update, we need a valid UUID. 

        // Check if ID is a valid UUID
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(project.id);

        if (!isUUID) {
            delete dbData.id;
        }

        const { data, error } = await supabase
            .from('projects')
            .upsert(dbData)
            .select()
            .single();

        if (error) throw error;
        return mapToProject(data);
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    async uploadImage(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('public_assets')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('public_assets')
            .getPublicUrl(filePath);

        return data.publicUrl;
    }
};
