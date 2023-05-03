
import axios from 'axios';

const directinosApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    }
});

export default directinosApi;