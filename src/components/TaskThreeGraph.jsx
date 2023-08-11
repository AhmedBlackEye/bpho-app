import Plot from "react-plotly.js";
import * as math from "mathjs";
import { PlanetsData } from "@/Data/planets";
import { useState, useEffect } from "react";

// function TaskTwoGraph() {
//   const [animationFrame, setAnimationFrame] = useState(0);
//   const numPlanets = PlanetsData.length;
//   const numVisiblePlanets = numPlanets - 5; // Calculate the number of visible planets
//   const eccentricities = PlanetsData.slice(5).map(
//     (planet) => planet.Eccentricity
//   );
//   const distances = PlanetsData.slice(5).map(
//     (planet) => planet[distance]
//   );

//   const theta = math.range(0, 2 * math.pi, 0.1).toArray();

//   // Calculate orbits once and convert them to an array
//   const orbits = distances.map((distance, i) => {
//     const r = math.multiply(
//       distance,
//       math.dotDivide(
//         math.subtract(1, Math.pow(eccentricities[i], 2)),
//         math.subtract(
//           1,
//           math.dotMultiply(eccentricities[i], math.map(theta, math.cos))
//         )
//       )
//     );
//     const x = math.dotMultiply(r, math.map(theta, math.cos));
//     const y = math.dotMultiply(r, math.map(theta, math.sin));
//     return {
//       type: "scatter",
//       mode: "lines",
//       x: x,
//       y: y,
//       name: PlanetsData[i + 5].name,
//     };
//   });

//   const animate = () => {
//     setAnimationFrame((prevFrame) => (prevFrame + 1) % theta.length);
//     requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     const animationId = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationId);
//   }, []);

//   // Calculate the current marker positions once and convert them to an array
//   const currentPlanetMarkersPos = distances.map((distance, index) => {
//     const r =
//       distance *
//       (1 -
//         Math.pow(eccentricities[index], 2) /
//           (1 - eccentricities[index] * math.cos(theta[animationFrame])));
//     const x = r * math.cos(theta[animationFrame]);
//     const y = r * math.sin(theta[animationFrame]);
//     return {
//       x: [x],
//       y: [y],
//       type: "scatter",
//       mode: "markers",
//       marker: {
//         color: "red",
//         size: 10,
//       },
//       showlegend: false,
//       name: PlanetsData[index + 5].name,
//     };
//   });

//   return (
//     <Plot
//       data={[...orbits, ...currentPlanetMarkersPos]}
//       layout={{
//         width: 640,
//         height: 480,
//         title: "Kepler III Correlation",
//         xaxis: { title: "X", range: [-2, 2] },
//         yaxis: { title: "Y", range: [-2, 2] },
//       }}
//     />
//   );
// }

const Layout = {
  width: 640,
  height: 480,
  title: "Solar System 2D Animation",
  xaxis: { title: "x/AU", range: [-2, 2] },
  yaxis: { title: "y/AU", range: [-2, 2] },
};

function TaskThreeGraph() {
  const SolarSystem = new SolarSystem2D();
  const orbits = SolarSystem.orbits;
  const [planetsMarker, setPlanetsMarker] = useState(
    SolarSystem.getCurrentPlanetPos(0)
  );
  const animatePlanetsMarker = () => {
    let frame = 0;
    const animationId = requestAnimationFrame(function animate() {
      frame = (frame + 1) % SolarSystem.thetaArr.length; // Adjust the sliding speed
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

export default TaskThreeGraph;

class SolarSystem2D {
  constructor() {
    this.planets = PlanetsData.slice(5).map((planet) => ({
      name: planet.name,
      eccentricity: planet.Eccentricity,
      distance: planet[distance],
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

      const X = math.dotMultiply(r, math.map(this.theta, math.cos));
      const Y = math.dotMultiply(r, math.map(this.theta, math.sin));

      return {
        type: "scatter",
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
          Math.pow(planet.eccentricity, 2) /
            (1 -
              planet.eccentricity * math.cos(this.thetaArr[animationFrame])));
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
