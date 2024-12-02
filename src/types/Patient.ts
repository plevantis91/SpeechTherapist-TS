export interface Patient {
    profile_id: number;
    appointments: any[];
    first_name: string;
    last_name: string;
    gender?: string;
    date_of_birth?: string;
    profile_image?: string;
    email?: string;
    phone?: string;
    [key: string]: any;
}
