const path = require("path");
const express = require("express");

const {
  Worker,
  threadId,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const app = express();
const apiRouter = require("./routes/api");
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client")));

// app.use('/build', express.static(path.join(__dirname, '../build')));

app.use("/api", apiRouter);
// app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  // const defaultErr = {
  //   log: 'Express error handler caught unknown middleware error',
  //   status: 500,
  //   message: { err: 'An error occurred' },
  // };
  // const errorObj = Object.assign({}, defaultErr, err);
  // console.log(err);
  return res.status(500).json(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
