import { CategoryClass } from "./CategoryClass";

export class ProductoClass {
    id?: string | null = null;
    title: string = '';
    description: string = '';
    price: number = 0;
    category: number | null = null;
    image: File | null = null;
    imageUrl?: string | null = null; // URL temporal para previsualización
    active: boolean = false;
    created_at?: Date | null = new Date();
    updated_at?: Date | null = new Date();
}