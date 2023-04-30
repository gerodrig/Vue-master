import { AuthState } from "@/interfaces/journal";


export default {
    status: 'not-authenticated',
    user: null,
    idToken: null,
    refreshToken: null,
} as AuthState;