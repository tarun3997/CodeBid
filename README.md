CodeBid 
Overview

This project is a web application built with Next.js, allowing users to participate in competitive coding challenges. The application leverages Node.js for server-side logic, Prisma for interacting with a database, and an .env file for managing sensitive information.

Prerequisites

Before running CodeBid locally, you'll need the following tools installed:

Node.js & npm: Download and install the latest version of Node.js from the official website, which also includes npm (Node Package Manager).
MySQL Workbench: Download and install MySQL Workbench, a graphical tool for managing MySQL databases.
Yarn (Optional): While not strictly required, Yarn is a popular alternative package manager for JavaScript projects.
Getting Started

Clone the Repository:

Bash
git clone https://github.com/tarun3997/CodeBid.git
Use code with caution.
content_copy
Install Dependencies:

Navigate to the client directory and install the client-side dependencies using npm or yarn:

Bash
cd client
npm install
# or
yarn install
Use code with caution.
content_copy
Then, navigate to the server directory and install the server-side dependencies:

Bash
cd ../server
npm install
# or
yarn install
Use code with caution.
content_copy
Set Up Environment Variables:

Create a file named .env in the project's root directory. This file will store sensitive information like your database connection details. Add the following lines to the .env file, replacing the placeholders with your actual values:

DATABASE_URL=""
ACCESS_TOKEN_SECRET="your_access_token_secret"
DATABASE_URL: The connection string for your MySQL database.
ACCESS_TOKEN_SECRET: A secret string used for generating access tokens.
Run Database Migrations:

Navigate back to the server directory and run the following command to apply any pending database schema changes:

Bash
cd ../server
npx prisma migrate dev
Use code with caution.
content_copy
Start the Development Server:

To start the development server and run the application locally, use one of the following commands in the server directory:

Bash
npm run dev
# or
yarn dev
Use code with caution.
content_copy
This will start the server and make the application accessible at http://localhost:3000 in your web browser.

Start the Production Server:

For production deployments, use the following command in the server directory:

Bash
npm start
# or
yarn start