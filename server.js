const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
const port = 5000;


// Import Routes (Make sure the path is correct)
const authRoutes = require("./Routes/Auth.route");




// Enable CORS for all origins (*)   

app.use(cors({ origin: "*" }));
app.use("/api/auth", authRoutes);

const uri = "mongodb+srv://ridamgrover14:U2ld7n2CymaBNM4S@backendcluster.nj549.mongodb.net/;" // Replace 'myDatabase' with your DB name

mongoose.connect(uri)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err));


// Sample Route
app.get("*", (req, res) => {
  res.send("Hello, CORS is enabled for all routes!");
});




// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});