import { createStore} from 'vuex'

import journal from './journal'
import auth from './auth'
import places from './places';
import map from './map';

import { JournalState, AuthState } from '@interfaces/journal';
import { PlacesState } from './places/state';
import { MapState } from './map/state';

export interface Rootstate {
    journal?: JournalState;
    auth?: AuthState;
    places?: PlacesState;
    map?: MapState;
}

export default createStore<Rootstate>({
    modules: {
        journal,
        auth,
        places,
        map
    }
});  
