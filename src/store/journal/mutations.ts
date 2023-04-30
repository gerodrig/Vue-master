import { Entry, JournalState } from '@interfaces/journal';


export const setEntries = (state: JournalState, payload: Entry[]): void => {

    state.entries = [...payload];
    state.isLoading = false;
}

export const updateEntry = (state: JournalState, payload: Entry): void => {
    //update that entry in the state
    state.isLoading = true;
    const index = state.entries.findIndex((entry: Entry) => entry.id === payload.id);
 
    //update the entry
    state.entries[index] = payload;

    state.isLoading = false;

}

export const addEntry = (state: JournalState, payload: Entry): void => {
    state.entries = [payload, ...state.entries];
}


export const deleteEntry = (state: JournalState, payload: string): void => {

    const entries = state.entries.filter((entry: Entry) => entry.id !== payload);
    
    state.entries = [...entries];

}

export const clearEntries = (state: JournalState): void => {

    state.entries = [];

}