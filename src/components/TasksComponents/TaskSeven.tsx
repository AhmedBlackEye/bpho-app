import Plot from "react-plotly.js";
import { SolarSystem4D } from "../TasksComponentHelper/SolarSystem";

const layout = {
  width: 640,
  height: 480,
  title: "geocentric model",
  xaxis: { title: "x/AU" },
  yaxis: { title: "y/AU" },
};

function TaskSeven({ planetNames }: { planetNames: string[] }) {
  const solarSystem = new SolarSystem4D(planetNames);
  const data = solarSystem.getOrbits();
  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default TaskSeven;
