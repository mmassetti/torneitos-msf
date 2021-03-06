import { gql } from "graphql-request";

//Torneo
export const CREATE_TORNEO = gql`
  mutation CreateTorneo(
    $numeroTorneo: Int!
    $equipoMasa: String!
    $equipoChaca: String!
    $equipoSeba: String!
    $temporada: TorneoTemporadaRelation
    $campeon: String
    $segundo: String
    $tercero: String
    $resultados: TorneoResultadosRelation
    $tablas: TorneoTablasRelation
  ) {
    createTorneo(
      data: {
        numeroTorneo: $numeroTorneo
        equipoMasa: $equipoMasa
        equipoChaca: $equipoChaca
        equipoSeba: $equipoSeba
        temporada: $temporada
        campeon: $campeon
        segundo: $segundo
        tercero: $tercero
        resultados: $resultados
        tablas: $tablas
      }
    ) {
      _id
    }
  }
`;

export const UPDATE_TORNEO = gql`
  mutation UpdateTorneo(
    $id: ID!
    $campeon: String!
    $segundo: String!
    $tercero: String!
  ) {
    partialUpdateTorneo(
      id: $id
      data: { campeon: $campeon, segundo: $segundo, tercero: $tercero }
    ) {
      _id
      numeroTorneo
      campeon
    }
  }
`;

export const DELETE_TORNEO = gql`
  mutation DeleteTorneo($id: ID!) {
    deleteTorneo(id: $id) {
      _id
    }
  }
`;

//EstadisticaTabla
export const CREATE_ESTADISTICA_TABLA = gql`
  mutation CreateEstadisticaTabla($jugador: Jugador!) {
    createEstadisticaTabla(data: { jugador: $jugador }) {
      _id
    }
  }
`;

export const UPDATE_ESTADISTICA_TABLA = gql`
  mutation UpdateEstadisticaTabla(
    $id: ID!
    $jugador: Jugador!
    $pj: Int!
    $gf: Int!
    $gc: Int!
    $puntos: Int!
    $pg: Int!
    $pe: Int!
    $pp: Int!
    $difGoles: Int!
  ) {
    updateEstadisticaTabla(
      id: $id
      data: {
        jugador: $jugador
        pj: $pj
        gf: $gf
        gc: $gc
        puntos: $puntos
        pg: $pg
        pe: $pe
        pp: $pp
        difGoles: $difGoles
      }
    ) {
      _id
    }
  }
`;

export const RESET_ESTADISTICA_TABLA = gql`
  mutation ResetEnfrentamiento(
    $id: ID!
    $pj: Int
    $pg: Int
    $pe: Int
    $pp: Int
    $gf: Int
    $gc: Int
    $puntos: Int
    $difGoles: Int
  ) {
    partialUpdateEstadisticaTabla(
      id: $id
      data: {
        pj: $pj
        pg: $pg
        pe: $pe
        pp: $pp
        gf: $gf
        gc: $gc
        puntos: $puntos
        difGoles: $difGoles
      }
    ) {
      _id
    }
  }
`;

export const DELETE_ESTADISTICA_TABLA = gql`
  mutation DeleteEstadisticaTabla($id: ID!) {
    deleteEstadisticaTabla(id: $id) {
      _id
    }
  }
`;

//Enfrentamiento
export const CREATE_ENFRENTAMIENTO = gql`
  mutation CreateEnfrentamiento(
    $jugador1: Jugador!
    $jugador2: Jugador!
    $numeroEnfrentamiento: Int!
  ) {
    createEnfrentamiento(
      data: {
        jugador1: $jugador1
        jugador2: $jugador2
        numeroEnfrentamiento: $numeroEnfrentamiento
        anotadosGolesJugador1: false
        anotadosGolesJugador2: false
      }
    ) {
      _id
    }
  }
`;

export const UPDATE_ENFRENTAMIENTO_JUGADOR1 = gql`
  mutation UpdateEnfrentamiento(
    $id: ID!
    $golesJugador1: Int!
    $anotadosGolesJugador1: Boolean!
  ) {
    updateEnfrentamiento(
      id: $id
      data: {
        golesJugador1: $golesJugador1
        anotadosGolesJugador1: $anotadosGolesJugador1
      }
    ) {
      _id
    }
  }
`;

export const UPDATE_ENFRENTAMIENTO_JUGADOR2 = gql`
  mutation UpdateEnfrentamiento(
    $id: ID!
    $golesJugador2: Int!
    $anotadosGolesJugador2: Boolean!
  ) {
    updateEnfrentamiento(
      id: $id
      data: {
        golesJugador2: $golesJugador2
        anotadosGolesJugador2: $anotadosGolesJugador2
      }
    ) {
      _id
    }
  }
`;

export const RESET_ENFRENTAMIENTO = gql`
  mutation ResetEnfrentamiento(
    $id: ID!
    $golesJugador1: Int
    $golesJugador2: Int
    $anotadosGolesJugador1: Boolean!
    $anotadosGolesJugador2: Boolean!
  ) {
    updateEnfrentamiento(
      id: $id
      data: {
        golesJugador1: $golesJugador1
        golesJugador2: $golesJugador2
        anotadosGolesJugador1: $anotadosGolesJugador1
        anotadosGolesJugador2: $anotadosGolesJugador2
      }
    ) {
      _id
    }
  }
`;

export const DELETE_ENFRENTAMIENTO = gql`
  mutation DeleteEnfrentamiento($id: ID!) {
    deleteEnfrentamiento(id: $id) {
      _id
    }
  }
`;

//HistorialPartidosEntreSi
export const CREATE_HISTORIAL_PARTIDOS_ENTRE_SI = gql`
  mutation CreateHistorialPartidosEntreSi(
    $jugador1: Jugador!
    $jugador2: Jugador!
    $victoriasJugador1: Int!
    $victoriasJugador2: Int!
    $empates: Int!
    $temporada: TorneoTemporadaRelation
  ) {
    createHistorialPartidosEntreSi(
      data: {
        jugador1: $jugador1
        jugador2: $jugador2
        victoriasJugador1: $victoriasJugador1
        victoriasJugador2: $victoriasJugador2
        empates: $empates
        temporada: $temporada
      }
    ) {
      _id
    }
  }
`;

//TODO: Cuando se resetea un torneo tengo que restar los goles correspondientes en el historial de partidos entre si

export const UPDATE_HISTORIAL_PARTIDOS_ENTRE_SI = gql`
  mutation UpdateHistorialPartidosEntreSi(
    $id: ID!
    $victoriasJugador1: Int!
    $victoriasJugador2: Int!
    $empates: Int!
  ) {
    updateHistorialPartidosEntreSi(
      id: $id
      data: {
        victoriasJugador1: $victoriasJugador1
        victoriasJugador2: $victoriasJugador2
        empates: $empates
      }
    ) {
      _id
    }
  }
`;
