import Mapboxgl, { Marker } from 'mapbox-gl';

import { MutationTree } from 'vuex';
import { MapState } from './state';
import { Feature } from '@/interfaces/places';

export const MAP_MUTATION_TYPES = {
  SET_MAP: 'setMap',
  SET_PLACE_MARKERS: 'setPlaceMarkers',
  SET_ROUTE_POLYLINE: 'setRoutePolyline',
  SET_ROUTE_DISTANCE_DURATION: 'setRouteDistanceDuration',
};

const mutation: MutationTree<MapState> = {
  setMap(state: MapState, map: Mapboxgl.Map): void {
    // Some code
    state.map = map;
  },
  setRouteDistanceDuration(state: MapState, {distance, duration}: {distance: number, duration: number }): void {
    let kilometers = distance / 1000;
    kilometers = Math.round((kilometers + Number.EPSILON) * 100) / 100;

    state.distance = distance;
    state.duration = Math.floor(duration / 60);
  },

  setPlaceMarkers(state: MapState, places: Feature[]): void {
    //delete previous markers
    state.markers.forEach((marker) => marker.remove());
    state.markers = [];

    //Create new markers array
    state.markers = places.map((place) => {
      if (!state.map) throw new Error('Map is not initialized');

      const [lng, lat] = place.center;
      const popup = new Mapboxgl.Popup({ offset: 25 })
        .setLngLat([lng, lat])
        .setHTML(
          `
                <h1 class="text-xl">${place.text}</h1>
                <p class="text-sm">${place.place_name}</p>
                `
        );

      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      const marker = new Mapboxgl.Marker({
        color: `#${randomColor}`,
      })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map);

      return marker;
    });

    //Clear polyline/route in case it exists clear distance and duration
    if (state.map?.getSource('RouteString')) {
      state.map?.removeLayer('RouteString');
      state.map?.removeSource('RouteString');
      state.distance = undefined;
      state.duration = undefined;
    }
  },

  setRoutePolyline(state: MapState, coords: number[][]): void {
    const start = coords[0];
    const end = coords.at(-1);

    //define bounce
    const bounds = new Mapboxgl.LngLatBounds(
      [start[0], start[1]],
      [start[0], start[1]]
    );

    //add each point to the bounds
    coords.forEach((coord) => bounds.extend([coord[0], coord[1]]));

    //add padding to the bounds
    state.map?.fitBounds(bounds, {
      padding: 100,
    });

    //draw the polyline
    const sourceData: Mapboxgl.AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    //check if the source already exists and remove
    if (state.map?.getSource('RouteString')) {
      state.map?.removeLayer('RouteString');
      state.map?.removeSource('RouteString');
    }

    //add the polyline source to the map
    state.map?.addSource('RouteString', sourceData);

    //add the polyline to the map
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#41b883',
        'line-width': 3,
      },
    });
  },
};

export default mutation;
