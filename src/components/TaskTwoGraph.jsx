import React from "react";
import Plot from "react-plotly.js";
import * as math from "mathjs";
import { PlanetsData } from "@/Data/planets";

function TaskTwoGraph() {
  const eccentricity = PlanetsData.map((planet) => planet.Eccentricity);
  const a = PlanetsData.map((planet) => planet["Distance/ AU"]);

  const theta = math.range(0, 2 * math.pi, 0.01);
  const data = a.map((aVal, i) => {
    const r = math.multiply(
      aVal,
      math.dotDivide(
        math.subtract(1, Math.pow(eccentricity[i], 2)),
        math.subtract(
          1,
          math.dotMultiply(eccentricity[i], math.map(theta, math.cos))
        )
      )
    );
    const x = math.dotMultiply(r, math.map(theta, math.cos));
    const y = math.dotMultiply(r, math.map(theta, math.sin));

    return {
      type: "scatter",
      mode: "lines",
      x: x.toArray(), // Convert math.js array to JavaScript array
      y: y.toArray(), // Convert math.js array to JavaScript array
      name: PlanetsData[i].Planet,
    };
  });

  return (
    <Plot
      data={data}
      layout={{
        width: 640,
        height: 480,
        title: "Solar System 2D Animation",
        xaxis: { title: "x/AU", range: [-2, 2] },
        yaxis: { title: "y/AU", range: [-2, 2] },
      }}
    />
  );
}

export default TaskTwoGraph;
