import cn from 'clsx'
import Image from 'next/image'
import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
import FurtherInfoProduct from '@components/common/FurtherInfoProduct'
interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  console.log(product)
  return (
    <>
      <Container className="max-w-none w-full " clean>
        <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-none mt-5 mb-5 px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4">
              {/*  {!product.breadcrumbs
              ? null
              : product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-4 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        viewBox="0 0 6 20"
                        aria-hidden="true"
                        className="h-5 w-auto text-gray-300"
                      >
                        <path
                          d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </li>
                ))} */}
              <li className="text-sm">
                {!product.slug ? null : (
                  <a
                    href={'/product' + product.path}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {'/ ' + product.name}
                  </a>
                )}
              </li>
            </ol>
          </nav>
          <div className={cn(s.root, 'fit')}>
            <div className={cn(s.main, 'fit')}>
              {/* <ProductTag
              name={product.name}
              price={`${price} ${product.price?.currencyCode}`}
              fontSize={32}
            /> */}
              <div className={s.sliderContainer}>
                <ProductSlider key={product.id}>
                  {product.images.map((image, i) => (
                    <div key={image.url} className={s.imageContainer}>
                      <Image
                        className={s.img}
                        src={image.url!}
                        alt={image.alt || 'Product Image'}
                        width={600}
                        height={600}
                        priority={i === 0}
                        quality="85"
                      />
                    </div>
                  ))}
                </ProductSlider>
              </div>

              {/*  {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )} */}
            </div>

            <ProductSidebar
              key={product.id}
              product={product}
              className={s.sidebar}
            />
          </div>

          <FurtherInfoProduct />
          <section className="py-12 px-6 mb-10">
            <Text variant="sectionHeading">Customer also bought</Text>
            <div className={s.relatedProductsGrid}>
              {relatedProducts.map((p) => (
                <div
                  key={p.path}
                  className="bg-accent-0 border border-accent-2"
                >
                  <ProductCard
                    noNameTag
                    product={p}
                    key={p.path}
                    variant="simple"
                    className="animated fadeIn"
                    imgProps={{
                      alt: p.name,
                      className: 'w-full h-full object-cover',
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
