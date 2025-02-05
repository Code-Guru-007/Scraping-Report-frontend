import { useEffect, useState } from "react";

function Navbar({ onSearch, search }) {
  const [navState, setNavState] = useState(window.location.pathname);
  const [sboxState, setSboxState] = useState(false);
  const [burgerState, setBurgerState] = useState(false);

  const onNavStateChange = (n) => {
    setNavState(n);
  };

  useEffect(() => {}, []);

  const handleSboxChange = () => {
    setSboxState(!sboxState);
  };

  const handleBurgerChange = () => {
    setBurgerState(!burgerState);
  };

  const click =
    "block py-2 pl-3 pr-4 font-[18px] font-bold uppercase text-white bg-red-600 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-blue-500";
  const normal =
    "block py-2 pl-3 pr-4 font-[18px] font-bold uppercase text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 flex justify-between items-center px-[5vw]">
        <div className="flex items-center">
          <a href="/" id="logo" className="mr-[5vw] w-[100px] py-[5px]">
            <img
              alt="logo"
              className="w-[100px]"
              src="/CommunityDealsLogo.JPG"
            />
          </a>
        </div>
        <div className="hidden md:block">
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/home"
                onClick={() => onNavStateChange("/home")}
                className={
                  navState.toString().includes("home") ? click : normal
                }
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/deals"
                onClick={() => onNavStateChange("/deals")}
                className={
                  navState.toString().includes("deals") ? click : normal
                }
              >
                Deals
              </a>
            </li>
            <li>
              <a
                href="/categories"
                onClick={() => onNavStateChange("/categories")}
                className={
                  navState.toString().includes("categories") ? click : normal
                }
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="/about"
                onClick={() => onNavStateChange("/about")}
                className={
                  navState.toString().includes("about") ? click : normal
                }
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                onClick={() => onNavStateChange("/contact")}
                className={
                  navState.toString().includes("contact") ? click : normal
                }
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div id="searchbox">
          <div
            className={
              search
                ? "relative hidden md:block visible"
                : "relative hidden md:block invisible"
            }
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              data-id="search1"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border-none focus:border-none bg-white dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white "
              placeholder="Search..."
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="md:hidden flex">
            <div className={search ? "visible" : "invisible"}>
              <button
                type="button"
                onClick={() => handleSboxChange()}
                className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
            <button
              id="hamburger"
              onClick={() => handleBurgerChange()}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {search ? (
        <div className={sboxState ? "relative bg-white p-[5px]" : "hidden"}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none px-[5px]">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="rounded-sm block w-full px-[5px] pl-10 text-sm text-gray-900 border-none focus:border-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white "
            placeholder="Search..."
            onChange={(e) => onSearch(e)}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={burgerState ? "block w-full" : "hidden"}>
        <ul className="flex flex-col p-4 md:p-0border border-gray-100  bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a
              href="/home"
              onClick={() => onNavStateChange("/home")}
              className={navState.toString().includes("home") ? click : normal}
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/deals"
              onClick={() => onNavStateChange("/deals")}
              className={navState.toString().includes("deals") ? click : normal}
            >
              Deals
            </a>
          </li>
          <li>
            <a
              href="/categories"
              onClick={() => onNavStateChange("/categories")}
              className={
                navState.toString().includes("categories") ? click : normal
              }
            >
              Categories
            </a>
          </li>
          <li>
            <a
              href="/about"
              onClick={() => onNavStateChange("/about")}
              className={navState.toString().includes("about") ? click : normal}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              onClick={() => onNavStateChange("/contact")}
              className={
                navState.toString().includes("contact") ? click : normal
              }
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;