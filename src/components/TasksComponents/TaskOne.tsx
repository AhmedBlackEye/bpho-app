import Plot from "react-plotly.js";

import { Planets } from "@/Data/planets";
import { Data } from "plotly.js";

function TaskOne() {
  const x = Planets.map((planet) => Math.pow(planet.distance, 1.5));
  const y = Planets.map((planet) => planet.orbitalPeriod);
  const data: Data[] = [
    {
      name: "Linear (Kepler's Third Law)",
      x: x,
      y: y,
      mode: "lines",
    },
    {
      name: "Kepler's Third Law",
      x: x,
      y: y,
      mode: "markers",
      marker: {
        symbol: "diamond",
      },
    },
  ];
  const layout = {
    autosize: true,
    title: "Kepler III correlation",
    xaxis: { title: "Semi-major axis of orbit(a/AU)", range: [0, 300] },
    yaxis: { title: "Orbital period(T/Yr)", range: [0, 300] },
  };
  return (
    <Plot data={data} layout={layout} className="rounded-lg" useResizeHandler />
  );
}

export default TaskOne;
