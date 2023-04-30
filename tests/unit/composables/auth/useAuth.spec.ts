import {describe, it, vi, beforeEach, expect } from 'vitest';
import useAuth from "@/composables/auth/useAuth";



//setup mockStore
const mockStore = {
    dispatch: vi.fn(),
    commit: vi.fn(),
    getters: {
        'auth/currentAuthState': 'authenticated',
        'auth/currentUsername': 'test',
    }
};

vi.mock('vuex', () => ({
    useStore: () => mockStore
}));


describe('Testing useAuth composable functionality', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

  it('succesfully creates a user', async () => {
    const { createUser } = useAuth();

    const newUser = { name: 'Test', email: 'test@test.com'};
    mockStore.dispatch.mockReturnValueOnce({ok: true});

    const response = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser);
    expect(response).toEqual({ok: true});
  });

  it('fails to create a user because email is already in use', async () => {
    const { createUser } = useAuth();

    const newUser = { name: 'Test', email: 'test@test.com'};
    mockStore.dispatch.mockReturnValueOnce({ok: false, message: 'EMAIL_EXISTS'});

    const response = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser);
    expect(response ).toEqual({ok: false, message: 'EMAIL_EXISTS'});
  });

  it('tests that loginUser is successful', async () => {
    const { loginUser } = useAuth();

    const newUser = { email: 'test@test.com', password: '123456'};
    mockStore.dispatch.mockReturnValueOnce({ok: true});

    const response = await loginUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', newUser);
    expect(response).toEqual({ok: true});
  });

  it('tests that loginUser fails', async () => {
    const { loginUser } = useAuth();

    const newUser = { email: 'test@test.com', password: '123456'};
    mockStore.dispatch.mockReturnValueOnce({ok: false});

    const response = await loginUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', newUser);
    expect(response.ok).toBeFalsy();
  });

    it('tests that checkAuthentication is successful', async () => {
        const { checkAuthStatus } = useAuth();

        mockStore.dispatch.mockReturnValueOnce({ok: true});

        const response = await checkAuthStatus();

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/checkAuthentication');
        expect(response.ok).toBeTruthy();
    });

    it('tests that logout is successful', () => {
        const { logout } = useAuth();

        logout();

        expect(mockStore.commit).toHaveBeenCalledWith('auth/logoutUser');
        expect(mockStore.commit).toHaveBeenCalledWith('journal/clearEntries');
    });

    it('tests computed getters. Authstate should return username and authStatus', () => {
        const { authStatus, username } = useAuth();

        expect(authStatus.value).toBe('authenticated');
        expect(username.value).toBe('test');
    });

});