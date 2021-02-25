/* eslint-disable react/react-in-jsx-scope */
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
  let secondAndThirdPositions = getSecondAndThirdPositions(
    torneoData.tablas.data
  );

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-xl rounded-lg mt-4">
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
            {capitalize(secondAndThirdPositions[1]?.jugador)}
          </div>
          <div className="mb-2 text-white ">
            <span className="font-bold">Tercer puesto:</span>{" "}
            {capitalize(secondAndThirdPositions[2]?.jugador)}
          </div>
        </div>
      </div>
    </div>
  );
}
