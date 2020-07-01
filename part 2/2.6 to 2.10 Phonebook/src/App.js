import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [peopleToShow, setPeopleToShow] = useState(persons);
  const [newFilter, setNewFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = persons.find(({ name }) => name === newName);
    if (found) {
      return alert(`${newName} is already added to phonebook`);
    }
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  const doFiltering = (e) => {
    setNewFilter(e.target.value);
    const re = new RegExp(newFilter, "i");
    const match = persons.filter((person) => re.test(person.name));
    match.length > 0 ? setPeopleToShow(match) : setPeopleToShow(persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        Filter shown with: <input value={newFilter} onChange={doFiltering} />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Add a new</h3>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {peopleToShow.map(({ name, number }) => (
          <p key={name}>
            {name} {number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
