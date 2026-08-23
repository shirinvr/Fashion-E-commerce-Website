import React from "react";
import './GridTable.css';

const GridTable = ({
  columns = [],
  data = [],
  searchValues = {},
  onSearchChange = () => {},
  onSearchClick = () => {},
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [],
  onPageChange = () => {},
  onPageSizeChange = () => {}
}) => {
  return (
    <div>
      <table className="gridtable shadow-lg">
        {/* -------------------- HEADER -------------------- */}
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>
                {col.text}
              </th>
            ))}
          </tr>

          {/* -------- Filter Row -------- */}
          <tr>
            {columns.map((col, idx) => (
              <td key={idx}>
                {col.filterable ? (
                  <div className="d-inline-flex">
                    <input
                      type="text"
                      className="form-control w-75"
                      placeholder={`Search..`}
                      value={searchValues[col.fieldname] || ""}
                      onChange={(e) =>
                        onSearchChange(col.fieldname, e.target.value)
                      }
                      style={{
                        borderRight: "transparent",
                        borderRadius: "3px 0px 0px 3px"
                      }}
                    />
                    <div
                      className="px-1 py-1"
                      style={{
                        border: "1px solid lightgrey",
                        borderLeft: "transparent",
                        borderRadius: "0px 3px 3px 0px"
                      }}
                    >
                      <i className="bi bi-search" onClick={() => onSearchClick(col.fieldname)}></i>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </td>
            ))}
          </tr>
        </thead>

        {/* -------------------- BODY -------------------- */}
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.render
                    ? col.render(item) // Custom renderer for actions
                    : item[col.fieldname]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* -------------------- FOOTER (Pagination) -------------------- */}
        <tfoot>
          <tr>
            <td>
              <span>{currentPage} of {totalPages} pages</span>&nbsp;
            </td>

            <td style={{ whiteSpace: "nowrap" }}>
             
              <select
                className="form-control"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                style={{ height: "30px",width: "100px", padding: "0px 5px" }}
              >
                {pageSizeOptions.map((size, idx) => (
                  <option key={idx} value={Number(size)}>
                    {size}
                  </option>
                ))}
              </select>
            </td>

            <td>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ border: "none", background: "transparent" }}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ border: "none", background: "transparent" }}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default GridTable;
