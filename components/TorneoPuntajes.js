/* eslint-disable react/react-in-jsx-scope */
import TorneoGanador from "./TorneoGanador";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export default function TorneoPuntajes({ torneoData }) {
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
          {torneoData.tablas.data.map((tabla) => {
            let jugador = tabla.jugador;

            return (
              <tr key={jugador}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  ">
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
      <TorneoGanador torneoData={torneoData} />
    </div>
  );
}
