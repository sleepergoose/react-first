# First React App

This repository is for getting hands-on experience with ReactJS. 

## Some notes about project

The repo is used to get hands-on experience with ReactJS. 

The user can register and log in into the application and see the list of products. Of course the user can log out. In the nearest future some other abilities will be implemented just to give a try different React features. 
Some guards are implemented for now. An authenticated user can access the home page but cannot access login or register page. Likewise, an unauthenticated user can access login or register page but cannot get inside the application. 

SPA interracts with NodeJS backend via REST API requests. 

To make authenticated and authorize requests to the backend JWT access and refresh tokens are used. The native auth flow is implemented (without any third-party services since I have already had some experience with them). They are stored in HTTP-only cookies due to security reasons (Client's JavaScript cannot have access to HTTP-only cookies).

## Technical information

The `pnpm` package manager is used in the project. 

Inplemented `ESLint` and `Prettier`. To use them just execute the following commands:

1. `pnpm lint` - shows linting errors.
2. `pnpm lint:fix` - shows and tries to fix linting errors.
3. `pnpm prettier` - Prettier fixes errors found according to set of rules.
4. `pnpm quality` - this is just an alias for `pnpm prettier && pnpm lint --fix`. It's quite useful command before making commits)

`React Router` is used. I prefer defining routes in a separate array rather than specifying them inside components. 


## How to run

To run the app just execute the `pnpm dev` command (see the `package.json` file). But, of course, the app won't work properly without backend. 


## Packages

```shell
pnpm install react-router-dom
pnpm install react-hook-form

pnpm add @mui/material @emotion/react @emotion/styled
pnpm add @fontsource/roboto
pnpm add @mui/icons-material
```

