const getEscudo = (nombreEquipo) => {
  if (nombreEquipo) {
    return (
      <img
        src={require(`assets/img/logos-equipos/${nombreEquipo}.png`)}
        className="h-12 w-12"
        alt="Hubo un error al cargar el escudo"
      ></img>
    );
  } else {
    return null;
  }
};

export default function EquiposJugadores({ torneoData }) {
  const { equipoChaca, equipoMasa, equipoSeba } = torneoData;
  return (
    <div className="flex">
      <div className="flex-1 p-2">
        <label className="block text-sm font-medium text-gray-700 p-2">
          Chaca
        </label>
        <div className="mt-1 flex items-center">{getEscudo(equipoChaca)}</div>
      </div>
      <div className="flex-1 p-2">
        <label className="block text-sm font-medium text-gray-700 p-2">
          Masa
        </label>
        <div className="mt-1 flex items-center">{getEscudo(equipoMasa)}</div>
      </div>
      <div className="flex-1 p-2">
        <label className="block text-sm font-medium text-gray-700 p-2">
          Seba
        </label>
        <div className="mt-1 flex items-center">{getEscudo(equipoSeba)}</div>
      </div>
    </div>
  );
}
