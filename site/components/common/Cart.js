import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  IconCircleMinus,
  IconCirclePlus,
  IconTrash,
} from "@tabler/icons-react";
import { ProductCardMatch } from "./ProductCardMatch";
import { matchingProducts as products2 } from "../utils/data/products";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    custom_url: {
      url: "/throwback-hip-bag",
      is_customized: false,
    },
    color: "Salmon",
    price: 90,
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    custom_url: {
      url: "/medium-stuff-satchel",
      is_customized: false,
    },
    color: "Blue",
    price: 32,
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function Cart({ open, setOpen }) {
  // const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setOpen}
        style={{ zIndex: 1000 }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full xs:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-6 xs:px-10 sm:px-12">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-3xl text-gray-900 mt-10">
                          Din varukorg
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div
                        style={{
                          height: 1,
                          width: 120,
                          backgroundColor: "black",
                          marginTop: 25,
                        }}
                      ></div>
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-sm font-medium text-gray-900">
                                      <h3>
                                        <a
                                          href={
                                            "/product" + product.custom_url.url
                                          }
                                        >
                                          {product.name}
                                        </a>
                                      </h3>
                                      <p className="ml-4  invisible sm:visible">
                                        {product.price + " SEK"}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.color}
                                    </p>
                                    <p className="my-1 text-sm visible sm:invisible">
                                      {product.price + " SEK"}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                      }}
                                    >
                                      <IconCircleMinus
                                        style={{ cursor: "unset" }}
                                        strokeWidth={1}
                                        size={30}
                                        color={"lightgray"}
                                      />
                                      <div>1</div>
                                      <IconCirclePlus
                                        style={{ cursor: "pointer" }}
                                        strokeWidth={1}
                                        size={30}
                                      />
                                    </div>
                                    <div className="flex">
                                      <IconTrash
                                        strokeWidth={1}
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex w-full mt-12 flex-col">
                        <div className="flex flex-col w-full sm: items-start">
                          <h2 style={{ fontSize: 30 }}>Matchande favoriter</h2>
                          <div
                            style={{
                              height: 1,
                              width: 120,
                              backgroundColor: "black",
                              marginTop: 25,
                            }}
                          ></div>
                        </div>
                        <div className="max-w-7xl overflow-hidden px-1 py-8 sm:px-1 lg:px-1">
                          <div className="grid grid-cols-3 overflow-hidden sm:grid-cols-3 lg:grid-cols-3">
                            <ProductCardMatch
                              products={products2}
                              setOpenCart={setOpen}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className=" py-6 px-4 sm:px-6"
                      style={{ backgroundColor: "rgb(244, 244, 239)" }}
                    >
                      <div className="flex text-sm justify-between font-extralight text-gray-900">
                        <p>Subtotal</p>
                        <p>122 SEK</p>
                      </div>
                      <div className="mt-1 text-sm  flex justify-between font-extralight text-gray-900">
                        <p>Frakt</p>
                        <p>0 SEK</p>
                      </div>
                      <div className="mt-1 text-sm  flex justify-between font-extralight text-gray-900">
                        <p>Varav moms</p>
                        <p>30.50 SEK</p>
                      </div>
                      <div
                        style={{
                          marginTop: 20,
                          width: "100%",
                          height: "1px",
                          backgroundColor: "black",
                        }}
                      ></div>
                      <div
                        style={{ marginTop: 20 }}
                        className="flex text-sm  justify-between font-medium text-gray-900"
                      >
                        <p>Summa</p>
                        <p>122 SEK</p>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center border border-transparent bg-black px-6 py-3 text-base text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
