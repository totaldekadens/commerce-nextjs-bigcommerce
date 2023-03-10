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

  for (let i = 0; i < categoryTree.length; i++) {
    if (getSlug(categoryTree[i].path) == category) {
      activeCategory = categoryTree[i]
    }
    for (let ii = 0; ii < categoryTree[i].children.length; ii++) {
      const yay = getCategoryString(categoryTree[i].children[ii].path)
      if (yay == category) {
        activeCategory = categoryTree[i].children[ii]
      }
      for (
        let iii = 0;
        iii < categoryTree[i].children[ii].children.length;
        iii++
      ) {
        const yay2 = getCategoryString(
          categoryTree[i].children[ii].children[iii].path
        )
        if (yay2 == category) {
          activeCategory = categoryTree[i].children[ii].children[iii]
        }
        for (
          let iiii = 0;
          iiii < categoryTree[i].children[ii].children[iii].children.length;
          iiii++
        ) {
          const yay3 = getCategoryString(
            categoryTree[i].children[ii].children[iii].children[iiii].path
          )
          if (yay3 == category) {
            activeCategory =
              categoryTree[i].children[ii].children[iii].children[iiii]
          }
        }
      }
    }
  }
  return activeCategory
}

export const getCategoryString = (path: any) => {
  const hej = path.split('/')
  const newArray = hej.filter(
    (value: string) => Object.keys(value).length !== 0
  )
  const tjo = newArray[newArray.length - 1]
  return tjo
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
      const yay = getCategoryString(categoryTree[i].children[ii].path)
      if (yay == category) {
        activeCategory = categoryTree[i].children[ii]
      }
      for (
        let iii = 0;
        iii < categoryTree[i].children[ii].children.length;
        iii++
      ) {
        const yay2 = getCategoryString(
          categoryTree[i].children[ii].children[iii].path
        )
        if (yay2 == category) {
          activeCategory = categoryTree[i].children[ii].children[iii]
        }
        for (
          let iiii = 0;
          iiii < categoryTree[i].children[ii].children[iii].children.length;
          iiii++
        ) {
          const yay3 = getCategoryString(
            categoryTree[i].children[ii].children[iii].children[iiii].path
          )
          if (yay3 == category) {
            activeCategory =
              categoryTree[i].children[ii].children[iii].children[iiii]
          }
        }
      }
    }
  }
  return activeCategory
}
