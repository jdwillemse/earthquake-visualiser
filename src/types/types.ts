export interface Earthquake {
  bearing: number;
  distance: number;
  id: string;
  properties: {
    type: string;
    mag: number;
    place: string;
    time: number;
  };
}

export interface Feature extends Earthquake {
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  [extraProp: string]: any;
}

export interface APIResponse {
  type: string;
  features: Feature[];
  [extraProp: string]: any;
}
