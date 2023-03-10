import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
//import { ProductView } from '@components/product'
import ProductViewCopy from '@components/product/ProductView/ProductView_copy'
import jagarlivApolloClient from '@lib/apollo/apollo'
import { normalizeCategoryTree } from '@lib/normalize'
import { getCategoryTreeQuery } from '@lib/queries'

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const productPromise = commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })
  const allProductsPromise = commerce.getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  })
  const { data } = await jagarlivApolloClient.query({
    query: getCategoryTreeQuery,
  })
  const normailzedCategoryTree = normalizeCategoryTree(data.site.categoryTree)

  const { pages } = await pagesPromise
  let { categories } = await siteInfoPromise
  const { product } = await productPromise
  const { products: relatedProducts } = await allProductsPromise

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      categoryTree: normailzedCategoryTree,
      pages,
      product,
      relatedProducts,
      categories,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product: any) => {
            arr.push(`/${locale}/product${product.path}`)
          })
          return arr
        }, [])
      : products.map((product: any) => `/product${product.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
  relatedProducts,
  categories,
  categoryTree,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <>
      {/* <ProductView product={product} relatedProducts={relatedProducts} /> */}
      <ProductViewCopy
        product={product}
        relatedProducts={relatedProducts}
        categories={categories}
      />
    </>
  )
}

Slug.Layout = Layout
