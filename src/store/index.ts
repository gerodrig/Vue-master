import { createStore} from 'vuex'
import journal from './journal'
import auth from './auth'
import { Rootstate } from '@/interfaces/journal';

export default createStore<Rootstate>({
    modules: {
        journal,
        auth,
    }
});  
