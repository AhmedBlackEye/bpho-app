import { Data } from "plotly.js";

import wasmInit, { getPlanetsRadiusLookupTable } from "wasm";
import { TPlanet, Planets } from "@/Data/planets";

type TPlanetCustom = TPlanet & {
  innerAngle: number;
  frame: number;
};

type TRadiusLookupTable = {
  [planet: string]: number[];
};

class SolarSystem {
  protected planets: TPlanetCustom[];
  protected readonly theta: number[];
  protected radiusLookupTable: TRadiusLookupTable | null = null; // Initialize to null
  protected orbits: Data[];

  public constructor(PlanetsToInclude: string[] | undefined) {
    this.planets = (
      !PlanetsToInclude
        ? Planets
        : Planets.filter((planet) => PlanetsToInclude.includes(planet.name))
    ).map((planet) => ({ ...planet, frame: 0, innerAngle: 0 }));
    this.theta = Array.from(
      { length: 1000 },
      (_, i) => 0 + i * ((2 * Math.PI) / 1000)
    );

    this.initializeRadiusLookupTable();
  }

  protected async initializeRadiusLookupTable(): Promise<void> {
    try {
      await wasmInit();
      const lookupTable = await this.getRadiusLookupTable(
        this.planets.map((planet) => planet.name)
      );
      this.radiusLookupTable = lookupTable;
    } catch (error) {
      console.error("Error initializing radius lookup table:", error);
    }
  }
  protected async ensureRadiusLookupTable(): Promise<void> {
    if (!this.radiusLookupTable) {
      await this.initializeRadiusLookupTable();
    }
  }

  protected async getRadiusLookupTable(
    PlanetsToInclude: string[]
  ): Promise<TRadiusLookupTable> {
    return getPlanetsRadiusLookupTable(PlanetsToInclude);
  }
}

export class SolarSystem2D extends SolarSystem {
  public constructor(PlanetsToInclude?: string[]) {
    super(PlanetsToInclude);
  }

  public async getOrbits(): Promise<Data[]> {
    await this.ensureRadiusLookupTable();

    return this.planets.map((planet) => {
      const r = this.radiusLookupTable![planet.name]; // Use non-null assertion
      const X = r.map((val, i) => val * Math.cos(this.theta[i]));
      const Y = r.map((val, i) => val * Math.sin(this.theta[i]));

      return {
        mode: "lines",
        x: X,
        y: Y,
        name: planet.name,
      };
    });
  }

  public async getCurrentPlanetPos(): Promise<Data[]> {
    await this.ensureRadiusLookupTable();

    return this.planets.map((planet) => {
      const r = this.radiusLookupTable![planet.name];
      const maxFrames = r.length;

      planet.frame = (planet.frame + 1) % maxFrames;
      const angleIncrement = (2 * Math.PI) / planet.orbitalPeriod / 100; // Adjust as needed

      planet.angle += angleIncrement;
      planet.angle %= 2 * Math.PI;

      const X = r[planet.frame] * Math.cos(planet.angle);
      const Y = r[planet.frame] * Math.sin(planet.angle);

      return {
        x: [X],
        y: [Y],
        mode: "markers",
        marker: {
          color: "red",
          size: 8,
        },
        showlegend: false,
      };
    });
  }
}

export class SolarSystem3D extends SolarSystem {
  public constructor(PlanetsToInclude?: string[]) {
    super(PlanetsToInclude);
  }

  public async getOrbits(): Promise<Data[]> {
    await this.ensureRadiusLookupTable();

    return this.planets.map((planet) => {
      const r = this.radiusLookupTable![planet.name]; // Use non-null assertion

      const XTemp = r.map((val, i) => val * Math.cos(this.theta[i]));

      const X = XTemp.map((val) => val * Math.cos(planet.inclination));
      const Y = r.map((val, i) => val * Math.sin(this.theta[i]));
      const Z = XTemp.map((val) => val * Math.sin(planet.inclination));

      return {
        type: "scatter3d",
        mode: "lines",
        x: X,
        y: Y,
        z: Z,
        name: planet.name,
      };
    });
  }

  public async getCurrentPlanetPos(): Promise<Data[]> {
    await this.ensureRadiusLookupTable();

    return this.planets.map((planet) => {
      const r = this.radiusLookupTable![planet.name];
      const maxFrames = 1000;

      planet.frame = (planet.frame + 1) % maxFrames;
      const angleIncrement = (2 * Math.PI) / planet.orbitalPeriod / 100; // Adjust as needed
      const XTemp = r[planet.frame] * Math.cos(planet.angle);

      const X = XTemp * Math.cos(planet.inclination);
      const Y = r[planet.frame] * Math.sin(planet.angle);
      const Z = XTemp * Math.sin(planet.inclination);

      planet.angle += angleIncrement;
      planet.angle %= 2 * Math.PI;
      return {
        x: [X],
        y: [Y],
        z: [Z],
        type: "scatter3d",
        mode: "markers",
        marker: {
          color: "red",
          size: 4,
        },
        showlegend: false,
      };
    });
  }
}

export class SolarSystem4D extends SolarSystem {
  public constructor(PlanetsToInclude?: string[]) {
    super(PlanetsToInclude);
  }

  public async getOrbits(): Promise<Data[]> {
    await this.ensureRadiusLookupTable();

    return this.planets.map((planet) => {
      const r = this.radiusLookupTable![planet.name]; // Use non-null assertion
      const X = r.map((val, i) => val * Math.cos(this.theta[i]));
      const Y = r.map((val, i) => val * Math.sin(this.theta[i]));

      return {
        mode: "lines",
        x: X,
        y: Y,
        name: planet.name,
      };
    });
  }

  public async getCurrentPlanetPos(): Promise<Data[]> {
    await this.ensureRadiusLookupTable();

    return this.planets.map((planet) => {
      const r = this.radiusLookupTable![planet.name];
      const maxFrames = r.length;

      planet.frame = (planet.frame + 1) % maxFrames;
      const angleIncrement = (2 * Math.PI) / planet.orbitalPeriod / 100; // Adjust as needed

      planet.angle += angleIncrement;
      planet.angle %= 2 * Math.PI;

      const X = r[planet.frame] * Math.cos(planet.angle);
      const Y = r[planet.frame] * Math.sin(planet.angle);

      return {
        x: [X],
        y: [Y],
        mode: "markers",
        marker: {
          color: "red",
          size: 8,
        },
        showlegend: false,
      };
    });
  }
}
