export class OrdersClass{
    id?: string | null = null;
    table: number = 0;
    //waiter: number = 0;
    products: number = 0;
    status: string = '';
    quantity: number = 0;
    total: number = 0;
    created_at?: Date | null = new Date();
    updated_at?: Date | null = new Date();
}