import { Data } from "plotly.js";

import { TPlanet, Planets, getPlanetByName } from "@/Data/planets";

export class SolarSystem {
  protected planets: TPlanet[];
  protected timeFrame: number = 0;
  protected maxFrames: number = 0;
  public orbitsLookupTable: { [name: string]: { x: number[]; y: number[] } };

  public constructor(PlanetsToInclude?: string[]) {
    let maxOrbitalPeriod = 0;
    if (!PlanetsToInclude) {
      this.planets = Planets;
      maxOrbitalPeriod = getPlanetByName("Pluto").orbitalPeriod;
    } else {
      this.planets = Planets.filter((planet) => {
        if (planet.orbitalPeriod > maxOrbitalPeriod) {
          maxOrbitalPeriod = planet.orbitalPeriod;
        }
        return PlanetsToInclude.includes(planet.name);
      });
    }
    this.maxFrames = maxOrbitalPeriod;

    this.orbitsLookupTable = this.getOrbitsLookupTable();
  }

  private getOrbitsLookupTable(): {
    [name: string]: { x: number[]; y: number[] };
  } {
    const time = Array.from({ length: this.maxFrames * 60 }, (_, i) => i / 60);
    const genLookup = (lookup, planet) => {
      const theta = time.map((t) => (2 * Math.PI * t) / planet.orbitalPeriod);
      const rNumerator =
        planet.distance * (1 - Math.pow(planet.Eccentricity, 2));
      const r = theta.map(
        (thetaVal) =>
          rNumerator / (1 - planet.Eccentricity * Math.cos(thetaVal))
      );

      const X = r.map((val, i) => val * Math.cos(theta[i]));
      const Y = r.map((val, i) => val * Math.sin(theta[i]));
      lookup[planet.name] = { x: X, y: Y };
      return lookup;
    };
    return this.planets.reduce(genLookup, {});
  }

  public getOrbits(): Data[] {
    return this.planets.map((planet) => {
      return {
        mode: "lines",
        x: this.orbitsLookupTable[planet.name].x,
        y: this.orbitsLookupTable[planet.name].y,
        name: planet.name,
      };
    });
  }

  public getCurrentPlanetsPos(): Data[] {
    this.updateFrame();
    return this.planets.map((planet) => {
      return {
        x: [this.orbitsLookupTable[planet.name].x[this.timeFrame]],
        y: [this.orbitsLookupTable[planet.name].y[this.timeFrame]],
        mode: "markers",
        marker: {
          color: "red",
          size: 8,
        },
        showlegend: false,
      };
    });
  }
  private updateFrame() {
    this.timeFrame = (this.timeFrame + 1) % this.maxFrames;
  }
}

export class SolarSystem3D {
  protected planets: TPlanet[];
  protected timeFrame: number = 0;
  protected maxFrames: number = 0;
  public orbitsLookupTable: {
    [name: string]: { x: number[]; y: number[]; z: number[] };
  };

  public constructor(PlanetsToInclude?: string[]) {
    let maxOrbitalPeriod = 0;
    if (!PlanetsToInclude) {
      this.planets = Planets;
      maxOrbitalPeriod = getPlanetByName("Pluto").orbitalPeriod;
    } else {
      this.planets = Planets.filter((planet) => {
        if (planet.orbitalPeriod > maxOrbitalPeriod) {
          maxOrbitalPeriod = planet.orbitalPeriod;
        }
        return PlanetsToInclude.includes(planet.name);
      });
    }
    this.maxFrames = maxOrbitalPeriod;

    this.orbitsLookupTable = this.getOrbitsLookupTable();
  }

  private getOrbitsLookupTable(): {
    [name: string]: { x: number[]; y: number[]; z: number[] };
  } {
    const time = Array.from({ length: this.maxFrames * 60 }, (_, i) => i / 60);
    const genLookup = (lookup, planet) => {
      const theta = time.map((t) => (2 * Math.PI * t) / planet.orbitalPeriod);
      const rNumerator =
        planet.distance * (1 - Math.pow(planet.Eccentricity, 2));
      const r = theta.map(
        (thetaVal) =>
          rNumerator / (1 - planet.Eccentricity * Math.cos(thetaVal))
      );

      const XTemp = r.map((val, i) => val * Math.cos(theta[i]));

      const X = XTemp.map((val) => val * Math.cos(planet.inclination));
      const Y = r.map((val, i) => val * Math.sin(theta[i]));
      const Z = XTemp.map((val) => val * Math.sin(planet.inclination));

      lookup[planet.name] = { x: X, y: Y, z: Z };
      return lookup;
    };
    return this.planets.reduce(genLookup, {});
  }

