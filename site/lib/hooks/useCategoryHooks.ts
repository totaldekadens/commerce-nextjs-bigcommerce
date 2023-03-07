import getSlug from '@lib/get-slug'

export const getActiveCategory = (
  categoryTree: any,
  category: string | undefined
) => {
  let activeCategory = {
    entityId: '',
    name: '',
    id: '',
    description: '',
  }
  //const hej = getSlug(category ? category : '')
  for (let i = 0; i < categoryTree.length; i++) {
    if (getSlug(categoryTree[i].path) == category) {
      activeCategory = categoryTree[i]
    }
    for (let ii = 0; ii < categoryTree[i].children.length; ii++) {
      if (getSlug(categoryTree[i].children[ii].path) == category) {
        activeCategory = categoryTree[i].children[ii]
      }
      for (
        let iii = 0;
        iii < categoryTree[i].children[ii].children.length;
        iii++
      ) {
        if (
          getSlug(categoryTree[i].children[ii].children[iii].path) == category
        ) {
          activeCategory = categoryTree[i].children[ii].children[iii]
        }
        for (
          let iiii = 0;
          iiii < categoryTree[i].children[ii].children[iii].children.length;
          iiii++
        ) {
          if (
            getSlug(
              categoryTree[i].children[ii].children[iii].children[iiii].path
            ) == category
          ) {
            activeCategory =
              categoryTree[i].children[ii].children[iii].children[iiii]
          }
        }
      }
    }
  }
  return activeCategory
}

export const getActiveCategoryTree = (
  categoryTree: any,
  category: string | undefined
) => {
  let activeCategory: any = {}

  for (let i = 0; i < categoryTree.length; i++) {
    if (getSlug(categoryTree[i].path) == category) {
      activeCategory = categoryTree[i]
    }
    for (let ii = 0; ii < categoryTree[i].children.length; ii++) {
      if (getSlug(categoryTree[i].children[ii].path) == category) {
        activeCategory = categoryTree[i].children[ii]
      }
      for (
        let iii = 0;
        iii < categoryTree[i].children[ii].children.length;
        iii++
      ) {
        if (
          getSlug(categoryTree[i].children[ii].children[iii].path) == category
        ) {
          activeCategory = categoryTree[i].children[ii].children[iii]
        }
        for (
          let iiii = 0;
          iiii < categoryTree[i].children[ii].children[iii].children.length;
          iiii++
        ) {
          if (
            getSlug(
              categoryTree[i].children[ii].children[iii].children[iiii].path
            ) == category
          ) {
            activeCategory =
              categoryTree[i].children[ii].children[iii].children[iiii]
          }
        }
      }
    }
  }
  return activeCategory
}
