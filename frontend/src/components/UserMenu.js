import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function UserMenu() {
    const navigate = useNavigate();
    const handleLogout = () => {
        axios
        .get("http://localhost:5000/api/v1/users/logout", { withCredentials: true })
        .then((res) => {
          alert("Bye 👋 See ya later 😄");
          navigate(0);
        })
        .catch((err) => console.log(err));
    };
  const { user } = useContext(UserContext);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center cursor-default">
          <img
            className="rounded-full"
            src={user ? `http://localhost:5000/img/users/${user.photo}` : null}
            alt=""
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 dark:text-white">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/me"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900 dark:text-gray-300 dark:bg-gray-700" : "text-gray-700 dark:text-gray-100 dark:bg-slate-800",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Update Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  href="http://localhost:5000/api/v1/users/logout"
                  onClick={handleLogout}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 w-full text-left dark:text-gray-300 dark:bg-gray-700"
                      : "text-gray-700 dark:text-gray-100 dark:bg-slate-800",
                    "block px-4 py-2 text-sm w-full text-left"
                  )}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
