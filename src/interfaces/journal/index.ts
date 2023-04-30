export interface JournalState {
        isLoading: boolean;
        entries: Entry[];
}

export interface AuthState {
    status: AuthStatus;
    user: null | User;
    idToken: null | string;
    refreshToken: null | string;
}

export interface User {
    username?: string;
    email: string;
    password?: string;
}


//enum for the auth status
export type AuthStatus = 'authenticated' | 'not-authenticated' | 'authenticating';

export interface Rootstate {
    journal?: JournalState;
    auth?: AuthState;
}

export interface Entry {
    id: string;
    date: string | number;
    text: string;
    picture?: string | null;
}

export interface FormattedDate {
    day: number;
    month: string;
    year: number;
    dayOfWeek: string;
  }

export interface EntryFirebase {
    [ key: string ]: {
        date: string;
        text: string;
        picture: string | null;
    }
}