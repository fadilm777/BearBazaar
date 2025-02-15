# Backend

## Setup

First create a `.env` file in the `backend` directory with the contents,

```sh
DATABASE_URL="file:./dev.db"  # See the documentation for all the connection string options: https://pris.ly/d/connection-strings
```

Then install dependencies and setup the database.

```
npm install  # Install dependencies
npx prisma db push  # Setup the database
```
