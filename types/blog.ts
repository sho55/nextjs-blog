export type BlogCreate = {
    slug: string;
    title: string;
    content: string;
    category: string;
    tags?: string[];
    isPublished: boolean;
}