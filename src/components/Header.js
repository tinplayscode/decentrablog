import { login, logout } from "../utils";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  UserIcon,
  LogoutIcon,
  DocumentAddIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const APP_NAME = process.env.APP_NAME || "HumanOfNear";

export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link
          className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-10 h-10 p-2 text-white bg-indigo-500 rounded-full"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">{APP_NAME}</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          {/* <Link
            className="flex items-center mr-5 hover:text-gray-900 link-underline link-underline-black"
            to="/posts"
          >
            <ViewListIcon className="w-4 h-4" />
            All posts
          </Link> */}
          <Link
            className="flex items-center mr-5 hover:text-gray-900 link-underline link-underline-black"
            to="/create-new-post"
          >
            <DocumentAddIcon className="w-4 h-4" />
            Create new post
          </Link>
        </nav>

        {!window.walletConnection.isSignedIn() ? (
          <button
            className="inline-flex items-center gap-2 px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0"
            onClick={login}
          >
            <svg
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              style={{ userSelect: "auto" }}
            >
              <path
                d="m16.0444 1.02222-4.1777 6.2c-.2889.42222.2666.93334.6666.57778l4.1111-3.57778c.1112-.08889.2667-.02222.2667.13334v11.17774c0 .1556-.2.2223-.2889.1111l-12.44442-14.888844c-.4-.488889-.97778-.755556-1.62222-.755556h-.44445c-1.155554 0-2.11111.955556-2.11111 2.13333v15.73337c0 1.1777.955556 2.1333 2.13333 2.1333.73334 0 1.42223-.3778 1.82223-1.0222l4.17777-6.2c.28889-.4222-.26666-.9334-.66666-.5778l-4.11111 3.5556c-.11112.0888-.26667.0222-.26667-.1334v-11.15553c0-.15556.2-.22223.28889-.11111l12.44442 14.88884c.4.4889 1 .7556 1.6222.7556h.4445c1.1778 0 2.1333-.9556 2.1333-2.1333v-15.73337c-.0222-1.177774-.9778-2.13333-2.1555-2.13333-.7334 0-1.4223.377778-1.8223 1.02222z"
                style={{ userSelect: "auto" }}
              ></path>
            </svg>
            <span>Connect wallet</span>
          </button>
        ) : (
          <div className="relative z-50">
            <Menu>
              <Menu.Button>
                <div className="inline-flex items-center px-3 py-2 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0">
                  {window.walletConnection.isSignedIn() && (
                    <>
                      {window.accountId}

                      <ChevronDownIcon className="w-6 h-6 text-gray-400"></ChevronDownIcon>
                    </>
                  )}
                </div>
              </Menu.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 flex flex-col p-1 mt-1 bg-white rounded shadow-md ring-1 ring-black ring-opacity-5 w-60">
                  <Menu.Item
                    as={Link}
                    to={`/profile/${window.accountId}`}
                    className="inline-flex items-center gap-2 px-3 py-2 mt-4 text-base bg-white border-0 rounded focus:outline-none hover:bg-indigo-400 hover:text-white md:mt-0"
                  >
                    <UserIcon className="w-4 h-4"></UserIcon>
                    <span>Profile</span>
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to="/create-new-post"
                    className="inline-flex items-center gap-2 px-3 py-2 mt-4 text-base bg-white border-0 rounded focus:outline-none hover:bg-indigo-400 hover:text-white md:mt-0"
                  >
                    <DocumentAddIcon className="w-4 h-4" />
                    Create new post
                  </Menu.Item>
                  <Menu.Item
                    as="button"
                    className="inline-flex items-center gap-2 px-3 py-2 mt-4 text-base bg-white border-0 rounded focus:outline-none hover:bg-indigo-400 hover:text-white md:mt-0"
                    onClick={logout}
                  >
                    <LogoutIcon className="w-4 h-4" />
                    Logout
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>
    </header>
  );
}
