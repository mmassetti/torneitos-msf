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
      }
    ) {
      _id
    }
  }
`;
