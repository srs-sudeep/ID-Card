const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
// const Menu = require('./models/M~enu');
// const userInfo = require('./models/Userinfo');

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Import API routes
const authRoutes = require("./routes/auth");
// const { signUp, logIn } = require("./controllers/auth");
const menu = require("./routes/menuRoute");

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://nishchayr:Ou0W2oqa7q0J6YQ9@cluster0.vxa7fey.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
// console.log(mongoose.);

// const userinfo = new userInfo(
//   {
//   id : "12241180",
//   name :"Nishant",
//   email : "nishant@gmail.com",
//   mess : "Galav",
//   remaining_amount : 10000,
//   total_amout : 20000
// },
//  {
//    id : "12241190",
//    name :"Nishchay",
//    email : "nishchay@gmail.com",
//    mess : "Shree sai",
//    remaining_amount : 1000,
//    total_amout : 2000
//  }

// );

// userinfo.save()
// .then(()=>{
//   console.log("success");
// })
// const userinfoSchema = new mongoose.Schema({
//   id : { type: String, unique :true, default : "12241180"},
//   name : { type : String, required : true ,default : "Nishant"},
//   email : {type : String, required : true , default : "nishant@gmail.com"},
//   mess : {type : String, default :"Galav"},
//   remaining_amount :{type : Number, default : 1000},
//   total_amout : {type : Number , default : 20000}
// });
// userinfoSchema.save()
//   .then(()=> {
//       console.log("save");
//   })
// mongoose.model("userinfo", userinfoSchema);
// mongoose.save();

// const menuData = new Menu({
//   name: 'Monday',
//   meals: [
//     {
//       type: 'Breakfast',
//       items: [
//         { name: 'Scrambled Eggs', price: 5.99, type: 'NonVeg', category: 'AddOn'},
//         { name: 'Toast', price: 2.99, type: 'Veg', category: 'Basic' },
//       ],
//     },
//     {
//       type: 'Lunch',
//       itmes: [
//         {name: 'Rice', price: 20, type: 'Veg', category: 'Basic'},
//         {name: 'Dal', price: 15, type: 'Veg', category: 'Basic'},
//       ]
//     },
//     {
//       type: 'Snacks',
//       items: [
//         {name: 'Tea', price: 7, type: 'Veg', category: 'AddOn'},
//         {name: 'Maggie', price: 15, type: 'Veg', category: 'AddOn'}
//       ]
//     },
//     {
//       type: 'Dinner',
//       items: [
//         {name: 'Roti', price: 15, type: 'Veg', category: 'Basic'},
//         {name: 'Matar Paneer', price: 30, type: 'Veg', category: 'AddOn'}
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
app.use("/api/menu", menu);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
module.exports = mongoose;
