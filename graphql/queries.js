import { gql } from "graphql-request";

export const GET_TEMPORADAS = gql`
  {
    allTemporadas {
      data {
        _id
        nombre
        historialPartidosEntreSi {
          data {
            _id
            jugador1
            jugador2
            victoriasJugador1
            victoriasJugador2
            empates
            temporada {
              nombre
            }
          }
        }
      }
    }
  }
`;

export const GET_NUMERO_TORNEOS_TEMPORADA = gql`
  query GetTorneosParaTemporada($nombre: String!) {
    temporadaByName(nombre: $nombre) {
      _id
      nombre
      torneos {
        data {
          _id
          numeroTorneo
        }
      }
    }
  }
`;

export const GET_TORNEOS_PARA_TEMPORADA = gql`
  query GetTorneosParaTemporada($nombre: String!) {
    temporadaByName(nombre: $nombre) {
      nombre
      torneos {
        data {
          _id
          numeroTorneo
          equipoMasa
          equipoChaca
          equipoSeba
          campeon
          segundo
          tercero
          resultados {
            data {
              _id
              jugador1
              jugador2
              golesJugador1
              golesJugador2
              numeroEnfrentamiento
              anotadosGolesJugador1
              anotadosGolesJugador2
            }
          }
          tablas {
            data {
              _id
              jugador
              puntos
              pj
              pg
              pe
              pp
              gf
              gc
              difGoles
            }
          }
        }
      }
    }
  }
`;

export const GET_INFO_TORNEO = gql`
  query GetInfoTorneo($id: ID!) {
    findTorneoByID(id: $id) {
      _id
      numeroTorneo
      temporada {
        _id
        nombre
      }
      equipoMasa
      equipoChaca
      equipoSeba
      campeon
      segundo
      tercero
      resultados {
        data {
          _id
          jugador1
          jugador2
          golesJugador1
          golesJugador2
          numeroEnfrentamiento
          anotadosGolesJugador1
          anotadosGolesJugador2
        }
      }
      tablas {
        data {
          _id
          jugador
          puntos
          pj
          pg
          pe
          pp
          gf
          gc
          difGoles
        }
      }
    }
  }
`;
