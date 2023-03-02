import Link from 'next/link'

interface Props {
  products: any
  setOpenCart?: any
}

export function ProductCard({ products, setOpenCart }: Props) {
  return (
    <>
      {products.map((product: any) => (
        <li
          key={product.id}
          className="inline-flex w-64 flex-col text-center lg:w-auto"
        >
          <div className="group relative">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
              {product.images.map((image: any) => {
                if (image.isDefault) {
                  return (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  )
                }
              })}
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500">{product.color}</p>
              <h3 className="mt-1 font-semibold text-gray-900">
                <Link href={'/product/' + product.slug}>
                  {setOpenCart ? (
                    <div onClick={() => setOpenCart(false)}>
                      <span className="absolute inset-0" />
                      {product.name}
                    </div>
                  ) : (
                    <div>
                      <span className="absolute inset-0" />
                      {product.name}
                    </div>
                  )}
                </Link>
              </h3>
              <p className="mt-1 text-gray-900">
                {product.price.value + ' ' + product.price.currencyCode}
              </p>
            </div>
          </div>

          <h4 className="sr-only">Available colors</h4>
          <ul
            role="list"
            className="mt-auto flex items-center justify-center space-x-3 pt-6"
          >
            {product.variants && product.colors
              ? product.colors.map((color: any) => (
                  <li
                    key={color.name}
                    className="h-4 w-4 rounded-full border border-black border-opacity-10"
                    style={{ backgroundColor: color.bgColor }}
                  >
                    <span className="sr-only"> {color.name} </span>
                  </li>
                ))
              : null}
          </ul>
        </li>
      ))}
    </>
  )
}
