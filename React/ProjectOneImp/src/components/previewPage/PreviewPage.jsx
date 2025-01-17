import {NavLink, useLocation} from 'react-router-dom'

function PreviewPage() {
    const location = useLocation();
    console.log('props  >> ',location)
  return (
    <>
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
  <div className="pt-8">
    <div className="flex items-center">
      <ol className="flex w-full items-center overflow-hidden">
        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
          <a href="#">Home</a>
        </li>
        <li className="text-body mt-0.5 text-base">/</li>
        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
          <NavLink className="capitalize" to="/products">
            product
          </NavLink>
        </li>
        <li className="text-body mt-0.5 text-base">/</li>
        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
          <a className="capitalize">
          {location.state.name.productName}
          </a>
        </li>
      </ol>
    </div>
  </div>
  <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
    <div className="col-span-5 grid-cols-2 gap-2.5">
      <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
        <img
          src="https://picsum.photos/200"
          alt="Nike Air Max 95 By You--0"
          className="w-full object-cover"
        />
      </div>
      <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
        <img
          src="https://picsum.photos/200"
          alt="Nike Air Max 95 By You--0"
          className="w-full object-cover"
        />
      </div>
    </div>
    <div className="col-span-4 pt-8 lg:pt-0">
      <div className="mb-7 border-b border-gray-300 pb-7">
        <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
          {location.state.name.productName}
        </h2>
        <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
          {location.state.name.productDescription}
        </p>
        <div className="mt-5 flex items-center ">
          <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
          ₹{location.state.name.productPrice}
          </div>
          <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
          ₹{location.state.name.productPrice + 10}
          </span>
        </div>
      </div>
      <div className="border-b border-gray-300 pb-3  ">
        <div className="mb-4">
          <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
            size
          </h3>
          <ul className="colors -mr-3 flex flex-wrap">
            <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ">
              S
            </li>
            <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ">
              M
            </li>
            <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ">
              L
            </li>
            <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ">
              XL
            </li>
          </ul>
        </div>
        <div className="mb-4 ">
          <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
            color
          </h3>
          <ul className="colors -mr-3 flex flex-wrap">
            <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm">
              <span className="block h-full w-full rounded bg-orange-400"></span>
            </li>
            <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm">
              <span className="block h-full w-full rounded bg-pink-400"></span>
            </li>
            <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm">
              <span className="block h-full w-full rounded bg-violet-600"></span>
            </li>
            <li className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm">
              <span className="block h-full w-full rounded bg-red-500"></span>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
        <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
          <button
            className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
            disabled=""
          >
            +
          </button>
          <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
            1
          </span>
          <button className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12">
            -
          </button>
        </div>
        <button
          type="button"
          className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Add to cart
        </button>
      </div>
      <div className="py-6 ">
        <ul className="space-y-5 pb-1 text-sm">
          <li>
            <span className="text-heading inline-block pr-2 font-semibold">
              Local Name:
            </span>
            {location.state.name.productLocalName}
          </li>
          <li>
            <span className="text-heading inline-block pr-2 font-semibold">
              Status:
            </span>
            <a className="hover:text-heading transition hover:underline" href="#">
              {location.state.name.productStatus}
            </a>
          </li>
          <li>
            <span className="text-heading inline-block pr-2 font-semibold">
              Category:
            </span>
            <a className="hover:text-heading transition hover:underline" href="#">
              {location.state.name.productType}
            </a>
          </li>
          <li className="productTags">
            <span className="text-heading inline-block pr-2 font-semibold">
              Pincode:
            </span>
            <a
              className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
              href="#"
            >
              {location.state.name.userPinCode}
            </a>
          </li>
        </ul>
      </div>
      <div className="shadow-sm ">
        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
          <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
            Product Details
          </h2>
          <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
            <div className="bg-heading h-0.5 w-full rounded-sm"></div>
            <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out"></div>
          </div>
        </header>
        <div>
          <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
            Our Customer Experience Team is available 7 days a week and we offer
            2 ways to get in contact.Email and Chat . We try to reply quickly,
            so you need not to wait too long for a response!.
          </div>
        </div>
      </div>
      <div className="">
        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
          <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
            Additional Information
          </h2>
        </header>
      </div>
      <div className="">
        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
          <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
            Customer Reviews
          </h2>
        </header>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default PreviewPage;
