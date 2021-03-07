/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import TorneosList from "../TorneosList";
import { useQuery } from "@apollo/react-hooks";
import withApollo from "../../utils/withApollo";
import { GET_TEMPORADAS } from "../../graphql/queries";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);

  // const { data, loading, error } = useQuery(GET_TEMPORADAS);
  // if (loading) {
  //   return "Cargando...";
  // }
  // if (error) {
  //   console.log("ERROR: ", error);
  // }

  const { data, loading, error } = useSWR("/api/temporadas", fetcher);

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
              data.map((temporada, index) => {
                return (
                  <li
                    className="-mb-px mr-2 last:mr-0 flex-auto text-center"
                    key={temporada.ref["@ref"].id}
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
                      {temporada.data.nombre}
                    </a>
                  </li>
                );
              })}
          </ul>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="flex-auto">
              <div className="tab-content tab-space">
                {data &&
                  data.map((temporada, index) => {
                    return (
                      <div
                        className={openTab === index + 1 ? "block" : "hidden"}
                        id={`#link${index + 1}`}
                        key={temporada.ref["@ref"].id}
                      >
                        <TorneosList idTemporada={temporada.ref["@ref"].id} />
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

export default withApollo(Tabs);
