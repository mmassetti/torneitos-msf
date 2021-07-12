import React from "react";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import TabsRender from "../components/Tabs/Tabs";

export default function Estadisticas() {
  return (
    <>
      <IndexNavbar />
      <div className="flex flex-wrap w-full lg:w-4/12 px-4 mt-32"></div>
      <TabsRender mode="estadisticas" />
    </>
  );
}
