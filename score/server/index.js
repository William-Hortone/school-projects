const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandling");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const studentRouter = require("./routes/student");
const scoreRouter = require("./routes/score");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
// app.use(
//   cors({
//     origin: ["https://score-client.vercel.app"],
//     methods: ["GET", "POST", "PUT"],
//     credentials: true,
//   })
// );

// Middleware for handling OPTIONS requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "https://score-client.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/api/", authRouter);
app.use("/api/users/", userRouter);
app.use("/api/student/", studentRouter);
app.use("/api/score/", scoreRouter);

app.get("/", (req, res) => res.send("William Hortone!"));

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
