import { Module } from 'vuex';

import state, { PlacesState } from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import { Rootstate } from '../../interfaces/journal/index';


const placesModule: Module<PlacesState ,Rootstate> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};

export default placesModule;