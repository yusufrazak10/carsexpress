const express = require('express')
const fs = require('fs')
const cors = require('cors');
const app = express()
const path = require('path');


// Set the port to listen on, default to 3000 if not specified.
const port = process.env.PORT || 3000

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app (the build folder)
  app.use(express.static(path.join(__dirname, 'my-react-app/build')));
  
  // Catch-all handler to serve the React app's index.html for any route
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'my-react-app', 'build', 'index.html'));
  });
}


// Function to get all cars from the JSON file
function getCars() {
  try {
    // Read the cars.json file
    const content = fs.readFileSync('cars.json', 'utf8')
    // Parse the JSON content
    return JSON.parse(content)
  } catch (e) {
    // If the file doesn't exist or there's an error, create an empty array
    fs.writeFileSync('cars.json', '[]')
    return []
  }
}

// Function to add a new car to the JSON file
function addCar(car) {
  // Retrieve the current list of cars
  const cars = getCars()

  // Automatically generate an ID if not provided
  if (!car.id) {
    const newId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1
    car.id = newId
  }
  // Add the new car to the list
  cars.push(car)
  // Save the updated list of cars back to the file
  fs.writeFile('cars.json', JSON.stringify(cars), 'utf8', (err) => {
    if (err) {
      console.error(`Failed to add car: ${err.message}`)
    } else {
      console.log('Car added successfully')
    }
  })
}

// Function to delete a car from the JSON file
function deleteCar(car) {
  // Retrieve the current list of cars
  const cars = getCars();
    
  // Find the index of the car to delete
  const i = cars.findIndex(c => c.id === car.id);  // Compare by ID
    
  if (i !== -1) {
    // Remove the car from the list
    cars.splice(i, 1);
      
    // Save the updated list of cars back to the file
    fs.writeFile('cars.json', JSON.stringify(cars), 'utf8', (err) => {
      if (err) {
        console.error(`Failed to delete car: ${err.message}`);
      } else {
        console.log('Car deleted successfully');
      }
    });
  } else {
    console.error("Car not found.");
  }
}
  

// Use the JSON middleware to parse incoming JSON requests
app.use(express.json())

// Route to get all cars
app.get('/api', (request, response) => {
  // Read the file content
  const content = fs.readFileSync('cars.json', 'utf8')
  // Log the content to the console
  console.log(content)
  // Send the content back as the response
  response.json(JSON.parse(content))
})

// Route to add a new car
app.post('/cars', (request, response) => {
  // Get the car data from the request body
  const newCar = request.body;
  const cars = getCars();

  // Check if a car with the same ID already exists
  const carExists = cars.find(car => car.id === newCar.id);

  if (carExists) {
    return response.status(409).json({ error: 'Car with this ID already exists' });
  } else {
    // If the car doesn't exist, add it using the addCar method
    addCar(newCar);
    return response.status(201).json({ message: 'Car added successfully.' });
  }
});


// Route to delete a car by ID
app.delete('/cars/:id', (request, response) => {
  // Get the car ID from the URL parameter
  const carToDeleteId = Number(request.params.id)
  const cars = getCars()

  // Find the car to delete by ID
  const carToDelete = cars.find(car => car.id === carToDeleteId)

  if (carToDelete) {
    // If the car exists, delete it using the deleteCar function
    deleteCar(carToDelete)
    response.status(200).send('Car deleted successfully.')
  } else {
    return response.status(409).send('Car with this ID does not exist')
  }
})

// Route to update a car's model or number of seats by ID
app.put('/cars/:id', (request, response) => {
  // Get the updated car model from the request body
  const carModel = request.body.model
  // Get the updated number of seats from the request body
  const numOfSeats = request.body.seats
  // Get the car ID from the URL parameter
  const carToUpdate = Number(request.params.id);

  const cars = getCars()

  // Find the index of the car to update by ID
  const carIndex = cars.findIndex(car => car.id === carToUpdate)

  if (carIndex === -1) {
    return response.status(404).send('Car with this ID does not exist')
  } else {
    // Update car details if provided in request.
    if (carModel !== undefined && carModel !== '') {
      cars[carIndex].model = carModel
    }
    if (numOfSeats !== undefined && numOfSeats !== '') {
      cars[carIndex].seats = numOfSeats
    }

    // Save the updated cars list
    fs.writeFile('cars.json', JSON.stringify(cars), 'utf8', (err) => {
      if (err) {
        console.error(`Failed to update car: ${err.message}`)
      } else {
        console.log('Car updated successfully')
      }
    })
    response.status(200).json({ message: 'Car updated successfully.' });
  }
})

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
