import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { SolarSystem3D } from "../TasksComponentHelper/SolarSystem";
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

function TaskFourAnimated({ planetNames }: { planetNames: string[] }) {
  const [orbitsData, setOrbitsData] = useState<Data[]>([]);
  const [planetsPos, setPlanetsPos] = useState<Data[]>([]);
  const solarSystem = new SolarSystem3D(planetNames);

  const animatePlanets = () => {
    const animationId = requestAnimationFrame(async function animate() {
      const newData = solarSystem.getCurrentPlanetsPos();
      setPlanetsPos(newData);
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationId);
  };

  useEffect(() => {
    function fetchData() {
      const orbitsData = solarSystem.getOrbits();
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
      <Plot data={[...orbitsData, ...planetsPos]} layout={layout} />
    </div>
  );
}

export default TaskFourAnimated;
