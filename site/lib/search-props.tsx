import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import commerce from '@lib/api/commerce'
import jagarlivApolloClient from './apollo/apollo'
import { getCategoryTreeQuery } from './queries'
import { normalizeCategoryTree } from './normalize'

export const getActiveCategoryV2 = (
  categoryTree: any,
  category: string | undefined
) => {
  let activeCategory: any = {}

  category = '/' + category + '/'
  for (let i = 0; i < categoryTree.length; i++) {
    if (categoryTree[i].path == category) {
      activeCategory = categoryTree[i]
      return activeCategory
    }
    for (let ii = 0; ii < categoryTree[i].children.length; ii++) {
      const yay = categoryTree[i].children[ii].path
      if (yay == category) {
        activeCategory = categoryTree[i].children[ii]
        return activeCategory
      }
      for (
        let iii = 0;
        iii < categoryTree[i].children[ii].children.length;
        iii++
      ) {
        const yay2 = categoryTree[i].children[ii].children[iii].path

        if (yay2 == category) {
          activeCategory = categoryTree[i].children[ii].children[iii]
          return activeCategory
        }
        for (
          let iiii = 0;
          iiii < categoryTree[i].children[ii].children[iii].children.length;
          iiii++
        ) {
          const yay3 =
            categoryTree[i].children[ii].children[iii].children[iiii].path

          if (yay3 == category) {
            activeCategory =
              categoryTree[i].children[ii].children[iii].children[iiii]
            return activeCategory
          }
        }
      }
    }
  }
  return activeCategory
}

export async function getSearchStaticProps({
  preview,
  locale,
  locales,
  params,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  let { categories, brands } = await siteInfoPromise
  const { data } = await jagarlivApolloClient.query({
    query: getCategoryTreeQuery,
  })
  const hej = normalizeCategoryTree(data.site.categoryTree)

  /* Gets fullpath (should be an easier way, check), finds cateboryID by path and finds category with options by Id */
  let fullpath: any = ''
  if (params && params.category) {
    let path = params.category
    if (typeof path == 'string') {
      path.split('/')
    } else {
      path = path.join('/')
    }
    fullpath = path
  }
  let categoryObject = getActiveCategoryV2(hej, fullpath)

  let response = await fetch(
    'http://localhost:3000/api/optionsbycategory/' + categoryObject.entityId
  )
  let result = await response.json()

  return {
    props: {
      categoryOptions: result.data,
      categoryTree: hej,
      pages,
      categories, // Denna påverkar navbaren
      brands,
    },
    revalidate: 10,
  }
}

export type SearchPropsType = InferGetStaticPropsType<
  typeof getSearchStaticProps
>
