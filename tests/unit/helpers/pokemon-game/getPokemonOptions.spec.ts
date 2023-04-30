import { describe, it, expect, beforeEach, vi } from 'vitest';
import getPokemonOptionsFromStorage, { getPokemons, getPokemonNames, getPokemonOptions} from '../../../../src/helpers/pokemon-game/getPokemonOptions'

import { pokemons } from '../../mocks/pokemon-game/pokemons.mock';


describe('getPokemonOptions helpers', () => {
  let localStorageMock: any;

  beforeEach(() => {
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;
  });

  it('should return a number array', () => {
    const pokemons = getPokemons();

    expect(pokemons.length).toBe(649);
    expect(pokemons[0]).toBe(1);
    expect(pokemons[648]).toBe(649);
  });

  it('should return an array of 4 elements with random numbers between 1 and 649 and pokemon names', async () => {
    const pokemons = await getPokemonNames([1,2,3,4]);

    expect(pokemons.length).toBe(4);
    expect(pokemons).toStrictEqual(pokemons);
  });

  it('should return a mixed array ',async () => {
    const pokemons = await getPokemonOptions();

    expect( pokemons.length).toBe(4);
    expect(pokemons).toEqual([
      { 
        id: expect.any(Number),
        name: expect.any(String),
      },
      { 
        id: expect.any(Number),
        name: expect.any(String),
      },
      { 
        id: expect.any(Number),
        name: expect.any(String),
      },
      { 
        id: expect.any(Number),
        name: expect.any(String),
      },
    ])

    it('should return a mixed array from local storage',async () => {
      const pokemons = await getPokemonOptionsFromStorage();

      expect( pokemons.length).toBe(4);
      expect(pokemons).toEqual(
        [
          { 
            id: expect.any(Number),
            name: expect.any(String),
          },
          { 
            id: expect.any(Number),
            name: expect.any(String),
          },
          { 
            id: expect.any(Number),
            name: expect.any(String),
          },
          { 
            id: expect.any(Number),
            name: expect.any(String),
          },
        ]);

    });

  });
});