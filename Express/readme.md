# API Testing with Postman

## 1. Install Postman

## 2. Start the server
   npm start

3. Test GET /api (Get all cars):
   Open Postman and select the GET method.
   Enter the URL http://localhost:8080/api.
   Click Send to get the list of all cars.

4. Test POST /cars (Add a new car):
   Open Postman and select the POST method.
   Enter the URL http://localhost:8080/cars.
   Go to the Body tab and select raw and JSON.
   Add details of the car as you wish.
   Click Send to add the new car.

5. Test DELETE /cars/:id (Delete a car):
   Open Postman and select the DELETE method.
   Enter the URL http://localhost:8080/cars/3 (replace 3 with the ID of the car you want to delete).
   Click Send to delete the car.

6. Test PUT /cars/:id (Update a car):
   Open Postman and select the PUT method.
   Enter the URL http://localhost:8080/cars/3 (replace 3 with the ID of the car you want to update).
   Go to the Body tab and select raw and JSON.
   Update the details of the car as you wish.
   Click Send to update the car.