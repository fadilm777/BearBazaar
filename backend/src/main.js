const express = require('express');
const app = express();
const port = 3000;

const authRouter = require('./routes/auth');
const listingsRouter = require('./routes/listings');

app.use(express.json());

app.use('/auth', authRouter);
app.use('/listings', listingsRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
