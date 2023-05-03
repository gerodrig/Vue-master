
import { MutationTree } from 'vuex';
import { PlacesState } from './state';
import { Feature } from '@interfaces/places';

export const MUTATION_TYPES = {
        'SET_LNG_LAT': 'setLngLat',
        'SET_IS_LOADING_PLACES': 'setIsLoadingPlaces',
        'SET_PLACES': 'setPlaces',
};
type Coords = {
    lng: number;
    lat: number;
}

const mutation: MutationTree<PlacesState> = {
    setLngLat(state: PlacesState, {lng, lat}: Coords ) {
        state.userLocation = [lng, lat];
        state.isLoading = false;
    },

    setIsLoadingPlaces(state: PlacesState) {
        state.isLoadingPlaces = true;
    },

    setPlaces(state: PlacesState, places: Feature[]) {
        state.places = places;
        state.isLoadingPlaces = false;
    },
};

export default mutation;