export class MesasClass {
    id?: string | null = null;
    number: number = 0;
    capacity: number = 0;
    active: boolean = false;
    created_at?: Date | null = new Date();
    updated_at?: Date | null = new Date();
}