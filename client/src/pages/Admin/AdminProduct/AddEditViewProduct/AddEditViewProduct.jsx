import React, { useState, useEffect, useCallback,useRef } from "react";
import { callDynamicApi } from "../../../../shared/apiService.jsx";
import { ApiMethodNames } from "../../../../config/ServiceMapping.ts";
import "./AddEditViewProduct.css";

const AddEditViewProduct = ({
  searchValues = {},
  onAdd,
  onEdit,
  onView,
  onDelete,
  onDownload,
}) => {
  const [products, setProducts] = useState([]);

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
  }, [getAllProducts]);

  const handleAdd = () => {
    
  }


    function Card({ title, right, children }) {
        return (
            <section className="card border rounded-4 shadow-none">
                <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h2 className="h6 fw-semibold text-dark mb-0">{title}</h2>
                        {right}
                    </div>

                    {children}
                </div>
            </section>
        );
    }

    function Field({ label, children }) {
        return (
            <div>
                <label className="form-label small fw-medium text-secondary mb-2">
                    {label}
                </label>
                {children}
            </div>
        );
    }

    function Select({ value, onChange, options, placeholder }) {
        return (
            <div className="position-relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="form-select product-input"
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    // ---------------------------------------------------------------------------
    // Main Component
    // ---------------------------------------------------------------------------

        const fileInputRef = useRef(null);

        const [form, setForm] = useState({
            name: "Premium Half Sleeve T-Shirt - Brooklyn Fleece",

            description:
                "Looking for a little extra warmth? Grab this classic hoodie. Smooth on the outside with unbrushed loops on the inside, our mid weight French terry is comfortable enough to wear year long.\n\nProduct Details\n- Body: 80% cotton/20% polyester. Hood lining: 100% cotton.\n- Colour Shown: Black/White\n- Style: FV7283-010",

            category: "Men's Clothes",
            subCategory: "Men's Tops & T-Shirts",

            sku: "SKU-BB-66-A6",
            stock: "10120",
            minStock: "100",

            brand: "Adidas",
            size: "Medium",
            color: "Black and White",

            price: "12120.00",
            comparePrice: "10120.00",
            discount: "15",
            minOrder: "100",
        });

        const [images, setImages] = useState([
            {
                id: 1,
                url: null,
                label: "front",
            },
            {
                id: 2,
                url: null,
                label: "back",
            },
        ]);

        const [saved, setSaved] = useState(false);
        const [errors, setErrors] = useState({});

        // -----------------------------------------------------------------------
        // Form Helpers
        // -----------------------------------------------------------------------

        const update = (key) => (value) => {
            setForm((previous) => ({
                ...previous,
                [key]: value,
            }));
        };

        // -----------------------------------------------------------------------
        // Image Upload
        // -----------------------------------------------------------------------

        const handleFiles = (fileList) => {
            if (!fileList) return;

            const availableSlots = 4 - images.length;

            const files = Array.from(fileList).slice(0, availableSlots);

            files.forEach((file) => {
                if (file.size > 5 * 1024 * 1024) {
                    alert(`${file.name} is larger than 5MB.`);
                    return;
                }

                if (!file.type.startsWith("image/")) {
                    alert(`${file.name} is not an image.`);
                    return;
                }

                const reader = new FileReader();

                reader.onload = () => {
                    setImages((previous) => [
                        ...previous,
                        {
                            id: Date.now() + Math.random(),
                            url: reader.result,
                        },
                    ]);
                };

                reader.readAsDataURL(file);
            });
        };

        const removeImage = (id) => {
            setImages((previous) =>
                previous.filter((image) => image.id !== id)
            );
        };

        // -----------------------------------------------------------------------
        // Validation
        // -----------------------------------------------------------------------

        const validate = () => {
            const nextErrors = {};

            if (!form.name.trim()) {
                nextErrors.name = "Product name is required";
            }

            if (!form.price.trim()) {
                nextErrors.price = "Price is required";
            }

            if (!form.sku.trim()) {
                nextErrors.sku = "SKU is required";
            }

            setErrors(nextErrors);

            return Object.keys(nextErrors).length === 0;
        };

        const saveProduct = (e) =>{}

  /*
   * ============================================================
   * Render
   * ============================================================
   */

  return (
    <div className="row">
      <div className="col-md-12 prod-details">
              {/* Breadcrumb */}
              <div className="breadcrumb-area d-flex py-2 align-items-center gap-2 small text-secondary mb-1">
                  <i className="bi bi-house"></i>

                  <span>Products</span>

                  <i className="bi bi-chevron-right small"></i>

                  <span className="text-rose fw-medium">
                      Add New Product
                  </span>
              </div>

              {/* Page Header */}
              <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
                  <div>
                      <h1 className="page-title mb-1">
                          Add New Product
                      </h1>

                      <p className="text-secondary small mb-0">
                          Add a new product to your store
                      </p>
                  </div>
              </div>

              {/* ========================================================= */}
              {/* Main Grid                                                  */}
              {/* ========================================================= */}

              <div className="row g-4">
                  {/* ===================================================== */}
                  {/* Left Column                                            */}
                  {/* ===================================================== */}

                  <div className="col-12 col-xl-8">
                      <div className="d-flex flex-column gap-4">

                          {/* Name & Description */}
                          <Card title="Name and Description">
                              <div className="d-flex flex-column gap-4">
                                  <Field label="Product Name">
                                      <input
                                          type="text"
                                          className="form-control product-input"
                                          value={form.name}
                                          onChange={(e) =>
                                              update("name")(
                                                  e.target.value
                                              )
                                          }
                                          placeholder="e.g. Premium Half Sleeve T-Shirt"
                                      />

                                      {errors.name && (
                                          <div className="text-danger small mt-1">
                                              {errors.name}
                                          </div>
                                      )}
                                  </Field>

                                  <Field label="Product Description">
                                      <div className="description-editor">
                                          <div className="editor-toolbar d-flex align-items-center gap-1">
                                              <button
                                                  type="button"
                                                  className="editor-btn"
                                              >
                                                  <i className="bi bi-type-bold"></i>
                                              </button>

                                              <button
                                                  type="button"
                                                  className="editor-btn"
                                              >
                                                  <i className="bi bi-type-italic"></i>
                                              </button>

                                              <button
                                                  type="button"
                                                  className="editor-btn"
                                              >
                                                  <i className="bi bi-type-underline"></i>
                                              </button>

                                              <button
                                                  type="button"
                                                  className="editor-btn"
                                              >
                                                  <i className="bi bi-link-45deg"></i>
                                              </button>

                                              <button
                                                  type="button"
                                                  className="editor-btn"
                                              >
                                                  <i className="bi bi-text-left"></i>
                                              </button>
                                          </div>

                                          <textarea
                                              rows="7"
                                              value={form.description}
                                              onChange={(e) =>
                                                  update("description")(
                                                      e.target.value
                                                  )
                                              }
                                              className="form-control border-0 description-textarea"
                                              placeholder="Describe the product..."
                                          />
                                      </div>
                                  </Field>
                              </div>
                          </Card>

                          {/* Category */}
                          <Card title="Category">
                              <div className="d-flex flex-column gap-4">
                                  <Field label="Product Category">
                                      <Select
                                          value={form.category}
                                          onChange={update("category")}
                                          options={[
                                              "Men's Clothes",
                                              "Women's Clothes",
                                              "Kids' Clothes",
                                              "Accessories",
                                              "Footwear",
                                          ]}
                                      />
                                  </Field>

                                  <Field label="Product Sub-Category">
                                      <Select
                                          value={form.subCategory}
                                          onChange={update("subCategory")}
                                          options={[
                                              "Men's Tops & T-Shirts",
                                              "Men's Hoodies",
                                              "Men's Jackets",
                                              "Men's Bottoms",
                                          ]}
                                      />
                                  </Field>
                              </div>
                          </Card>

                          {/* Manage Stock */}
                          <Card title="Manage Stock">
                              <div className="d-flex flex-column gap-4">
                                  <Field label="Stock Keeping Unit">
                                      <input
                                          type="text"
                                          className="form-control product-input"
                                          value={form.sku}
                                          onChange={(e) =>
                                              update("sku")(
                                                  e.target.value
                                              )
                                          }
                                          placeholder="SKU-000-00"
                                      />

                                      {errors.sku && (
                                          <div className="text-danger small mt-1">
                                              {errors.sku}
                                          </div>
                                      )}
                                  </Field>

                                  <div className="row g-3">
                                      <div className="col-6">
                                          <Field label="Product Stock">
                                              <input
                                                  type="number"
                                                  className="form-control product-input"
                                                  value={form.stock}
                                                  onChange={(e) =>
                                                      update("stock")(
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </Field>
                                      </div>

                                      <div className="col-6">
                                          <Field label="Minimum Stock">
                                              <input
                                                  type="number"
                                                  className="form-control product-input"
                                                  value={form.minStock}
                                                  onChange={(e) =>
                                                      update("minStock")(
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </Field>
                                      </div>
                                  </div>
                              </div>
                          </Card>
                      </div>
                  </div>

                  {/* ===================================================== */}
                  {/* Right Column                                           */}
                  {/* ===================================================== */}

                  <div className="col-12 col-xl-4">
                      <div className="d-flex flex-column gap-4">

                          {/* Product Details */}
                          <Card title="Product Details">
                              <div className="row g-3">
                                  <div className="col-6">
                                      <Field label="Brand Name">
                                          <Select
                                              value={form.brand}
                                              onChange={update("brand")}
                                              options={[
                                                  "Adidas",
                                                  "Nike",
                                                  "Puma",
                                                  "Reebok",
                                                  "H&M",
                                              ]}
                                          />
                                      </Field>
                                  </div>

                                  <div className="col-6">
                                      <Field label="Product Size">
                                          <Select
                                              value={form.size}
                                              onChange={update("size")}
                                              options={[
                                                  "Small",
                                                  "Medium",
                                                  "Large",
                                                  "X-Large",
                                              ]}
                                          />
                                      </Field>
                                  </div>

                                  <div className="col-12">
                                      <Field label="Product Colors">
                                          <Select
                                              value={form.color}
                                              onChange={update("color")}
                                              options={[
                                                  "Black and White",
                                                  "All Black",
                                                  "Navy Blue",
                                                  "Charcoal Grey",
                                              ]}
                                          />
                                      </Field>
                                  </div>
                              </div>
                          </Card>

                          {/* Product Pricing */}
                          <Card title="Product Pricing">
                              <div className="row g-3">
                                  <div className="col-6">
                                      <Field label="Price">
                                          <div className="input-group">
                                              <span className="input-group-text bg-white border-end-0">
                                                  $
                                              </span>

                                              <input
                                                  type="number"
                                                  className="form-control product-input border-start-0"
                                                  value={form.price}
                                                  onChange={(e) =>
                                                      update("price")(
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </div>

                                          {errors.price && (
                                              <div className="text-danger small mt-1">
                                                  {errors.price}
                                              </div>
                                          )}
                                      </Field>
                                  </div>

                                  <div className="col-6">
                                      <Field label="Compare-at Price">
                                          <div className="input-group">
                                              <span className="input-group-text bg-white border-end-0">
                                                  $
                                              </span>

                                              <input
                                                  type="number"
                                                  className="form-control product-input border-start-0"
                                                  value={
                                                      form.comparePrice
                                                  }
                                                  onChange={(e) =>
                                                      update(
                                                          "comparePrice"
                                                      )(
                                                          e.target.value
                                                      )
                                                  }
                                              />
                                          </div>
                                      </Field>
                                  </div>

                                  <div className="col-6">
                                      <Field label="Discount">
                                          <Select
                                              value={form.discount}
                                              onChange={update("discount")}
                                              options={[
                                                  "5",
                                                  "10",
                                                  "15",
                                                  "20",
                                                  "25",
                                              ]}
                                          />
                                      </Field>
                                  </div>

                                  <div className="col-6">
                                      <Field label="Minimum Order">
                                          <input
                                              type="number"
                                              className="form-control product-input"
                                              value={form.minOrder}
                                              onChange={(e) =>
                                                  update("minOrder")(
                                                      e.target.value
                                                  )
                                              }
                                          />
                                      </Field>
                                  </div>
                              </div>
                          </Card>

                          {/* Product Image */}
                          <Card
                              title="Product Image"
                              right={
                                  <i className="bi bi-info-circle text-secondary"></i>
                              }
                          >
                              <div className="row g-3">

                                  {/* Upload Button */}
                                  <div className="col-4">
                                      <button
                                          type="button"
                                          onClick={() =>
                                              fileInputRef.current?.click()
                                          }
                                          disabled={images.length >= 4}
                                          className="upload-box w-100"
                                      >
                                          <i className="bi bi-image"></i>

                                          <span>
                                              Click to Upload
                                          </span>
                                      </button>
                                  </div>

                                  <input
                                      ref={fileInputRef}
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      hidden
                                      onChange={(e) =>
                                          handleFiles(
                                              e.target.files
                                          )
                                      }
                                  />

                                  {/* Images */}
                                  {images.map((image) => (
                                      <div
                                          key={image.id}
                                          className="col-4"
                                      >
                                          <div className="image-preview">
                                              {image.url ? (
                                                  <img
                                                      src={image.url}
                                                      alt="Product"
                                                      className="w-100 h-100 object-fit-cover"
                                                  />
                                              ) : (
                                                  <div className="no-image">
                                                      no image
                                                  </div>
                                              )}

                                              <button
                                                  type="button"
                                                  onClick={() =>
                                                      removeImage(
                                                          image.id
                                                      )
                                                  }
                                                  className="remove-image-btn"
                                              >
                                                  <i className="bi bi-x"></i>
                                                  Remove
                                              </button>
                                          </div>
                                      </div>
                                  ))}
                              </div>

                              <p className="small text-secondary mt-3 mb-0">
                                  {images.length}/4 images · PNG or JPG,
                                  up to 5MB each
                              </p>
                          </Card>
                      </div>
                  </div>
              </div>

              {/* ========================================================= */}
              {/* Footer Actions                                             */}
              {/* ========================================================= */}

              <div className="footer-actions mt-4 p-3 bg-white border rounded-4 d-flex flex-wrap align-items-center justify-content-between gap-3">

                  <button
                      type="button"
                      className="btn btn-light border d-flex align-items-center gap-2"
                  >
                      <i className="bi bi-save"></i>
                      Save Product
                  </button>

                  <div className="d-flex align-items-center gap-2">
                      <button
                          type="button"
                          className="btn-schedule d-flex align-items-center gap-2"
                      >
                          <i className="bi bi-calendar-event"></i>
                          Schedule
                      </button>

                      <button
                          type="button"
                          onClick={saveProduct}
                          className="btn-rose d-flex align-items-center gap-2"
                      >
                          <i
                              className={`bi ${saved
                                  ? "bi-check"
                                  : "bi-plus"
                                  }`}
                          ></i>

                          {saved
                              ? "Product Added"
                              : "Add Product"}
                      </button>
                  </div>
              </div>
      </div>
    </div>

  );
};

export default AddEditViewProduct;
