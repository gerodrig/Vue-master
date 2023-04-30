import { Entry, JournalState } from '@interfaces/journal/index';

export const getEntriesByTerm = ({entries}: JournalState) => (term = '') : Entry[] => {

    if (term.length === 0) 
        return entries

    return entries.filter((entry: Entry) => {
        return entry.text.toLowerCase().includes(term.toLowerCase());
    });
    
};

export const getEntriesById = (state: JournalState) => (id: string) : Entry | undefined => {
    const entry = state.entries.find((entry: Entry) => entry.id === id);

    if(!entry) return undefined;

    return {...entry}
};