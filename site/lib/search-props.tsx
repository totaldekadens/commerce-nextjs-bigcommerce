import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'
import jagarlivApolloClient from './apollo/apollo'
import { getCategoryTreeQuery } from './queries'
import { normalizeCategoryTree } from './normalize'

export async function getSearchStaticProps({
  preview,
  locale,
  locales,
  params,
}: GetStaticPropsContext) {
  console.log(params)
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  let { categories, brands, categoryTree } = await siteInfoPromise
  const { data } = await jagarlivApolloClient.query({
    query: getCategoryTreeQuery,
  })
  const hej = normalizeCategoryTree(data.site.categoryTree)

  return {
    props: {
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
