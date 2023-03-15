import cn from 'clsx'
import Link from 'next/link'
import s from './UserNav.module.css'
import { Avatar } from '@components/common'
import useCart from '@framework/cart/use-cart'
import { useUI } from '@components/ui/context'
import { Heart, Bag, Menu } from '@components/icons'
import CustomerMenuContent from './CustomerMenuContent'
import useCustomer from '@framework/customer/use-customer'
import React from 'react'
import {
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
  Button,
} from '@components/ui'
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import type { LineItem } from '@commerce/types/cart'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNavCopy: React.FC<{
  setSearchBar: any
  className?: string
}> = ({ setSearchBar, className }) => {
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()
  const { closeSidebarIfPresent, openModal, setSidebarView, openSidebar } =
    useUI()

  const itemsCount = data?.lineItems?.reduce(countItem, 0) ?? 0
  const DropdownTrigger = isCustomerLoggedIn
    ? DropdownTriggerInst
    : React.Fragment

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        <li>
          <MagnifyingGlassIcon
            onClick={() => setSearchBar(true)}
            className="h-6 w-6 lg:hidden flex-shrink-0 text-gray-700 cursor-pointer hover:text-gray-800"
            aria-hidden="true"
          />
        </li>
        <li className={s.item}>
          <Button
            className={s.item}
            variant="naked"
            onClick={() => {
              setSidebarView('CART_VIEW')
              openSidebar()
            }}
            aria-label={`Cart items: ${itemsCount}`}
          >
            <ShoppingBagIcon
              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            {itemsCount > 0 && (
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {itemsCount}
              </span>
            )}
          </Button>
        </li>

        {/* {process.env.COMMERCE_WISHLIST_ENABLED && (
          <li className={s.item}>
            <Link href="/wishlist">
              <button onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </button>
            </Link>
          </li>
        )} */}
        {/*  {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
          <li className={s.item}>
            <Dropdown>
              <DropdownTrigger>
                <button
                  aria-label="Menu"
                  className={s.avatarButton}
                  onClick={() => (isCustomerLoggedIn ? null : openModal())}
                >
                  <Avatar />
                </button>
              </DropdownTrigger>
              <CustomerMenuContent />
            </Dropdown>
          </li>
        )} */}
        {/* <li className={s.mobileMenu}>
          <Button
            className={s.item}
            aria-label="Menu"
            variant="naked"
            onClick={() => {
              setSidebarView('MOBILE_MENU_VIEW')
              openSidebar()
            }}
          >
            <Menu />
          </Button>
        </li> */}
      </ul>
    </nav>
  )
}

export default UserNavCopy
