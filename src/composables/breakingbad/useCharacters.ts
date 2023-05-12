import { computed, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import type { Character, Cast } from '@/interfaces/breakingbad';
import { breakingBadApi } from '@/api';

//manage characters list
const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async (): Promise<Character[]> => {
  //check if characters are already loaded
  if (characters.value.length > 0) {
    return characters.value;
  }

  try {
    const { data } = await breakingBadApi.get<Cast[]>('/cast');
  
    const charactersResponse = data.map(({ person, character }) => ({
      ...character,
      id: person.id,
    }));

    if(charactersResponse.length > 0) return charactersResponse;  

    throw new Error('Error loading characters'); 
   
  } catch (error) {
    throw new Error('Error loading characters');
  }

};

const loadedCharacters = (chars: Character[]) => {
  hasError.value = false;
  isLoading.value = false;
  characters.value = chars;
};

export default function useCharacters() {
  // Your composable logic here
  const { isLoading } = useQuery(['characters'], getCharacters, {
    onSuccess: loadedCharacters,
  });

  return {
    //Properties
    characters,
    isLoading,
    hasError,
    errorMessage,

    //Getters
    count: computed<number>(() => characters.value.length),
    //Methods
  };
}
