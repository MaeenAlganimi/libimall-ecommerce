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

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment file: `cp .env.example .env`
4. Update database credentials in `.env`
5. Run the application: `npm start`

## Deployment to Vercel

This project is ready for Vercel deployment:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `DB_USER`: Your database username
   - `DB_HOST`: Your database host
   - `DB_NAME`: Your database name
   - `DB_PASSWORD`: Your database password
   - `DB_PORT`: Your database port (usually 5432)
   - `SESSION_SECRET`: A secure session secret

## Manual GitHub Setup

1. Go to [GitHub](https://github.com) and create a new repository named `libimall-ecommerce`
2. Run these commands in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/libimall-ecommerce.git
git branch -M main
git push -u origin main
```

## Environment Variables

Create a `.env` file with:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=e-commerce
DB_PASSWORD=your_db_password
DB_PORT=5432
SESSION_SECRET=your_session_secret
```

## License

MIT License
