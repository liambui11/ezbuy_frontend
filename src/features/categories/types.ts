export interface Category{
    id: number;
    name: string;
    slug: string;
    imageUrl?: string;
    is_active: boolean;
    parent_id?: number;
    created_at: string;
    updated_at: string;
}