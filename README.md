> Note : May need to adjust styles(css + bulma) based on screen size


# Parking Management System

## Overview
The Parking Management System is a comprehensive solution designed to efficiently manage and streamline parking operations in various settings, 
such as commercial complexes, residential areas, and public spaces. This system aims to enhance the overall parking experience for both administrators and users in an university setting.
The Parking Management System utilizes Express and Node.js for the backend, including routing functionalities. Additionally, it employs EJS for dynamic templating. The project has successfully 
established a connection to a MySQL database. Furthermore, this project is heavily centered around JavaScript, both on the frontend and backend.

## Different Functionalities/Views
- One Time Check In : Allows the Administrator to permit an user into the parking lot until midnight of the same day. (or until checked out from the parkinglot)
- Re Check In : Allows any user back into the parkinglot after they do not check out but leave the parkinglot.
- Check Out : Checks out an user from the parking lot.
- New monthly pass registrant : Allots a monthly pass to an user and automatically removes the record after one month.
- Registrant Check In : Allows members, who have a monthly pass, into the parking lot.
- Add Admin : Adds an administrator(with details) into the administrator table.
- Add Security : Adds a security(with details) into the security table.
- Update Monthly Pass : Updates the monthly passes of users who only opted for a car/bike pass and not both.

## Running the project
1. This project contains a sql file which will have to be run first for the creation of the database, along with events and necessary records that need to be present within the database.
1. Please note, the credentails of the security guards and the admin in the sql file can be changed as per the need.
1. Next we will need to shift our current working directory to './Code' where we run the command ```npm install``` which downloads all the necessary node modules required for the project to run.
1. We will then need to create a .env file (in the same directory) and store information within it to help us create a connection with our database. The format for the .env file is as follows
   ```
   MYSQL_HOST = ''
   MYSQL_USER = ''
   MYSQL_PASSWORD = ''
   MYSQL_DATABASE = ''
   ```
1. We then run the command ```node index.js``` to create our own server on port 3000. (can be changed)
1. Then enter the Faculty ID and Password as given in the sql file.
