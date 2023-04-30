import { describe, expect, it, vi, Mock, beforeEach} from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { useRouter } from 'vue-router';

import Navbar from '@/components/journal/Navbar.vue';
import createVuexStore from 'tests/unit/mocks/store/mock-store';

// const mockStore = {
//     getters: {
//         'auth/currentAuthState': 'authenticated',
//         'auth/currentUsername': 'test',
//     }
// }

// vi.mock('vuex', () => ({
//     useStore: () => mockStore
// }));
const store = createVuexStore({
  status: 'authenticated',
  user: {
    username: 'Benito',
    email: 'benito@test.com',
  },
  idToken: '1234567890',
  refreshToken: '0987654321',
});


vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('Testing Navbar component functionality for journal', () => {

    (useRouter as Mock).mockReturnValue({
        push: vi.fn(),
      })

    beforeEach(() => {
        (useRouter().push as Mock).mockReset();
        vi.clearAllMocks();
    });

  it('should renders the Navbar component successfully', () => {
    const wrapper = shallowMount(Navbar, {
        global: {
            plugins: [store],
        }
    });

    const span = wrapper.find('div').find('span');

    expect(wrapper.html()).toMatchSnapshot();
    expect(span.text()).toBe('Benito');
  });

  it('should test that logout button works', async () => {
    const wrapper = shallowMount(Navbar, {
        global: {
            plugins: [store],
        }
    });

    await wrapper.find('div').trigger('click');

    expect( store.state.auth ).toEqual({
        status: 'not-authenticated',
        user: null,
        idToken: null,
        refreshToken: null,
    });

    expect(useRouter().push).toHaveBeenCalledWith({ name: 'login' });

  });
});
