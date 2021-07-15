import React from "react";
import { useTable } from "react-table";

// Be sure to pass our updateMyData and the skipPageReset option
function HistorialPartidosEntreSiTable({ columns, data, title, global }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  let content = (player1, player2, dif, goles) => {
    return (
      <p className="font-semibold">
        {player1} le lleva{" "}
        <span className="text-green-500 font-bold">{dif}</span>{" "}
        {goles ? goles : "partidos"} a {player2}{" "}
        {global ? "en la tabla histórica" : "en esta temporada"}
      </p>
    );
  };

  const difChacaMasa = () => {
    if (data && title === "Historial partidos entre si") {
      //Chaca vs Masa
      if (data[0] && data[0].victoriasJugador1 > data[0].victoriasJugador2) {
        return (
          <div>
            {content(
              "Masa",
              "Chaca",
              data[0].victoriasJugador1 - data[0].victoriasJugador2
            )}
          </div>
        );
      } else if (data[0]) {
        return (
          <div>
            {content(
              "Chaca",
              "Masa",
              data[0].victoriasJugador2 - data[0].victoriasJugador1
            )}
          </div>
        );
      }
    } else {
      if (data[0] && data[0].golesJugador1 > data[0].golesJugador2) {
        return (
          <div>
            {content(
              "Masa",
              "Chaca",
              data[0].golesJugador1 - data[0].golesJugador2,
              "goles"
            )}
          </div>
        );
      } else if (data[0]) {
        return (
          <div>
            {content(
              "Chaca",
              "Masa",
              data[0].golesJugador2 - data[0].golesJugador1,
              "goles"
            )}
          </div>
        );
      }
    }
  };

  const difChacaSeba = () => {
    if (data && title === "Historial partidos entre si") {
      //Chaca vs Masa
      if (data[1] && data[1].victoriasJugador1 > data[1].victoriasJugador2) {
        return (
          <div>
            {content(
              "Seba",
              "Chaca",
              data[1].victoriasJugador1 - data[1].victoriasJugador2
            )}
          </div>
        );
      } else if (data[1]) {
        return (
          <div>
            {content(
              "Chaca",
              "Seba",
              data[1].victoriasJugador2 - data[1].victoriasJugador1
            )}
          </div>
        );
      }
    } else {
      if (data[1] && data[1].golesJugador1 > data[1].golesJugador2) {
        return (
          <div>
            {content(
              "Seba",
              "Chaca",
              data[1].golesJugador1 - data[1].golesJugador2,
              "goles"
            )}
          </div>
        );
      } else if (data[1]) {
        return (
          <div>
            {content(
              "Chaca",
              "Seba",
              data[1].golesJugador2 - data[1].golesJugador1,
              "goles"
            )}
          </div>
        );
      }
    }
  };

  const difMasaSeba = () => {
    if (data && title === "Historial partidos entre si") {
      //Chaca vs Masa
      if (data[2] && data[2].victoriasJugador1 > data[2].victoriasJugador2) {
        return (
          <div>
            {content(
              "Masa",
              "Seba",
              data[2].victoriasJugador1 - data[2].victoriasJugador2
            )}
          </div>
        );
      } else if (data[2]) {
        return (
          <div>
            {content(
              "Seba",
              "Masa",
              data[2].victoriasJugador2 - data[2].victoriasJugador1
            )}
          </div>
        );
      }
    } else {
      if (data[2] && data[2].golesJugador1 > data[2].golesJugador2) {
        return (
          <div>
            {content(
              "Masa",
              "Seba",
              data[2].golesJugador1 - data[2].golesJugador2,
              "goles"
            )}
          </div>
        );
      } else if (data[2]) {
        return (
          <div>
            {content(
              "Seba",
              "Masa",
              data[2].golesJugador2 - data[2].golesJugador1,
              "goles"
            )}
          </div>
        );
      }
    }
  };

  return (
    <div className="mt-16 max-w-full  m-auto ml-32">
      <h1 className="text-center text-2xl font-semibold mb-2">{title}</h1>
      <table
        {...getTableProps()}
        className="flex-4 items-center bg-transparent border-collapse"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={
                    "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, j) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border-t-0 px-6 text-center align-middle border-l-0 border-r-0  whitespace-no-wrap "
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col text-center align-middle justify-center mt-10 mb-24">
        <div className="mb-2">{difChacaMasa()}</div>
        <div className="mb-2">{difChacaSeba()}</div>
        <div className="mb-2">{difMasaSeba()}</div>
      </div>
    </div>
  );
}

export default HistorialPartidosEntreSiTable;
