import gql from "graphql-tag";

export const GET_TEMPORADAS = gql`
  {
    allTemporadas {
      data {
        _id
        nombre
      }
    }
  }
`;

export const GET_NUMERO_TORNEOS_TEMPORADA = gql`
  query GetTorneosParaTemporada($nombre: String!) {
    temporadaByName(nombre: $nombre) {
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
          ganador
          resultados {
            data {
              jugador1
              jugador2
              golesJugador1
              golesJugador2
              numeroEnfrentamiento
            }
          }
          tablas {
            data {
              jugador
              puntos
              pj
              pg
              pe
              pp
              gf
              gc
            }
          }
        }
      }
    }
  }
`;
