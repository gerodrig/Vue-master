import {describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import Fab from '../../../../src/components/journal/Fab.vue';


describe('Tests in FAB (Floating Action Button) component', () => {

  it('should show the default icon +', () => {
    
    const wrapper = shallowMount(Fab);

    //fa-plus
    const iTag = wrapper.find('i');
    expect(iTag.classes('fa-plus')).toBeTruthy();
  });

    it('should show the icon by argument if passed eg. fa-circle', () => {

        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        });

        const iTag = wrapper.find('i');

        //fa-circle
        expect(iTag.classes('fa-circle')).toBeTruthy();

    });

    it('should emit an event on:click', async () => {

        const wrapper = shallowMount(Fab);

        await wrapper.find('button').trigger('click');
        //wrapper.emitted('on:click)
        expect(wrapper.emitted('on:click')).toHaveLength(1);

        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('on:click')).toHaveLength(2);

    });
});