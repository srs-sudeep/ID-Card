const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
// const {galavMenu} = require('./models/Menu');
// const userInfo = require('./models/Userinfo');
const txn_data = require('./models/CardTransection');

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Import API routes
const authRoutes = require("./routes/auth");
// const { signUp, logIn } = require("./controllers/auth");
const studMenu = require("./routes/menuRoute");
const txn = require("./routes/txn");

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

// const menuData = new galavMenu({

  
//   name: 'Sunday',
//   meals: [
//     {
//       type: 'Breakfast',
//       items: [
//         { name: 'Pancakes', price: 6.99, type: 'Veg', category: 'AddOn' },
//         { name: 'Sausage Links', price: 5.99, type: 'NonVeg', category: 'AddOn' },
//         { name: 'Fruit Salad', price: 4.99, type: 'Veg', category: 'Basic' },
//       ],
//     },
//     {
//       type: 'Lunch',
//       items: [
//         { name: 'Beef Stew', price: 12.99, type: 'NonVeg', category: 'Basic' },
//         { name: 'Vegetable Soup', price: 10.99, type: 'Veg', category: 'Basic' },
//         { name: 'Garlic Bread', price: 3.99, type: 'Veg', category: 'AddOn' },
//         { name: 'Iced Tea', price: 3.99, type: 'Veg', category: 'Basic' },
//       ],
//     },
//     {
//       type: 'Snacks',
//       items: [
//         { name: 'Nachos', price: 4.99, type: 'Veg', category: 'AddOn' },
//         { name: 'Chicken Wings', price: 8.99, type: 'NonVeg', category: 'Basic' },
//         { name: 'Cucumber Salad', price: 4.99, type: 'Veg', category: 'Basic' },
//       ],
//     },
//     {
//       type: 'Dinner',
//       items: [
//         { name: 'Grilled Salmon', price: 14.99, type: 'NonVeg', category: 'Basic' },
//         { name: 'Vegetable Stir-Fry', price: 11.99, type: 'Veg', category: 'Basic' },
//         { name: 'Mashed Potatoes', price: 4.99, type: 'Veg', category: 'AddOn' },
//         { name: 'Chocolate Cake', price: 6.99, type: 'Veg', category: 'AddOn' },
//       ],
//     }
//   ]

// });

// const menuData = new txn_data({
//   account_to: "12241170",
//   account_from: "IIT BHILAI",
//   amount: "25",
//   trns_type: "Card",
//   trns_date: "2023-09-11T12:01:00.000+00:00",
//   trns_mode: "online",
//   trns_reference: "IITBH06",
//   remark: ""
// })
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
app.use("/api/menu", studMenu);
app.use("/api/stud", studMenu);
app.use("/api/txn", txn);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
module.exports = mongoose;
