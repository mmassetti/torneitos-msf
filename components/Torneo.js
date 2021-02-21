import EquiposJugadores from "./EquiposJugadores";
import TorneoPuntajes from "./TorneoPuntajes";

import TorneoResultados from "./TorneoResultados";

export default function Torneo({ torneoData }) {
  return (
    <>
      <div class="divide-y-4 divide-yellow-600 divide-dashed">
        <h3 className="w-full md:w-4/12 px-4 mr-auto ml-auto text-3xl mb-2 mt-4 font-semibold leading-normal">
          Torneo{" "}
          <span className={"font-bold text-blue-600"}>
            #{torneoData.numeroTorneo}{" "}
          </span>
        </h3>
        <div class="flex flex-row-reverse px-4 mx-auto">
          <div class="w-full overflow-auto bg-gray-500">
            <div class="content flex flex-row flex-no-wrap items-start justify-start m-2">
              <div class="item bg-white m-2 w-64">
                <div class="p-4">
                  <TorneoResultados torneoData={torneoData} />
                </div>
              </div>
              <div class="item bg-white m-2 w-64">
                <div class="p-4">
                  <EquiposJugadores torneoData={torneoData} />
                </div>
              </div>

              <div class="item bg-white m-2 w-64">
                <div class="p-4">
                  <TorneoPuntajes torneoData={torneoData} />
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <hr className="mt-6 border-b-1 border-gray-400" />
      </div>
      <div>el resto de los torneos va aca...</div>
    </>
  );
}
