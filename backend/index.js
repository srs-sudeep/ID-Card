const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
const Menu = require('./models/Menu');

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Import API routes
const authRoutes = require("./routes/auth");
const { signUp, logIn } = require("./controllers/auth");

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://nishchayr:Ou0W2oqa7q0J6YQ9@cluster0.vxa7fey.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.log("Error connecting to MongoDB Atlas:", err));


// const menuData = new Menu({
//   name: 'Monday',
//   meals: [
//     {
//       type: 'Breakfast',
//       items: [
//         { name: 'Scrambled Eggs', price: 5.99 },
//         { name: 'Toast', price: 2.99 },
//       ],
//     },
//     {
//       type: 'Lunch',
//       itmes: [
//         {name: 'Rice', price: 20},
//         {name: 'Dal', price: 15},
//       ]
//     },
//     {
//       type: 'Snacks',
//       items: [
//         {name: 'Tea', price: 7},
//         {name: 'Maggie', price: 15}
//       ]
//     },
//     {
//       type: 'Dinner',
//       items: [
//         {name: 'Roti', price: 15},
//         {name: 'Matar Paneer', price: 30}
//       ]
//     }
//   ],
// });

// Save the data to the database
// menuData.save()
//   .then(() => {
//     console.log('Menu data saved successfully.');
//   })
//   .catch((err) => {
//     console.error('Error saving menu data:', err);
//   })

// Use API routes
app.use("/api/auth", authRoutes);
// app.use("/api/podcasts", podcastRoutes);
// app.use("/signup", signUp)
// app.use("/login", logIn)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
module.exports = mongoose;