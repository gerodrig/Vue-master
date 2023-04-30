import {beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';

import Swal from 'sweetalert2';

import journal from '../../mocks/journal/test-journal-state';
import EntryView from '@/views/journal/EntryView.vue';
import { useRouter } from 'vue-router';

vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
        push: vi.fn()
    }))
}));

// vi.mock('vue-router')

//create sweeat alert mock
vi.mock('sweetalert2');

describe('EntryView components test', () => {
    let wrapper: VueWrapper<any>; 
    const mockedSwal = Swal as any;
// configure the store with the journal module
    const journalMockModule = {
        namespaced: true,
        getters: {
            getEntriesById: vi.fn(() => () => journal.entries[0])
        },
        state: () => ({
            isLoading: false,
            entries: journal.entries
        })
    };

    const store = createStore({
        modules: {
            journal: {...journalMockModule}
        }
    });

    //control the store dispatch and mutations
    store.dispatch = vi.fn() as any;

    beforeEach(async () => {
        vi.clearAllMocks();
    
        wrapper = shallowMount(EntryView, {
            props: {
                id: journal.entries[0].id
            },
            global: {

            plugins: [store],
            },
        });
    });

  it('should redirect the user because id does not exists.', () => {

        const push = vi.fn();
        const mockedRouter = vi.mocked(useRouter as any).mockReturnValue({
            push
        });

        const wrapper = shallowMount(EntryView, {
        props: {
            id: 'Id that does not exists'
        },
        global: {
        stubs: ['router-link', 'router-view'],
        plugins: [store],
        },
        });

        expect(wrapper.vm.$props.id).toBeTruthy();
        expect(mockedRouter).toHaveBeenCalled();
    });

    it('should match the entry correctly snapshot', () => {
        const push = vi.fn();
        const mockedRouter = vi.mocked(useRouter as any).mockReturnValue({
            push
        });

        expect(wrapper.vm.$props.id).toBe(journal.entries[0].id)
        expect(wrapper.html()).toMatchSnapshot();
        expect(push).not.toHaveBeenCalled();
    }
    );

    it('should not delete entry if swal option is cancelled', async () => {
        
        mockedSwal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: false}));
        const deleteBtn = wrapper.find('.bg-red-500');
        await deleteBtn.trigger('click');

        expect(mockedSwal.fire).toHaveBeenCalled();
        expect(mockedSwal.fire).toHaveBeenCalledWith(
            {
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4CAF50',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              })
    
    });

    it('should delete entry if swal option is confirmed', async () => {

            const push = vi.fn();
            const mockedRouter = vi.mocked(useRouter as any).mockReturnValue({
                push
            });
            
            mockedSwal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}));

            const deleteBtn = wrapper.find('.bg-red-500');
            await deleteBtn.trigger('click');
            // console.log(mockedSwal.fire.mock.calls);
    
            expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', journal.entries[0]);
            expect(mockedRouter).toHaveBeenCalled();
    });

});