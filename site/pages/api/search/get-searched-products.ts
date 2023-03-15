import { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const options = { method: 'GET', headers: { accept: 'application/json' } }
  console.log(req.query.productIds)

  fetch(
    `https://api.clerk.io/v2/products?key=${process.env.NEXT_PUBLIC_CLERK_PUBLIC_API_KEY}&private_key=${process.env.CLERK_PRIVATE_API_KEY}&products=[${req.query.productIds}]`,
    options
  )
    .then((response) => response.json())
    .then((response) => res.json(response.products))
    .catch((err) => console.error(err))
}

export default handler
