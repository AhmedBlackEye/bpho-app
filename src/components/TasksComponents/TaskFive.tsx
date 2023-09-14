import Plot from "react-plotly.js";
import { angle_vs_time } from "../TasksComponentHelper/AngleVsTime";
import { useState } from "react";
import { PlanetNames, getPlanetByName } from "@/Data/planets";
import { Data } from "plotly.js";
import { Select } from "@chakra-ui/react";

const layout = {
  width: 640,
  height: 480,
  title: "Orbit Angle VS Time",
  xaxis: { title: "Time/Yrs" },
  yaxis: { title: "Orbit Polar Angle/Rad" },
};
const numPoints = 1000;
const timeArr = Array.from(
  { length: numPoints },
  (_, i) => (i / (numPoints - 1)) * 3 * 248.348
);

function TaskFive() {
  const [choosenPlanet, setChoosenPlanet] = useState<string>("Pluto");
  const planet = getPlanetByName(choosenPlanet);
  const thetaWithEcc = angle_vs_time(
    timeArr,
    planet.orbitalPeriod,
    planet.Eccentricity,
    planet.angle
  );
  const thetaCircular = angle_vs_time(
    timeArr,
    planet.orbitalPeriod,
    0,
    planet.angle
  );
  const Data: Data[] = [
    {
      name: `Eccentricity: ${planet.Eccentricity}`,
      x: timeArr,
      y: thetaWithEcc,
      mode: "lines",
    },
    {
      name: "Circular: 0.0",
      x: timeArr,
      y: thetaCircular,
      mode: "lines",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row p-4 bg-blue-50 rounded-lg gap-4 w-full">
      <div>
        <Plot
          data={Data}
          layout={layout}
          className="rounded-md overflow-hidden"
        />
      </div>
      <div className="flex items-center justify-center gap-2 flex-row mx-auto">
        <span>Choose Planet:</span>
        <Select
          placeholder={choosenPlanet}
          onChange={(e) => setChoosenPlanet(e.target.value)}
          className="items-center justify-center"
        >
          {PlanetNames.map((planetName) => (
            <option key={`Task_Five_Planet_${planetName}`} value={planetName}>
              {planetName}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default TaskFive;
