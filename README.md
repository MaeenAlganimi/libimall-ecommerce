# LibiMall - Premium E-commerce Platform

A professional e-commerce website built with Node.js, Express, PostgreSQL, and Bootstrap.

## Features

- **Modern Design**: Professional UI with gradient themes and smooth animations
- **Product Categories**: Fashion, Electronics, Accessories with dedicated pages
- **Shopping Cart**: Functional cart system with localStorage persistence
- **User Authentication**: Login/Register system with bcrypt password hashing
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Database Integration**: PostgreSQL with user sessions

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with pg module
- **Authentication**: Passport.js with bcrypt
- **Frontend**: EJS templating, Bootstrap 5, Vanilla JavaScript
- **Session Management**: express-session with connect-pg-simple

## Pages

- **Homepage**: Hero section, product showcase, categories
- **Products**: Comprehensive product catalog with filtering
- **Fashion**: Fashion-focused products with size/color options
- **Electronics**: Tech products with specifications
- **Accessories**: Luxury accessories collection
- **Cart**: Shopping cart with quantity controls and pricing
- **Auth**: Login and registration pages

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL database
4. Update database credentials in `server.js`
5. Run the application: `npm start`

## Environment Variables

Create a `.env` file with:
```
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=e-commerce
DB_PASSWORD=your_db_password
DB_PORT=5432
SESSION_SECRET=your_session_secret
```

## Deployment

This project is configured for Vercel deployment with `vercel.json`.

## License

MIT License
