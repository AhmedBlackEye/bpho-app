import Plot from "react-plotly.js";

import { PlanetsData } from "@/Data/planets";

function TaskOneGraph() {
  const x = PlanetsData.map((planet) => Math.pow(planet[distance], 1.5));
  const y = PlanetsData.map((planet) => planet[orbitalPeriod]);
  return (
    <Plot
      data={[
        {
          x: x,
          y: y,
          type: "scatter",
        },
      ]}
      layout={{
        width: 640,
        height: 480,
        title: "Kepler III correlation",
        xaxis: { title: "Semi-major axis of orbit(a/AU)" },
        yaxis: { title: "Orbital period(T/Yr)" },
      }}
    />
  );
}

export default TaskOneGraph;
