export type Planet = {
  name: string;
  mass: number;
  distance: number;
  radius: number;
  rotationalPeriod: number;
  orbitalPeriod: number;
  Eccentricity: number;
  inclination: number;
};

export const PlanetsData: Planet[] = [
  {
    name: "Saturn",
    mass: 95.16,
    distance: 9.58,
    radius: 9.45,
    rotationalPeriod: 0.44,
    orbitalPeriod: 29.43,
    Eccentricity: 0.06,
    inclination: 2.49,
  },
  {
    name: "Uranus",
    mass: 14.5,
    distance: 19.29,
    radius: 4.01,
    rotationalPeriod: 0.72,
    orbitalPeriod: 84.75,
    Eccentricity: 0.05,
    inclination: 0.77,
  },
  {
    name: "Jupiter",
    mass: 317.85,
    distance: 5.2,
    radius: 11.21,
    rotationalPeriod: 0.41,
    orbitalPeriod: 11.86,
    Eccentricity: 0.05,
    inclination: 1.31,
  },
  {
    name: "Neptune",
    mass: 17.2,
    distance: 30.25,
    radius: 3.88,
    rotationalPeriod: 0.67,
    orbitalPeriod: 166.34,
    Eccentricity: 0.01,
    inclination: 1.77,
  },
  {
    name: "Pluto",
    mass: 0,
    distance: 39.51,
    radius: 0.19,
    rotationalPeriod: 6.39,
    orbitalPeriod: 248.35,
    Eccentricity: 0.25,
    inclination: 17.5,
  },
  {
    name: "Mars",
    mass: 0.107,
    distance: 1.523,
    radius: 0.53,
    rotationalPeriod: 1.03,
    orbitalPeriod: 1.88,
    Eccentricity: 0.09,
    inclination: 1.85,
  },
  {
    name: "Venus",
    mass: 0.815,
    distance: 0.723,
    radius: 0.95,
    rotationalPeriod: 243.02,
    orbitalPeriod: 0.62,
    Eccentricity: 0.01,
    inclination: 3.39,
  },
  {
    name: "Mercury",
    mass: 0.055,
    distance: 0.387,
    radius: 0.38,
    rotationalPeriod: 58.65,
    orbitalPeriod: 0.24,
    Eccentricity: 0.21,
    inclination: 7,
  },
  {
    name: "Earth",
    mass: 1,
    distance: 1,
    radius: 1,
    rotationalPeriod: 1,
    orbitalPeriod: 1,
    Eccentricity: 0.02,
    inclination: 0,
  },
];
