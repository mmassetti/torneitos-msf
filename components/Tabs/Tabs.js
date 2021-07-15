/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import TorneosList from "../TorneosList";
import useSWR from "swr";
import { graphQLClient } from "../../utils/grahpql-client";
import { GET_TEMPORADAS } from "../../graphql/queries";
import HistorialPartidosEntreSi from "../HistorialPartidosEntreSi/HistorialPartidosEntreSi";

const fetcher = async (query) => await graphQLClient.request(query);

const Tabs = ({ mode }) => {
  const [openTab, setOpenTab] = useState(1);

  const { data, loading, error } = useSWR(GET_TEMPORADAS, fetcher);

  const [tabsArray, setTabsArray] = useState([]);
  const [partidosEntreSi, setPartidosEntreSi] = useState([]);
  const [golesEntreSi, setGolesEntreSi] = useState([]);

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    console.log("ERROR Tabs: ", error);
    return <div>Error al cargar las temporadas </div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    let tabsArray = data?.allTemporadas.data;

    if (mode === "estadisticas") {
      if (
        tabsArray &&
        tabsArray.length > 0 &&
        !tabsArray.some((tab) => tab.nombre === "global")
      ) {
        tabsArray.push({
          _id: "global",
          nombre: "global",
        });
      }
    }

    setTabsArray(tabsArray);

    let historialChacaMasa = {
      pgMasa: 0,
      pgChaca: 0,
      empates: 0,
      golesMasa: 0,
      golesChaca: 0,
    };

    let historialChacaSeba = {
      pgSeba: 0,
      pgChaca: 0,
      empates: 0,
      golesSeba: 0,
      golesChaca: 0,
    };

    let historialMasaSeba = {
      pgMasa: 0,
      pgSeba: 0,
      empates: 0,
      golesMasa: 0,
      golesSeba: 0,
    };

    if (data) {
      data.allTemporadas.data.map((temporada) => {
        // eslint-disable-next-line no-unused-expressions
        temporada?.torneos?.data.map((torneo) => {
          // eslint-disable-next-line no-unused-expressions
          torneo.resultados?.data?.map((resultado) => {
            if (
              resultado.anotadosGolesJugador1 &&
              resultado.anotadosGolesJugador2
            ) {
              if (
                (resultado.jugador1 === "Masa" &&
                  resultado.jugador2 === "Chaca") ||
                (resultado.jugador1 === "Chaca" &&
                  resultado.jugador2 === "Masa")
              ) {
                //MASA VS CHACA
                let golesFinalChaca = 0;
                let golesFinalMasa = 0;

                if (resultado.jugador1 === "Masa") {
                  golesFinalChaca = resultado.golesJugador2;
                  golesFinalMasa = resultado.golesJugador1;
                } else {
                  golesFinalChaca = resultado.golesJugador1;
                  golesFinalMasa = resultado.golesJugador2;
                }

                let ganadorMasa = 0;
                let ganadorChaca = 0;
                let empate = 0;
                if (golesFinalChaca < golesFinalMasa) {
                  ganadorMasa = 1;
                } else if (golesFinalChaca === golesFinalMasa) {
                  empate = 1;
                } else {
                  ganadorChaca = 1;
                }

                historialChacaMasa.pgMasa += ganadorMasa;
                historialChacaMasa.pgChaca += ganadorChaca;
                historialChacaMasa.empates += empate;
                historialChacaMasa.golesChaca += golesFinalChaca;
                historialChacaMasa.golesMasa += golesFinalMasa;
              } else if (
                //SEBA VS CHACA
                (resultado.jugador1 === "Seba" &&
                  resultado.jugador2 === "Chaca") ||
                (resultado.jugador1 === "Chaca" &&
                  resultado.jugador2 === "Seba")
              ) {
                let golesFinalChaca = 0;
                let golesFinalSeba = 0;

                if (resultado.jugador1 === "Seba") {
                  golesFinalChaca = resultado.golesJugador2;
                  golesFinalSeba = resultado.golesJugador1;
                } else {
                  golesFinalChaca = resultado.golesJugador1;
                  golesFinalSeba = resultado.golesJugador2;
                }

                let ganadorSeba = 0;
                let ganadorChaca = 0;
                let empate = 0;
                if (golesFinalChaca < golesFinalSeba) {
                  ganadorSeba = 1;
                } else if (golesFinalChaca === golesFinalSeba) {
                  empate = 1;
                } else {
                  ganadorChaca = 1;
                }

                historialChacaSeba.pgSeba += ganadorSeba;
                historialChacaSeba.pgChaca += ganadorChaca;
                historialChacaSeba.empates += empate;
                historialChacaSeba.golesChaca += golesFinalChaca;
                historialChacaSeba.golesSeba += golesFinalSeba;
              } else {
                //MASA VS SEBA
                let golesFinalSeba = 0;
                let golesFinalMasa = 0;

                if (resultado.jugador1 === "Masa") {
                  golesFinalSeba = resultado.golesJugador2;
                  golesFinalMasa = resultado.golesJugador1;
                } else {
                  golesFinalSeba = resultado.golesJugador1;
                  golesFinalMasa = resultado.golesJugador2;
                }

                let ganadorMasa = 0;
                let ganadorSeba = 0;
                let empate = 0;
                if (golesFinalSeba < golesFinalMasa) {
                  ganadorMasa = 1;
                } else if (golesFinalSeba === golesFinalMasa) {
                  empate = 1;
                } else {
                  ganadorSeba = 1;
                }

                historialMasaSeba.pgMasa += ganadorMasa;
                historialMasaSeba.pgSeba += ganadorSeba;
                historialMasaSeba.empates += empate;
                historialMasaSeba.golesSeba += golesFinalSeba;
                historialMasaSeba.golesMasa += golesFinalMasa;
              }
            }
          });
        });
      });

      let historialArray = [];
      let golesArray = [];

      historialArray.push({
        jugador1: "Masa",
        jugador2: "Chaca",
        victoriasJugador1: historialChacaMasa.pgMasa,
        victoriasJugador2: historialChacaMasa.pgChaca,
        empates: historialChacaMasa.empates,
      });

      golesArray.push({
        jugador1: "Masa",
        jugador2: "Chaca",
        golesJugador1: historialChacaMasa.golesMasa,
        golesJugador2: historialChacaMasa.golesChaca,
      });

      historialArray.push({
        jugador1: "Seba",
        jugador2: "Chaca",
        victoriasJugador1: historialChacaSeba.pgSeba,
        victoriasJugador2: historialChacaSeba.pgChaca,
        empates: historialChacaSeba.empates,
      });

      golesArray.push({
        jugador1: "Seba",
        jugador2: "Chaca",
        golesJugador1: historialChacaSeba.golesSeba,
        golesJugador2: historialChacaSeba.golesChaca,
      });

      historialArray.push({
        jugador1: "Masa",
        jugador2: "Seba",
        victoriasJugador1: historialMasaSeba.pgMasa,
        victoriasJugador2: historialMasaSeba.pgSeba,
        empates: historialMasaSeba.empates,
      });

      golesArray.push({
        jugador1: "Masa",
        jugador2: "Seba",
        golesJugador1: historialMasaSeba.golesMasa,
        golesJugador2: historialMasaSeba.golesSeba,
      });

      setPartidosEntreSi(historialArray);
      setGolesEntreSi(golesArray);
    }
  }, [data, mode]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {data &&
              tabsArray?.map((temporada, index) => {
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
                  tabsArray?.map((temporada, index) => {
                    return (
                      <div
                        className={openTab === index + 1 ? "block" : "hidden"}
                        id={`#link${index + 1}`}
                        key={temporada._id}
                      >
                        {mode === "estadisticas" ? (
                          <HistorialPartidosEntreSi
                            arrayTorneos={temporada?.torneos?.data}
                            isGlobal={
                              temporada?.nombre === "global" ? true : false
                            }
                            partidosEntreSiGlobal={partidosEntreSi}
                            golesEntreSiGlobal={golesEntreSi}
                          />
                        ) : (
                          <TorneosList nombre={temporada.nombre} />
                        )}
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
