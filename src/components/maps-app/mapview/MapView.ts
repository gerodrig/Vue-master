import {
  defineAsyncComponent,
  defineComponent,
  ref,
  onMounted,
  watch,
} from 'vue';
import Mapboxgl from 'mapbox-gl';

import { usePlacesStore, useMapStore } from '@/composables/maps-app';

export default defineComponent({
  name: 'MapView',
  components: {
    Loader: defineAsyncComponent(
      () => import('@/components/shared/maps-app/Loader.vue')
    ),
  },
  setup() {

    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocationReady } = usePlacesStore();
    const  { setMap } = useMapStore()

    const initMap = async () => {
      if (!mapElement.value) throw new Error('Map element is not defined');
      if (!userLocation.value) throw new Error('User location is not defined');

      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 15, // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup({ offset: 25 })
        .setLngLat(userLocation.value)
        .setHTML(
          `
            <h1 class="text-xl">You are Here: </h1>
            `
        );

      const myLocationMarker = new Mapboxgl.Marker({
        color: '#41b883',
      })
      .setLngLat(userLocation.value)
      .setPopup(myLocationPopup)
      .addTo(map);

      // TODO: Set the map in VUEX store.
      setMap(map);
    };

    onMounted(() => {
      if (isUserLocationReady.value) return initMap();
    });

    watch(isUserLocationReady, (newValue) => {
      if (isUserLocationReady.value) initMap();
    });

    return {
      isUserLocationReady,
      mapElement,
    };
  },
});
