import { getSearchStaticProps } from '@lib/search-props'
import type { GetStaticPropsContext } from 'next'
import Search from '@components/search'
import SearchCopy from '@components/search_copy'
export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context)
}

export default SearchCopy
