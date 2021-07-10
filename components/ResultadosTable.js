import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import Swal from "sweetalert2";

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const [resultSavedWithEnter, setResultSavedWithEnter] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  //TODO: Si edito un gol del local, tengo que resetear el visitante tambien, como asi tambien la tabla de resultados?
  //¿O prohibo que se edite la celda si ya puse un valor y obligo a resetear el torneo
  //(cartelito: "todavia no soy inteligente como para hacer esta operacion, tengo que resetear todo. Aceptar? ")

  const validateAndSaveResult = (e) => {
    let isValidNumber = /^-?\d+$/.test(value);

    if (value !== initialValue && isValidNumber) {
      updateMyData(index, id, value);

      // if (id === "golesLocal") {
      //   let golesLocal = value;
      //   console.log(
      //     "🚀 ~ file: ResultadosTable.js ~ line 44 ~ validateAndSaveResult ~ golesLocal",
      //     golesLocal
      //   );
      // }
    } else if (!isValidNumber) {
      e.target.value = "-";
      setValue(e.target.value);
    }
  };

  // We'll update the external data when the input is blurred or when enter is pressed
  const onBlur = (e) => {
    if (!resultSavedWithEnter) {
      validateAndSaveResult(e);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      validateAndSaveResult(e);
      setResultSavedWithEnter(true);
      // document.getElementById("inputId").blur();
    }
  };

  // Remove "-" on click
  const onClick = (e) => {
    if (e.target.value === "-") {
      e.target.value = "";
      setValue(e.target.value);
    } else {
      Swal.fire(
        "No va a funcionar",
        "Todavía no funciona este editar, mala mía. No lo hagas o se va a romper",
        "warning"
      );
    }
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      // className={backgroundColors[0][(0, 0)]}
      style={{ maxWidth: "60px" }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
      onKeyDown={onKeyDown}
      // id={"inputId"} Probar con que este id sea dinamico
    />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  );

  return (
    <div id="tableDiv">
      <table
        {...getTableProps()}
        className="flex-4 items-center bg-transparent border-collapse "
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
          {page.map((row, i) => {
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

          {/* <tr>
            <td
              //todo: ACA HACER UN "+  getExtraClassJugador1(golesJugador1, golesJugador2)" y en el resto tambien
              className={
                "border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  "
              }
            >
              CHACA
            </td>
            <td className="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 ">
              2
            </td>
            <td className="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 ">
              1
            </td>
            <td className="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap ">
              SEBA
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
