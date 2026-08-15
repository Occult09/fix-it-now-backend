export interface ICreateTechnicianProfile {
    bio?: string;
    experience: number;
    isAvailable?: boolean;
    hourlyRate: number;
}

export interface IUpdateTechnicianProfile {
    bio?: string;
    experience?: number;
    hourlyRate?: number;
}