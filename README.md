# Expo App For BlueTread Assessment

[**1. Introduction**](#introduction)

[**2. Folder Structure**](#folder-structure)

[**3. Getting Started**](#getting-started)

---

<a name="#introduction"></a>

## 1. Introduction

This is the BlueTread assessment with an `Expo` application that uses `Expo Router` and it's file based routing capabilities. It has all the necessary packages needed to just start the application and begin adding routes.

Two screens have been created, so everything will run out of the box. Also a number of useful scripts have been created in the package.json that allow the ability to run, build, test, lint and serve the application.

<a name="#folder-structure"></a>

## 2. Folder Structure

a. `api` Directory:

- This folder is used to launch the api server. But before using it make sure to add a .env file with the TicketMaster API key: TM_API_KEY=KEY_GOES_HERE - start before launching the app.

b. `app` Directory:

- This folder is used at the file based router. Any file that lives here will be converted to a route for the application. [Learn More](https://expo.github.io/router/docs/)

c. `src` Directory:

- This is where the application logic will live.

- The `assets` folder hosts images, fonts and icons.

- The `components` folder is where reusable react components live.

- The `config` folder is where you can place constants for your application.

- The `hooks` folder has hook shared in the project.

- The `types` folder is where global and local types live.

- The `utils` folder is a place to put all your reusable functions.

<a name="#getting-started"></a>

## 3. Getting Started

a. Clone this repo to your local machine:

```
git clone git@github.com:pbreah/bluetread-expo-app.git
```

b. Install dependencies:

```
npm run setup
```

c. Create Environment Variables:

On root folder: .env.development & .env.production

Include the API Server URL for Development & Production (on each file) - for dev it should be:

```
API_URL=http://localhost:3000

```

The api folder should have an .env file with the Ticketmaster API Key (see instructions above)

c. Start the API server:

```
cd api
npm start
```

d. Start expo (on the root folder):

```
npm start
```

Finally select the platform to use:

- `a` - android
- `i` - ios
- `w` - web
