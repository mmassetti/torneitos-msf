const getEscudo = (nombreEquipo) => {
  return (
    <img
      src={require(`assets/img/logos-equipos/${nombreEquipo}.png`)}
      className="h-12 w-12 rounded-lg h-24 w-24  "
      alt="..."
    ></img>
  );
};

export default function EquiposJugadores({ torneoData }) {
  const jugadores = ["Chaca", "Masa", "Seba"];
  const { equipoChaca, equipoMasa, equipoSeba } = torneoData;
  return (
    <div className="flex">
      <div className="flex-1 p-2">
        <label class="block text-sm font-medium text-gray-700 p-2">Chaca</label>
        <div class="mt-1 flex items-center">
          <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            {getEscudo(equipoChaca)}
          </span>
        </div>
      </div>
      <div className="flex-1 p-2">
        <label class="block text-sm font-medium text-gray-700 p-2">Masa</label>
        <div class="mt-1 flex items-center">
          <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            {getEscudo(equipoMasa)}
          </span>
        </div>
      </div>
      <div className="flex-1 p-2">
        <label class="block text-sm font-medium text-gray-700 p-2">Seba</label>
        <div class="mt-1 flex items-center">{getEscudo(equipoSeba)}</div>
      </div>
    </div>
  );
}
