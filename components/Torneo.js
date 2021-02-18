import React from "react";

import TableDropdown from "components/Dropdowns/TableDropdown.js";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export default function Torneo({ color, torneoData }) {
  console.log(
    "🚀 ~ file: Torneo.js ~ line 9 ~ Torneo ~ torneoData",
    torneoData
  );

  const getExtraClassJugador1 = (golesJugador1, golesJugador2) => {
    if (golesJugador1 > golesJugador2) {
      return "bg-green-200 font-bold";
    } else if (golesJugador1 === golesJugador2) {
      return "bg-orange-200 ";
    } else {
      return "bg-red-200";
    }
  };

  const getExtraClassJugador2 = (golesJugador2, golesJugador1) => {
    if (golesJugador2 > golesJugador1) {
      return "bg-green-200 font-bold";
    } else if (golesJugador1 === golesJugador2) {
      return "bg-orange-200 ";
    } else {
      return "bg-red-200";
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-gray-800 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-gray-800" : "text-white")
                }
              >
                Torneo #{torneoData.numeroTorneo}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
                  }
                >
                  Local
                </th>
                <th
                  className={
                    "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
                  }
                ></th>
                <th
                  className={
                    "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
                  }
                ></th>
                <th
                  className={
                    "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
                  }
                >
                  Visitante
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-gray-700 text-gray-300 border-gray-600")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {/* //TODO: Poner en negrita al ganador junto a su resultado, y poner fondos verdes, rojo o amarillo segun corresponda */}

              {torneoData.resultados.data.map((resultado) => {
                let jugador1 = resultado.jugador1;
                let jugador2 = resultado.jugador2;
                let golesJugador1 = resultado.golesJugador1;
                let golesJugador2 = resultado.golesJugador2;
                return (
                  <tr key={resultado.numeroEnfrentamiento}>
                    <td
                      className={
                        "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center  " +
                        getExtraClassJugador1(golesJugador1, golesJugador2)
                      }
                    >
                      {capitalize(jugador1)}
                    </td>
                    <td
                      className={
                        "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 " +
                        getExtraClassJugador1(golesJugador1, golesJugador2)
                      }
                    >
                      {golesJugador1}
                    </td>
                    <td
                      className={
                        "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 " +
                        getExtraClassJugador2(golesJugador2, golesJugador1)
                      }
                    >
                      {golesJugador2}
                    </td>
                    <td
                      className={
                        "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center  " +
                        getExtraClassJugador2(golesJugador2, golesJugador1)
                      }
                    >
                      {capitalize(jugador2)}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                      <TableDropdown />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Torneo.defaultProps = {
  color: "light",
};
