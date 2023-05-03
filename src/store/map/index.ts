import { Module } from 'vuex';

import state, { MapState } from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import { Rootstate } from '../../interfaces/journal/index';


const mapModule: Module<MapState ,Rootstate> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};

export default mapModule;