import { ActionContext } from "vuex";
import journalApi from "@/api/journal/journalApi";
import { Entry, EntryFirebase, Rootstate } from "@/interfaces/journal";
import { JournalState } from '../../interfaces/journal/index';

type JournalContext = ActionContext<JournalState, Rootstate>;

export const loadEntries = async ({commit}: JournalContext ): Promise<void> => {
    
    try {
        const { data } = await journalApi.get<EntryFirebase>('/entries.json');
        
        if(!data) {
            commit('setEntries', []);
            return;
        }
        const entries = [] as Entry[];

        for (let id of Object.keys(data)) {
            entries.push({
                id,
                ...data[id]
            });
        }

        //reverse the entries array to show the last entry first
        commit('setEntries', entries.reverse());

    } catch (error) {
        console.log(error);
    }
};

export const updateEntry = async ({commit}: JournalContext, payload: Entry): Promise<void> => {

    try {
        if(!payload) throw new Error('Event is required');
        const { id, ...rest } = payload;
        const dataToSave = { ...rest };

        const result = await journalApi.put(`/entries/${payload.id}.json`, dataToSave);

        // commit the mutation
        commit('updateEntry', {...payload});
        
    } catch (error) {
        console.log(error);
    }
    
    //extract the entry from the payload

    
};

export const createEntry = async ({commit}: JournalContext, payload: Entry): Promise<string> => {
    const {id, ...dataToSave} = payload;

    const { data } = await journalApi.post('/entries.json', dataToSave);

    commit('addEntry', {...dataToSave, id: data.name});

    return data.name;
};

export const deleteEntry = async ({commit}: JournalContext, payload: Entry): Promise<void> => {

    try {
        if (!payload) throw new Error('Entry is required');
    
        const { id } = payload;

        await journalApi.delete(`/entries/${id}.json`);
    
        commit('deleteEntry', id);
        
    } catch (error) {
        console.log(error);
    }

}