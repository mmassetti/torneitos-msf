import React, { useState } from "react";
import Swal from "sweetalert2";

const getSecondAndThirdPositions = (tablaResultados) => {
  if (tablaResultados[0].puntos == null) {
    return [{ jugador: "-" }, { jugador: "-" }, { jugador: "-" }];
  } else {
    return tablaResultados.sort((a, b) => (b.puntos > a.puntos ? 1 : -1));
  }
};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export default function TorneoGanador({ torneoData }) {
  let tablasArray = torneoData.tablas.data;

  const showModal = async () => {
    const { value: formValues } = await Swal.fire({
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

      Swal.fire("Felicitaciones " + posicionesTorneo[0] + "! 🏆");
    }
  };

  let secondAndThirdPositions;
  if (torneoData.tablas.data.length > 0) {
    secondAndThirdPositions = getSecondAndThirdPositions(
      torneoData.tablas.data
    );
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-xl rounded-lg mt-4">
        <div className="text-white px-2 py-2">
          <button
            className="text-yellow-400 bg-transparent border border-solid border-yellow-400 hover:bg-amber-500 hover:text-white active:bg-yellow-400 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => showModal()}
          >
            Finalizar torneo
          </button>
        </div>
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
              {torneoData.ganador ? torneoData.ganador : "-"}
            </h3>

            <div className="mb-2 text-white mt-5">
              <span className="font-bold">Segundo puesto:</span>{" "}
              {torneoData.ganador
                ? capitalize(secondAndThirdPositions[1]?.jugador)
                : "-"}
            </div>
            <div className="mb-2 text-white ">
              <span className="font-bold">Tercer puesto:</span>{" "}
              {torneoData.ganador
                ? capitalize(secondAndThirdPositions[2]?.jugador)
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
