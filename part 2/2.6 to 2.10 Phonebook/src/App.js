import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName };
    setPersons(persons.concat(newPerson));
    setNewName("");
    console.log(persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(({ name }) => (
          <p key={name}>{name}</p>
        ))}
      </div>

      <div>debug: {newName}</div>
    </div>
  );
};

export default App;