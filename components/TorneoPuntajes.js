/* eslint-disable react/react-in-jsx-scope */
import TorneoGanador from "./TorneoGanador";
import useSWR from "swr";
import { graphQLClient } from "../utils/grahpql-client";
import { GET_INFO_TORNEO } from "../graphql/queries";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export default function TorneoPuntajes({ id }) {
  const fetcher = async (query) => await graphQLClient.request(query, { id });

  const { data, loading, error, mutate } = useSWR(
    id ? [GET_INFO_TORNEO, id] : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    console.log("ERROR TorneoPuntajes: ", error);
    return <div>Error al cargar los datos del torneo </div>;
  }

  //TODO: Si hay igualdad en puntos, poner primero al que tiene mejor diferencia de gol, si la dieferncia de gol es la misma, poner primero al que hizo mas goles, si los goles son los mismos, poner al que tiene menores gc
  let sortedData = data?.findTorneoByID.tablas.data.sort(
    (a, b) => b.puntos - a.puntos
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

  //TODO: Refactor : the classNames are always the same..
  return (
    <div>
      <table className="flex-4 items-center bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              className={
                "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
              }
            >
              Jugador
            </th>
            <th
              className={
                "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
              }
            >
              Puntos
            </th>
            <th
              className={
                "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
              }
            >
              PJ
            </th>
            <th
              className={
                "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
              }
            >
              PG
            </th>

            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
              }
            >
              PE
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
              }
            >
              PP
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
              }
            >
              GF
            </th>
            <th
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
              }
            >
              GC
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((tabla) => {
            //TODO: Mostrar clase extra dependiendo si el jugador ganó, perdio o empató (verde, rojo, amarillo)
            let jugador = tabla.jugador;

            return (
              <tr key={jugador}>
                <td
                  //todo: ACA HACER UN "+  getExtraClassJugador1(golesJugador1, golesJugador2)" y en el resto tambien
                  className={
                    "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  "
                  }
                >
                  {capitalize(jugador)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 ">
                  {tabla.puntos || tabla.puntos == 0 ? tabla.puntos : "-"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 ">
                  {tabla.pj || tabla.pj == 0 ? tabla.pj : "-"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4   ">
                  {tabla.pg || tabla.pg == 0 ? tabla.pg : "-"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4   ">
                  {tabla.pe || tabla.pe == 0 ? tabla.pe : "-"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4   ">
                  {tabla.pp || tabla.pp == 0 ? tabla.pp : "-"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4   ">
                  {tabla.gf || tabla.gf == 0 ? tabla.gf : "-"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4   ">
                  {tabla.gc || tabla.gc == 0 ? tabla.gc : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {data ? <TorneoGanador torneoData={data.findTorneoByID} /> : null}
    </div>
  );
}
