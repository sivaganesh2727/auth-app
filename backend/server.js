require("dotenv").config();
require("./Models/db");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("✅ Server setup initialized");

// ✅ Root Route to Fix "Cannot GET /" Error
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ API Routes
app.use("/auth", AuthRouter);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
