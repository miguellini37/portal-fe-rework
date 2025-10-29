# Portal Frontend Setup Instructions

## Setup Instructions

### 1. Prerequisites

- **macOS**:
  - [Homebrew](https://brew.sh/) (recommended)
  - [Node.js](https://nodejs.org/) (v20 or higher)
  - [Yarn](https://classic.yarnpkg.com/en/docs/install/) (recommended)
    - Install with Homebrew: `brew install yarn` (after installing Node.js)

- **Windows (WSL)**:
  - [Node.js](https://nodejs.org/) (v20 or higher)
  - [Yarn](https://classic.yarnpkg.com/en/docs/install/)
    - Install with: `npm install -g yarn`

### 2. Install Dependencies

Run the following command in the project root:

```sh
yarn install
```

### 3. Environment Variables

Copy the sample environment file to your own local config:

```sh
cp sample.envrc .envrc
# or, if your setup requires .env:
# cp sample.envrc .env
```

Edit the file as needed for your environment. You'll need to configure:
- **Backend API URL**: `REACT_APP_BACKEND_URL`
- **Keycloak Configuration**: 
  - `REACT_APP_KEYCLOAK_URL` - Your Keycloak server URL
  - `REACT_APP_KEYCLOAK_REALM` - Your Keycloak realm name
  - `REACT_APP_KEYCLOAK_CLIENT_ID` - Your Keycloak client ID

For detailed Keycloak setup instructions, see [KEYCLOAK_INTEGRATION.md](./KEYCLOAK_INTEGRATION.md).

### 4. Start the App
If using .envrc, run this command to set environment variables
```sh
direnv allow
```

```sh
yarn start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
