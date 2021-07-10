import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { graphQLClient } from "../utils/grahpql-client";
import {
  RESET_ENFRENTAMIENTO,
  RESET_ESTADISTICA_TABLA,
  UPDATE_TORNEO,
} from "../graphql/mutations";
import useSound from "use-sound";

import daleCampeon from "../assets/audio/campeon.mp3";

export default function TorneoGanador({ torneoData }) {
  const [tablasArray, setTablasArray] = useState([]);
  const [torneoIniciado, setTorneoIniciado] = useState(false);
  const [torneoTerminado, setTorneoTerminado] = useState(false);
  const [yaPuedeHaberCampeon, setYaPuedeHaberCampeon] = useState(false);
  const [play] = useSound(daleCampeon, { volume: 0.25 });

  useEffect(() => {
    setTablasArray(torneoData?.tablas.data);
    let resultadosArray = torneoData?.resultados.data.sort((a, b) =>
      a.numeroEnfrentamiento > b.numeroEnfrentamiento ? 1 : -1
    );

    setTorneoIniciado(
      resultadosArray[0]?.anotadosGolesJugador1 === true ||
        resultadosArray[1]?.anotadosGolesJugador1 === true ||
        resultadosArray[2]?.anotadosGolesJugador1 === true ||
        resultadosArray[3]?.anotadosGolesJugador1 === true ||
        resultadosArray[4]?.anotadosGolesJugador1 === true ||
        resultadosArray[5]?.anotadosGolesJugador1 === true ||
        tablasArray[0]?.puntos !== null ||
        tablasArray[1]?.puntos !== null ||
        tablasArray[2]?.puntos !== null
    );

    setTorneoTerminado(torneoData?.campeon && torneoData?.campeon !== "");

    //Chequeo si hay al menos 4 partidos
    let hayAlMenos4Partidos = false;
    let nroActualPartidos = 0;

    // for (var i = 0; i < arrayToCheck.length; i++) {
    //   if (isArrayValid && !(arrayToCheck[i].number > 1)) {
    //     isArrayValid = false;
    //   }
    // }

    for (let i = 0; i < resultadosArray.length; i++) {
      if (
        resultadosArray[i].anotadosGolesJugador1 &&
        resultadosArray[i].anotadosGolesJugador2
      ) {
        nroActualPartidos++;
        if (nroActualPartidos === 4) {
          hayAlMenos4Partidos = true;
          break;
        }
      }
    }

    setYaPuedeHaberCampeon(hayAlMenos4Partidos);
  }, [tablasArray, torneoData]);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const showModal = async () => {
    const { value: formValues } = await Swal.fire({
      confirmButtonText: "Confirmar",
      title: "Confirmar resultados",
      html:
        "<br/>" +
        '<h2><b>Campeón 🥇:</b> </h2><input id="campeon" value="' +
        tablasArray[0].jugador +
        '"class="swal2-input"">' +
        '<h2> <b>Segundo puesto 🥈:</b> </h2><input id="segundo" value="' +
        tablasArray[1].jugador +
        '"class="swal2-input">' +
        '<h2> <b>Tercer puesto 🥉:</b> </h2><input id="tercero" value="' +
        tablasArray[2].jugador +
        '"class="swal2-input">',

      focusConfirm: false,
      preConfirm: () => {
        return [
          capitalize(document.getElementById("campeon").value),
          capitalize(document.getElementById("segundo").value),
          capitalize(document.getElementById("tercero").value),
        ];
      },
    });

    if (formValues) {
      let posicionesTorneo = formValues;
      let campeon = posicionesTorneo[0];
      let segundo = posicionesTorneo[1];
      let tercero = posicionesTorneo[2];

      Swal.fire("Felicitaciones " + campeon + "! 🏆");

      setTimeout(() => {
        play();
      }, 1000);

      //Update torneo collection
      await graphQLClient.request(UPDATE_TORNEO, {
        id: torneoData?._id,
        campeon: campeon,
        segundo: segundo,
        tercero: tercero,
      });
    }
  };

  const resetTorneo = async () => {
    try {
      //Update enfrentamientos
      let enfrentamientosUpdate = [];
      // eslint-disable-next-line no-unused-expressions
      torneoData?.resultados.data.forEach((resultado) => {
        enfrentamientosUpdate.push(
          graphQLClient.request(RESET_ENFRENTAMIENTO, {
            id: resultado._id,
            golesJugador1: null,
            golesJugador2: null,
            anotadosGolesJugador1: false,
            anotadosGolesJugador2: false,
          })
        );
      });

      await Promise.all(enfrentamientosUpdate);

      //Update tablas
      let estadisticasTablasUpdate = [];
      // eslint-disable-next-line no-unused-expressions
      torneoData?.tablas.data.forEach((tabla) => {
        estadisticasTablasUpdate.push(
          graphQLClient.request(RESET_ESTADISTICA_TABLA, {
            id: tabla._id,
            pj: null,
            pg: null,
            pe: null,
            pp: null,
            gf: null,
            gc: null,
            puntos: null,
          })
        );
      });

      await Promise.all(estadisticasTablasUpdate);
    } catch (error) {
      console.log("Error al resetear: ", error.message);
      Swal.fire(
        "Error",
        "Error al resetear el torneo, mira la consola",
        "error"
      );
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-xl rounded-lg mt-4">
        {torneoIniciado && !torneoTerminado ? (
          <>
            {yaPuedeHaberCampeon ? (
              <div className="text-white px-2 py-2">
                <button
                  className="text-yellow-400 bg-transparent border border-solid border-yellow-400 hover:bg-amber-500 hover:text-white active:bg-yellow-400 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => showModal()}
                >
                  Finalizar
                </button>
              </div>
            ) : null}

            <div className="text-white px-2 py-2">
              <button
                className="text-red-500 bg-transparent border border-solid border-red-400 hover:bg-amber-500 hover:text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => resetTorneo()}
                style={{ color: "#fc8181", borderColor: "#fc8181" }}
              >
                Resetear
              </button>
            </div>
          </>
        ) : null}

        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 pt-2 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={require("assets/img/ganador-copa.png")}
                  className="h-12 w-12 justify-center "
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-yellow-400 text-xl font-bold leading-normal mb-2">
              {torneoData?.campeon ? torneoData?.campeon : "-"}
            </h3>

            <div className="mb-2 text-white mt-5">
              <span className="font-bold">
                Segundo puesto{" "}
                <span role="img" aria-label="Segundo">
                  🥈
                </span>
              </span>{" "}
              <span className="text-orange-500">
                {torneoData?.segundo ? torneoData?.segundo : "-"}
              </span>
            </div>
            <div className="mb-2 text-white">
              <span className="font-bold">
                Tercer puesto{" "}
                <span role="img" aria-label="Tercero">
                  🥉
                </span>
              </span>{" "}
              <span className="text-orange-500">
                {torneoData?.tercero ? torneoData?.tercero : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
