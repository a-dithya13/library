# Library Management System

A web-based library management system built with Node.js, Express, EJS, and SQLite.

## Features

- Librarian login with session management
- Book management — add, edit, delete books
- Student management — add, delete students with USN
- Borrowed books tracking — issue books, auto return date (15 days), overdue warnings
- Library visit tracking — entry and exit logging
- Live session timer on dashboard
- Mobile responsive design

## Tech Stack

- Backend: Node.js, Express.js
- Frontend: EJS, CSS
- Database: SQLite3
- Session: express-session

## Setup and Installation

1. Clone the repository

   git clone https://github.com/a-dithya13/library.git

2. Navigate to the project folder

   cd library

3. Install dependencies

   npm install

4. Run the server

   node app.js

5. Open in browser

   http://localhost:5000

## Default Login

Email: rajesh@library.com
Password: admin123

## Deployment

Deployed on Railway. Live at:
https://library-production-664d.up.railway.app

## Project Structure

    library/
    ├── app.js
    ├── db.js
    ├── package.json
    ├── public/
    │   └── style.css
    └── views/
        ├── login.ejs
        ├── dashboard.ejs
        ├── books.ejs
        ├── addbook.ejs
        ├── editbook.ejs
        ├── borrowed.ejs
        └── students.ejs
