const mongoose = require('../index');
const Menu = require('../models/Menu');

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

// // Save the data to the database
// menuData.save()
//   .then(() => {
//     console.log('Menu data saved successfully.');
//   })
//   .catch((err) => {
//     console.error('Error saving menu data:', err);
//   })
  // .finally(() => {
  //   mongoose.disconnect(); // Close the database connection
  // });


  const fetchMenu = async (req, res) => {
  try{
  
    const menuRes = await Menu.find({}).toArray((err, documents) => {
      if (err) throw err;
      console.log(menuRes.data); // Array of all documents
      res.status(200).json({msg:"fetch successfully"});
    });
    
  }
  catch(error){
    res.status(500).json({msg: "internal error"});
  }
}



module.exports = fetchMenu;