## Supabase + React Data Visualization

A small learning project demonstrating how to connect a React frontend with Supabase, retrieve stored data, and visualize it using React Charts.

This project is part of my exploration of Supabase as a backend service and how it integrates with modern frontend frameworks.

### Project Overview

In this project I implemented a simple workflow where:

Data is stored in Supabase (PostgreSQL database)

The React application connects to Supabase using the Supabase client

Data is fetched from the database

The retrieved data is processed in the frontend

The dataset is visualized using bar charts

This helped me understand the end-to-end flow between backend data and frontend visualization.

### Features Implemented

Supabase project setup

Database data retrieval using Supabase client

React frontend integration

Dynamic data rendering

Data visualization using React Charts (Bar Chart)

### Tech Stack

Frontend: React

Backend Service: Supabase

Database: PostgreSQL (via Supabase)

Visualization: React Charts

Language: JavaScript

### Project Structure

src
 ├── components
 ├── charts
 ├── supabaseClient.js
 └── App.js

### Getting Started

1 Clone the repository
    git clone https://github.com/awizp/scrimba-supabase-learn.git

2 Navigate to the project
    cd scrimba-supabase-learn

3 Install dependencies
    npm install

4 Run the development server
    npm run dev

### Learning Outcomes

Through this project I learned:

How to connect a React app with Supabase

Fetching and handling database data

Structuring API calls using the Supabase client

Visualizing backend data in the frontend using charts

### Future Improvements

Add data creation from the UI

Implement update and delete operations

Add Supabase authentication

Create a dashboard-style UI for analytics