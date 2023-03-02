//import { productsMarketing as products } from "../utils/data/products";

interface Props {
  products: any
}

export default function Marketing({ products }: Props) {
  return (
    <div className="bg-white">
      <div className="">
        <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
          {products.map((product: any) => (
            <div
              className="relative flex"
              style={{ height: '70vh' }}
              key={product.id}
            >
              {product.images.map((image: any) => {
                if (image.isDefault) {
                  return (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={image.alt}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  )
                }
              })}

              <div className="relative flex w-full flex-col items-center justify-center bg-black bg-opacity-40 p-8 sm:p-12">
                <h2 className="text-lg font-medium text-white text-opacity-75">
                  Self-Improvement
                </h2>
                <p className="mt-1 text-2xl font-medium text-white">
                  Journals and note-taking
                </p>
                <a
                  href={`/product/${product.slug}`}
                  className="mt-4 rounded-md bg-white py-2.5 px-4 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  Shop now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
