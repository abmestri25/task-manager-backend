require("dotenv").config();
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000","https://mern-task-manager-4ux1.onrender.com"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", taskRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
