import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

/* Fetches all products from bigcommerce and Updates data.json with designated options with values to each category id  */

export const useUpdateJson = (categoryListWithAllavailableOptions: any) => {
  try {
    const dataPath = './data.json'
    fs.writeFileSync(
      dataPath,
      JSON.stringify(categoryListWithAllavailableOptions)
    )
    return { success: true, data: 'success' }
  } catch (err) {
    return { success: false, data: err }
  }
}
export const fetchAllProductsFromPagination = async (page: number) => {
  try {
    page.toString()
    const response = await fetch(
      `https://api.bigcommerce.com/stores/xgl585vf1j/v3/catalog/products?limit=250&page=${page}&is_visible=true&include=options`,
      {
        headers: {
          'X-Auth-Token': 'lsu0f8gtiyo2bzit1nxqw78j9e7jb1r',
        },
      }
    )
    const result = await response.json()
    return result
  } catch (err) {
    return { success: false, data: err }
  }
}

/* Fetches all products and loop through pagination. (Returns a list of all products) */
export const fetchProducts = async () => {
  const response = await fetch(
    'https://api.bigcommerce.com/stores/xgl585vf1j/v3/catalog/products?limit=250&is_visible=true&include=options',
    {
      headers: {
        'X-Auth-Token': 'lsu0f8gtiyo2bzit1nxqw78j9e7jb1r',
      },
    }
  )
  let lista: any = []
  const result = await response.json()
  lista = [...lista, result]
  let number = result.meta.pagination.total_pages - 1
  for (let i = 0; i < number; i++) {
    let tjogro = await fetchAllProductsFromPagination(i + 2)
    lista.push(tjogro)
  }
  return lista
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        let lista = await fetchProducts()
        let totalProducts: any[] = []
        lista.forEach((data: any) => {
          data.data.forEach((product: any) => {
            totalProducts.push(product)
          })
        })

        /* Puts all available categories from found products into a list with no duplicates */
        let categoryWithProducts: any[] = []
        totalProducts.forEach((product) => {
          product.categories.forEach((category: any) => {
            const findIdCategoryId = categoryWithProducts.find(
              (id) => id.categoryId == category
            )
            if (!findIdCategoryId) {
              categoryWithProducts.push({ categoryId: category, products: [] })
            }
          })
        })
        /* Adds products to dedicated category */
        totalProducts.forEach((product) => {
          product.categories.forEach((cat: any) => {
            categoryWithProducts.forEach((category: any) => {
              if (category.categoryId == cat) {
                category.products.push(product)
              }
            })
          })
        })

        /* Creates a list with categories and related options. */
        let categoryListWithAllavailableOptions: any[] = []
        categoryWithProducts.forEach((category) => {
          category.products.forEach((product: any) => {
            product.options.forEach((option: any) => {
              const findCategory = categoryListWithAllavailableOptions.find(
                (cat) => cat.categoryId == category.categoryId
              )
              if (findCategory) {
                let findOption = findCategory.options.find(
                  (opt: any) => opt.display_name == option.display_name
                )
                if (findOption) {
                  option.option_values.forEach((val: any) => {
                    let findValue = findOption.option_values.find(
                      (value: any) => value.label == val.label
                    )
                    if (findValue) {
                      return
                    }
                    findOption.option_values.push({
                      id: val.id,
                      label: val.label,
                      checked: false,
                      sort_order: val.sort_order,
                    })
                  })
                  return
                }
                findCategory.options.push({
                  display_name: option.display_name,
                  option_values: option.option_values.map((value: any) => ({
                    id: value.id,
                    label: value.label,
                    checked: false,
                    sort_order: value.sort_order,
                  })),
                })
                return
              }

              categoryListWithAllavailableOptions.push({
                categoryId: category.categoryId,
                options: product.options.map((option: any) => ({
                  display_name: option.display_name,
                  option_values: option.option_values.map((value: any) => ({
                    id: value.id,
                    label: value.label,
                    checked: false,
                    sort_order: value.sort_order,
                  })),
                })),
              })
            })
          })
        })

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const updateFile = useUpdateJson(categoryListWithAllavailableOptions)

        if (updateFile.success) {
          return res.status(200).json({ success: true, data: 'success' })
        }
        res.status(400).json({ success: false, data: updateFile.data })
      } catch (error) {
        res.status(400).json({ success: false, data: error })
      }
      break
    default:
      res.status(400).json({ success: false, data: 'Break error' })
      break
  }
}
