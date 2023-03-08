import Link from 'next/link'
export default function ShopByCategory() {
  return (
    <div>
      <div className="mx-auto  ">
        <div className="px-3  sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            {/* Shop by Category */}
          </h2>
          <Link href="/search">
            <div className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
              Se alla kategorier
              <span aria-hidden="true"> &rarr;</span>
            </div>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div className="group aspect-w-2 aspect-h-1 overflow-hidden  sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
            <img
              src="https://stadium.se/INTERSHOP/static/WFS/Stadium-SwedenB2C-Site/-/Stadium/sv_SE/stadium%20b2c/campaigns/homepage/2023/v.9/hero-desktop-jackor%202.jpg"
              alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
              className="object-cover object-center group-hover:opacity-75"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50"
            />
            <div className="flex items-end p-6">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="/search/fritid/fritidsklader-och-utrustning/friluftsklader/fleecejackor">
                    <span className="absolute inset-0" />
                    Jackor
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Shoppa nu
                </p>
              </div>
            </div>
          </div>
          <div className="group aspect-w-2 aspect-h-1 overflow-hidden sm:aspect-none sm:relative sm:h-full">
            <img
              src="https://graningeshoes.com/wp-content/uploads/graninge-bred-01.jpg"
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="/search/fritid/fritidsskor/friluftskangor-vandringskangor">
                    <span className="absolute inset-0" />
                    Kängor
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Som passar alla väder
                </p>
              </div>
            </div>
          </div>
          <div className="group aspect-w-2 aspect-h-1 overflow-hidden sm:aspect-none sm:relative sm:h-full">
            <img
              src="https://skogmarks.b-cdn.net/16640-medium_default/garphyttan-specialist-gaiter-trouser-green-w.jpg"
              alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <Link href="/search/fritid/fritidsklader-och-utrustning/friluftsklader/fritidsbyxor-friluftsbyxor">
                    <span className="absolute inset-0" />
                    Byxor
                  </Link>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-white">
                  För ett aktiv friluftsliv
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:hidden">
          <a
            href="#"
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
