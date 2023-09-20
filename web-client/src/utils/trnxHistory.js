import axios from 'axios';

async function trnxList(id) {
    try {
    //   const mess = localStorage.getItem('mess');
    const res = await axios.post('http://localhost:5000/api/txn/history', { id });
      return res.data
      // console.log("response", response);
    //   const data = response.data;
    //   setMenu(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  export default trnxList;