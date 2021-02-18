import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <div className="relative bg-gray-900 md:pt-32 pb-22 pt-12"></div>

        <div className="px-4 md:px-10 mx-auto w-full -m-24 pt-12">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
