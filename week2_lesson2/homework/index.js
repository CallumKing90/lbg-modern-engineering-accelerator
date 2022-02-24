const express = require('express');
const app = express();
const port = 3000;
const os = require('os');
const hostname = os.hostname();

app.get('/', (req, res) => {
  res
    .status(200)
    .send(`Hello World! \n this application is running on ${hostname}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
