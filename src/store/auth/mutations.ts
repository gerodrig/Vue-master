import { AuthState, User } from "../../interfaces/journal";

interface FirebaseResponse {
    idToken: string;
    refreshToken: string;
    user: User;
}

export const loginUser = (state: AuthState, {idToken, refreshToken, user}: FirebaseResponse): void => {
    if(idToken){
        localStorage.setItem('idToken', idToken);
        state.idToken = idToken;
    }

    if(refreshToken){
        localStorage.setItem('refreshToken', refreshToken);
        state.refreshToken = refreshToken;
    }

    state.user = user;
    state.status = 'authenticated';
}


export const logoutUser = (state: AuthState): void => {
    //reset state
    state.user = null;
    state.idToken = null;
    state.refreshToken = null;
    state.status = 'not-authenticated';

    // clear localstorage
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');

};