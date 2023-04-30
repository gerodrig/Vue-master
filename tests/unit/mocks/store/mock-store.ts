import { Store, createStore } from "vuex"

import auth from "@/store/auth"
import journal from "@/store/journal"

import journalState from "../../mocks/journal/test-journal-state";
import { AuthState, JournalState, Rootstate } from '@interfaces/journal/index';


const createVuexStore = (authInitState: AuthState, journalInitState: JournalState = journalState): Store<Rootstate> => {
    return createStore({
        modules: {
            auth: {
                ...auth,
                state: { ...authInitState }
            },
            journal: {
                ...journal,
                state: { ...journalInitState }
            }
        }
    })
}

export default createVuexStore;