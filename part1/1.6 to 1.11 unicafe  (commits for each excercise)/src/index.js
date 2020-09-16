import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ allState: { good, neutral, bad } }) => {
  if (good || neutral || bad) {
    return (
      <table>
        <thead>
          <tr>
            <th>Statistics</th>
          </tr>
        </thead>

        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={good + neutral + bad} />
          <Statistic
            text="Average"
            value={(good * 1 + neutral * 0 + bad * -1) / 9}
          />
          <Statistic
            text="Positive"
            value={(good / (good + neutral + bad)) * 100 + " %"}
          />
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <p>No feedback given !</p>
    </div>
  );
};

const Button = ({ onClick, setVal, text }) => (
  <button onClick={onClick}>{text}</button>
);

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
        <Button onClick={() => setGood(good + 1)} text="Good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
      </div>

      <Statistics allState={allState} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
