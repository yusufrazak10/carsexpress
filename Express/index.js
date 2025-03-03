// index.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const app = express();

const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(express.json()); // JSON middleware for parsing incoming JSON requests

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'my-react-app/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'my-react-app', 'build', 'index.html'));
  });
}

// Utility function to get all cars from the JSON file
function getCars() {
  try {
    const content = fs.readFileSync('cars.json', 'utf8');
    return JSON.parse(content);
  } catch (e) {
    fs.writeFileSync('cars.json', '[]');
    return [];
  }
}

// Function to add a new car to the JSON file
function addCar(car) {
  const cars = getCars();

  // Check if a car with the same ID already exists
  const carExists = cars.find(existingCar => existingCar.id === car.id);
  if (carExists) {
    console.error(`Car with ID ${car.id} already exists.`);
    return; // Do not add the car if the ID already exists
  }

  // If the car doesn't have an ID, auto-generate one
  if (!car.id) {
    const newId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
    car.id = newId;
  }

  cars.push(car);
  fs.writeFileSync('cars.json', JSON.stringify(cars), 'utf8');
  console.log('Car added successfully');
}

// Function to delete a car from the JSON file
function deleteCar(car) {
  const cars = getCars();
  const index = cars.findIndex(existingCar => existingCar.id === car.id);

  if (index !== -1) {
    cars.splice(index, 1);
    fs.writeFileSync('cars.json', JSON.stringify(cars), 'utf8');
    console.log('Car deleted successfully');
  } else {
    console.error('Car not found');
  }
}

// API Routes

// Route to get all cars
app.get('/api', (req, res) => {
  const cars = getCars();
  res.json(cars);
});

// Route to add a new car
app.post('/cars', (req, res) => {
  const newCar = req.body;
  const cars = getCars();

  // Check for duplicate ID
  const carExists = cars.find(car => car.id === newCar.id);
  if (carExists) {
    return res.status(409).json({ error: 'Car with this ID already exists' });
  }

  addCar(newCar); // Add the car
  res.status(201).json({ message: 'Car added successfully' });
});

// Route to delete a car by ID
app.delete('/cars/:id', (req, res) => {
  const carId = Number(req.params.id);
  const cars = getCars();
  const carToDelete = cars.find(car => car.id === carId);

  if (carToDelete) {
    deleteCar(carToDelete);
    res.status(200).json({ message: 'Car deleted successfully' });
  } else {
    res.status(404).json({ error: 'Car not found' });
  }
});

// Route to update a car's model or number of seats by ID
app.put('/cars/:id', (req, res) => {
  const carId = Number(req.params.id);
  const { model, seats } = req.body;
  const cars = getCars();

  const carIndex = cars.findIndex(car => car.id === carId);
  if (carIndex === -1) {
    return res.status(404).json({ error: 'Car not found' });
  }

  if (model) {
    cars[carIndex].model = model;
  }
  if (seats) {
    cars[carIndex].seats = seats;
  }

  fs.writeFileSync('cars.json', JSON.stringify(cars), 'utf8');
  res.status(200).json({ message: 'Car updated successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = { getCars, addCar, deleteCar };

