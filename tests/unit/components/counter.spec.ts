import { describe, it, expect, beforeEach } from 'vitest';

import { shallowMount } from "@vue/test-utils";


import Counter from '../../../src/components/Counter.vue'


describe('Counter Component', async () => {

    let wrapper: any;

    beforeEach(() => {
        wrapper = shallowMount(Counter);
    });
    
        it('must match the snapshot', () => {
    
            //arrange
            // const wrapper = shallowMount(Counter);

            //console.log(wrapper.html());

            //assert
            expect(wrapper.html()).toMatchSnapshot();
    
        });


        it('h1 must have the text "Counter"', () => {

            //arrange
            // const wrapper = shallowMount(Counter);

            //assert
            expect(wrapper.find('h1').text()).toBe('Counter');
        });

        it('default value in p must be 0 2 = 0"', () => {
                
                //arrange
                // const wrapper = shallowMount(Counter);

                const value = wrapper.find('[data-testid="counter"]').text();

    
                //assert
                expect(value).toBe('0 2 = 0');
        });

        it('must increment the counter in 1 when button is clicked', async () => {

            //arrange
            // const wrapper = shallowMount(Counter);

            const [decrement, increment] = wrapper.findAll('button');

            //act
            await increment.trigger('click');

            //click twice decrement
            await decrement.trigger('click');
            await decrement.trigger('click');

            const value = wrapper.find('[data-testid="counter"]').text();

            //assert
            expect(value).toBe('-1 2 = 1');
        });

        it('must define the default value of the counter', () => {

            //get count default value
            const defaultValue = wrapper.vm.count

            //assert
            expect(defaultValue).toBe(0);
        });
});