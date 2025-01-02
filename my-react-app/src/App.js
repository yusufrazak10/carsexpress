import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import components
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import UpdateCar from './components/UpdateCar';
import DeleteCar from './components/DeleteCar';

function App() {
  return (
    <Router>
      <div className="App">
        {/* This will appear on every page */}
        <header className="App-header">
          <h1>Car Management System</h1>
        </header>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/add-car">Add a New Car</Link>
            </li>
            <li>
              <Link to="/update-car">Update an Existing Car</Link>
            </li>
            <li>
              <Link to="/delete-car">Delete a Car</Link>
            </li>
          </ul>
        </nav>

        {/* Render CarList on every page */}
        <CarList />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<h2>List of Cars</h2>} /> {/* Or any other page content */}
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/update-car" element={<UpdateCar />} />
          <Route path="/delete-car" element={<DeleteCar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;








