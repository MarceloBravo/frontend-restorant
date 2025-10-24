export class UserClass {
    id?: string | null = null;
    username: string = '';
    first_name: string = '';
    last_name: string = '';
    email: string = '';
    password?: string = '';
    is_staff: boolean = false;
    is_active: boolean = true;
    is_superuser: boolean = false;
    created_at: Date = new Date();
    updated_at: Date = new Date();

    
}