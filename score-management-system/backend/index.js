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
const port = 3000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: ["https://661cbeadbbe1230874fcb9ed--sunny-gumdrop-48a4a4.netlify.app/"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(errorHandler);

app.use("/api/", authRouter);
app.use("/api/users/", userRouter);
app.use("/api/student/", studentRouter);
app.use("/api/score/", scoreRouter);

app.get("/", (req, res) => res.send("William Hortone!"));
app.listen(process.env.PORT || port, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);
