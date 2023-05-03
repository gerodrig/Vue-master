export interface PlacesResponse {
    type: string;
    query: string[];
    features: Feature[];
    attribution: string;
  }
  
  export interface Feature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: Properties;
    text: string;
    place_name: string;
    center: number[];
    geometry: Geometry;
    context: Context[];
  }
  
  interface Context {
    id: string;
    mapbox_id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
  }
  
  interface Geometry {
    coordinates: number[];
    type: string;
  }
  
  interface Properties {
    foursquare: string;
    landmark: boolean;
    address: string;
    category: string;
  }
  
  