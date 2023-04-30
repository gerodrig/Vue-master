import { AuthStatus, AuthState} from '@/interfaces/journal';


export const currentAuthState = (state: AuthState): AuthStatus => {
    return state.status;
};

export const currentUsername = (state: AuthState): string => {

    return state.user?.username ?? '';
} 