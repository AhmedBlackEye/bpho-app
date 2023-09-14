import Plot from "react-plotly.js";
import { SolarSystem } from "../TasksComponentHelper/SolarSystem";

const layout = {
  width: 640,
  height: 480,
  title: "Solar System 2D Animation",
  xaxis: { title: "x/AU" },
  yaxis: { title: "y/AU" },
};

function TaskTwo({ planetNames }: { planetNames: string[] }) {
  const solarSystem = new SolarSystem(planetNames);

  const data = solarSystem.getOrbits();

  return <Plot data={data} layout={layout} />;
}

export default TaskTwo;
