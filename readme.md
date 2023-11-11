# Rooobz Cars

A car rental project for my Final Year Project. 
- Tech Stack 
    - Backend:
        - NodeJS 
        - ExpressJS 
        
    - Frontend:
        - EJS
        - HTML
        - CSS
        - JS

    - Database: 
        - MongoDB
        - AWS S3 (Document Store)
    
    - Deployment:
        - AWS EC2

## Features
1. User Registration and Login
2. Car Renting System with different types of cars available in the system.
    - Types include Sedan, SUV, Truck, Hatchback etc.
    - Each type has its own set of features like number of doors, seating capacity, fuel type, price per day etc.
    - The user can select a car based on their requirements and book it.
    - Once the booking is confirmed by both parties, an email will be sent to the user confirming the details.
    - Payment gateway integration using Stripe API.
3. Email Verification [Consideration]
4. Google Maps API Integration
5. Reviews & Ratings
6. Booking History
7. Profile Management
8. Search Functionality
9. Filter Functionality
10. Sort Functionality
11. Pagination

## Installation Guide
To run this application you need to have installed nodejs and npm package manager. You also need to install mongodb locally or use cloud database service from [MongoDB.com](https://mongodb.com)

bash
# Clone repository
git clone https://github.com/Reubzz/Rooobz-Cars.git
cd car_rental_project

# Install dependencies
npm install

# Start server
node index.js
Open your browser and visit http://localhost:80

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests