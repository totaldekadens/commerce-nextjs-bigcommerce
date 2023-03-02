import Link from "next/link";
export function ProductCardMatch({ products, setOpenCart }) {
  return (
    <>
      {products.map((product) => (
        <li
          key={product.id}
          className="inline-flex w-auto flex-col text-center lg:w-auto"
        >
          <div className="group relative">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
              {product.images.map((image) => {
                if (image.primary) {
                  return (
                    <img
                      key={image.id}
                      src={image.imageSrc}
                      alt={image.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  );
                }
              })}
            </div>
            <div className="mt-2 sm:mt-4">
              <p className="text-sm text-gray-500">{product.color}</p>
              <h3 className="font-semibold text-gray-900 sm:mt-1">
                <Link href={"/product" + product.custom_url.url}>
                  <a
                    className="text-sm sm:text-base"
                    onClick={setOpenCart ? () => setOpenCart(false) : null}
                  >
                    <span className="absolute inset-0" />
                    {product.name}
                  </a>
                </Link>
              </h3>
              <p className="text-gray-900 text-sm sm:text-base sm:mt-1">
                {product.price + " SEK"}
              </p>
            </div>
          </div>

          {/* <h4 className="sr-only">Available colors</h4>
          <ul
            role="list"
            className="flex items-center justify-center space-x-3 pt-4 sm:mt-1"
          >
            {product.colors.map((color) => (
              <li
                key={color.name}
                className="h-4 w-4 rounded-full border border-black border-opacity-10"
                style={{ backgroundColor: color.bgColor }}
              >
                <span className="sr-only"> {color.name} </span>
              </li>
            ))}
          </ul> */}
        </li>
      ))}
    </>
  );
}
