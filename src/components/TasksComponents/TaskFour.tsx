import Plot from "react-plotly.js";
import { SolarSystem3D } from "../TasksComponentHelper/SolarSystem";

const layout = {
  width: 640,
  height: 480,
  title: "Solar System 3D Animation",
  xaxis: { title: "x/AU" },
  yaxis: { title: "y/AU" },
};

function TaskFour({ planetNames }: { planetNames: string[] }) {
  const solarSystem = new SolarSystem3D(planetNames);
  const data = solarSystem.getOrbits();

  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default TaskFour;
