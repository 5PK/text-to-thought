# text-to-thought

A message service that when texted will record your message in a database.

You can find the ongoing tasks here: https://trello.com/b/w1tCZGch/thought-to-text

## Prerequsites

1. Have the latest version of node installed

## Installation


1. Clone the repository
2. Run ```npm install```
3. Create a ```db.sqlite``` file in the ```config/``` directory
4. Create a ```.env``` file in the main directory with the following values
```
DB_TYPE=sqlite
SERVER_PORT=6969
```
5. Check the package scripts to run below

## Scripts

```npm run dev```

runs the application for local development using nodemon. 

```npm start```

builds the app to a build folder for production
