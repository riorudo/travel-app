# Book your travel with Space Traveller

On this website you can book a dummy trip and get some information about your destination like a picture and the weather forecast.
The application uses local storage and has limited offline functionality.

## Getting started

`cd` into your new folder and run:
- `npm install`

## Setting up the different API's (Geonames, Weatherbit and Pixabay)

### Step 1: Signup for an API key
Signing up will get you an API key. \
[Geonames](http://www.geonames.org/export/web-services.html), 
[Weatherbit](https://www.weatherbit.io/account/create), 
[Pixabay](https://pixabay.com/api/docs/)

### Step 2: Configure API credentials
- [ ] Use npm or yarn to install the dotenv package ```npm install dotenv```.
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env```
- [ ] Fill the .env file with your API keys like this:
```
GEONAMES_TOKEN=**************************
WEATHERBIT_API_KEY=**************************
PIXABAY_API_KEY=**************************
```

## Build and run the application

### Step 1: Run the build script
```
$ npm run prod
```
or (for dev)
```
$ npm run dev // runs on http://localhost:8080
```

### Step 2: Run node server
After the build process is completed, start your node server.
```
$ node index.js // runs on http://localhost:3000
```

### Step 3: Start using the application
Navigate to:
```
http://localhost:3000
```
and have fun :-)

## Test application
Run
```
$ npm run test
```
