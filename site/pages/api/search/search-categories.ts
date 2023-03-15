import axios from "axios";

async function handler(req, res) {
  const options = {
      method: "GET",
      url: "http://api.clerk.io/v2/search/categories",
      params: {
        key: process.env.NEXT_PUBLIC_CLERK_PUBLIC_API_KEY,
        query: req.query.searchQuery,
        limit: "3",
      },
      headers: { accept: "application/json" },
    };
     
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.result);
        res.json(response.data.categories)
      })
      .catch(function (error) {
        console.error(error);
      });
  
  }  

  export default handler;