const express = require('express');
const app = express();
const port = 3000;

const authRouter = require('./routes/auth');

app.use(express.json());

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
