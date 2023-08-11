import { useState, useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import * as math from "mathjs";
import { PlanetsData } from "@/Data/planets";

const Layout = {
  width: 640,
  height: 480,
  title: "Solar System 3D Animation",
  xaxis: { title: "x/AU" },
  yaxis: { title: "y/AU" },
  zaxis: { title: "z/AU" },
  scene: {
    camera: { eye: { x: 1, y: 1, z: 1 } }, // Adjust the eye coordinates as needed
    aspectmode: "manual",
  },
  staticPlot: false,
};

function TaskFourGraph() {
  const SolarSystem = new SolarSystem3D();
  const orbits = SolarSystem.orbits;
  const [planetsMarker, setPlanetsMarker] = useState(
    SolarSystem.getCurrentPlanetPos(0)
  );
  const animatePlanetsMarker = () => {
    let frame = 0;
    const animationId = requestAnimationFrame(function animate() {
      frame = (frame + 3) % SolarSystem.thetaArr.length; // Adjust the sliding speed
      const newData = SolarSystem.getCurrentPlanetPos(frame);
      setPlanetsMarker(newData);
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationId);
  };
  useEffect(() => {
    const cancelAnimation = animatePlanetsMarker();
    return () => {
      cancelAnimation();
    };
  }, []);
  return (
    <Plot
      data={[...orbits, ...planetsMarker]}
      layout={{ ...Layout, scene: { ...Layout.scene, displayModeBar: true } }}
      onInitialized={(figure) => {
        setData(figure.data);
        setLayout(figure.layout);
      }}
      onUpdate={(figure) => {
        setData(figure.data);
        setLayout({
          ...Layout,
          scene: { ...Layout.scene, ...figure.layout.scene },
        });
      }}
    />
  );
}

export default TaskFourGraph;

class SolarSystem3D {
  constructor() {
    this.planets = PlanetsData.slice(0, 4).map((planet) => ({
      name: planet.name,
      eccentricity: planet.Eccentricity,
      distance: planet[distance],
      inclination: planet[inclination],
    }));
    this.theta = math.range(0, 2 * math.pi, 0.01);
    this.thetaArr = this.theta._data;
    this.orbits = this.getOrbits();
  }
  getOrbits() {
    return this.planets.map((planet) => {
      const r = math.multiply(
        planet.distance,
        math.dotDivide(
          math.subtract(1, Math.pow(planet.eccentricity, 2)),
          math.subtract(
            1,
            math.dotMultiply(
              planet.eccentricity,
              math.map(this.theta, math.cos)
            )
          )
        )
      );
      const XTemp = math.dotMultiply(r, math.map(this.theta, math.cos));

      const X = math.multiply(math.cos(planet.inclination), XTemp);
      const Y = math.dotMultiply(r, math.map(this.theta, math.sin));
      const Z = math.multiply(math.sin(planet.inclination), XTemp);

      return {
        type: "scatter3d",
        mode: "lines",
        x: X.toArray(),
        y: Y.toArray(),
        z: Z.toArray(),
        name: planet.name,
      };
    });
  }
  getCurrentPlanetPos(animationFrame) {
    return this.planets.map((planet) => {
      const r =
        planet.distance *
        (1 -
          Math.pow(planet.eccentricity, 2) /
            (1 -
              planet.eccentricity * math.cos(this.thetaArr[animationFrame])));
      const XTemp = r * math.cos(this.thetaArr[animationFrame]);
      const X = math.cos(planet.inclination) * XTemp;
      const Y = r * math.sin(this.thetaArr[animationFrame]);
      const Z = math.sin(planet.inclination) * XTemp;

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
