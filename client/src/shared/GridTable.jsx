import React, { useState, useEffect, useCallback } from 'react';

/**
 * @param {Array} columns - [{ key: 'name', label: 'Product Name', sortable: true, render: (row) => ... }]
 * @param {Function} fetchData - async ({ page, limit, search, sortBy, sortOrder }) => { data: [], total: number }
 * @param {Function} onAdd - Callback when 'Add New' button is clicked
 * @param {Function} onEdit - Callback with (row) when 'Edit' is clicked
 * @param {Function} onDelete - Callback with (row) when 'Delete' is clicked
 * @param {string} title - Table header title (e.g. "Products", "Orders")
 */
const GridTable = ({
  columns = [],
  fetchData,
  onAdd,
  onEdit,
  onDelete,
  title = "",
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  // Server-side query states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', order: 'asc' });

  // Debounce search input to avoid spamming the server
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 on new search
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch data triggered by server-side query params
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchData({
        page,
        limit,
        search: debouncedSearch,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.order,
      });
      setData(response.data || []);
      setTotalRecords(response.total || 0);
    } catch (error) {
      console.error("Failed to load table data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchData, page, limit, debouncedSearch, sortConfig]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle column sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc',
    }));
    setPage(1);
  };

  // Export current data view to CSV
  const handleExportCSV = () => {
    if (!data.length) return;

    const headers = columns.map((col) => `"${col.label}"`).join(',');
    const rows = data.map((row) =>
      columns.map((col) => `"${row[col.key] !== undefined ? row[col.key] : ''}"`).join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(totalRecords / limit) || 1;

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden font-sans">
      {/* Table Header: Title, Search, and Action Buttons */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-xs text-gray-500 mt-1">Total Records: {totalRecords}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Server-Side Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Export to CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded transition"
          >
            Export CSV
          </button>

          {/* Add New Item */}
          {onAdd && (
            <button
              onClick={onAdd}
              className="px-3 py-1.5 text-sm bg-black hover:bg-neutral-800 text-white rounded transition"
            >
              + Add New
            </button>
          )}
        </div>
      </div>

      {/* Grid Content */}
      <div className="overflow-x-auto min-h-[300px] relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <span className="text-sm font-medium text-gray-600">Loading data...</span>
          </div>
        )}

        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200 select-none">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-4 py-3 ${col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="text-xs text-gray-400">
                        {sortConfig.key === col.key
                          ? sortConfig.order === 'asc' ? '▲' : '▼'
                          : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={row.id || index} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 text-right space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-xs font-medium text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-xs font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 border rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1 border rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default GridTable;