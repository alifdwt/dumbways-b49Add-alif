export default interface Provinces {
  id: number;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
}

export default interface Regencies {
  id: number;
  province_id: number;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
}

export default interface Districts {
  id: number;
  regency_id: number;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
}

export default interface Villages {
  id: number;
  district_id: number;
  name: string;
  latitude: number;
  longitude: number;
}
