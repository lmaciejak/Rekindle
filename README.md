# Rekindle

Rekindle makes it easier to hangout with your friends and stay in touch. Users input times during which they are free and choose which friends they want to share those availabilities with. To encourage you to see your friends more frequenly, a user dashboard displays the last time you hung out with your friends with the friends seen the longest time ago at the top with the number of days since last hangout. 

![Alt text](./assets/rekindle-landing.png?raw=true "Landing Page")

## Getting Started 

### Clone the repo
1. git clone git@github.com:lmaciejak/Rekindle.git

### Setting up the database 

PostgreSQL was used as the database and you will need to have it installed in order to seed the database. Once installed follow these directions: 

1. cd Rekindle/server/db
2. psql -f Rekindle.sql

### How to run the app
1. cd Rekindle/server
2. npm install && npm start 
3. cd ../client
4. npm install && npm start 


## Features

### User Authentication 
Users can register or login. Authentication is handled using passport and bcrypt. 

![Alt text](./assets/rekindle-login.gif?raw=true "Authentication")

### Scheduling 

![Alt text](./assets/calendar-screen.png?raw=true "Calendar View")

### Dashboard 

The dashboard displays the user's friends and the last time a user saw their friend. Friends at the top are the ones seen the longest time ago and a specific number of days since the last hangout is displayed. 

![Alt text](./assets/rekindle-dashboard.gif?raw=true "Dashboard")

### Live Search 

Using react-autosuggest, users can search for their friends and proceed to their profile pages. As users type a friend's name, with each keystroke, the results are updated. 

![Alt text](./assets/rekindle-search.gif?raw=true "Live Search")