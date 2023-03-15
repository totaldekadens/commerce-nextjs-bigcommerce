import axios from "axios";

async function handler(req, res) {
  const options = {
      method: "GET",
      url: "http://api.clerk.io/v2/search/search",
      params: {
        key: process.env.NEXT_PUBLIC_CLERK_PUBLIC_API_KEY,
        query: req.query.searchQuery,
        limit: "5",
        longtail: "false",
        offset: "0",
        order: "asc",
      },
      headers: { accept: "application/json" },
    };
     
    axios
      .request(options)
      .then(function (response) {
        res.json(response.data.result)
      })
      .catch(function (error) {
        console.error(error);
      });
  
  }  

  export default handler;