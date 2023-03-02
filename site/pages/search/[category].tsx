import { getSearchStaticProps } from '@lib/search-props'
import type { GetStaticPathsResult, GetStaticPropsContext } from 'next'
import Search from '@components/search'
import SearchCopy from '@components/search_copy'
export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context)
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default SearchCopy
