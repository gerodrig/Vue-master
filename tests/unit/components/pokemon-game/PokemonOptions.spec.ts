import {describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PokemonOptions from '../../../../src/components/pokemon-game/PokemonOptions.vue';


import { pokemons } from '../../mocks/pokemon-game/pokemons.mock';

describe('PokemonOptions Component', () => {

    let wrapper: any;

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                options: pokemons
            }
        });
    });

  it('must match the snapshot', () => {

    // console.log(wrapper.html());

    expect(wrapper.html()).toMatchSnapshot();
    
  });

  it('should display 4 options correctly', () => {
    //make sure that 4 list items are rendered
    //each li must have the correct pokemon name

    const liElements = wrapper.findAll('li');

    //console.log(liElements[0].text());
    expect(liElements).toHaveLength(4);
    expect(liElements[0].text()).toBe('bulbasaur'.toLocaleUpperCase());
    expect(liElements[1].text()).toBe('ivysaur'.toLocaleUpperCase());
    expect(liElements[2].text()).toBe('venusaur'.toLocaleUpperCase());
    expect(liElements[3].text()).toBe('charmander'.toLocaleUpperCase());

  });

  it('should emit "onSelectPokemon" with the id of the pokemon', () => {
    //make sure that the event is emitted with the correct payload
    const [li1, li2, li3, li4] = wrapper.findAll('li');

    li1.trigger('click');
    li2.trigger('click');
    li3.trigger('click');
    li4.trigger('click');

    const event = wrapper.emitted('chosenPokemon');

    // console.log(event);

    // expect(event).toBe(1);
    expect(event.length).toBe(4);
    expect(event[0]).toEqual([1]);
    expect(event[1]).toEqual([2]);
    expect(event[2]).toEqual([3]);
    expect(event[3]).toEqual([4]);
  });
});