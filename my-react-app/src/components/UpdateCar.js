import React, { useState } from 'react';

// UpdateCar component for updating car information
const UpdateCar = () => {
  // State for the car object
  const [car, setCar] = useState({
    id: '',  
    model: '',
    seats: 1
  });

  // State for handling errors
  const [error, setError] = useState('');
  // State for handling success messages after car update
  const [success, setSuccess] = useState('');  

  // Update car state based on form input
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Avoid overwriting fields with empty strings
    setCar(prevCar => ({
      ...prevCar,
      [name]: value === '' ? prevCar[name] : value
    }));
  };

  // Handle form submission to update the car information
  const handleUpdate = (event) => {
    event.preventDefault();

    // Validation to ensure fields are correct before submission
    if (!car.model || car.seats < 1) {
      setError('All fields are required, and seats must be at least 1.');
      return;
    }

    // Reset error and success messages before making the request
    setError('');
    setSuccess('');  

    // Ensure car.id is available and valid
    if (!car.id) {
      setError('Car ID is missing.');
      return;
    }

    // Prepare the car data to send in the PUT request
    const carData = {
      id: car.id,
      model: car.model,
      seats: car.seats,
    };

    // Request options for the PUT request
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carData)
    };

    // Send the PUT request to update the car information
    fetch(`http://localhost:8080/cars/${car.id}`, requestOptions)
      .then(response => {
        // If the response is not ok, throw an error
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        // Set success message after car update is successful
        setSuccess('Car updated successfully!');
      })
      .catch(error => {
        // Handle any errors that occur during the update request
        console.error('Error updating car:', error);
        setError('Failed to update car. Please try again later.');
      });
  };

  return (
    <div>
      <h1> Update Car</h1>

      {/* Display success message if car update is successful */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Display error message if there's an issue with validation or the request */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Form to input car details for updating */}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Car ID:</label>
          {/* Input field for car ID */}
          <input
            type="text"
            name="id"
            value={car.id}
            onChange={handleInputChange}
            placeholder="Enter Car ID"
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
          {/* Input field for the number of seats (with a minimum of 1) */}
          <input
            type="number"
            name="seats"
            value={car.seats}
            onChange={handleInputChange}
            min="1"
          />
        </div>
        {/* Submit button to trigger car update */}
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

// Export the UpdateCar component
export default UpdateCar;




