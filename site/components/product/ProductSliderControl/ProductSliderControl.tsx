import { FC, MouseEventHandler, memo } from 'react'
import cn from 'clsx'
import s from './ProductSliderControl.module.css'
import { ArrowLeft, ArrowRight } from '@components/icons'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

interface ProductSliderControl {
  onPrev: MouseEventHandler<HTMLButtonElement>
  onNext: MouseEventHandler<HTMLButtonElement>
}

const ProductSliderControl: FC<ProductSliderControl> = ({ onPrev, onNext }) => (
  <div className={s.control}>
    <button
      style={{ height: 44, width: 44 }}
      className={cn(s.leftControl)}
      onClick={onPrev}
      aria-label="Previous Product Image"
    >
      <ChevronLeftIcon />
    </button>
    <button
      style={{ height: 44, width: 44 }}
      className={cn(s.rightControl)}
      onClick={onNext}
      aria-label="Next Product Image"
    >
      <ChevronRightIcon />
    </button>
  </div>
)

export default memo(ProductSliderControl)
