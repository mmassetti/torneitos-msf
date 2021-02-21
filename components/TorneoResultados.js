import TableDropdown from "components/Dropdowns/TableDropdown.js";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

//TODO: Estos dos pueden ir en un solo metodo. Además, se utilizan en otro lado, sacarla de acá.
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

export default function TorneoResultados({ torneoData }) {
  return (
    <table className="flex-4 items-center bg-transparent border-collapse">
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
              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
            }
          ></th>
        </tr>
      </thead>
      <tbody>
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
  );
}
