export type JokesState = {
  id: number;
  Category: string;
  Body: string;
  likes: number;
  created_at: Date | number;
};

export type JokesValues = {
  id?: number | string | undefined;
  Category: string | string[] | undefined;
  Body?: string | string[] | undefined;
  likes: string | string[] | undefined;
  created_at?: Date | string | string[];
};

export interface UserProfileState {
  userId?: string;
  userEmail?: string;
  accessToken?: string;
}

export interface RootState {
  userProfile: UserProfileState;
}
