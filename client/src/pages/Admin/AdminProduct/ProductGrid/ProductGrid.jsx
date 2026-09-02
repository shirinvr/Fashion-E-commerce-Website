import React from 'react';
import DataTable from './DataTable';

export default function ProductsPage() {
  // Column schema definition
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.image} alt={row.name} className="w-8 h-10 object-cover rounded bg-gray-100" />
          <span className="font-medium text-gray-900">{row.name}</span>
        </div>
      ),
    },
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (row) => `$${Number(row.price).toFixed(2)}`,
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (row) => (
        <span className={row.stock < 10 ? 'text-red-500 font-semibold' : 'text-gray-700'}>
          {row.stock} units
        </span>
      ),
    },
  ];

  // Server-side fetch function (calls your backend endpoint)
  const fetchProducts = async ({ page, limit, search, sortBy, sortOrder }) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search: search || '',
      sortBy: sortBy || '',
      sortOrder: sortOrder || '',
    });

    const response = await fetch(`/api/admin/products?${params.toString()}`);
    return await response.json(); // Expected format: { data: [...], total: 120 }
  };

  // CRUD actions
  const handleAddProduct = () => {
    console.log("Open 'Add Product' modal");
  };

  const handleEditProduct = (row) => {
    console.log("Edit product:", row);
  };

  const handleDeleteProduct = async (row) => {
    if (window.confirm(`Delete product "${row.name}"?`)) {
      await fetch(`/api/admin/products/${row.id}`, { method: 'DELETE' });
      // Trigger a state reload or rely on a global cache like React Query
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DataTable
        title="Product Inventory"
        columns={columns}
        fetchData={fetchProducts}
        onAdd={handleAddProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}