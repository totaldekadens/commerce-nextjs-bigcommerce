import { categoryTreeItemFragment } from '@framework/api/fragments/category-tree'
import { gql } from '@apollo/client'

export const productFields = `
fragment productFields on Product {
  entityId
  name
  sku
  path
        prices {
    price {
      currencyCode
      value
    }

  }
  brand {
    entityId
  }
  plainTextDescription
  inventory {
    isInStock
    aggregated {
      availableToSell
    }
  }

  defaultImage {
    urlOriginal
    altText
  }
  categories {
        edges {
          node {
            entityId
            name
            path
          }
        }
      }
      productOptions {
        edges {
          node {
            entityId
            displayName
            isRequired

            ... on MultipleChoiceOption {
              values {
                edges {
                  node {
                    entityId
                    label
                  }
                }
              }
            }
          }
        }
      }
}`

/* 

  variants(first: 250) {
    edges {
      node {
        entityId
        defaultImage {
          urlOriginal
          altText
          isDefault
        }
      }
    }
  }


 customFields{
      edges {
        node {
          name
          value
        }
      }
    }

      prices {
    ...productPrices
  }

*/

export const getCategoryTreeQuery = /* GraphQL */ gql`
  query getSiteInfo {
    site {
      categoryTree {
        ...categoryTreeItem
        children {
          ...categoryTreeItem
          children {
            ...categoryTreeItem
            children {
              ...categoryTreeItem
            }
          }
        }
      }
    }
  }
  ${categoryTreeItemFragment}
`

export const searchByOptionValue = gql`
  query getSearchResponse(
    $searchStrings: [String!]!
    $displayName: String!
    $categoryId: Int!
  ) {
    site {
      search {
        searchProducts(
          filters: {
            categoryEntityId: $categoryId
            productAttributes: {
              attribute: $displayName
              values: $searchStrings
            }
          }
        ) {
          products(first: 12) {
            edges {
              cursor
              node {
                ...productFields
              }
            }
            pageInfo {
              startCursor
              endCursor
              hasPreviousPage
              hasNextPage
            }
            collectionInfo {
              totalItems
            }
          }
        }
      }
    }
  }
  ${productFields}
`
//More than 50 and you get error
export const getAllProducts = /* GraphQL */ gql`
  query SeveralProducts($pageSize: Int = 50, $cursor: String) {
    site {
      products(first: $pageSize, after: $cursor) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            name
            categories {
              edges {
                node {
                  entityId
                  name
                  path
                }
              }
            }
            productOptions {
              edges {
                node {
                  entityId
                  displayName
                  isRequired

                  ... on MultipleChoiceOption {
                    values {
                      edges {
                        node {
                          entityId
                          label
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
