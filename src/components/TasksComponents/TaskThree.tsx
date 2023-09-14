import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { SolarSystem } from "../TasksComponentHelper/SolarSystem";
import { Data } from "plotly.js";

const layout = {
  width: 640,
  height: 480,
  title: "Solar System 2D Animation",
  xaxis: { title: "x/AU" },
  yaxis: { title: "y/AU" },
  frame: {
    duration: 0,
    redraw: false,
  },
};

function TaskThree({ planetNames }: { planetNames: string[] }) {
  const [orbitsData, setOrbitsData] = useState<Data[]>([]);
  const [planetsPos, setPlanetsPos] = useState<Data[]>([]);
  const solarSystem = new SolarSystem(planetNames);
  const animatePlanets = () => {
    const animationId = requestAnimationFrame(function animate() {
      const newData = solarSystem.getCurrentPlanetsPos();
      setPlanetsPos(newData);
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationId);
  };

  useEffect(() => {
    const orbitsData = solarSystem.getOrbits();
    setOrbitsData(orbitsData);

    const cancelAnimation = animatePlanets();

    return () => {
      cancelAnimation();
    };
  }, []);

  return (
    <div>
      <Plot data={[...orbitsData, ...planetsPos]} layout={layout} />
    </div>
  );
}

export default TaskThree;
