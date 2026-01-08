
import { supabase } from './supabase';
import { PartnerLogo } from '../types';

// Helper to convert snake_case DB to camelCase JS
const mapToPartnerLogo = (data: any): PartnerLogo => ({
    id: data.id,
    name: data.name,
    logoUrl: data.logo_url,
    displayOrder: data.display_order
});

// Helper to convert camelCase JS to snake_case DB
const mapToDb = (logo: Partial<PartnerLogo>) => ({
    id: logo.id,
    name: logo.name,
    logo_url: logo.logoUrl,
    display_order: logo.displayOrder
});

export const partnerService = {
    async getAll(): Promise<PartnerLogo[]> {
        const { data, error } = await supabase
            .from('partner_logos')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) throw error;
        return (data || []).map(mapToPartnerLogo);
    },

    async create(name: string, logoUrl: string, displayOrder: number): Promise<PartnerLogo> {
        const { data, error } = await supabase
            .from('partner_logos')
            .insert({
                name,
                logo_url: logoUrl,
                display_order: displayOrder
            })
            .select()
            .single();

        if (error) throw error;
        return mapToPartnerLogo(data);
    },

    async update(id: string, updates: Partial<PartnerLogo>): Promise<PartnerLogo> {
        const dbData = mapToDb(updates);
        delete dbData.id; // Don't update ID

        const { data, error } = await supabase
            .from('partner_logos')
            .update(dbData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return mapToPartnerLogo(data);
    },

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('partner_logos')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async uploadLogo(file: File): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `partner-${Date.now()}.${fileExt}`;
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
