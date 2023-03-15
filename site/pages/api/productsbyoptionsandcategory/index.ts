import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import jagarlivApolloClient from '@lib/apollo/apollo'
import { searchByOptionValue } from '@lib/queries'

/* Fetches all products from bigcommerce by options and categoryId  */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        if (!req.body) {
          res.status(400).json({ success: true, data: 'Check body' })
        }

        const body = JSON.parse(req.body) // why?
        const tjona = await jagarlivApolloClient.query({
          query: searchByOptionValue,
          variables: {
            searchStrings: body.searchStrings,
            displayName: body.displayName,
            categoryId: body.categoryId,
          },
        })
        res.status(200).json({ success: true, data: tjona })
      } catch (error) {
        res.status(400).json({ success: false, data: error })
      }
      break
    default:
      res.status(400).json({ success: false, data: 'Break error' })
      break
  }
}
