import React, { useState } from 'react';

// DeleteCar component for deleting a car based on its ID
const DeleteCar = () => {
  // State for storing car information (including car id)
  const [car, setCar] = useState({ id: '' });

  // State for handling errors and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // State for storing the list of cars
  const [cars, setCars] = useState([]);

  // Function to handle input changes and update the car state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  // Reusable fetch method
  const fetchCars = () => {
    fetch('/cars')
      .then(response => response.json())
      .then(updatedCars => setCars(updatedCars))
      .catch(() => setError('Failed to fetch updated car list.'));
  };

  // Function to handle car deletion when the form is submitted
  const handleDelete = (event) => {
    event.preventDefault();

    // Check if car ID is provided, if not show an error
    if (!car.id) {
      setError('Car ID is required for deletion.');
      return;
    }

    // Reset error and success messages before making request
    setError('');
    setSuccess('');

    // Request options for sending the DELETE request
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Perform the DELETE request to the API
    fetch(`/cars/${car.id}`, requestOptions)  
      .then((response) => {
        // If the response is not ok, throw an error with the message from the response
        if (!response.ok) {
          return response.text().then((text) => {
            // Handle non-OK responses
            throw new Error(text || 'Something went wrong');
          });
        }
        return response.text(); 
      })
      .then((data) => {
        // Set success message after successful deletion
        setSuccess('Car deleted successfully.');
        // Call methd to fetch cars.
        fetchCars(); 
      })
      .catch((error) => {
        // If there's an error, set the error message
        setError(error.message);
      });
  };

  return (
    <div>
      <h2>Delete Car</h2>
      {/* Show success message if deletion is successful */}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      {/* Show error message if validation fails or server error occurs */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Form to input car ID for deletion */}
      <form onSubmit={handleDelete}>
        <div>
          <label>Car ID:</label>
          {/* Input field for car ID */}
          <input
            type="text"
            name="id"
            value={car.id}
            onChange={handleInputChange}
          />
        </div>
        {/* Submit button to trigger car deletion */}
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

// Export the DeleteCar component
export default DeleteCar;


