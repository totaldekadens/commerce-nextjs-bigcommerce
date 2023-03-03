//import { categoriesOnOurMind as categories } from "../utils/data/categories";
import Link from 'next/link'

/* interface Props {
  categories: any
} */

const onOurMindList = [
  {
    title: 'Insprirerande träning',
    imageSrc:
      'https://stadium.se/INTERSHOP/static/WFS/Stadium-SwedenB2C-Site/-/Stadium/sv_SE/stadium%20b2c/campaigns/homepage/2023/V.5/230202_TRA23_SEFI_START_dual.jpg',
    imageAlt: 'Insprirerande träning',
    path: '/search/t-shirts',
    slug: '',
  },
  {
    title: 'Padelsäsongen är igång',
    imageSrc:
      'https://stadium.se/INTERSHOP/static/WFS/Stadium-SwedenB2C-Site/-/Stadium/sv_SE/stadium%20b2c/campaigns/homepage/2023/v.9/Padel_Start_Dual_Desktop.png',
    imageAlt: 'Insprirerande träning',
    path: '/search/t-shirts',
    slug: '',
  },
  {
    title: 'Löparglädje',
    imageSrc:
      'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_721,c_limit/ee6a4150-40b2-4767-8628-e49ffaba34f2/nikes-officiella-webbplats.jpg',
    imageAlt: 'Insprirerande träning',
    path: '/search/t-shirts',
    slug: '',
  },
  {
    title: 'Stockholm Marathon',
    imageSrc:
      'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_300,c_limit/73b4ea93-aab8-46cc-b551-065ee89bd542/nikes-officiella-webbplats.png',
    imageAlt: 'Insprirerande träning',
    path: '/search/t-shirts',
    slug: '',
  },
]

export default function OurMind({}) {
  const categories = onOurMindList
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:mx-auto">
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-0">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            On Our Mind
          </h2>
        </div>

        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
            >
              {categories.map((category: any) => (
                <li
                  key={category.title}
                  className="inline-flex w-64 flex-col text-center lg:w-auto"
                >
                  <div className="group relative">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                      <img
                        src={category.imageSrc}
                        alt={category.imageAlt}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-6 flex item-center justify-center">
                      <h5 className="font-semibold text-gray-900">
                        <Link href={category.path}>
                          <span className="absolute inset-0" />
                          {/*  {category.part1} */}
                        </Link>
                      </h5>
                      <span>{category.title}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex px-4 sm:hidden">
          <Link href="categories/our-mind">
            <div className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              See everything
              <span aria-hidden="true"> &rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
