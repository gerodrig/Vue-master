import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Swal from 'sweetalert2';

import { Rootstate } from '@interfaces/journal/index';
import { Feature } from '@interfaces/places/index';

export const usePlacesStore = () => {
    const store = useStore<Rootstate>();

    const router = useRouter();
  
    onMounted(() => {
          //check if browser supports geolocation
        if (!navigator.geolocation) {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your browser does not support geolocatio. Redirecting back to home page',
            confirmButtonColor: '#41b883',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            }).then(() => {
            return router.push({ name: 'home' });
            });
        }

        if( !store.getters['places/isUSerLocationReady']){
            store.dispatch('places/getInitialLocation');
        }
    });

    return {
        //State
        isLoading: computed<boolean | undefined>(() => store.state.places?.isLoading),
        userLocation: computed(() => store.state.places?.userLocation),
        places: computed<Feature[]>(() => store.state.places?.places || []),
        isLoadingPlaces: computed<boolean>(() => store.state.places?.isLoadingPlaces || false),

        //Getters
        isUserLocationReady: computed<boolean>(() => store.getters['places/isUSerLocationReady']),
        //Actions
        searchPlacesByTerm: (query = '') => store.dispatch('places/searchPlacesByTerm', query),

        //Mutations
    };
};

