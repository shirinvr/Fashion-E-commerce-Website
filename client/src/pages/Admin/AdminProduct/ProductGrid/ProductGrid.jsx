import React, { useState, useEffect, useCallback } from "react";
import GridTable from "../../../../shared/GridTable/GridTable";
import { callDynamicApi } from "../../../../shared/apiService.jsx";
import { ApiMethodNames } from "../../../../config/ServiceMapping.ts";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({
  searchValues = {},

  currentPage = 1,
  totalPages = 0,
  totalCount = 0,

  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],

  loading = false,

  onSearchChange,
  onSearchClick,

  onPageChange,
  onPageSizeChange,

  onAdd,
  onEdit,
  onView,
  onDelete,
  onDownload,
}) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectionEnabled, setSelectionEnabled] = useState(false);
  const canAdd = true;
  const canEdit = true;
  const canDelete = true;
  const canView = true;
  const canDownload = true;
  const actions = [
    ...(canAdd ? ["Add"] : []),
    ...(canEdit ? ["Edit"] : []),
    ...(canDelete ? ["Delete"] : []),
    ...(canView ? ["View"] : []),
    ...(canDownload ? ["Download"] : []),
  ];
  const navigate = useNavigate();

  /*
   * ============================================================
   * Product Grid Columns
   * ============================================================
   */

  const columns = [
    {
      fieldname: "slNo",
      text: "Sl.No",
      filterable: false,
      width: "70px",

      render: (_, rowIndex) => {
        return (
          (currentPage - 1) * pageSize +
          rowIndex +
          1
        );
      }
    },

    {
      fieldname: "name",
      text: "Product",
      filterable: true,
      filterType: "text",
      filterPlaceholder: "Search product...",
      width: "200px"
    },

    {
      fieldname: "description",
      text: "Description",
      filterable: true,
      filterType: "text",
      filterPlaceholder: "Search description...",
      width: "200px"
    },

    {
      fieldname: "category_name",
      text: "Category",
      filterable: true,
      filterType: "text",
      filterPlaceholder: "Search category...",
      width: "200px"
    },
    {
      fieldname: "category_name",
      text: "Category",
      filterable: true,
      filterType: "text",
      filterPlaceholder: "Search category...",
      width: "200px"
    },
    {
      fieldname: "category_name",
      text: "Category",
      filterable: true,
      filterType: "text",
      filterPlaceholder: "Search category...",
      width: "200px"
    },
    {
      fieldname: "category_name",
      text: "Category",
      filterable: true,
      filterType: "text",
      filterPlaceholder: "Search category...",
      width: "200px"
    },
    {
      fieldname: "category_name",
      text: "Category",
      filterable: true,
      filterType: "text",
      filterPlaceholder: "Search category...",
      width: "200px"
    },

    {
      fieldname: "price",
      text: "Price",
      filterable: true,
      filterType: "number",
      filterPlaceholder: "Search price...",
      width: "200px",

      render: (product) => {
        if (
          product.price === null ||
          product.price === undefined ||
          product.price === ""
        ) {
          return "";
        }

        return `₹${Number(product.price).toFixed(2)}`;
      },
    },

    // {
    //   fieldname: "Actions",
    //   text: "Actions",
    //   filterable: false,
    //   width: "100px",

    //   render: (product) => (
    //     <div>

    //       <button
    //         type="button"
    //         className="btn btn-link p-0"
    //         title="Edit Product"
    //         onClick={() => onEdit?.(product)}
    //       >
    //         <i className="bi bi-pencil-square text-primary fs-5"></i>
    //       </button>

    //       <button
    //         type="button"
    //         className="btn btn-link p-0"
    //         title="Delete Product"
    //         onClick={() => onDelete?.(product)}
    //       >
    //         <i className="bi bi-trash text-danger fs-5"></i>
    //       </button>
    //     </div>
    //   )
    // }
  ];
  const handleAdd = useCallback(() => {
    navigate("/landingpage/addproducts");
  }, [navigate]);

  const handleAction = useCallback(
    (action) => {
      console.log("Action:", action);
      console.log("Selected products:", selectedProducts);

      switch (action) {
        case "Add":
          handleAdd();
          break;

        case "Edit":
          onEdit?.(selectedProducts);
          break;

        case "Delete":
          onDelete?.(selectedProducts);
          break;

        case "View":
          onView?.(selectedProducts);
          break;

        case "Download":
          onDownload?.(selectedProducts);
          break;

        default:
          console.log(`Unknown action: ${action}`);
          break;
      }
    },
    [
      selectedProducts,
      handleAdd,
      onEdit,
      onDelete,
      onView,
      onDownload,
    ]
  );

  const getAllProducts = useCallback(async () => {
    try {
      const res = await callDynamicApi(ApiMethodNames.GetCity, {});

      if (res.success === true) {
        setProducts(res.data.result1);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getAllProducts();
    setSelectionEnabled(true);
  }, [getAllProducts]);


  /*
   * ============================================================
   * Render
   * ============================================================
   */

  return (
    <div className="row">

      <div className="col-md-12">
        <GridTable
          columns={columns}
          data={products}
          // Selection
          selectable={selectionEnabled}
          selectedRows={selectedProducts}
          onSelectionChange={setSelectedProducts}
          rowKey="id"
          isRowSelectable={(row) =>
            row.status === "ACTIVE"
          }

          searchValues={searchValues}
          onSearchChange={onSearchChange}
          onSearchClick={onSearchClick}

          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}

          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}

          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}

          loading={loading}

          emptyMessage="No products found"
          showPagination={true}
          showTotal={true}
          searchOnEnter={true}
          actions={actions}
          onAction={handleAction}
        />
      </div>
    </div>

  );
};

export default ProductGrid;
