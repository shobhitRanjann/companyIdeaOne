import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Fragment, useState,useMemo, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SubmitRequestAlert from "../modalAlert/SubmitRequestAlert";
import { decodeToken } from "react-jwt";
import ReactPaginate from 'react-paginate';
import { createRoot } from 'react-dom/client';

var items='';
 
function Items( {currentItems} ) {
  console.log('curent items ',currentItems);
  return (
    <>
      {currentItems &&
        currentItems.map((review) => (
          <>
              <figure className="max-w-screen-md" key={review.id}>
                <div className="flex items-center mb-1 text-yellow-300" style={{webkitTextStrokeWidth: "medium"}}>
                {[...Array(5)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        <>
                        <label key={index * review.id}>
                         
                          <span
                            className="w-8 h-8"
                            style={{
                              color:
                                currentRating <= (review.stars)
                                  ? "#ffc107"
                                  : "#CACCD1",
                            }}
                          >
                            &#9733;
                          </span> 
                        </label>
                        
                        </>
                      );
                    })}

                </div>
                <blockquote>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                     {review.comment}
                  </p>
                </blockquote>
                <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
                  <img
                    className="w-6 h-6 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="profile picture"
                  />
                  <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                    <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                      {review.user.substring(0, review.user.indexOf('@'))}
                    </cite>
                    <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                      {review.datetime}
                    </cite>
                  </div>
                </figcaption>
              </figure>
              <div style={{border: "dotted",marginTop: "14px",color: "coral",marginBottom: "14px"}}></div>
              </>
        ))}
    </>
    
  );
}
 
function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
 
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  console.log('currentItems    ', currentItems , '    itemsPerPage   ', itemsPerPage);
  console.log('pageCount    ', pageCount);
 
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
 
  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}



function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  var values = "";
  const [reviews, setReviews] = useState([]);
 useEffect(() => {
  const customerRevifffewHandler = async (id) => {
    const response = await fetch(`http://localhost:8080/reviews/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("no reviews");
      return;
    }
    setReviews(await response.json()); 
    
  };
  customerRevifffewHandler(location.state.name.productId);
}, []);

useEffect(()=>{
  items = reviews;
  const container = document.getElementById('reviewcontainer');
const root = createRoot(container);
root.render(<PaginatedItems itemsPerPage={3} />);
},[reviews]);



  const goNowClick = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh="))
      ?.split("=")[1];
    console.log("tpok  ", token);
    if (token != "") {
      setOpen(true);
      return;
    }
    navigate("/login");
  };
  const isChecked = (e) => {
    values = e.target.value;
  };
  const [showSubmit, setShowSubmit] = useState(false);

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };
  const handleProceed = () => {
    if (values == "paynow") {
      console.log("pay now system");
    }
    if (values == "payathome") {
      setShowSubmit(true);
    }
  };

  const handleGoHomeRequest = async () => {
    //  setGoRequest(true)
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh="))
      ?.split("=")[1];
    setShowSubmit(false);
    console.log(showSubmit);
    console.log("confirm going home with  message  > " + userMessage);
    const response = await fetch("http://localhost:8080/orders/saveorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userid: decodeToken(token).sub,
        productId: location.state.name.productId,
        productuserid: location.state.name.productUserid,
        message: userMessage,
      }),
    });
    if (!response.ok) {
      console.log(response.statusText);
    }
  };

  const customerReviewHandler = async (id) => {
    const response = await fetch(`http://localhost:8080/reviews/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("no reviews");
      return;
    }
    setReviews(await response.json()); 
  };
  function dateCall(dat){
    return new Date(dat); 
  }

  return (
    <>
      <SubmitRequestAlert
        show={showSubmit}
        close={() => setShowSubmit(false)}
        submitreq={() => handleGoHomeRequest()}
      />
      <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16" key={location.state.id}>
        <div className="pt-8">
          <div className="flex items-center">
            <ol className="flex w-full items-center overflow-hidden">
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <a href="#">Home</a>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <NavLink className="capitalize" to="/products">
                  Product
                </NavLink>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <a className="capitalize">{location.state.name.productName}</a>
              </li>
            </ol>
          </div>
        </div>
        <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
          <div className="col-span-5 grid-cols-2 gap-2.5">
            <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
              <img
                src={
                  "http://localhost:8080/product/image" +
                  location.state.name.productImagePath[0].split("uploads")[1]
                }
                alt="Nike Air Max 95 By You--0"
                className="w-full object-cover"
              />
            </div>
            <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
              <img
                src={
                  "http://localhost:8080/product/image" +
                  location.state.name.productImagePath[1].split("uploads")[1]
                }
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
                  ₹
                  {location.state.name.productPrice +
                    (location.state.name.productPrice % 10)}
                </span>
              </div>
            </div>
            <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
              <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                  1 Person Only
                </span>
              </div>
              <button
                type="button"
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={goNowClick}
              >
                Go now
              </button>
            </div>
            <div className="py-6 ">
              <ul className="space-y-5 pb-1 text-sm">
                <li key={0}>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Local Name:
                  </span>
                  {location.state.name.productLocalName}
                </li>
                <li  key={1}>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Status:
                  </span>
                  <a
                    className="hover:text-heading transition hover:underline"
                    href="#"
                  >
                    {location.state.name.productStatus}
                  </a>
                </li>
                <li  key={2}>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Category:
                  </span>
                  <a
                    className="hover:text-heading transition hover:underline"
                    href="#"
                  >
                    {location.state.name.productType}
                  </a>
                </li>
                <li key={3} className="productTags">
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
 
            <div className="">
              <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                  Additional Information
                </h2>
              </header>
            </div>
            <div>
              <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                <h2
                  className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg"
                  onClick={() =>
                    customerReviewHandler(location.state.name.productId)
                  }
                >
                  Customer Reviews
                </h2>
              </header>
              <div id="reviewcontainer"></div>
              {/* review code */}
            </div>
          </div>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          {location.state.name.productName}
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {
                          <>
                            <p>* Keep the place clean. </p>
                            <p>* Respect everyone space. </p>
                            <p>
                              * If you are selecting pay at home, then pay them
                              appropiate amount withought bargaining.{" "}
                            </p>
                            <ul className="mt-6 space-y-3">
                              <li className="flex items-center justify-between text-gray-600">
                                <p className="text-sm font-medium">Sub total</p>
                                <p className="text-sm font-medium">
                                  ₹{location.state.name.productPrice}
                                </p>
                              </li>
                              <li className="flex items-center justify-between text-gray-900">
                                <p className="text-sm font-medium ">Total</p>
                                <p className="text-sm font-bold ">
                                  ₹{location.state.name.productPrice}
                                </p>
                              </li>
                            </ul>

                            <div className="mt-6 space-y-6">
                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="message"
                                  className="block text-sm font-semibold leading-6 text-gray-900"
                                >
                                  Message (OPTIONAL)
                                </label>
                                <div className="mt-2.5">
                                  <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    placeholder="Optional Message"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                    onChange={handleMessageChange}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="pay-now"
                                  name="payment"
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  value="paynow"
                                  onChange={isChecked}
                                />
                                <label
                                  htmlFor="pay-now"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Pay Now
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  id="Pay-At-Their-Home"
                                  name="payment"
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  value="payathome"
                                  onChange={isChecked}
                                />
                                <label
                                  htmlFor="Pay-At-Their-Home"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Pay At Their Home
                                </label>
                              </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="button"
                                onClick={handleProceed}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Proceed
                              </button>
                            </div>
                          </>
                        }
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default ProductDetail;
