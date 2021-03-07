/* eslint-disable react/react-in-jsx-scope */
import EquiposJugadores from "./EquiposJugadores";
import TorneoPuntajes from "./TorneoPuntajes";

import TorneoResultados from "./TorneoResultados";

export default function Torneo({ torneoData }) {
  function onUpdate(esLocal, numeroEnfrentamiento, goles, nombreJugador) {
    console.log(
      "🚀 ~ file: Torneo.js ~ line 8 ~ Torneo ~ torneoData ",
      torneoData
    );
    let tablaToUpdate = torneoData.tablas.data.filter(
      (tabla) => tabla.jugador == nombreJugador
    );

    let enfrentamiento = torneoData.resultados.data[numeroEnfrentamiento - 1];
    console.log(
      "🚀 ~ file: Torneo.js ~ line 18 ~ onUpdate ~ enfrentamiento",
      enfrentamiento
    );
    let shouldUpdatePuntajes = false;

    if (esLocal) {
      if (enfrentamiento.anotadosGolesJugador2) {
        shouldUpdatePuntajes = true;
      }
    } else {
      if (enfrentamiento.anotadosGolesJugador1) {
        shouldUpdatePuntajes = true;
      }
    }

    if (shouldUpdatePuntajes) {
      alert("Actualizar porque ya estan los 2 cargados!");
    }

    // console.log(
    //   "🚀 ~ file: Torneo.js ~ line 17 ~ onUpdate ~ tablaToUpdate",
    //   tablaToUpdate
    // );
  }

  return (
    <>
      <div className="divide-y-4 divide-yellow-600 divide-dashed">
        <h3 className="w-full md:w-4/12 px-4 mr-auto ml-auto text-3xl mb-2 mt-4 font-semibold leading-normal">
          Torneo{" "}
          <span className={"font-bold text-blue-600"}>
            #{torneoData.numeroTorneo}{" "}
          </span>
        </h3>
        <div className="flex flex-row-reverse px-4 mx-auto">
          <div className="w-full overflow-auto bg-gray-500 ">
            <div className="content flex flex-row flex-no-wrap items-start justify-center m-2">
              <div
                className="item bg-white  w-64"
                style={{ marginTop: "-2.2rem" }}
              >
                <div className="p-4">
                  <TorneoResultados
                    torneoData={torneoData}
                    onUpdate={onUpdate}
                  />
                </div>
              </div>
              <div className="item bg-white m-2 w-64">
                <div className="p-4">
                  <EquiposJugadores torneoData={torneoData} />
                </div>
              </div>

              <div className="item bg-white m-2 w-64">
                <div className="p-4 mt-4">
                  <TorneoPuntajes torneoData={torneoData} />
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <hr className="mt-6 border-b-1 border-gray-400" />
      </div>
    </>
  );
}
