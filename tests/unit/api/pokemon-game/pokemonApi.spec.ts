import { describe, it, expect } from 'vitest';
import pokemonApi from '../../../../src/api/pokemon-game/pokemonApi';


describe('pokemonApi', () => {

  it('should test that baseurl is properly configured in axios', () => {

    const baseURL = 'https://beta.pokeapi.co/graphql/v1beta'
    
    expect(pokemonApi.defaults.baseURL).toBe(baseURL);
  });
});