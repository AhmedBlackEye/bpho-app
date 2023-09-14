import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { PlanetNames } from "@/Data/planets";
import TaskSeven from "./TaskSeven";
import TaskSevenAnimated from "./TaskSevenAnimated";

function TaskSevenOptions() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [PlanetsSelected, setPlanetsSelected] = useState([
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
  ]);
  console.log(PlanetsSelected);
  function handleOnChange(e) {
    const value = e.target.value;
    if (PlanetsSelected.includes(value)) {
      setPlanetsSelected(PlanetsSelected.filter((planet) => planet != value));
    } else {
      setPlanetsSelected([...PlanetsSelected, value]);
    }
  }
  return (
    <div className="flex p-4">
      {isPlaying ? (
        <TaskSevenAnimated planetNames={PlanetsSelected} />
      ) : (
        <TaskSeven planetNames={PlanetsSelected} />
      )}
      <div className="p-4 flex items-center justify-center flex-1">
        <div className="flex flex-col gap-4 justify-center p-4">
          <div className="flex gap-2">
            {
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
            }
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <Button colorScheme="blue" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "Stop Animation" : "Animate"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskSevenOptions;
