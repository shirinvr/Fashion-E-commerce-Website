import React from "react";
import "../GridTable/GridTable.css";

const GridTable = ({
  columns = [],
  data = [],

  // Selection
  selectable = false,
  selectedRows = [],
  onSelectionChange = () => { },
  rowKey = "id",
  isRowSelectable = () => true,

  // Search
  searchValues = {},
  onSearchChange = () => { },
  onSearchClick = () => { },
  searchOnEnter = true,

  // Pagination
  currentPage = 1,
  totalPages = 0,
  totalCount = 0,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50],
  onPageChange = () => { },
  onPageSizeChange = () => { },

  // UI
  loading = false,
  emptyMessage = "No records found",
  showPagination = true,
  showTotal = true,
  className = "",
  // Actions 
  actions = [],
  onAction = () => { },
}) => {
  const handleSearchKeyDown = (e, fieldName) => {
    if (searchOnEnter && e.key === "Enter") {
      onSearchClick(fieldName);
    }
  };

  // ========================================================= // ACTION CONFIGURATION // ========================================================= 
  const actionConfig = {
    Add: { label: "Add", icon: "bi bi-plus-lg", className: "grid-action-add", title: "Add", },
    Edit: { label: "Edit", icon: "bi bi-pencil", className: "grid-action-edit", title: "Edit", },
    Delete: { label: "Delete", icon: "bi bi-trash", className: "grid-action-delete", title: "Delete", },
    View: { label: "View", icon: "bi bi-eye", className: "grid-action-view", title: "View", },
    Download: { label: "Download", icon: "bi bi-download", className: "grid-action-download", title: "Download", },
  };

  const renderFilter = (column) => {
    if (!column.filterable) {
      return null;
    }

    const filterType = column.filterType || "text";

    // Custom filter
    if (column.renderFilter) {
      return column.renderFilter({
        value: searchValues[column.fieldname] ?? "",
        onChange: (value) =>
          onSearchChange(column.fieldname, value),
        onSearch: () => onSearchClick(column.fieldname),
      });
    }

    // Select filter
    if (filterType === "select") {
      return (
        <select
          className="form-control"
          value={searchValues[column.fieldname] ?? ""}
          onChange={(e) =>
            onSearchChange(column.fieldname, e.target.value)
          }
        >
          <option value="">
            {column.filterPlaceholder || "Select"}
          </option>

          {(column.filterOptions || []).map((option, index) => (
            <option
              key={option.value ?? index}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <div className="grid-filter">
        <input
          name="column-name"
          type={filterType}
          className="form-control"
          placeholder={column.filterPlaceholder || "Search..."}
          value={searchValues[column.fieldname] ?? ""}
          onChange={(e) =>
            onSearchChange(column.fieldname, e.target.value)
          }
          onKeyDown={(e) =>
            handleSearchKeyDown(e, column.fieldname)
          }
        />

        <button
          type="button"
          className="grid-search-btn"
          onClick={() => onSearchClick(column.fieldname)}
          title="Search"
        >
          <i className="bi bi-search text-white"></i>
        </button>
      </div>
    );
  };

  const getRowKey = (row, rowIndex) => {
    return row[rowKey] ?? row.id ?? row.key ?? rowIndex;
  };

  const isSelected = (row, rowIndex) => {
    const key = getRowKey(row, rowIndex);

    return selectedRows.includes(key);
  };

  const handleRowSelection = (row, rowIndex) => {
    const key = getRowKey(row, rowIndex);

    if (!isRowSelectable(row)) {
      return;
    }

    if (selectedRows.includes(key)) {
      onSelectionChange(
        selectedRows.filter((id) => id !== key)
      );
    } else {
      onSelectionChange([
        ...selectedRows,
        key,
      ]);
    }
  };

  const selectableRows = data.filter((row) =>
    isRowSelectable(row)
  );

  const allRowsSelected =
    selectableRows.length > 0 &&
    selectableRows.every((row) =>
      selectedRows.includes(getRowKey(row))
    );

  const handleSelectAll = () => {
    const selectableKeys = selectableRows.map((row) =>
      getRowKey(row)
    );

    if (allRowsSelected) {
      // Remove current page rows
      onSelectionChange(
        selectedRows.filter(
          (id) => !selectableKeys.includes(id)
        )
      );
    } else {
      // Add current page rows
      onSelectionChange([
        ...new Set([
          ...selectedRows,
          ...selectableKeys,
        ]),
      ]);
    }
  };


  const renderCell = (column, row, rowIndex) => {
    if (column.render) {
      return column.render(row, rowIndex);
    }

    const value = row[column.fieldname];

    if (column.format) {
      return column.format(value, row);
    }

    return value ?? column.defaultValue ?? "";
  };

  // ========================================================= // ACTION RENDER // ========================================================= 
  const renderActions = () => {
    if (!actions || actions.length === 0) { return null; }
    return (
      <div className="grid-actions"> {
        actions.map((action, index) => {
          // actions = { ["Add", "Edit", "Delete"]}
          const actionName = typeof action === "string" ? action : action.name;
          const defaultConfig = actionConfig[actionName] || {};
          const actionLabel = typeof action === "string" ? defaultConfig.label || action : action.label || action.name;
          const actionIcon = typeof action === "string" ? defaultConfig.icon : action.icon || defaultConfig.icon;
          const actionClass = typeof action === "string" ? defaultConfig.className : action.className || defaultConfig.className;
          const actionTitle = typeof action === "string" ? defaultConfig.title || action : action.title || action.label || action.name;
          return (
            <button key={`${actionName}-${index}`} type="button" className={`grid-action-btn ${actionClass || ""}`}
              title={actionTitle} onClick={() => onAction(actionName, action)} > {actionIcon && (<i className={`${actionIcon} me-1`} ></i>

              )}
              {actionLabel} </button>);
        })} </div>);
  };

  return (
    <div className={`gridtable-wrapper ${className}`}>

      {/* ================= ACTIONS ================= */}
      {renderActions()}

      {/* ================= Table ================= */}
      <div className="gridtable-scroll">
        <table className="gridtable shadow-lg my-2">
          {/* ================= HEADER ================= */}
          <thead>
            <tr>
              {selectable && (
                <th
                  style={{
                    width: "20px",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    className="grid-form-check-input"
                    checked={allRowsSelected}
                    onChange={handleSelectAll}
                    disabled={
                      loading ||
                      selectableRows.length === 0
                    }
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={column.fieldname || index}
                  colSpan={column.colSpan || 1}
                  style={{
                    width: column.width,
                    ...column.cellStyle,
                  }}
                  className={column.cellClassName}
                >
                  {column.text}
                </th>
              ))}
            </tr>

            {/* ================= FILTER ================= */}
            {columns.some((column) => column.filterable) && (
              <tr className="grid-filter-row">
                {/* Selection column */}
                {selectable && (
                  <td
                    style={{
                      width: "50px",
                      textAlign: "center",
                    }}
                  >
                    {/* Empty cell intentionally */}
                  </td>
                )}
                {columns.map((column, index) => (
                  <td key={column.fieldname || index}>
                    {renderFilter(column)}
                  </td>
                ))}
              </tr>
            )}
          </thead>

          {/* ================= BODY ================= */}
          <tbody>

            {loading && (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center"
                >
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Loading...
                </td>
              </tr>
            )}

            {!loading && data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center py-4"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {!loading &&
              data.map((row, rowIndex) => {

                const rowSelectable = isRowSelectable(row);
                const rowSelected = isSelected(row, rowIndex);

                return (
                  <tr
                    key={getRowKey(row, rowIndex)}
                  >

                    {selectable && (
                      <td
                        style={{
                          width: "20px",
                          textAlign: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          className="grid-form-check-input"
                          checked={rowSelected}
                          disabled={!rowSelectable}
                          onChange={() =>
                            handleRowSelection(
                              row,
                              rowIndex
                            )
                          }
                        />
                      </td>
                    )}

                    {columns.map((column, columnIndex) => (
                      <td
                        key={
                          column.fieldname ??
                          columnIndex
                        }
                        style={{
                          width: column.width,
                          ...column.cellStyle,
                        }}
                        className={
                          column.cellClassName
                        }
                      >
                        {renderCell(
                          column,
                          row,
                          rowIndex
                        )}
                      </td>
                    ))}

                  </tr>
                );
              })}

          </tbody>


          {/* ================= FOOTER ================= */}
          {showPagination && (
            <tfoot>
              <tr>

                {/* Page information */}
                <td colSpan={Math.max(columns.length)}>
                  <div className="d-inline-flex">
                    <div className="grid-pagination-info">

                      <span>
                        Page {currentPage} of {totalPages}
                      </span>

                      {showTotal && (
                        <span className="mx-1">
                          Total: {totalCount}
                        </span>
                      )}

                    </div>
                    <div>
                      <select
                        className=""
                        value={pageSize}
                        onChange={(e) =>
                          onPageSizeChange(
                            Number(e.target.value)
                          )
                        }
                      >
                        {pageSizeOptions.map((size) => (
                          <option
                            key={size}
                            value={size}
                          >
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>


                    {/* Navigation */}
                    <div className="grid-pagination-buttons">

                      <button
                        type="button"
                        className="pagination-btn"
                        onClick={() =>
                          onPageChange(currentPage - 1)
                        }
                        disabled={
                          loading ||
                          currentPage <= 1
                        }
                        title="Previous"
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>

                      <button
                        type="button"
                        className="pagination-btn"
                        onClick={() =>
                          onPageChange(currentPage + 1)
                        }
                        disabled={
                          loading ||
                          currentPage >= totalPages
                        }
                        title="Next"
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>

                    </div>
                  </div>
                </td>

              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default GridTable;