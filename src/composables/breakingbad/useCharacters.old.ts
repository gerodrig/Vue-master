import { onMounted, ref } from "vue";
import { Cast, Character } from "@/interfaces/breakingbad";
import { breakingBadApi } from "@/api";
import axios from "axios";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharactersOld = () => {

    onMounted(async () => {
        await loadCharacters();
    })

    const loadCharacters = async () => {

        if(characters.value.length > 0) return;
        isLoading.value = true;
        try {   
            const { data } = await breakingBadApi.get<Cast[]>('/cast');

            characters.value = data.map( ({character}) => character );
            isLoading.value = false;
        } catch (error) {
            hasError.value = true;
            isLoading.value = false;
            
            if(axios.isAxiosError(error)){
                return errorMessage.value = error.message;
            }
            errorMessage.value = JSON.stringify(error);

    };
    };

    return {
        characters,
        isLoading,
        hasError,
        errorMessage,
    };
};