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

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  const newArrival = categories.find((category) => category.id == '24')
  return {
    props: {
      products,
      categories,
      brands,
      pages,
      newArrival,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
  categories,
  pages,
  newArrival,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(products)
  console.log(categories)
  console.log(pages)
  console.log(newArrival)
  // Gets 4 first products in list. Will be replaced by products from Clerk?
  const trendingProducts = products.slice(0, 4).map((product) => product)
  console.log(trendingProducts)
  const marketingProducts = products.slice(4, 6).map((product) => product)
  return (
    <>
      <Hero />
      <BestSellers products={trendingProducts} />
      <ShopByCategory />
      <Marketing products={marketingProducts} />
      <OurMind />
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
