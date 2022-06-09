import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getEmployees();
    return () => {};
  }, []);

  const addEmployee = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const getEmployees = () => {
    axios
      .get("http://localhost:3001/employees")
      .then((response) => setEmployeeList(response.data));
  };

  const updateEmployeeWage = (id) => {
    axios
      .put("http://localhost:3001/update", {
        id: id,
        wage: newWage,
      })
      .then(() => getEmployees());
  };

  const deleteEmployee = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => getEmployees());
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input type="text" onChange={(event) => setName(event.target.value)} />
        <label>Age:</label>
        <input type="number" onChange={(event) => setAge(event.target.value)} />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => setCountry(event.target.value)}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => setPosition(event.target.value)}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => setWage(event.target.value)}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>
        {employeeList.map((item) => (
          <div>
            <h2 key={item.id}>{item.name}</h2>
            <h2 key={item.id}>{item.wage}€</h2>
            <input
              style={{ paddingLeft: 10 }}
              type="text"
              placeholder="2000€"
              onChange={(event) => {
                setNewWage(event.target.value);
              }}
            />
            <button onClick={() => updateEmployeeWage(item.id)}>
              Update Wage
            </button>
            <button
              onClick={() => {
                deleteEmployee(item.id);
              }}
            >
              Delete Employee
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
