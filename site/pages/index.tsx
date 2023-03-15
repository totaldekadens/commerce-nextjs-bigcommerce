import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee /* , Hero  */ } from '@components/ui'
import Hero from '@components/common/Hero'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import BestSellers from '@components/common/BestSellers'
import ShopByCategory from '@components/common/ShopByCategory'
import Marketing from '@components/common/Marketing'
import OurMind from '@components/common/OurMind'
import jagarlivApolloClient from '@lib/apollo/apollo'
import {
  getAllProducts,
  getCategoryTreeQuery,
  searchByOptionValue,
} from '@lib/queries'
import { normalizeCategoryTree } from '@lib/normalize'
import { json } from 'stream/consumers'
//import listan from '../lib/data.json'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: {
      /* first: 6 */
    },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })

  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  let { categories, brands } = await siteInfoPromise

  const { data } = await jagarlivApolloClient.query({
    query: getCategoryTreeQuery,
  })
  // Limit on 50 products?
  /*   const tjona = await jagarlivApolloClient.query({
    query: searchByOptionValue,
    variables: { searchStrings: ['Blå'], displayName: 'Färg', categoryId: 113 },
  }) */

  const body = {
    categoryId: 113,
    displayName: 'Färg',
    searchStrings: ['Blå'],
  }

  const request = {
    method: 'POST',
    Headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  let response = await fetch(
    'http://localhost:3000/api/productsbyoptionsandcategory/',
    request
  )

  let result = await response.json()

  const hej = normalizeCategoryTree(data.site.categoryTree)

  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(result)),
      categoryTree: hej,
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  categoryTree,
  products,
  allProducts,
  categories,
  pages,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(allProducts)

  // Gets 4 first products in list. Will be replaced by products from Clerk?
  const trendingProducts = products.slice(0, 4).map((product) => product)
  //console.log(trendingProducts)
  const marketingProducts = products.slice(4, 6).map((product) => product)

  return (
    <>
      <Hero />
      <BestSellers products={trendingProducts} />
      <ShopByCategory />
      <Marketing products={marketingProducts} />
      {/* <OurMind /> */}
      {/* <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              alt: product.name,
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      />
      <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              alt: product.name,
              width: i === 1 ? 1080 : 540,
              height: i === 1 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
