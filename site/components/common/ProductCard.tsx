import Link from 'next/link'

interface Props {
  products: any
  setOpenCart?: any
}

export function ProductCard({ products, setOpenCart }: Props) {
  //console.log(products)
  //console.log(products)
  return (
    <>
      {products.map((product: any) => (
        <li key={product.id} className="inline-flex w-64 flex-col lg:w-auto">
          <div className="group relative">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
              {product.images.map((image: any, i: number) => {
                if (image.isDefault) {
                  return (
                    <img
                      key={i}
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  )
                }
              })}
            </div>
            <div className="mt-2 pl-2">
              <h4 className="sr-only">Available colors</h4>
              <ul
                role="list"
                className="mt-auto flex items-center space-x-3 pt-2 pb-1"
              >
                {product.options
                  ? product.options.map((option: any, i: number) => {
                      if (
                        option.displayName == 'Color' ||
                        option.displayName == 'Färg'
                      ) {
                        return option.values.map((value: any, i: number) => {
                          return (
                            <li
                              key={i}
                              className="h-4 w-4 rounded-full border border-black border-opacity-10"
                              style={{
                                backgroundColor: value.hexColors[0]
                                  ? value.hexColors[0]
                                  : value.label,
                              }}
                            >
                              <span className="sr-only">
                                {' '}
                                {value.hexColors[0]
                                  ? value.hexColors[0]
                                  : value.label}{' '}
                              </span>
                            </li>
                          )
                        })
                      }
                    })
                  : null}
              </ul>
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
        </li>
      ))}
    </>
  )
}
