import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import './EmployeeList.css'; // Import CSS for styling

const initialEmployees = [
  { id: 1, name: 'Alice Johnson', position: 'Developer', checkIn: '09:00', checkOut: '17:00', breakTime: 30 }
];

function EmployeeList() {
  const [employees, setEmployees] = useState(initialEmployees);

  const addEmployee = (newEmployee) => {
    const isDuplicate = employees.some(employee => employee.name === newEmployee.name && employee.position === newEmployee.position);
    if (isDuplicate) {
      alert('An employee with the same name and position already exists.');
      return;
    }
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <div className="employee-list">
      <div className="employee-list-container">
        <center><h2>Employee List</h2></center>
        <ul>
          {employees.map(employee => (
            <li key={employee.id} className="employee-item">
              <div>
                <strong>Name:</strong> {employee.name} <br />
                <strong>Position:</strong> {employee.position} <br />
                <strong>Check-in:</strong> {employee.checkIn} <br />
                <strong>Check-out:</strong> {employee.checkOut} <br />
              </div>
              <button onClick={() => deleteEmployee(employee.id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
        <EmployeeForm addEmployee={addEmployee} />
      </div>
    </div>
  );
}

export default EmployeeList;
