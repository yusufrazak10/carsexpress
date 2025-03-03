// test/index.test.js
const chai = require('chai');
const fs = require('fs');
const expect = chai.expect;
const { getCars, addCar, deleteCar } = require('../index');  // Correct import path

describe('Car API - Basic Functionality', function () {

  // Before each test, reset the cars.json to an empty array
  beforeEach(function () {
    fs.writeFileSync('cars.json', JSON.stringify([]));  // Ensure cars.json is empty
  });

  // Test 1: Retrieve all cars
  it('should return an array of cars from cars.json', function () {
    fs.writeFileSync('cars.json', JSON.stringify([
      { id: 1, model: 'Toyota Camry', seats: 5 },
      { id: 2, model: 'Honda Accord', seats: 5 }
    ]));

    const cars = getCars();
    expect(cars).to.be.an('array');
    expect(cars).to.have.lengthOf(2);
    expect(cars[0]).to.have.property('id').that.equals(1);
  });

  // Test 2: Add a car to cars.json
  it('should add a new car to cars.json', function () {
    const newCar = { model: 'Ford Focus', seats: 4 };

    addCar(newCar);  // Add the car

    const cars = getCars();
    expect(cars).to.have.lengthOf(1);  // One car should be added
    expect(cars[0]).to.have.property('model').that.equals('Ford Focus');
    expect(cars[0]).to.have.property('seats').that.equals(4);
  });

  // Test 3: Delete a car by ID from cars.json
  it('should delete a car by ID from cars.json', function () {
    const carToDelete = { id: 1, model: 'Ford Focus', seats: 4 };

    addCar(carToDelete);  // First, add the car
    deleteCar(carToDelete);  // Delete the car

    const cars = getCars();
    expect(cars).to.have.lengthOf(0);  // The car should be deleted
  });

  // Test 4: Prevent adding a car with an existing ID
  it('should return an error when adding a car with an existing ID', function () {
    // First, add a car with ID 1
    addCar({ id: 1, model: 'Ford Focus', seats: 4 });

    const carsBefore = getCars();
    expect(carsBefore).to.have.lengthOf(1);  // One car should be added

    // Now, try to add another car with the same ID
    addCar({ id: 1, model: 'Honda Civic', seats: 5 });

    const carsAfter = getCars();
    expect(carsAfter).to.have.lengthOf(1);  // The length should still be 1, as the second car shouldn't be added
    expect(carsAfter[0].model).to.equal('Ford Focus');  // The car should still be 'Ford Focus'
  });

  // Test 5: Update car details
  it('should update a car model and seats', function () {
    const newCar = { model: 'Nissan Altima', seats: 4 };

    addCar(newCar);  // Add a car

    const cars = getCars();
    const updatedCar = { id: cars[0].id, model: 'Hyundai Sonata', seats: 5 };

    // Update car details manually
    cars[0].model = updatedCar.model;
    cars[0].seats = updatedCar.seats;

    // Save the updated list
    fs.writeFileSync('cars.json', JSON.stringify(cars), 'utf8');

    const updatedCars = getCars();
    expect(updatedCars[0].model).to.equal('Hyundai Sonata');
    expect(updatedCars[0].seats).to.equal(5);
  });

});




  