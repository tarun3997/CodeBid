CodeBid

Overview
This project is a web application built with Next.js, utilizing Node.js for server-side logic, Prisma for database interactions, and an .env file for managing environment variables.

Prerequisites
Before running this project locally, ensure you have the following installed:

Node.js & npm: Download & Install Node.js
MySQL Workbench: Download & Install MySQL Workbench
Yarn (optional): Download & Install Yarn
Getting Started
Clone the repository:

bash

git clone https://github.com/tarun3997/CodeBid.git


Install dependencies for both client and server:

bash

Copy code
# Navigate to the client folder
cd client
npm install
# or
yarn

# Navigate to the server folder
cd ../server
npm install
# or
yarn

Set up environment variables:

Create a .env file in the root of the project with the following variables:

plaintext

DATABASE_URL=""

ACCESS_TOKEN_SECRET = 1e87b249851c88a227001359d95f66f09d60dc5511cb682c74dbbab4b3a4a95fa64bc4781d7ac1f829b945669d1248376fd0b55e8a66f4062f1081cea23ba78
Replace your_database_url_here with the connection URL for your MySQL database.

Run migrations:

cd ../server

npx prisma migrate dev

This will apply any pending migrations to your database.

Start the development server:

cd ../client
npm run dev
# or
yarn dev

# Start the server
cd ../server
npm start

Your Next.js app should now be running on http://localhost:3000.

Additional Information
Prisma Documentation: Prisma Documentation
Next.js Documentation: Next.js Documentation
Node.js Documentation: Node.js Documentation
Environment Variables: dotenv Documentation

Contributing
Contributions are welcome! Please see the Contributing Guidelines for more details.



