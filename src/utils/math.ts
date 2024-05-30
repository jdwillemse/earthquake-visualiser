// https://www.movable-type.co.uk/scripts/latlong.html

// φ is latitude, λ is longitude, Δλ is taking shortest route (<180°),
// R is the earth’s radius, ln is natural log
export const getRhumbDistance = (
  [long1, lat1]: [number, number],
  [long2, lat2]: [number, number],
): number => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  let Δλ = ((long2 - long1) * Math.PI) / 180;

  const Δψ = Math.log(
    Math.tan(Math.PI / 4 + φ2 / 2) / Math.tan(Math.PI / 4 + φ1 / 2),
  );
  const q = Math.abs(Δψ) > 10e-12 ? Δφ / Δψ : Math.cos(φ1); // E-W course becomes ill-conditioned with 0/0

  // if dLon over 180° take shorter rhumb line across the anti-meridian:
  if (Math.abs(Δλ) > Math.PI)
    Δλ = Δλ > 0 ? -(2 * Math.PI - Δλ) : 2 * Math.PI + Δλ;

  return (Math.sqrt(Δφ * Δφ + q * q * Δλ * Δλ) * R) / 1000; // in kilometres
};

// copied from https://github.com/Turfjs/turf/blob/c863c6abfb71a00c4e1d123f8178d026059f4f6e/packages/turf-helpers/index.ts
const bearingToAzimuth = (bearing: number): number => {
  let angle = bearing % 360;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
};

// φ is latitude, λ is longitude, Δλ is taking shortest route (<180°),
// R is the earth’s radius, ln is natural log
export const getRhumbBearing = (
  [long1, lat1]: [number, number],
  [long2, lat2]: [number, number],
): number => {
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  let Δλ = ((long2 - long1) * Math.PI) / 180;

  const Δψ = Math.log(
    Math.tan(Math.PI / 4 + φ2 / 2) / Math.tan(Math.PI / 4 + φ1 / 2),
  );

  // if dLon over 180° take shorter rhumb line across the anti-meridian:
  if (Math.abs(Δλ) > Math.PI)
    Δλ = Δλ > 0 ? -(2 * Math.PI - Δλ) : 2 * Math.PI + Δλ;

  return bearingToAzimuth((Math.atan2(Δλ, Δψ) * 180) / Math.PI);
};
