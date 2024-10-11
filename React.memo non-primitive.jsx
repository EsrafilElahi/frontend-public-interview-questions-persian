import React from "react";

const Test = ({ data }) => {
  console.log("Test Component re-render");

  return <div>{data.name}</div>;
};

export default React.memo(Test);


// ============================================== //

import React, { useState } from "react";
import Test from "./Test";

function App() {
  const [count, setCount] = useState(0);

  // non-primitive re-created on every re-render of App.jsx component
  const incorrectData = () => {
    return { name: "esrafil" };
  };

  // use useMemo to ensure the same reference is passed unless dependency-array changes
  const correctData = React.useMemo(() => {
    return { name: "esrafil" };
  }, []);

  console.log("App re-render");

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>toggle</button>
      <span>{count}</span>
      <Test data={incorrectData} /> {/* this re-render on every change */}
      <Test data={correctData} />{" "}
      {/* this not re-render on every change , just once render */}
    </div>
  );
}

export default App;
