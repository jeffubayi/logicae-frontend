export type JokesState = {
  id: number;
  Title: string;
  Author: string;
  Body: string;
  Views: number;
  CreatedAt: Date | number;
};

export type JokesValues = {
  id?: number | string | undefined;
  Title: string | string[] | undefined;
  Author: string | string[] | undefined;
  Body?: string | string[] | undefined;
  Views: string | string[] | undefined;
  CreatedAt?: Date | string | string[];
};

export interface UserProfileState {
  userId?: string;
  userEmail?: string;
  accessToken?: string;
}

export interface RootState {
  userProfile: UserProfileState;
}
