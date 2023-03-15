import { BCCategory } from '@framework/types'
import getSlug from './get-slug'
import type { Product } from '@vercel/commerce/types/product'
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

export function normalizeProduct(productNode: any): Product {
  const {
    entityId: id,
    productOptions,
    prices,
    path,
    id: _,
    options: _0,
    defaultImage,
  } = productNode

  return update(productNode, {
    id: { $set: String(id) },

    images: {
      $set: [
        {
          url: defaultImage?.urlOriginal,
          alt: defaultImage?.altText,
        },
      ],
    },
    /*  customFields: {
      $apply: ({ edges }: any) =>
        edges?.map(({ node: { name, value, ...rest } }: any) => ({
          name: name,
          value: value,
          ...rest,
        })),
    }, */
    variants: {
      $apply: ({ edges }: any) =>
        edges?.map(({ node: { entityId, productOptions, ...rest } }: any) => ({
          id: String(entityId),
          options: productOptions?.edges
            ? productOptions.edges.map(normalizeProductOption)
            : [],
          ...rest,
        })),
    },
    options: {
      $set: productOptions.edges
        ? productOptions?.edges.map(normalizeProductOption)
        : [],
    },
    brand: {
      $apply: (brand: any) => (brand?.id ? brand.id : null),
    },
    slug: {
      $set: path?.replace(/^\/+|\/+$/g, ''),
    },
    price: {
      $set: {
        value: prices?.price.value,
        currencyCode: prices?.price.currencyCode,
      },
    },
    $unset: ['entityId'],
  })

  function normalizeProductOption(productOption: any) {
    const {
      node: { entityId, values: { edges = [] } = {}, ...rest },
    } = productOption

    return {
      id: String(entityId),
      values: edges?.map(({ node }: any) => node),
      ...rest,
    }
  }
}
