import { useState } from "react";
import Plot from "react-plotly.js";
import { SolarSystem } from "../TasksComponentHelper/SolarSystem";
import { Checkbox } from "@chakra-ui/react";
import { PlanetNames } from "@/Data/planets";
const layout = {
  width: 640,
  height: 480,
  title: "Solar System 2D Animation",
  xaxis: { title: "x/AU" },
  yaxis: { title: "y/AU" },
};

function TaskTwo() {
  const [PlanetsSelected, setPlanetsSelected] = useState([
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
  ]);
  const solarSystem = new SolarSystem(PlanetsSelected);
  function handleOnChange(e) {
    const value = e.target.value;
    if (PlanetsSelected.includes(value)) {
      setPlanetsSelected(PlanetsSelected.filter((planet) => planet !== value));
    } else {
      setPlanetsSelected([...PlanetsSelected, value]);
    }
  }

  const data = solarSystem.getOrbits();
  console.log(data);

  return (
    <div className="flex  items-center justify-center p-4 flex-1 ">
      <Plot data={data} layout={layout} />

      <div className="p-4">
        <div className="flex flex-wrap gap-6">
          {PlanetNames.map((planetName) => (
            <Checkbox
              key={planetName}
              value={planetName}
              size="lg"
              isChecked={PlanetsSelected.includes(planetName)}
              onChange={handleOnChange}
            >
              {planetName}
            </Checkbox>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskTwo;
