> Notes

## Content

- [Setting Up](#setting-up)
- [Idea Project Start and Express Fundamentals](#idea-project-start-and-express-fundamentals)
- [Mongoose and Local MongoDB](#mongoose-and-local-mongodb)
- [Local Authentication With Passport](#local-authentication-with-passport)
- [Idea Prep & Deployment](#idea-prep-and-deployment)

# Setting Up

## Dev Environment Setup

- pick text editor, atom, visual studio code, sublime, etc
- investigate how to integrate gitbash to visual studio code (for windows)
- font size for demos, 26

## What Exactly Is Node.js?

- JavaScript runtime that runs on V8 JavaScript engine
- runs JavaScript on the server
- you can build fast and scalable real-time apps
- event-driven, non-blocking I/O
- manipulate files
- create web servers
- query databases
- powerful apis
- backend interfaces
- powerful server side apps

## Installing & Exploring Node.js

- get node from the official site
- use `nvm` if you want different versions of node installed
- `REPL` type `node`
- check node version `node -v`
- check npm version `npm -v`
- in node we have `global` vs in the browser we have `window`
- we also have `process`

## Install MongoDB Locally

- install from official website
- `collections vs tables`
- `documents vs rows`
- `mongoose` => `ODM`, will help us create schemas for mongodb
- follow installations steps for windows

## Sign Up For mLab

- create account
- create user
- formerly known as mongoLab

## Create a Heroku Account

- create account
- make sure you install heroku toolbelt

# Idea Project Start and Express Fundamentals

## Idea Project Introduction

- app presentation

## Install & Initialize Express

- read information from official site

## Basic Routing & Nodemon

- http verbs in express
- get, post, put, patch, delete, etc
- check where global packages `npm root -g`

## Express Middleware

- functions that have access to the request and response
- check the official documentation
- it uses the keyword `use`
- `app.use(middlewareFunction(req, res, next){ // body })`

## Working With Templates

- server side rendering (using template engine)
- `express-handlebars`
- check the official documentation
- `ejs`
- `pug` formerly known as `jade`

## Bootstrap & Partials

- add Bootstrap from CDN sites
- learn how to create partials

# Mongoose and Local MongoDB

## Install Mongoose & Connect

- configure the db connection using mongoose

## Create The Idea Model

- Create the Idea model with mongoose

## Add Idea Form

- Create a form for submission

## Server Side Form Validation

- add server side validations in case client side validations fail

## Saving Idea To MongoDB

- save the Idea to the db
- make sure to use `async await`

## Fetching Ideas From MongoDB

- fetch idea from MongoDB

## Edit Idea Form

- add form for editing Ideas

## Update Idea Data

- we only have 2 methods for forms, `get and post`
- `method-override` to the rescue
- you can also do it using simple `ajax`

## Remove Idea Data

- add logic to remove an idea
- make use of `method-override`

## Flash Messaging

- `express-session`
- `connect-flash`

# Local Authentication With Passport

## A Look At Passport
## The Express Router
## Login & Register Pages
## Register Form Validation
## User Registration
## Hooking Up A Local Strategy
## Finishing The Login Functionality
## Logout Function
## Protecting Routes
## Access Control

# Idea Prep and Deployment

## Preparing Our App For Deployment
## Deploying To Heroku
## Adding A Domain Name
