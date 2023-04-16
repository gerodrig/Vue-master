import { vi, beforeEach, describe, expect, it, Mock } from "vitest";
import { shallowMount } from "@vue/test-utils";

import Indecision from "../../../../src/projects/indecision/index.vue";


describe('Indecision App in Vue 3', () => {
    
    let wrapper: any;
    let clgSpy: any;

    global.fetch = vi.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'Yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/1.gif'
        }),
    }) ) as any;

    beforeEach(() => {
        wrapper = shallowMount(Indecision);

        clgSpy = vi.spyOn(console, 'log');

        //clear all mocks
        vi.clearAllMocks();
    });

    it('Must match snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('typing in input must not trigger fetch', async () => {

        const getAnswerSpy = vi.spyOn(wrapper.vm, 'getAnswer');

        const input = wrapper.find('input');
        await input.setValue('test');
        
        expect( clgSpy ).toHaveBeenCalledTimes(1);
        expect( getAnswerSpy ).not.toHaveBeenCalled();
        
    });

    it('Must fetch data from API when "?" is entered', async () => {
            
            const getAnswerSpy = vi.spyOn(wrapper.vm, 'getAnswer');
    
            const input = wrapper.find('input');
            await input.setValue('I am rich?');
            
            expect( getAnswerSpy ).toHaveBeenCalled();
            
    });

    it('tests on getAnswer', async () => {
        await wrapper.vm.getAnswer();

        const img = wrapper.find('img');

        expect(img.exists()).toBe(true);
        expect(img.attributes('src')).toBe('https://yesno.wtf/assets/yes/1.gif');
        expect(wrapper.vm.answer).toBe('Yes');
    });

    it('tests on getAnswer - handling error when API fetch fails', async () => {
        global.fetch = vi.fn( () => Promise.reject('API is down') ) as any;

        await wrapper.vm.getAnswer();

        const img = wrapper.find('img');

        expect(img.exists()).toBeFalsy();
        expect(wrapper.vm.answer).toBe('Sorry, something went wrong');
    });
});