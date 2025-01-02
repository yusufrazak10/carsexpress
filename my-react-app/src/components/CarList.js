import React, { useState, useEffect } from 'react';

// CarList component to display car data
const CarList = () => {
  // State for storing the fetched car data
  const [cars, setCars] = useState([]);
  // State for storing any error messages
  const [error, setError] = useState(null);

  // useEffect hook to fetch car data when the component mounts
  useEffect(() => {
    // Fetch car data from the API
    fetch('http://localhost:8080/api') 
      .then((response) => {
        // If the response is not ok, throw an error
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON data from the response
        return response.json();
      })
      .then((data) => {
        // Store the fetched array of cars in the state
        setCars(data);
      })
      .catch((error) => {
        // If there's an error, store the error message in the state
        setError(error.message);
      });
  }, []); 

  return (
    <div>
      {/* Display error message if there's an error */}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {/* Display the list of cars */}
      <ul>
        {/* If no cars are available, show a message */}
        {cars.length === 0 ? (
          <li>No cars available.</li> 
        ) : (
          // Map over the array of cars and display each car
          cars.map((car) => (
            <li key={car.id} style={{ marginBottom: '20px' }}>
              <div>
                {/* Display the car's ID */}
                <p>Car ID: {car.id}</p>

                {/* Display the car's make and model */}
                <h3>{car.make} {car.model}</h3>
                
                {/* Display the number of seats */}
                <p>Seats: {car.seats}</p>

                {/* Display a placeholder image of a car */}
                <img 
                  src="https://images.unsplash.com/photo-1643142314404-32a911f3ede2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
                  alt="Image of seats"
                  style={{ width: '100px', height: 'auto', display: 'block' }} 
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

// Export the CarList component
export default CarList;








