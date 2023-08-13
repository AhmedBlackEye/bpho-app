import * as math from "mathjs";
import { Data } from "plotly.js";

import { Planet, PlanetNames, Planets } from "@/Data/planets";

class SolarSystem {
  protected planets: Planet[];
  protected readonly theta: math.Matrix;
  protected readonly thetaArr: math.MathArray;
  protected orbits: Data[];

  constructor(PlanetsToInclude: string[] = PlanetNames) {
    this.planets =
      PlanetsToInclude == PlanetNames
        ? Planets
        : Planets.filter((planet) => PlanetsToInclude.includes(planet.name));
    this.theta = math.range(0, 2 * math.pi, 0.01);
    this.thetaArr = this.theta.toArray();
    this.orbits = this.getOrbits();
  }
  protected getRadius() {
    const PlanetsRadiusLookup: 
  }
  getOrbits() {
    return this.planets.map((planet) => {
      const r = math.multiply(
        planet.distance,
        math.dotDivide(
          math.subtract(1, Math.pow(planet.Eccentricity, 2)),
          math.subtract(
            1,
            math.dotMultiply(
              planet.Eccentricity,
              math.map(this.theta, math.cos)
            )
          )
        )
      );

      const X = math.dotMultiply(r, math.map(this.theta, math.cos));
      const Y = math.dotMultiply(r, math.map(this.theta, math.sin));

      return {
        mode: "lines",
        x: X.toArray(),
        y: Y.toArray(),
        name: planet.name,
      };
    });
  }
  getCurrentPlanetPos(animationFrame) {
    return this.planets.map((planet) => {
      const r =
        planet.distance *
        (1 -
          Math.pow(planet.Eccentricity, 2) /
            (1 -
              planet.Eccentricity * math.cos(this.thetaArr[animationFrame])));
      const X = r * math.cos(this.thetaArr[animationFrame]);
      const Y = r * math.sin(this.thetaArr[animationFrame]);

      return {
        x: [X],
        y: [Y],
        type: "scatter",
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

const x = new SolarSystem();
