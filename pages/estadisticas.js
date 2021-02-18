import React from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4"></div>
        <div className="w-full lg:w-4/12 px-4"></div>
      </div>
    </>
  );
}

Settings.layout = Admin;
