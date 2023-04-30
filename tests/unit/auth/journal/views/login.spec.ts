import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';

import Login from '@/auth/journal/views/Login.vue';
import createVuexStore from 'tests/unit/mocks/store/mock-store';
import { Dispatch } from 'vuex';
import { useRouter } from 'vue-router';


//store
const store = createVuexStore({
    status: 'not-authenticated',
    user: null,
    idToken: null,
    refreshToken: null,
});

//router
vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
        push: vi.fn(),
    })),
}));


describe('Testing in Login Component', () => {

    store.dispatch = vi.fn() as unknown as Dispatch;

    (useRouter as Mock).mockReturnValue({
        push: vi.fn(),
      })

    let wrapper: VueWrapper;
    beforeEach(() => {
        (useRouter().push as Mock).mockReset();
        vi.clearAllMocks();
        wrapper = shallowMount(Login, {
            global: {
                //include router-link
                stubs: ['router-link'],
                plugins: [store],
            }
        });
    });

  it('should match the snapshot', () => {
        const wrapper = shallowMount(Login, {
            global: {
                //include router-link
                stubs: ['router-link'],
                plugins: [store],
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
  });

  it('should trigger SWAL if wrong credentials are submitted', async () => {

    (store.dispatch as Mock).mockReturnValueOnce({ ok: false, message: 'Wrong credentials' });

    //empty form
    const user = {
        email: '',
        password: '',
    } 

    await wrapper.find('form').trigger('submit');

    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', user);

    //check that error message is displayed

    // find p with class '.text-red-600'
    const errorText = wrapper.find('.text-red-600').text();
    expect(errorText).toBe('Error logging in');
  });

  it('should redirect to no-entry if user is authenticated', async () => {

    (store.dispatch as Mock).mockReturnValueOnce({ ok: true});

    const [txtEmail, txtPassword] = wrapper.findAll('input');

    await txtEmail.setValue('test@test.com');
    await txtPassword.setValue('123456');

    await wrapper.find('form').trigger('submit');

    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {email: 'test@test.com', password: '123456'});

    expect(useRouter().push).toHaveBeenCalledWith({name: 'no-entry'});

  });
});