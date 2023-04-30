
import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';


const authModule = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};

export default authModule;