import Link from 'next/link'
import { FC } from 'react'

interface Props {
  entity: any
}

const DropDownItem: FC<Props> = ({ entity }) => {
  return (
    <Link href={'/'}>
      <p className="text-left font-light text-medium lg:text-lg cursor-pointer">
        {entity}
      </p>
    </Link>
  )
}

export default DropDownItem
