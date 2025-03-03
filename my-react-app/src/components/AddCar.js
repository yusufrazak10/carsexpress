import React, { useState } from 'react';

// AddCar component for adding a new car
const AddCar = () => {
  // State for the car object with initial values
  const [car, setCar] = useState({
    make: '',
    model: '',
    seats: 1
  });

  // State for handling error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // State for storing the list of cars
  const [cars, setCars] = useState([]);

  // Handle input changes and update car state accordingly
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Handle seats as a numeric value and ensure it's a valid number
    if (name === 'seats') {
      const numericValue = parseInt(value, 10);
      setCar(prevCar => ({
        ...prevCar,
        [name]: isNaN(numericValue) ? 1 : numericValue 
      }));
    } else {
      // Update other fields normally
      setCar(prevCar => ({
        ...prevCar,
        [name]: value
      }));
    }
  };

  // Reusable fetch method
  const fetchCars = () => {
    fetch('/cars')
      .then(response => response.json())
      .then(updatedCars => setCars(updatedCars))
      .catch(() => setError('Failed to fetch updated car list.'));
  };

  // Handle form submission to add the car
  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset previous success or error messages on form submit
    setError('');
    setSuccess('');

    // Validate form input to ensure all fields are filled and seats are valid
    if (!car.make || !car.model || car.seats < 1) {
      setError('All fields are required, and seats must be at least 1.');
      return; // Exit early if validation fails
    }

    // Prepare car data to send to the server
    const carData = {
      make: car.make,
      model: car.model,
      seats: car.seats,
    };

    fetch('/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carData)
    })
      .then(response => {
        // If server returns non-OK status, throw an error
        if (!response.ok) {
          throw new Error('Failed to add car. Server response not OK.');
        }
        return response.json(); 
      })
      .then(() => {
        // Show success message after successfully adding the car
        setSuccess('Car added successfully!');
        // Call methd to fetch cars.
        fetchCars(); 
      })
      .catch(() => {
        // Handle fetch failure or any other errors
        setError('Failed to add car. Please try again later.');
      });
    }    

  return (
    <div>
        
      <h1>Add Car</h1>

      {/* Display success message if car is added successfully */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Display error message if there is an issue with the submission */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Form to input new car details */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Make:</label>
          {/* Input field for car make */}
          <input
            type="text"
            name="make"
            value={car.make}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Model:</label>
          {/* Input field for car model */}
          <input
            type="text"
            name="model"
            value={car.model}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Seats:</label>
          {/* Input field for number of seats, with a minimum value of 1 */}
          <input
            type="number"
            name="seats"
            value={car.seats}
            onChange={handleInputChange}
            min="1"
          />
        </div>
        {/* Submit button to add the car */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Export the AddCar component
export default AddCar; 












