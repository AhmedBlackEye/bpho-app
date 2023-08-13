import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { SolarSystem2D } from "../TasksComponentHelper/SolarSystem";
import { Data } from "plotly.js";

const layout = {
  width: 640,
  height: 480,
  title: "Solar System 2D Animation",
  xaxis: { title: "x/AU" },
  yaxis: { title: "y/AU" },
};

function TaskTwo() {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    async function fetchData() {
      const solarSystem = new SolarSystem2D();
      const orbitsData = await solarSystem.getOrbits();
      setData(orbitsData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Solar System 2D Animation</h1>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default TaskTwo;
