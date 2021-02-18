import React, { useState } from "react";

// components
import TorneoForm from "../components/TorneoForm";
// layout for page

import Admin from "layouts/Admin.js";

export default function Torneos() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="flex flex-wrap">
      {!showCreateForm ? (
        <div className="w-full lg:w-4/12 px-4">
          <div className="px-5 py-24 mx-auto">
            <button
              onClick={() => {
                setShowCreateForm(!showCreateForm);
              }}
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150"
              type="button"
            >
              + Nuevo torneo
            </button>
          </div>
        </div>
      ) : null}

      {showCreateForm ? (
        <div className="w-full lg:w-8/12 px-4">
          <div className="px-5 py-24 mx-auto">
            <TorneoForm onCancel={() => setShowCreateForm(!showCreateForm)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

Torneos.layout = Admin;
