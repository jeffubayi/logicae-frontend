export type JokesState = {
    id: number;
    Title: string;
    Author: string;
    Body?:string;
    Views: number;
    CreatedAt: Date;
};

export interface UserProfileState {
    userId?:string;
    userEmail?: string;
    accessToken?: string;
}

export  interface RootState {
    userProfile:UserProfileState; 
}


