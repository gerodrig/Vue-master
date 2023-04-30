import { describe, expect, it, vi, beforeEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';
import { useRouter } from 'vue-router';

import journalStore from '@/store/journal';
import authStore from '@/store/auth';
import journal from 'tests/unit/mocks/journal/test-journal-state';
import auth from 'tests/unit/mocks/auth/test-auth-state';

import Home from '@/projects/journal/index.vue';

import { Rootstate } from '@/interfaces/journal/index';

//Mocking router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
      push: vi.fn()
  }))
}));

//Mocking store
const createVuexStore = (initialState: Rootstate) =>
  createStore({
    modules: {
      journal: {
        ...journalStore,
        state: { ...initialState },
      },
      auth: {
        ...authStore,
        state: { ...initialState },
      },
    },
  });

describe('Tests in Main page', () => {
  const store = createVuexStore({
    journal,
    auth,
  });

  let wrapper: VueWrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = shallowMount(Home, {
      global: {
        stubs: ['router-link', 'router-view'],
        plugins: [store],
      },
    });    
  });

  it('must match with snapshot', () => {   

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should test that routerview content is rendered', async () => {

    const routerView = wrapper.find('router-view-stub');

    expect(routerView.exists()).toBeTruthy();
  });
});
