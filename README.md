# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech Stack

Tech stack for this app:
Authentication - AWS Cognito with custom lambda trigger to confirm user created by admin
Backend APIs (GraphQL) - AWS AppSync with Multi-table design in DynamoDB (custom resolvers)
Tables in DynamoDB - UserTable, RestaurantTable, MenuTable, MenuItemTable, OrderTable

Frontend libraries: React, Redux/toolkit, React Testing Library

The frontend is organized in:

- Base components that could be exported into an external Design system in the future
- Containers that include different forms for creating data and other components collections that are used throughout different views
- HOCs and hooks to facilitate reusability
- Views that serve as pages for each role
- Services that query/mutate DynamoDB tables
- Store organized in feature slices with redux toolkit
- Styles in scss

  \*\*\* Note: A user is created in both Cognito and DynamoDB for records

Due to the limited time, tests have been created for some of the base components and forms.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
Tests are implemented using react-testing-library, 6 test suites && 17 tests included as of now

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
