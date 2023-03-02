//import { bestsellers as products } from "../utils/data/products";
import { ProductCard } from './ProductCard'

interface Props {
  products: any
}

export default function BestSellers({ products }: Props) {
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:mx-auto ">
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-0">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Trending Products
          </h2>
        </div>
        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
            >
              <ProductCard products={products} />
            </ul>
          </div>
        </div>
        <div className="mt-12 flex px-4 sm:hidden">
          <a
            href="#"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            See everything
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
