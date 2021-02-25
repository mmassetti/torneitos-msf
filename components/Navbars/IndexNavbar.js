import React from "react";
import Link from "next/link";
// components

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-900 shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="items-center flex">
            <Link href="/">
              <a
                href="#pablo"
                className="hover:text-yellow-400 text-orange-500 px-3 py-4 lg:py-2 flex items-center text-md uppercase font-bold"
              >
                <div className="flex-shrink-0">
                  Torneitos MSF
                  {/* <img
                    clasNames="h-10 w-10"
                    src={require("assets/img/msf.png")}
                    alt="Workflow"
                  /> */}
                </div>
              </a>
            </Link>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <Link href="/torneos">
                <a
                  href="#pablo"
                  className="hover:text-yellow-400 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <i
                    className={"fas fa-trophy mr-2 text-sm  text-yellow-400"}
                  ></i>{" "}
                  Torneos
                </a>
              </Link>
              <Link href="/estadisticas">
                <a
                  href="#pablo"
                  className="hover:text-green-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <i
                    className={"fas fa-chart-bar mr-2 text-sm text-green-500"}
                  ></i>{" "}
                  Estadísticas
                </a>
              </Link>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <UserDropdown />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
