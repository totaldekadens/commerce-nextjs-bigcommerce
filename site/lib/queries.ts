import { categoryTreeItemFragment } from '@framework/api/fragments/category-tree'
import { gql } from '@apollo/client'
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
