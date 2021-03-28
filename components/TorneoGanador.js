import React from "react";
import Swal from "sweetalert2";
import { graphQLClient } from "../utils/grahpql-client";
import { UPDATE_TORNEO } from "../graphql/mutations";

export default function TorneoGanador({ torneoData }) {
  let tablasArray = torneoData.tablas.data;

  const torneoTerminado = torneoData.campeon && torneoData.campeon !== "";

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
          document.getElementById("campeon").value.toUpperCase(),
          document.getElementById("segundo").value.toUpperCase(),
          document.getElementById("tercero").value.toUpperCase(),
        ];
      },
    });

    if (formValues) {
      let posicionesTorneo = formValues;
      let campeon = posicionesTorneo[0];
      let segundo = posicionesTorneo[1];
      let tercero = posicionesTorneo[2];

      Swal.fire("Felicitaciones " + campeon + "! 🏆");

      //Update torneo collection

      await graphQLClient.request(UPDATE_TORNEO, {
        id: torneoData._id,
        campeon: campeon,
        segundo: segundo,
        tercero: tercero,
      });
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-xl rounded-lg mt-4">
        {!torneoTerminado ? (
          <div className="text-white px-2 py-2">
            <button
              className="text-yellow-400 bg-transparent border border-solid border-yellow-400 hover:bg-amber-500 hover:text-white active:bg-yellow-400 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => showModal()}
            >
              Finalizar torneo
            </button>
          </div>
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
              {torneoData.campeon ? torneoData.campeon : "-"}
            </h3>

            <div className="mb-2 text-white mt-5">
              <span className="font-bold">
                Segundo puesto{" "}
                <span role="img" aria-label="Segundo">
                  🥈
                </span>
              </span>{" "}
              <span className="text-orange-500">
                {torneoData.segundo ? torneoData.segundo : "-"}
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
                {torneoData.tercero ? torneoData.tercero : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