  public getOrbits(): Data[] {
    return this.planets.map((planet) => {
      return {
        mode: "lines",
        type: "scatter3d",
        x: this.orbitsLookupTable[planet.name].x,
        y: this.orbitsLookupTable[planet.name].y,
        z: this.orbitsLookupTable[planet.name].z,
        name: planet.name,
      };
    });
  }

  public getCurrentPlanetsPos(): Data[] {
    this.updateFrame();
    return this.planets.map((planet) => {
      return {
        x: [this.orbitsLookupTable[planet.name].x[this.timeFrame]],
        y: [this.orbitsLookupTable[planet.name].y[this.timeFrame]],
        z: [this.orbitsLookupTable[planet.name].z[this.timeFrame]],
        type: "scatter3d",
        mode: "markers",
        marker: {
          color: "red",
          size: 3,
        },
        showlegend: false,
      };
    });
  }
  private updateFrame() {
    this.timeFrame = (this.timeFrame + 1) % this.maxFrames;
  }
}

export class SolarSystem4D {
  protected planets: TPlanet[];
  protected timeFrame: number = 0;
  protected maxFrames: number = 0;
  public orbitsLookupTable: { [name: string]: { x: number[]; y: number[] } };

  public constructor(PlanetsToInclude?: string[]) {
    let maxOrbitalPeriod = 0;
    if (!PlanetsToInclude) {
      this.planets = Planets;
      maxOrbitalPeriod = getPlanetByName("Pluto").orbitalPeriod;
    } else {
      this.planets = Planets.filter((planet) => {
        if (planet.orbitalPeriod > maxOrbitalPeriod) {
          maxOrbitalPeriod = planet.orbitalPeriod;
        }
        return PlanetsToInclude.includes(planet.name);
      });
    }
    this.maxFrames = maxOrbitalPeriod;

    this.orbitsLookupTable = this.getOrbitsLookupTable();
  }

  private getOrbitsLookupTable(): {
    [name: string]: { x: number[]; y: number[] };
  } {
    const time = Array.from({ length: this.maxFrames * 60 }, (_, i) => i / 60);
    const EarthTheta = time.map((t) => 2 * Math.PI * t);
    const EarthrNumerator = 1 - Math.pow(0.02, 2);
    const Er = EarthTheta.map(
      (thetaVal) => EarthrNumerator / (1 - 0.02 * Math.cos(thetaVal))
    );
    const EarthX = Er.map((val, i) => val * Math.cos(EarthTheta[i]));
    const EarthY = Er.map((val, i) => val * Math.sin(EarthTheta[i]));

    const genLookup = (lookup, planet) => {
      const theta = time.map((t) => (2 * Math.PI * t) / planet.orbitalPeriod);
      const rNumerator =
        planet.distance * (1 - Math.pow(planet.Eccentricity, 2));
      const r = theta.map(
        (thetaVal) =>
          rNumerator / (1 - planet.Eccentricity * Math.cos(thetaVal))
      );

      const X = r.map((val, i) => EarthX[i] - val * Math.cos(theta[i]));
      const Y = r.map((val, i) => EarthY[i] - val * Math.sin(theta[i]));
      lookup[planet.name] = { x: X, y: Y };
      return lookup;
    };
    return this.planets.reduce(genLookup, {});
  }

  public getOrbits(): Data[] {
    return this.planets.map((planet) => {
      return {
        mode: "lines",
        x: this.orbitsLookupTable[planet.name].x,
        y: this.orbitsLookupTable[planet.name].y,
        name: planet.name,
      };
    });
  }

  public getCurrentPlanetsPos(): Data[] {
    this.updateFrame();
    return this.planets.map((planet) => {
      return {
        x: [this.orbitsLookupTable[planet.name].x[this.timeFrame]],
        y: [this.orbitsLookupTable[planet.name].y[this.timeFrame]],
        mode: "markers",
        marker: {
          color: "red",
          size: 8,
        },
        showlegend: false,
      };
    });
  }
  private updateFrame() {
    this.timeFrame = (this.timeFrame + 1) % this.maxFrames;
  }
}
