import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  product: any
  setSearchBar: any
}

const DropDownProductCard: FC<Props> = ({ product, setSearchBar }) => {
  // console.log(product)
  product.url.replace('/', '')
  return (
    <Link
      href={'/product/' + product.url}
      onClick={() => {
        setSearchBar(false)
      }}
    >
      <div className="flex-col basis-1/2 lg:basis-1/5 flex items-center p-4 cursor-pointer gap-1">
        <div>
          <Image
            alt="hej"
            style={{ maxWidth: '100%', height: 'auto' }}
            src={product.image}
            height={400}
            width={300}
            objectFit={'cover'}
          />
        </div>
        <p className="text-sm font-normal mt-2">{product.name}</p>
        <p className="text-sm font-light">{product.price},00 kr</p>
      </div>
    </Link>
  )
}

export default DropDownProductCard
