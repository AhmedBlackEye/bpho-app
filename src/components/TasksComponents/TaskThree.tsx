import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { SolarSystem2D } from "../TasksComponentHelper/SolarSystem";
import { Data } from "plotly.js";

const layout = {
  width: 640,
  height: 480,
  title: "Solar System 2D Animation",
  xaxis: { title: "x/AU", range: [-2, 2] },
  yaxis: { title: "y/AU", range: [-2, 2] },
  frame: {
    duration: 0,
    redraw: false,
  },
};

function TaskThree() {
  const [orbitsData, setOrbitsData] = useState<Data[]>([]);
  const [planetsPos, setPlanetsPos] = useState<Data[]>([]);
  const solarSystem = new SolarSystem2D(["Mercury", "Venus", "Earth", "Mars"]);

  const animatePlanets = () => {
    const animationId = requestAnimationFrame(async function animate() {
      const newData = await solarSystem.getCurrentPlanetPos();
      setPlanetsPos(newData);
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationId);
  };

  useEffect(() => {
    async function fetchData() {
      const orbitsData = await solarSystem.getOrbits();
      setOrbitsData(orbitsData);
    }

    fetchData();
    const cancelAnimation = animatePlanets();

    return () => {
      cancelAnimation();
    };
  }, []);

  return (
    <div>
      <h1>Solar System 2D Animation</h1>
      <Plot data={[...orbitsData, ...planetsPos]} layout={layout} />
    </div>
  );
}

export default TaskThree;
