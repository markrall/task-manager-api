# Task Manager API (TMAPI)

## About TMAPI

Yep, the world definitely doesn't need another one and there are so many developer portfolios out there with a similar example. But...

I love the productivity genre. The task manager is the quintessential archetype. It can be a simple or complex product. It involves a variety of technologies to implement and has potential to become technically complex.

This is an ongoing labour of love upon which to expand and demonstrate my growing technical skills.

⚠️ This app is currently hosted on Heroku's free tier. Performance will be slow.

⚠️ A separate repo to house the React frontend will be created sometime soon.

## 🎢 Roadmap

### Now

- Add the ability to set due dates and reminders for tasks.
- Add task priority filtering and sorting.
- Add filter to list tasks due on a specified date.
- Extend model to include content tags for filtering tasks.
- Add GET /users/me/avatar route ???
- Review [sharp](https://github.com/lovell/sharp/tree/master/docs) docs to find image optimisation opportunities
- FIXME: remaining `// @ts-ignore` statements

### Next

- Add media upload capability for tasks (eg. images, movies, files)
- Add task description search capability.
- Expand code test coverage to ~80% across the board.
- Upgrade hosting to improve app performance

### Future

- Geolocation capability for mobile app
- Payment and billing capability
- Productivity reporting
- Behavioural recommendations
- Add OCR recognition capability to search file attachments 😱

### Complete

👍 Build a basic Restful API service modeling users and tasks on MongoDB, Node, and Express.

👍 Provide an authentication layer and password hashing capability to register and authenticate users ensuring secure access to personal information and content

👍 Implement quality practices through code versioning using Git and GitHub, unit testing using Jest and Supertest and typing using Babel and TypeScript.

## Installation

### Download and install MongoDB

[Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/) locally for your operating system.

### Clone this repo

`gh repo clone markrall/task-manager-api`

### Install dependencies

On NPM: `npm install` or `npm i`

On Yarn: `yarn` or `yarn install`

### Create an environment config file

Save the file `.env-cmdrc` to the root of the project and add the template below.

    {
      "development": {
        "MDB": "mongodb://127.0.0.1:27017/{db-name}",
        "SG": "{sendgrid-api-key}",
        "JWT": "{json-web-token-secret}"
      },
      "test": {
        "MDB": "mongodb://127.0.0.1:27017/{dev-name}-test",
        "SG": "{sendgrid-api-key}",
        "JWT": "{json-web-token-secret}"
      },
      "production": {
        "MDB": "mongodb+srv://{project-name}:{password}@cluster0.02xoc.mongodb.net/{db-name}?retryWrites=true&w=majority",
        "SG": "{sendgrid-api-key}",
        "JWT": "{json-web-token-secret}"
      }
    }

Sign up for a SendGrid account, generate an API key and add it as a string replacing `{sendgrid-api-key}` for each environment.

Create a JSON Web Token secret key string and replace `{json-web-token-secret}` for each environment.

Select a name for your DB (eg. task-manager-api) and replace `{dev-name}` in the config.

NOTE that for production, you can either choose to use a local MongoDB instance or [create a free tier cluster on MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started).

### Run scripts

To run the development envrionment `npm run dev`

To run Jest test suites `npm run test` or `npm test` or `npm t`

To build `npm run build` or `yarn build`

```

```
