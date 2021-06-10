import React, { useState, useEffect } from 'react';
import { Arwes } from 'arwes';

interface LogProps {}

function Log({}: LogProps) {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  /*useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);*/
  // Return the App component.
  return <Arwes>
    <p>
      Edit <code>src/App.tsx</code> and save to reload.
    </p>
    <p>
      Page has been open for 0 seconds.
    </p>
    <p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </p>
  </Arwes>;
}

export default Log;
