import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [peopleToShow, setPeopleToShow] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => {
        setPersons(res.data);
        setPeopleToShow(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = persons.find(({ name }) => name === newName);
    if (found) {
      return alert(`${newName} is already added to phonebook`);
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    };
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
