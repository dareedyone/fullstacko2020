import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ allState: { good, neutral, bad } }) => {
  if (good || neutral || bad) {
    return (
      <div>
        <h3>Statistics</h3>

        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {good + neutral + bad}</p>
        <p>Average {(good * 1 + neutral * 0 + bad * -1) / 9}</p>
        <p>Positive {(good / (good + neutral + bad)) * 100} %</p>
      </div>
    );
  }

  return (
    <div>
      <p>No feedback given !</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const allState = {
    good,
    neutral,
    bad,
  };

  return (
    <div>
      <h3>Give feedback</h3>

      <div>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>

      <Statistics allState={allState} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
