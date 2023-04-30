import {beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';

import PokemonComponent from '../../../../src/projects/pokemon-game/index.vue'
import { pokemons } from '../../mocks/pokemon-game/pokemons.mock';


describe('Pokemon index component', () => {

  let wrapper: any;
  let localStorageMock;

  beforeEach(() => {
    //local storage mock
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;
    wrapper = shallowMount(PokemonComponent);
  });

  it('must match the snapshot', () => {
    
    expect(wrapper.html()).toMatchSnapshot();
    
  });

  it('must get options when mounting component', async () => {

    const wrapper = shallowMount(PokemonComponent, {
      setup() {
        return {
          options: pokemons,
          answer: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
          won: false,
          checkAnswer: () => {},
          resetGame: () => {},
        };
      },
    });

    const options = wrapper.vm.options;

    // console.log(wrapper.vm.options);
    expect(options.length).toBe(4);

    
  });

  it('should match the snapshot when pokemons are loaded', () => {
      const wrapper = mount(PokemonComponent, {
        data() {
          return {
            options: pokemons,
            answer: pokemons[0],
            showPokemon: false,
            showAnswer: false,
            message: '',
            won: false,
            checkAnswer: () => {},
            resetGame: () => {},
          };
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
  });

  it('must show PokemonPicture and PokemonOptions must exist', () => {
    const wrapper = shallowMount(PokemonComponent, {
      setup() {
        return {
          options: pokemons,
          answer: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
          won: false,
          checkAnswer: () => {},
          resetGame: () => {},
        };
      },
    });
    const pokemonOptions = wrapper.find('pokemon-options-stub');
    const picture = wrapper.find('pokemon-picture-stub');

    expect(picture.exists()).toBeTruthy();
    expect(picture.exists()).toBeTruthy();
    //pokemon picture must have attribute 1
    expect(picture.attributes('pokemonid')).toBe('1');

    // check that options in PokemonOptions exists
    expect(pokemonOptions.exists()).toBeTruthy();
  });

  it('tests the checkAnswer method', async () => {

    const wrapper = mount(PokemonComponent, {
      setup() {
        return {
          options: pokemons,
          answer: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
          won: false,
          checkAnswer: (num: number) => 1,
          resetGame: () => {},
        };
      },
    });

    await wrapper.vm.checkAnswer(1);
    // check that the message is empty
    expect(wrapper.vm.message).toBe('');   

    // check that the showAnswer is false
    expect(wrapper.vm.showAnswer).toBeFalsy();

    //check pokemon answer
    expect(wrapper.vm.answer).toEqual({ id: 1, name: 'Bulbasaur' });
    
    
  });
});