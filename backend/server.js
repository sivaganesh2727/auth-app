require("dotenv").config();
require("./Models/db"); 

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const AuthRouter = require("./Routes/AuthRouter");

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("✅ Server setup initialized");

// ✅ API Routes
app.use("/auth", AuthRouter);

// ✅ Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// ✅ Wildcard route to serve index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
