/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import TorneosList from "../TorneosList";
import useSWR from "swr";
import { graphQLClient } from "../../utils/grahpql-client";
import { GET_TEMPORADAS } from "../../graphql/queries";

const fetcher = async (query) => await graphQLClient.request(query);

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);

  const { data, loading, error } = useSWR(GET_TEMPORADAS, fetcher);

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    console.log("ERROR Tabs: ", error);
    return <div>Error al cargar las temporadas </div>;
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {data &&
              data.allTemporadas.data.map((temporada, index) => {
                return (
                  <li
                    className="-mb-px mr-2 last:mr-0 flex-auto text-center"
                    key={temporada._id}
                  >
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                        (openTab === index + 1
                          ? "text-white bg-blue-600"
                          : "text-blue-600 bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(index + 1);
                      }}
                      data-toggle="tab"
                      href={`#link${index + 1}`}
                      role="tablist"
                    >
                      {temporada.nombre}
                    </a>
                  </li>
                );
              })}
          </ul>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="flex-auto">
              <div className="tab-content tab-space">
                {data &&
                  data.allTemporadas.data.map((temporada, index) => {
                    return (
                      <div
                        className={openTab === index + 1 ? "block" : "hidden"}
                        id={`#link${index + 1}`}
                        key={temporada._id}
                      >
                        <TorneosList nombreTemporada={temporada.nombre} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
