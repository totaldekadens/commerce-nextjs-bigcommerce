import { BCCategory } from '@framework/types'
import getSlug from './get-slug'

export function normalizeCategory(category: BCCategory, parent?: any): any {
  return {
    id: `${category.entityId}`,
    name: category.name,
    slug: getSlug(category.path),
    path: category.path,
    productCount: category.productCount,
  }
}

// Adds slug to all
export function normalizeCategoryTree(categories: any) {
  let list: any = []
  const flatCategoryTree = (object: any) => {
    for (let i = 0; i < object.length; i++) {
      let category: any = object[i]
      if (category) {
        const slug = getSlug(category.path)
        category = {
          ...category,
          slug,
        }
      }
      if (category.children?.length > 0) {
        flatCategoryTree(object[i].children)
      }
    }
  }
  if (categories) {
    flatCategoryTree(categories)
  }

  return categories
}
