import {describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import journal from '../../mocks/journal/test-journal-state';
import Entry from '@/components/journal/Entry.vue';


describe('Tests in Entry component', () => {

    //mockRouter
    const mockRouter = {
        push: vi.fn()
    };

    const wrapper = shallowMount(Entry, {
        props: {
            entry: journal.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    });

  it('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
  });

    it('should show the redirect when the user clicks on the entry', async () => {
        const div = wrapper.find('.cursor-pointer');

        await div.trigger('click');

        expect(mockRouter.push).toHaveBeenCalled();

        //should be redirected to {name: 'entry', params: {id: entry.id}}
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id: journal.entries[0].id}});
    });

    it('should test the computed data day, month, year, dayOfWeek', () => {

        const entry = journal.entries[0];

        expect(wrapper.vm.day).toBe(new Date(entry.date).getDate());
        //month as April
        expect(wrapper.vm.month).toBe(new Date(entry.date).toLocaleString('en-US', {month: 'long'}));
        //year as 2023
        expect(wrapper.vm.year).toBe(new Date(entry.date).getFullYear());
        //dayOfWeek as Monday
        expect(wrapper.vm.dayOfWeek).toBe(new Date(entry.date).toLocaleString('en-US', {weekday: 'long'}));
    })
});