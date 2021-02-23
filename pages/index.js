import React from "react";
import Link from "next/link";
import IndexNavbar from "components/Navbars/IndexNavbar.js";

export default function Index() {
  return (
    <>
      <IndexNavbar />

      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-gray-700">
                Torneitos MSF
              </h2>

              <div className="mt-12">
                <Link href="/torneos">
                  <a
                    href="#pablo"
                    className={
                      "get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-gray-600 active:bg-gray-700 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                    }
                  >
                    Torneos
                  </a>
                </Link>

                <Link href="/estadisticas">
                  <a
                    href="#pablo"
                    className={
                      "github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-gray-800 active:bg-gray-700 uppercase text-sm shadow hover:shadow-lg"
                    }
                  >
                    Estadisticas
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
          src={require("assets/img/pattern_nextjs.png")}
          alt="..."
        />
      </section>
    </>
  );
}
