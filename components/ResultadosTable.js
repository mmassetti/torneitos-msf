import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import Swal from "sweetalert2";

const isCellEditable = (columnName) => {
  if (columnName === "local" || columnName === "visitante") {
    return false;
  }
  return true;
};

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
    if (isCellEditable(id)) {
      setValue(e.target.value);
    } else {
      Swal.fire("No seas boludo", "No podes cambiar esto perro", "warning");
    }
  };

  const validateAndSaveResult = (e) => {
    let isValidNumber = /^-?\d+$/.test(value);

    if (isValidNumber) {
      updateMyData(index, id, value);
    } else {
      e.target.value = "-";
    }
  };

  // We'll update the external data when the input is blurred or when enter is pressed
  const onBlur = (e) => {
    if (!resultSavedWithEnter && isCellEditable(id)) {
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
    if (isCellEditable(id) && e.target.value === "-") {
      e.target.value = "";
    }
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
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
    //TODO: OPCION 2
    // <div style={{ paddingTop: "2rem" }}>
    //   <table
    //     {...getTableProps()}
    //     className="min-w-full table-auto"
    //     // className="flex-4 items-center bg-transparent border-collapse w-1/3 max-w-md"
    //   >
    //     <thead className="justify-between">
    //       {headerGroups.map((headerGroup) => (
    //         <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-800">
    //           {headerGroup.headers.map((column) => (
    //             <th
    //               {...column.getHeaderProps()}
    //               className={
    //                 "px-16 py-2 text-white"
    //                 // "bg-gray-100 text-gray-600 border-gray-200 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left "
    //               }
    //             >
    //               {column.render("Header")}
    //             </th>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //     <tbody {...getTableBodyProps()} className="bg-gray-200">
    //       {page.map((row, i) => {
    //         prepareRow(row);
    //         return (
    //           <tr
    //             {...row.getRowProps()}
    //             className="bg-white border-4 border-gray-200"
    //           >
    //             {row.cells.map((cell) => {
    //               return (
    //                 <td
    //                   {...cell.getCellProps()}
    //                   className="px-16 py-2 border-t-0 algin-middle border-l-0 border-r-0 whitespace-no-wrap"
    //                   // className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  "
    //                 >
    //                   {cell.render("Cell")}
    //                 </td>
    //               );
    //             })}
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    // </div>

    //TODO: OPCION 3
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
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      // className="border-t-0 px-6 text-center align-middle border-l-0 border-r-0  whitespace-no-wrap "
                    >
                      {" "}
                      {cell.render("Cell")}{" "}
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
