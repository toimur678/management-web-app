# User Guide

## Requirements
Before running this project, ensure you have the following installed:

- Node.js  
- XAMPP  

## Installation
1. Download the project as a zip file and extract it.  
2. Open the project in Visual Studio Code.  
3. Open a terminal in VS Code and navigate to the application directory:  
   ```bash
   cd app
   ```  
4. Install the required dependencies by running:  
   ```bash
   npm install
   ```  
5. Start the development server:  
   ```bash
   npm run dev
   ```  
6. Open another terminal in VS Code and navigate to the server directory:  
   ```bash
   cd server
   ```  
7. Install the server dependencies:  
   ```bash
   npm install
   ```  
8. Start the server:  
   ```bash
   npm start
   ```  

## Database Setup
1. Start XAMPP and ensure the Apache and MySQL services are running.  
2. Open your web browser and go to `localhost/phpmyadmin`.  
3. Create a new database and name it "app".  
4. Import the provided SQL file `backup.sql` into the database.  
