export class CategoryClass {
    id?: string | null = null;
    name: string = '';
    description: string = '';
    image: File | null = null;
    imageUrl?: string | null = null;
    created_at?: Date = new Date();
    updated_at?: Date = new Date();
}