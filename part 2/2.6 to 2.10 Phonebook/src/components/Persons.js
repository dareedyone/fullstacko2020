import React from "react";

const Persons = ({ peopleToShow }) => {
  return (
    <div>
      {peopleToShow.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
