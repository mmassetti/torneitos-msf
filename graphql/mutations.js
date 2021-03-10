import { gql } from "graphql-request";

export const CREATE_TORNEO = gql`
  mutation CreateTorneo(
    $numeroTorneo: Int!
    $equipoMasa: String!
    $equipoChaca: String!
    $equipoSeba: String!
    $temporada: TorneoTemporadaRelation
    $ganador: String
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
        ganador: $ganador
        resultados: $resultados
        tablas: $tablas
      }
    ) {
      _id
    }
  }
`;

export const CREATE_ESTADISTICA_TABLA = gql`
  mutation CreateEstadisticaTabla($jugador: Jugador!) {
    createEstadisticaTabla(data: { jugador: $jugador }) {
      _id
    }
  }
`;

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
      }
    ) {
      _id
    }
  }
`;
