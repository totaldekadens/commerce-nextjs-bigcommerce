import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const options = {
    method: 'GET',
    url: 'http://api.clerk.io/v2/search/popular',
    params: {
      key: process.env.NEXT_PUBLIC_CLERK_PUBLIC_API_KEY,
      query: req.query.searchQuery,
      limit: '5',
    },
    headers: { accept: 'application/json' },
  }

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data.result)
      res.json(response.data.result)
    })
    .catch(function (error) {
      console.error(error)
    })
}

export default handler
