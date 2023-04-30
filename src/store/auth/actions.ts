import { ActionContext } from "vuex";

import authApi from "@api/auth/authApi";
import { AuthState, Rootstate, User } from "../../interfaces/journal";

type AuthContext = ActionContext<AuthState, Rootstate>;

interface Message {
    ok: boolean;
    message: string;
}

export const createUser = async ({commit}: AuthContext, payload: User): Promise<Message> => {
    const { username, email, password } = payload;

    try {
        const {data} = await authApi.post(':signUp', {email, password, returnSecureToken: true});

        const { idToken, refreshToken } = data;
        
        //update username
        await authApi.post(':update', {idToken, displayName: username});

        const user = {username, email };

        //update user in store as logged in
        commit('loginUser', {user, idToken, refreshToken});

        return {ok: true, message: 'User created successfully'}
        
    } catch (error: any) {
        console.clear();
        return {ok: false, message: <string>error.response.data.error.message || 'Unexpected error'}
    }
};

export const signInUser = async ({commit}: AuthContext, payload: User): Promise<Message> => {

    const { email, password } = payload;

    try {
        const {data} = await authApi.post(':signInWithPassword', {email, password, returnSecureToken: true});

        const { idToken, refreshToken, displayName: username } = data;

        const user = {username, email };

        // commit in state the user logged in
        commit('loginUser', {idToken, refreshToken, user})

        return {ok: true, message: 'User logged in successfully'}
    } catch (error: any) {
        console.clear();
        return {ok: false, message: <string>error.response.data.error.message || 'Unexpected error'}
    }
};

export const checkAuthentication = async ({commit}: AuthContext): Promise<Message> => {

    const idToken = localStorage.getItem('idToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if(!idToken){
        commit('logoutUser');
        return {ok: false, message: 'No token found'}
    }

    try {
        const { data } = await authApi.post(':lookup', {idToken});

        const { displayName: username, email } = data.users[0];

        const user = {username, email };

        commit('loginUser', { idToken, refreshToken, user});

        return {ok: true, message: 'User authenticated successfully'}
        
    } catch (error: any) {
        commit('logoutUser');
        return {ok: false, message: <string>error.response.data.error.message || 'Unexpected error'}
    }
};
