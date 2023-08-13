// import TaskOneGraph from "./components/TaskOneGraph";
// import TaskTwoGraph from "./components/TaskTwoGraph";
// import TaskThreeGraph from "./components/TaskThreeGraph";
// import TaskFourGraph from "./components/TaskFourGraph";
// import Task from "./components/Task";
// import TaskOne from "./components/TasksComponents/TaskOne";
// import TaskSix from "./components/TasksComponents/TaskSix";
// import init, { add_rust } from "wasm";
import init, { getPlanetsRadiusLookupTable } from "wasm";
// import TaskSixCopy from "./components/TaskSixCopy";
// import { ReactP5Wrapper } from "react-p5-wrapper";
import { useState, useEffect } from "react";

// function App() {
//   return (
//     <>
//       <TaskOne />
//     </>
//   );
// }

// export default App;
function App() {
  const [ans, setAns] = useState({});
  useEffect(() => {
    init().then(() => {
      setAns(getPlanetsRadiusLookupTable(["Earth"]));
      console.log(ans);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        + <p>1 + 1 = {console.log(ans)}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
