import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import {PokemonPicture} from '../../../../src/components/pokemon-game/';


describe('PokemonPicture Component', () => {

  it('should match the snapshot', () => {
    
    const wrapper = shallowMount(PokemonPicture, {
        props: {
            pokemonId: 1,
            showPokemon: false,
        },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should show the hidden image and pokemon number 100', () => {

    const wrapper = shallowMount(PokemonPicture, {
        props: {
            pokemonId: 100,
            showPokemon: false,
        },
    });

    const img = wrapper.find('img');

    expect(img.classes('hidden-pokemon')).toBe(true);
    expect(img.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg');
  });

  it('should show missigno pokemon if value passed is 0',() => {

    const wrapper = shallowMount(PokemonPicture, {
        props: {
            pokemonId: 0,
            showPokemon: false,
        },
    });

    const img = wrapper.find('img');

    expect(img.classes('hidden-pokemon')).toBe(true);
    expect(img.attributes('src')).toBe('https://upload.wikimedia.org/wikipedia/commons/3/3b/MissingNo.svg');
  });

  it('should show the pokemon image if showPokemon is true', () => {
    
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: true,
            },
        });
    
        const img = wrapper.find('img');
    
        expect(img.exists()).toBe(true);
        expect(img.classes('fadeIn')).toBe(true);
        expect(img.classes('hidden-pokemon')).toBe(false);
        expect(img.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg');
  });
});