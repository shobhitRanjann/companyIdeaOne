import { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  Transition,
  Menu,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link, NavLink } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

const products = [
  {
    name: "Orders",
    description: "Get a better understanding of your orders",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Talk directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Nearby Treats",
    description: "People open to meet and greet in your area",
    href: "#",
    icon: ChevronDownIcon,
  },
  // {
  //   name: "Integrations",
  //   description: "Connect with third-party tools",
  //   href: "#",
  //   icon: SquaresPlusIcon,
  // },
  {
    name: "Organize Treats",
    description: "Build your own treat place",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ tokens }) {
  console.log("Navbar  >> ", tokens.token);
  const [username, setUsername] = useState();

  //console.log('this is token ', token)
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  //  const { decodedToken, isExpired } = useJwt(cookieValue);

  // setCookieval(cookieValue)
  const tokenDetails = () => {
    try {
      if (cookieValue != undefined && cookieValue !== '') {
        console.log("decodedToken  > ", decodeToken(cookieValue));
        setUsername(decodeToken(cookieValue).name);
      }
    } catch (error) {
      console.log("error hai");
    }
  };
  useEffect(() => {
    // This code will run when the component mounts
    tokenDetails();
    // console.log('expired setToken ', isExpired)

    //console.log('isExpired  > ', isExpired)

    // If you have any cleanup logic for when the component unmounts,
    // you can return a function from useEffect
  }, [cookieValue]);

  const logout =(e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('reftok')
    document.cookie = `token=; SameSite=Strict; Secure`;
    document.cookie = `refresh=; SameSite=Strict; Secure`;
    setUsername(null)
    
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="./src/images/mark.svg" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Product
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <NavLink
            to="/ouraim"
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 ${
                isActive ? "text-orange-700" : "text-gray-900"
              } `
            }
          >
            Our Aim
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 ${
                isActive ? " text-orange-700 " : " text-gray-900 "
              } `
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 ${
                isActive ? " text-orange-700 " : " text-gray-900 "
              } `
            }
          >
            Trending
          </NavLink>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* RIght pannel for logout */}
          {username ? ( 
          <Menu as="div">
            <div>
              <Menu.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Welcome {username}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Account Information
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Support
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Orders
                      </a>
                    )}
                  </Menu.Item>
                  <form method="POST" onSubmit={logout}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          ) : ( <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 ${
                isActive ? " text-orange-700 " : " text-gray-900 "
              } `
            }
          >
            Log in/Sign up <span aria-hidden="true">&rarr;</span>
          </NavLink>) } 
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <NavLink
                  to="/ouraim"
                  className={({ isActive }) =>
                  `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    isActive ? "text-orange-700 hover:bg-gray-50" : "text-gray-900 hover:bg-gray-50"
                  } `
                }
                >
                  Our Aim
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                  `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    isActive ? "text-orange-700 hover:bg-gray-50 " : "text-gray-900 hover:bg-gray-50"
                  } `
                }
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/trending"
                  className={({ isActive }) =>
                  `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    isActive ? "text-orange-700 hover:bg-gray-50" : "text-gray-900 hover:bg-gray-50"
                  } `
                }
                >
                  Trending
                </NavLink>
              </div>
              <div className="py-6">
                {/* Conditional Statement */}
              {username ? ( 
          <Menu as="div">
            <div>
              <Menu.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Welcome {username}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Account Information
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Support
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Orders
                      </a>
                    )}
                  </Menu.Item>
                  
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          type="submit"
                          onClick={logout}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                        >
                          Sign out
                        </Link>
                      )}
                    </Menu.Item>
                  
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          ) : ( <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 ${
                isActive ? " text-orange-700 " : " text-gray-900 "
              } `
            }
          >
            Log in/Sign up <span aria-hidden="true">&rarr;</span>
          </NavLink>) }
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default NavBar;
