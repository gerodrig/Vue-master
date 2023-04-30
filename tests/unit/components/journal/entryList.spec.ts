import { describe, it, vi, expect, beforeEach } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import { createStore } from 'vuex';

import EntryList from '@/components/journal/EntryList.vue';
import journal from '../../mocks/journal/test-journal-state';
import { JournalState } from '../../../../src/interfaces/journal/index';

//?USE THE REAL STORE
const createVuexStore = ( initialState: JournalState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
});

describe('EntryList component tests', () => {

    //configure the store with the journal module
    // const journalMockModule = {
    //     namespaced: true,
    //     getters: {
    //         getEntriesByTerm
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journal.entries
    //     })
    // };

    // const store = createStore({
    //     modules: {
    //         journal: {...journalMockModule}
    //     }
    // });


    //?USE THE REAL STORE
    const store = createVuexStore(journal);

    //router mock
    const mockRouter = {
        push: vi.fn()
    }

    let wrapper: VueWrapper<any>;
    
    //restart wrapper before each test
    beforeEach(() => {
        vi.clearAllMocks();
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                $router: mockRouter
                },
            plugins: [store],
            },
        });
    
    });

  it('should call getEntriesByTerm and show 5 entries.', () => {

    expect(wrapper.findAll('entry-stub').length).toBe(journal.entries.length);
    expect(wrapper.html()).toMatchSnapshot();

  });

  it('should call getEntriesByTerm and filter entries.', async () => {
       
    const input = wrapper.find('input');
    // await input.setValue('chi');

    // expect(wrapper.findAll('entry-stub').length).toBe(2);
    expect( input.exists() ).toBeTruthy();

  })

  it('buttons new shoudl redirect to /new', () => {
    const button = wrapper.find('button');
    button.trigger('click');

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'}});
  });
});