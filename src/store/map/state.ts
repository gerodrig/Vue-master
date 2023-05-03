import Mapboxgl from 'mapbox-gl';


export interface MapState {
    map?: Mapboxgl.Map;  
    markers: Mapboxgl.Marker[];
    distance?: number;
    duration?: number;
}

export default (): MapState => ({
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined,
})