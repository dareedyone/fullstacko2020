import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
    setPeopleToShow(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
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

      <Filter newFilter={newFilter} doFiltering={doFiltering} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow} />
    </div>
  );
};

export default App;
