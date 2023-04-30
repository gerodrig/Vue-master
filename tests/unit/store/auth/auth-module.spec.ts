import { describe, expect, it } from 'vitest';

import createVuexStore from 'tests/unit/mocks/store/mock-store';
import { AuthState } from '@/interfaces/journal/index';
import { authApi } from '@/api';

describe('Vuex: tests in Auth Module', () => {


  it('should test auth initial state', () => {
    const store = createVuexStore({
      status: 'authenticating', // 'authenticated', 'not-authenticated', authenticating
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const { status, user, idToken, refreshToken } = store.state.auth as AuthState;

    expect(status).toBe('authenticating');
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken ).toBeNull();
  });

    //Mutations
    it('should test mutation:loginUser', () => {
        const store = createVuexStore({
            status: 'authenticating', // 'authenticated', 'not-authenticated', authenticating
            user: null,
            idToken: null,
            refreshToken: null,
          });

          const payload = {
            user: {name: 'Benito', email: 'Benito@gmail.com'},
            idToken: '123456789',
            refreshToken: '987654321',
          };

        store.commit('auth/loginUser', payload);

        const { status, user, idToken, refreshToken } = store.state.auth as AuthState;

        expect(status).toBe('authenticated');
        expect(user).toMatchObject(payload.user);
        expect(idToken).toBe(payload.idToken);
        expect(refreshToken ).toBe(payload.refreshToken);
    });

    it('should test mutation:logoutUser', () => {
        const store = createVuexStore({
            status: 'authenticated', // 'authenticated', 'not-authenticated', authenticating
            user: {username: 'Benito', email: 'benito@test.com'},
            idToken: '123456789',
            refreshToken: '987654321',
          });

          localStorage.setItem('idToken', '123456789');
          localStorage.setItem('refreshToken', '987654321');

        store.commit('auth/logoutUser');

        const { status, user, idToken, refreshToken } = store.state.auth as AuthState;

        expect(status).toBe('not-authenticated');
        expect(user).toBeNull();
        expect(idToken).toBeNull();
        expect(refreshToken ).toBeNull();

        //check localstorage
        expect(localStorage.getItem('idToken')).toBeNull();
        expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    //Getters
    it('should test getter:isAuthenticated', () => {
        const store = createVuexStore({
            status: 'authenticated', // 'authenticated', 'not-authenticated', authenticating
            user: {username: 'Benito', email: 'benito@test.com'},
            idToken: '123456789',
            refreshToken: '987654321',
          });

        expect(store.getters['auth/currentAuthState']).toBe('authenticated');
        expect(store.getters['auth/currentUsername']).toBe('Benito');
    });

    //Actions
    it('should test action:createUser', async () => {
        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', authenticating
            user: null,
            idToken: null,
            refreshToken: null,
          });

            const newUser = {
                username: 'UTest',
                email: 'test@test.com',
                password: '123456',
            };

            const {ok, message} = await store.dispatch('auth/createUser', newUser);


            expect(ok).toBeFalsy();
            expect(message).toBe('EMAIL_EXISTS');

            //check that state has not been modified
            const { status, user, idToken, refreshToken } = store.state.auth as AuthState;

            expect(status).toBe('not-authenticated');
            expect(user).toBeNull();
            expect(idToken).toBeNull();
            expect(refreshToken ).toBeNull();
    });

    it('should test action:createUser then delete user', async () => {
        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', authenticating
            user: null,
            idToken: null,
            refreshToken: null,
          });

          const newUser = {
            username: 'Test User 2',
            email: 'test2@test.com',
            password: '123456',
        };

        //Signin to get response with idToken to delete user
        await store.dispatch('auth/signInUser', newUser);
        const { idToken } = store.state.auth as AuthState;

        //delete user
        const {data} = await authApi.post(':delete', {idToken});

        //tobe string
        expect(data.kind).toBeTruthy();

        //create user
        const {ok, message} = await store.dispatch('auth/createUser', newUser);

        expect(ok).toBeTruthy();
        expect(message).toBe('User created successfully');

        const { status, user, idToken: idToken2, refreshToken } = store.state.auth as AuthState;

        expect(status).toBe('authenticated');
        expect(user?.username).toMatchObject(newUser.username);
        expect(user?.email).toMatchObject(newUser.email);
        expect(idToken2).toBeTypeOf('string');
        expect(idToken2).not.toBe(idToken);
        expect(refreshToken ).toBeTypeOf('string');
    });

    it('should test action:checkAuthentication POSITIVE', async () => {
        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', authenticating
            user: null,
            idToken: null,
            refreshToken: null,
          });

          const user = {
            username: 'UTest',
            email: 'test@test.com',
            password: '123456',
          };

          //SignIn to generate an idToken
            await store.dispatch('auth/signInUser', user);

            const { idToken = '' } = store.state.auth as AuthState;

            //log out to clear state
            store.commit('auth/logoutUser');

            //save idToken in localStorage
            localStorage.setItem('idToken', idToken as string);

            //checkAuthentication
            const checkResponse = await store.dispatch('auth/checkAuthentication');

            const { status, user: user2, idToken: idToken2, refreshToken } = store.state.auth as AuthState;

            expect(checkResponse.ok).toBeTruthy();

            expect(status).toBe('authenticated');
            expect(user2?.username).toMatchObject(user.username);
            expect(user2?.email).toMatchObject(user.email);
            expect(idToken2).toBeTypeOf('string');
            expect(idToken2).toBe(idToken);
            
    });

    it('should test action:checkAuthentication NEGATIVE', async () => {
        const store = createVuexStore({
            status: 'authenticating', // 'authenticated', 'not-authenticated', authenticating
            user: null,
            idToken: null,
            refreshToken: null,
          });

          const user = {
            username: 'UTest',
            email: 'test@test.com',
          }

          //clear localStorage
        localStorage.removeItem('idToken');

        const checkResponse1 = await store.dispatch('auth/checkAuthentication');

        const { status, user: user2, idToken, refreshToken } = store.state.auth as AuthState;

        expect(checkResponse1.ok).toBeFalsy();
        expect(checkResponse1.message).toBe('No token found');
        expect(status).toBe('not-authenticated');
        expect(user2).toBeNull();
        expect(idToken).toBeNull();
        expect(refreshToken).toBeNull();

        //check with an invalid token
        localStorage.setItem('idToken', '123456789');

        const checkResponse2 = await store.dispatch('auth/checkAuthentication');

        expect(checkResponse2.ok).toBeFalsy();
        expect(checkResponse2.message).toBe('INVALID_ID_TOKEN');
        expect(store.state.auth?.status).toBe('not-authenticated');
    });

});

