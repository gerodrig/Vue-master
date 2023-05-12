import { Cast, Character } from "@/interfaces/breakingbad";
import { Person } from "@/interfaces/breakingbad/cast";
import { reactive } from "vue";


interface Store {
    characters: {
        list: Character[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },
    ids: {
        list: {
            [id: number]: Person;
        };
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    }

    //Character Methods
    startLoadingCharacters: () => void;
    loadedCharacters: (characters: Character[]) => void;
    loadCharactersError: (errorMessage: string) => void;

    //Characters by Id Methods
    startLoadingPerson: () => void;
    checkIdInStore: (id: number) => boolean;
    loadedPerson: (person: Person) => void;

}

//Initial State
const characterStore = reactive<Store>({
    characters: {
        count: 0,
        errorMessage: null,
        hasError: false,
        isLoading: false,
        list: [],
    },
    ids: {
        list: {},
        errorMessage: null,
        hasError: false,
        isLoading: false,
    },
    
    //Characters Methods
    startLoadingCharacters() {
        // console.log('startLoadingCharacters')
    },
    loadedCharacters(characters: Character[]) {

        if( typeof characters === 'undefined' || characters === null) {
            return this.loadCharactersError('Error loading characters');
        }

        this.characters = {
            count: characters.length,
            errorMessage: null,
            hasError: false,
            isLoading: false,
            list: characters,
        }
    },
    loadCharactersError(errorMessage: string) {
        this.characters = {
            count: 0,
            errorMessage: errorMessage,
            hasError: true,
            isLoading: false,
            list: [],
        }
    },

     //Character by ID Methods
        startLoadingPerson() {
            this.ids = {
                ...this.ids,
                errorMessage: null,
                hasError: false,
                isLoading: true,
            }
        },
        checkIdInStore(id: number) {
            return !!this.ids.list[id];
        },
        loadedPerson(person: Person) {
            this.ids.isLoading = false;
            this.ids.list[person.id] = person;
        },
});

characterStore.startLoadingCharacters();



export default characterStore;