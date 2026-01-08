
import { supabase } from './supabase';
import { Project, ProjectType, AppConfig } from '../types';

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
            // Exclude the system settings record
            .neq('id', '99999999-9999-9999-9999-999999999999')
            .order('order', { ascending: true });

        if (error) throw error;
        return (data || []).map(mapToProject);
    },

    async getSettings(): Promise<AppConfig> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', '99999999-9999-9999-9999-999999999999')
            .single();

        if (error || !data) {
            // Return default settings if not found
            return {
                heroTitle: 'Tài Chính Thông Minh',
                heroSubtitle: 'Giải pháp so sánh và lựa chọn sản phẩm tài chính tối ưu nhất dành cho bạn.',
                heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
                zaloSupport: '0987654321', // Default dummy
                adminPassword: '123456' // Default Password
            };
        }

        // Parse custom JSON stored in description or map fields
        // Since we are hacking the project table, let's store the config JSON in 'description' or reuse fields.
        // Let's reuse fields for simplicity mapping:
        // name -> heroTitle
        // description -> heroSubtitle
        // cover_image -> heroImage
        // bank_phone -> zaloSupport (abuse this field)

        return {
            heroTitle: data.name,
            heroSubtitle: data.description,
            heroImage: data.cover_image,
            zaloSupport: data.bank_phone || '0987654321',
            adminPassword: data.referral_code || '123456'
        };
    },

    async saveSettings(config: AppConfig) {
        const dbData = {
            id: '99999999-9999-9999-9999-999999999999',
            name: config.heroTitle,
            description: config.heroSubtitle,
            cover_image: config.heroImage,
            bank_phone: config.zaloSupport,
            referral_code: config.adminPassword, // Map Password to referral_code
            type: ProjectType.SYSTEM,
            logo: '',
            limit: '',
            interest_rate: '',
            advantages: [],
            promo: '',
            affiliate_link: '',
            eligibility: [],
            steps: [],
            status: 'Published',
            order: 9999
        };

        const { error } = await supabase
            .from('projects')
            .upsert(dbData);

        if (error) throw error;
    },

    async upsert(project: Project) {
        const dbData = mapToDb(project);

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
