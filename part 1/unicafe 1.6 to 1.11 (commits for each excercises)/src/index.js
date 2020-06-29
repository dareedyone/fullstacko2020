import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h3>Give feedback</h3>

      <div>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>

      <div>
        <h3>Statistics</h3>

        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
      </div>

      <div>
        <p>All {good + neutral + bad}</p>
      </div>

      <div>
        <p>Average {(good * 1 + neutral * 0 + bad * -1) / 9}</p>
      </div>

      <div>
        <p>Positive {(good / (good + neutral + bad)) * 100} %</p>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
