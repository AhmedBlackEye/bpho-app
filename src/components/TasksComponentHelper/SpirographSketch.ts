import { Sketch, SketchProps } from "@p5-wrapper/react";
import p5 from "p5";
import { SunImg, planetImageLookup } from "@/assets";
import { PlanetNames } from "@/Data/planets";
import { CustomPlanet } from "../TasksComponents/TaskSix";

const SketchSize = 500;

type MySketchProps = SketchProps & {
  planets: CustomPlanet[];
  speed: number;
  isPlaying: boolean;
};

function SpirographSketch(p: Sketch<p5>): void {
  let planet1: CustomPlanet, planet2: CustomPlanet;
  let sunX: number, sunY: number;
  let N: number;
  let linesNum = 0;
  const P5SolarImgsLookup: Record<string, p5.Image> = {};

  p.preload = () => {
    PlanetNames.forEach((planetName) => {
      P5SolarImgsLookup[planetName] = p.loadImage(
        planetImageLookup[planetName]
      );
    });
    P5SolarImgsLookup["Sun"] = p.loadImage(SunImg);
  };

  p.updateWithProps = ({ planets, speed, isPlaying }: MySketchProps) => {
    [planet1, planet2] = planets;

    if (planet1.distance > planet2.distance) {
      [planet1.distance, planet2.distance] = [
        (SketchSize * 0.75) / 2,
        ((SketchSize * 0.75) / 2) * (planet2.distance / planet1.distance),
      ];
    } else {
      [planet2.distance, planet1.distance] = [
        (SketchSize * 0.75) / 2,
        ((SketchSize * 0.75) / 2) * (planet1.distance / planet2.distance),
      ];
    }

    N = Math.min(planet1.orbitalPeriod, planet2.orbitalPeriod) / 10;
    p.frameRate(60 * speed);
    isPlaying ? p.loop() : p.noLoop();
  };

  p.setup = () => {
    p.createCanvas(SketchSize, SketchSize);
    sunX = p.width / 2;
    sunY = p.height / 2;
  };

  p.draw = () => {
    if (linesNum > 20000) {
      p.noLoop();
    }
    p.background(0);
    for (let i = 0; i < planet1.path.length; i++) {
      p.stroke(255, 255, 255, 40);
      p.line(
        planet1.path[i].x,
        planet1.path[i].y,
        planet2.path[i].x,
        planet2.path[i].y
      );
    }
    // Draw the sun (center)
    p.image(P5SolarImgsLookup["Sun"], sunX - 25, sunY - 25, 50, 50);

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

      // Draw the orbiting Planet
      p.image(
        P5SolarImgsLookup[planet.name],
        planet.XPos - 15, // Adjust the image position based on its dimensions
        planet.YPos - 15,
        30,
        30
      );

      planet.angle += N / planet.orbitalPeriod;
    }
    linesNum += 1;
  };
}

export default SpirographSketch;
