
import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { Rootstate } from '../../interfaces/journal/index';
import { MUTATION_TYPES } from './mutations';
import { searchApi } from '@/api';
import { PlacesResponse, Feature } from '@/interfaces/places';

const actions: ActionTree<PlacesState, Rootstate> = {
    getInitialLocation({commit}) {
        //TODO: get the user's location
        navigator.geolocation.getCurrentPosition(
            ({coords}) => commit(MUTATION_TYPES.SET_LNG_LAT, {lng: coords.longitude, lat: coords.latitude}),
            (error) => {
                console.log(error);
                throw new Error('Could not get your location');
            }
        );
    },
    async searchPlacesByTerm({commit, state}, query: string): Promise<Feature[]> {
       
        //return if query is empty
        if(query.length === 0) {
            commit(MUTATION_TYPES.SET_PLACES, []);
            return [];
        }   

        //change loading state
        commit(MUTATION_TYPES.SET_IS_LOADING_PLACES);

        //check that there is a location
        if(!state.userLocation) {
            throw new Error('User location is not set');
        }

        const { data } = await searchApi.get<PlacesResponse>(`/${query}.json`,{
            params: {
                proximity: state.userLocation?.join(','),
            },
        });

        //set places
        commit(MUTATION_TYPES.SET_PLACES, data.features);

        return data.features;
    }
};

export default actions;