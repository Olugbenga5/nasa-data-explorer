# NASA Data Explorer 

An interactive full-stack web app built with React, Node.js, Express, and Tailwind CSS that allows users to:

- View NASA’s Astronomy Picture of the Day (APOD)
- Explore and visualize near-Earth asteroid data using live charts

This project was created as part of a coding challenge to showcase skills in full-stack development, data visualization, and creative use of open APIs.

##  Features

APOD Viewer
- Displays the current day's Astronomy Picture of the Day from NASA
- Includes image, title, and description
- Favorite images to localStorage
- Toggle to view saved favorites

Asteroid Tracker
- Fetches NEO data for the past 7 days using NASA's NeoWs API
- Displays two charts:
  - Daily asteroid count
  - Average asteroid diameter (km)


---

##  Tech Stack

 Backend (Node.js + Express)

 Package:    
 express     
 axios        
 dotenv      
 cors         
 nodemon      

Frontend (React + Tailwind CSS)

Package:                   
react                     
react-dom                   
react-router-dom           
react-scripts               
recharts                    
dayjs                      
tailwindcss                  
postcss, autoprefixer        

---

Backend Setup  
cd Backend  
npm init -y  
npm install express axios dotenv cors  
npm install --save-dev nodemon  
npm run dev  

Frontend Setup  
cd frontend  
npm install  
npm install -D tailwindcss postcss autoprefixer  
npx tailwindcss init -p  

Then in 'frontend/src/index.css', include Tailwind:  
css  
@tailwind base;  
@tailwind components;  
@tailwind utilities;  

Start the frontend:  
npm run start   

---

## How It Works

- Frontend makes requests to '/api/...' via proxy defined in 'frontend/package.json'
- Backend handles communication with the NASA API using my API key
- APOD and NEO data are fetched and visualized in React
- Charts rendered with Recharts
- Styling handled entirely with Tailwind CSS

---

##  Deployment

Frontend (Vercel):  
https://nasa-data-explorer-juniors-projects-0c911f33.vercel.app

Backend (Render):  
https://nasa-backend-vwru.onrender.com

---

This project uses public data from NASA's Open APIs.  
API Key used: 'lGVBgN4kfzBhWbbfFdjYlmu9RhQ8UUxDkbDfcgE9'  
More info at: https://api.nasa.gov
