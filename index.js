const express = require("express");
const Boom = require("boom");

const app = express();
const Port = process.env.NODEJS_PORT || 8080;

const Pokemon = require("./server/api/pokemon");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((error, req, res) => {
//   if (error) {
//     console.log(["error", error]);
//     res.statusCode = 400;

//     const timeDiff = process.hrtime(req.startTime);
//     const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
//     const logData = {
//       method: req.method,
//       url: req.originalUrl || req.url,
//       status: res.statusCode,
//       timeTaken,
//     };
//     console.log(["API Request", "Invalid input", "info"], logData);
//     return res.status(400).json(Boom.badRequest().output.payload);
//   }
// });

// app.use((req, res) => {
//   const oldSend = res.send;
//   res.send = async (data) => {
//     res.send = oldSend; // set function back to avoid the 'double-send'
//     const statusCode =
//       (data.output && data.output.statusCode) || res.statusCode;
//     let bodyResponse = data;

//     if (statusCode !== 200 && data.isBoom) {
//       bodyResponse = data.output.payload;
//     }

//     const response = {
//       statusCode,
//       bodyResponse,
//     };

//     // Log Transaction
//     const timeDiff = process.hrtime(req.startTime);
//     const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
//     const logData = {
//       method: req.method,
//       url: req.originalUrl || req.url,
//       status: res.statusCode,
//       timeTaken,
//     };

//     console.log(["API Request", "info"], logData);
//     return res.status(response.statusCode).send(response.bodyResponse); // just call as normal with data
//   };
// });

app.get("/", (req, res) => {
  res.send("Connected");
});

app.use("/pokemon", Pokemon);

app.listen(Port, () => {
  console.log(["Info"], `Server started on port ${Port}`);
});
