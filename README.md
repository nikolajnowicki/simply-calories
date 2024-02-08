# Simply Calories

Simply Calories is my exam project and is a comprehensive calorie and fasting tracker app designed to help you manage your diet and fasting schedules effectively. Built with the latest web technologies, it offers a user-friendly interface and powerful features to monitor your calorie intake and track fasting periods. And best of all it is free to use!

## Features

- **Calorie Tracking:** Easily log your daily calorie intake and monitor your diet.
- **Fasting Schedules:** Set up and follow your fasting schedules to achieve your diet goals.
- **Recipe Search:** Use the recipe search to find recipes and find out what they contain in form of nutrients.
- **Recipe Maker:** Make your own recipes and get back the caloric data for all ingredients and the final dish.
- **Interactive Charts:** Visualize your progress over time with interactive charts powered by Chart.js.
- **Responsive Design:** A mobile-friendly interface that looks great on all devices.
- **Secure Authentication:** Log in securely with Next-Auth integration.

## Technologies

Simply Calories is built with the following technologies:

- Next.js for the frontend and server-side rendering
- Prisma as the ORM for database management
- PostgreSQL for the database (with Vercel integration)
- Tailwind CSS and Material Tailwind for styling
- Chart.js and React Chartjs 2 for data visualization
- Bcrypt for password hashing
- JSON Web Token for secure authentication
- Using Edamam's food and recipe api

## Getting Started

### Prerequisites

- Node.js (version 14.0 or higher)
- A PostgreSQL database

### Installation

## Installation and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/simply-calories.git
cd simply-calories

# Install dependencies
npm install

# Configure environment variables
# Create a .env file in the root directory and add your database and authentication settings

# Initialize the database
npx prisma migrate dev

# Start the development server
npm run dev

# The app will be available at http://localhost:3000


