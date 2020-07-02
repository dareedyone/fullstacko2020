import React from "react";

const Persons = ({ peopleToShow }) => {
  return (
    <div>
      {peopleToShow.map(({ name, number, id }) => (
        <p key={id}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
