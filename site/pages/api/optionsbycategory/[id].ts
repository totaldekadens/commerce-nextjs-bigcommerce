import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req

  /* Gets list of options for selected category */
  switch (method) {
    case 'GET':
      try {
        const dataPath = './data.json'
        let data = fs.readFileSync(dataPath)
        data = JSON.parse(data.toString())
        let arr: any[] = [...data]

        if (id) {
          let findCategory = arr.find((category) => category.categoryId == id)
          if (findCategory) {
            return res.status(200).json({
              success: true,
              data: findCategory,
            })
          }
          res.status(400).json({ success: false, data: 'Category not found' })
          return
        }
        res
          .status(400)
          .json({ success: false, data: 'Id not found, check url' })
      } catch (error) {
        res.status(400).json({ success: false, data: error })
      }
      break
  }
}
