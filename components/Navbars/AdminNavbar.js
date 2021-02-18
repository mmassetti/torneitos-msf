import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

function getCurrentPageName() {
  if (typeof window !== "undefined") {
    if (window.location.pathname === "/torneos") {
      return "Torneos";
    } else if (window.location.pathname === "/estadisticas") {
      return "Estadísticas";
    } else {
      return "Torneitos MSF";
    }
  }
}

export default function Navbar() {
  let currentPage = getCurrentPageName();

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {currentPage}
          </a>
          {/* Form */}

          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
