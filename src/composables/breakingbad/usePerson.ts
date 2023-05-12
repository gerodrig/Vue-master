import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { breakingBadApi } from "@/api";
import { Cast, Person } from "@/interfaces/breakingbad/cast";

const setPerson =  ref<{[id: string]: Person}>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getPerson = async (characterId: number): Promise<Person> => {
    if(setPerson.value[characterId]) 
        return setPerson.value[characterId];

    try {
        const { data } = await breakingBadApi<Cast[]>(`/cast`);
    
        const person = data.find(({ person }) => person.id === characterId)?.person;
        
        if(person) return person as Person;

        throw new Error(`Person with id: ${characterId} not found`);
        
    } catch (error: any) {
        throw new Error(error);
    }

};

const loadedPerson = (person: Person) => {
    hasError.value = false;
    errorMessage.value = null;
    setPerson.value[person.id] = person;
};

const loadedWithError = (error: string) => {
    hasError.value = true;
    errorMessage.value = error;

};

export default function usePerson(id: string) {

    const { isLoading } = useQuery(['characters', id],
    () => getPerson(Number.parseInt(id)),
    {
        onSuccess: loadedPerson,
        onError: loadedWithError,
    },
)


    return {
        //Properties
        list: setPerson,
        hasError,
        errorMessage,
        isLoading,

        //Getters
        person: computed<Person | null>(() => setPerson.value[id]),

        //Methods
    };
};