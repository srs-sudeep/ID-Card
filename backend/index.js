const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Import API routes
const authRoutes = require("./routes/auth");
const podcastRoutes = require("./routes/podcasts.js");
const { signUp, logIn } = require("./controllers/auth");

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://nishchayr:Ou0W2oqa7q0J6YQ9@cluster0.vxa7fey.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

// Use API routes
app.use("/api/auth", authRoutes);
app.use("/api/podcasts", podcastRoutes);
// app.use("/signup", signUp)
// app.use("/login", logIn)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));