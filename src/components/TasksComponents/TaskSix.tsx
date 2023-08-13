import { TPlanet, PlanetNames, getPlanetByName } from "@/Data/planets";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useState } from "react";
import { Button, Select } from "@chakra-ui/react";
import SpeedSlider from "../UI/SpeedSlider";
import SpirographSketch from "../TasksComponentHelper/SpirographSketch";

export type CustomPlanet = TPlanet & {
  XPos: number;
  YPos: number;
  path: { x: number; y: number }[];
};

function getCustomPlanetByName(planetName: string): CustomPlanet {
  return { ...getPlanetByName(planetName), XPos: 0, YPos: 0, path: [] };
}

export default function TaskSix() {
  const [PlanetsPair, setPlanetsPair] = useState([
    getCustomPlanetByName("Earth"),
    getCustomPlanetByName("Venus"),
  ]);

  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  function handlePlanetChange(planetName: string, index: number) {
    index === 0
      ? setPlanetsPair([
          getCustomPlanetByName(planetName),
          getCustomPlanetByName(PlanetsPair[1].name),
        ])
      : setPlanetsPair([
          getCustomPlanetByName(PlanetsPair[0].name),
          getCustomPlanetByName(planetName),
        ]);
  }
  function handleRestart(): void {
    setPlanetsPair([
      getCustomPlanetByName(PlanetsPair[0].name),
      getCustomPlanetByName(PlanetsPair[1].name),
    ]);
  }
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg max-w-fit ">
      <div className="rounded-lg overflow-hidden">
        <ReactP5Wrapper
          sketch={SpirographSketch}
          planets={PlanetsPair}
          speed={speed}
          isPlaying={isPlaying}
        />
      </div>
      <div className="flex flex-col gap-4 justify-center p-4">
        <div className="flex gap-2">
          {[0, 1].map((i) => (
            <Select
              key={`planet_select${i}`}
              placeholder={PlanetsPair[i].name}
              onChange={(e) => handlePlanetChange(e.target.value, i)}
            >
              {PlanetNames.map(
                (planetName) =>
                  PlanetsPair[0].name !== planetName &&
                  PlanetsPair[1].name !== planetName && (
                    <option key={`${planetName}_${i}`} value={planetName}>
                      {planetName}
                    </option>
                  )
              )}
            </Select>
          ))}
        </div>
        <div className="max-w-lg my-4">
          <SpeedSlider
            onValueChangeEnd={(value) => {
              setSpeed(value);
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <Button
            colorScheme="blue"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-grow"
          >
            {isPlaying ? "Pause" : "Resume"}
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleRestart}
            className="flex-grow"
          >
            Restart
          </Button>
        </div>
      </div>
    </div>
  );
}
