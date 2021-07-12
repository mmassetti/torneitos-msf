import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

// Be sure to pass our updateMyData and the skipPageReset option
function HistorialPartidosEntreSiTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="mt-16 max-w-full h-500-px m-auto ml-32">
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
    </div>
  );
}

export default HistorialPartidosEntreSiTable;
