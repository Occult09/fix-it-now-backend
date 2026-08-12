export interface ICreateTechnicianProfile {
    bio?: string;
    experience: number;
    isAvailble?: boolean;
    hourlyRate: number;
}

export interface IUpdateTechnicianProfile {
    bio?: string;
    experience?: number;
    isAvaialble?: boolean;
    hourlyRate?: number;
}