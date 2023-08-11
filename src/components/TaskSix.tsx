import { Planet, PlanetsData } from "@/Data/planets";
import { ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import { useState } from "react";

type MySketchProps = SketchProps & {
  planets: CustomPlanet[];
  isPlaying: boolean;
  speed: number;
};

type CustomPlanet = {
  name: string;
  distance: number;
  radius: number;
  orbitalPeriod: number;
  Eccentricity: number;
  angle: number;
  XPos: number;
  YPos: number;
  path: { x: number; y: number }[];
};

const SketchSize = 500;

const sketch: Sketch<MySketchProps> = (p5) => {
  let planet1: CustomPlanet, planet2: CustomPlanet;
  let sunX: number, sunY: number;
  let N: number;
  let isPlaying: boolean;

  let linesNum = 0;
  let speed = 1;

  // Number of orbits of the outermost planet

  p5.updateWithProps = (props) => {
    [planet1, planet2] = props.planets;

    // Normalize the distances to fit within the canvas
    if (planet1.distance > planet2.distance) {
      planet2.distance =
        (SketchSize / 2) * (planet2.distance / planet1.distance);
      planet1.distance = SketchSize / 2;
    } else {
      planet1.distance =
        (SketchSize / 2) * (planet1.distance / planet2.distance);
      planet2.distance = SketchSize / 2;
    }
    N = Math.min(planet1.orbitalPeriod, planet2.orbitalPeriod) / 10;
    isPlaying = props.isPlaying;
    speed = props.speed * 2;
  };

  p5.setup = () => {
    p5.createCanvas(SketchSize, SketchSize);
    sunX = p5.width / 2;
    sunY = p5.height / 2;

    p5.frameRate(60);
  };

  p5.draw = () => {
    if (isPlaying) {
      p5.background(200);

      for (let i = 0; i < planet1.path.length; i++) {
        p5.line(
          planet1.path[i].x,
          planet1.path[i].y,
          planet2.path[i].x,
          planet2.path[i].y
        );
      }

      // Draw the sun (center)
      p5.stroke(0);
      p5.fill(255, 204, 0);
      p5.ellipse(sunX, sunY, 50, 50);

      for (const planet of [planet1, planet2]) {
        const { distance, Eccentricity, angle } = planet;
        const r =
          (distance * (1 - Eccentricity ** 2)) /
          (1 - Eccentricity * Math.cos(angle));
        planet.XPos = sunX + r * Math.cos(angle);
        planet.YPos = sunY + r * Math.sin(angle);
        if (linesNum % 2) {
          planet.path.push({ x: planet.XPos, y: planet.YPos });
        }

        // Draw the orbiting circle
        p5.stroke(0);
        p5.fill(100);
        p5.ellipse(planet.XPos, planet.YPos, 10, 10);

        planet.angle += N / planet.orbitalPeriod;
      }
      linesNum += 1;
      isPlaying = planet1.path.length < 2000;

      // Draw lines between the paths of the two planets
    }
  };
};

export default function TaskSix() {
  const PlanetPair: CustomPlanet[] = PlanetsData.filter(
    (planet) => planet.name === "Mercury" || planet.name === "Earth"
  ).map((planet) => ({
    name: planet.name,
    distance: planet.distance,
    radius: planet.radius,
    orbitalPeriod: planet.orbitalPeriod,
    Eccentricity: planet.Eccentricity,
    angle: 0,
    XPos: 0,
    YPos: 0,
    path: [],
  }));
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  return (
    <div>
      <button onClick={() => setIsPlaying(!isPlaying)} className="">
        {isPlaying ? "Pause" : "Play"}
      </button>

      <ReactP5Wrapper
        sketch={sketch}
        planets={PlanetPair}
        isPlaying={isPlaying}
        speed={speed}
      />
    </div>
  );
}
