import React, { useState, useRef } from "react";
import {
    Home,
    ChevronRight,
    Search,
    LayoutGrid,
    ShoppingBag,
    Users,
    BarChart2,
    Inbox,
    Megaphone,
    Settings,
    HelpCircle,
    ChevronDown,
    Bold,
    Italic,
    Underline,
    Link2,
    AlignLeft,
    ImagePlus,
    X,
    Info,
    Save,
    CalendarClock,
    Plus,
    Check,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Reusable pieces
// ---------------------------------------------------------------------------

function Card({ title, right, children }) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
                {right}
            </div>
            {children}
        </section>
    );
}

function Field({ label, children }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-slate-500">
                {label}
            </span>
            {children}
        </label>
    );
}

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

function Select({ value, onChange, options, placeholder }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${inputClass} appearance-none pr-9 cursor-pointer`}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
        </div>
    );
}

function NavItem({ icon: Icon, label, active, hasChildren, open, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[14px] transition ${active
                    ? "bg-teal-50 font-medium text-teal-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
        >
            <span className="flex items-center gap-2.5">
                <Icon size={17} strokeWidth={2} />
                {label}
            </span>
            {hasChildren && (
                <ChevronDown
                    size={15}
                    className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            )}
        </button>
    );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AddProductPage() {
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
        { id: 1, url: null, label: "front" },
        { id: 2, url: null, label: "back" },
    ]);

    const [saved, setSaved] = useState(false);
    const [errors, setErrors] = useState({});

    const update = (key) => (value) =>
        setForm((f) => ({ ...f, [key]: value }));

    const handleFiles = (fileList) => {
        const files = Array.from(fileList).slice(0, 4 - images.length);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                setImages((prev) => [
                    ...prev,
                    { id: Date.now() + Math.random(), url: reader.result },
                ]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (id) =>
        setImages((prev) => prev.filter((img) => img.id !== id));

    const validate = () => {
        const next = {};
        if (!form.name.trim()) next.name = "Product name is required";
        if (!form.price.trim()) next.price = "Price is required";
        if (!form.sku.trim()) next.sku = "SKU is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleAddProduct = () => {
        if (!validate()) return;
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="flex min-h-screen w-full bg-slate-50 text-slate-900 antialiased">
            {/* ---------------------------------------------------------------- */}
            {/* Sidebar                                                          */}
            {/* ---------------------------------------------------------------- */}
            <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 lg:flex">
                <div className="mb-7 flex items-center gap-2.5 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                        <ShoppingBag size={17} />
                    </div>
                    <span className="text-[16px] font-semibold tracking-tight">
                        SadaxCart
                    </span>
                </div>

                <div className="relative mb-6">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        placeholder="Search"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-12 text-[13px] outline-none placeholder:text-slate-400 focus:border-teal-500 focus:bg-white"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">
                        ⌘S
                    </span>
                </div>

                <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Main Menu
                </p>
                <nav className="flex flex-col gap-1">
                    <NavItem icon={Home} label="Home" />
                    <NavItem icon={LayoutGrid} label="My Shop" hasChildren open />
                    <div className="ml-6 flex flex-col gap-0.5 border-l border-slate-100 pl-3">
                        <button className="rounded-lg bg-teal-50 px-3 py-2 text-left text-[13.5px] font-medium text-teal-700">
                            Products
                        </button>
                        <button className="rounded-lg px-3 py-2 text-left text-[13.5px] text-slate-500 hover:bg-slate-50">
                            Orders
                        </button>
                        <button className="rounded-lg px-3 py-2 text-left text-[13.5px] text-slate-500 hover:bg-slate-50">
                            Customers
                        </button>
                    </div>
                    <NavItem icon={BarChart2} label="Shop Management" hasChildren />
                    <NavItem icon={BarChart2} label="Analytics Report" />
                    <NavItem icon={Inbox} label="Inbox" />
                </nav>

                <p className="mb-2 mt-6 px-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Others
                </p>
                <nav className="flex flex-col gap-1">
                    <NavItem icon={Megaphone} label="Promotion" />
                    <NavItem icon={Settings} label="Settings" />
                    <NavItem icon={HelpCircle} label="Help & Support" />
                </nav>

                <div className="mt-auto flex items-center gap-2.5 rounded-xl border border-slate-100 px-3 py-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-[13px] font-semibold text-teal-700">
                        KM
                    </div>
                    <div className="leading-tight">
                        <p className="text-[13.5px] font-medium">Kazi Mahbub</p>
                        <p className="text-[11.5px] text-slate-400">Super Admin</p>
                    </div>
                    <ChevronDown size={15} className="ml-auto text-slate-400" />
                </div>
            </aside>

            {/* ---------------------------------------------------------------- */}
            {/* Main content                                                     */}
            {/* ---------------------------------------------------------------- */}
            <main className="flex-1 px-6 py-8 md:px-10">
                {/* Breadcrumb */}
                <div className="mb-1 flex items-center gap-2 text-[13px] text-slate-400">
                    <Home size={14} />
                    <span>Products</span>
                    <ChevronRight size={13} />
                    <span className="font-medium text-teal-600">Add New Product</span>
                </div>

                <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-[26px] font-semibold tracking-tight text-slate-900">
                            Add New Product
                        </h1>
                        <p className="mt-1 text-[14px] text-slate-500">
                            Add a new product to your store
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_400px]">
                    {/* -------------------------------------------------------- */}
                    {/* Left column                                              */}
                    {/* -------------------------------------------------------- */}
                    <div className="flex flex-col gap-6">
                        <Card title="Name and Description">
                            <div className="flex flex-col gap-5">
                                <Field label="Product Name">
                                    <input
                                        className={inputClass}
                                        value={form.name}
                                        onChange={(e) => update("name")(e.target.value)}
                                        placeholder="e.g. Premium Half Sleeve T-Shirt"
                                    />
                                    {errors.name && (
                                        <span className="mt-1 block text-[12px] text-red-500">
                                            {errors.name}
                                        </span>
                                    )}
                                </Field>

                                <Field label="Product Description">
                                    <div className="rounded-lg border border-slate-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                                        <div className="flex items-center gap-1 border-b border-slate-100 px-3 py-2 text-slate-400">
                                            {[Bold, Italic, Underline, Link2, AlignLeft].map(
                                                (Icon, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        className="rounded p-1.5 hover:bg-slate-50 hover:text-slate-600"
                                                    >
                                                        <Icon size={14} />
                                                    </button>
                                                )
                                            )}
                                        </div>
                                        <textarea
                                            rows={7}
                                            value={form.description}
                                            onChange={(e) => update("description")(e.target.value)}
                                            className="w-full resize-none rounded-b-lg px-3.5 py-3 text-[14px] leading-relaxed text-slate-700 outline-none placeholder:text-slate-400"
                                            placeholder="Describe the product…"
                                        />
                                    </div>
                                </Field>
                            </div>
                        </Card>

                        <Card title="Category">
                            <div className="flex flex-col gap-5">
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

                        <Card title="Manage Stock">
                            <div className="flex flex-col gap-5">
                                <Field label="Stock Keeping Unit">
                                    <input
                                        className={inputClass}
                                        value={form.sku}
                                        onChange={(e) => update("sku")(e.target.value)}
                                        placeholder="SKU-000-00"
                                    />
                                    {errors.sku && (
                                        <span className="mt-1 block text-[12px] text-red-500">
                                            {errors.sku}
                                        </span>
                                    )}
                                </Field>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="Product Stock">
                                        <input
                                            className={inputClass}
                                            inputMode="numeric"
                                            value={form.stock}
                                            onChange={(e) => update("stock")(e.target.value)}
                                        />
                                    </Field>
                                    <Field label="Minimum Stock">
                                        <input
                                            className={inputClass}
                                            inputMode="numeric"
                                            value={form.minStock}
                                            onChange={(e) => update("minStock")(e.target.value)}
                                        />
                                    </Field>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* -------------------------------------------------------- */}
                    {/* Right column                                             */}
                    {/* -------------------------------------------------------- */}
                    <div className="flex flex-col gap-6">
                        <Card title="Product Details">
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Brand Name">
                                    <Select
                                        value={form.brand}
                                        onChange={update("brand")}
                                        options={["Adidas", "Nike", "Puma", "Reebok", "H&M"]}
                                    />
                                </Field>
                                <Field label="Product Size">
                                    <Select
                                        value={form.size}
                                        onChange={update("size")}
                                        options={["Small", "Medium", "Large", "X-Large"]}
                                    />
                                </Field>
                                <div className="col-span-2">
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

                        <Card title="Product Pricing">
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Price">
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-slate-400">
                                            $
                                        </span>
                                        <input
                                            className={`${inputClass} pl-7`}
                                            inputMode="decimal"
                                            value={form.price}
                                            onChange={(e) => update("price")(e.target.value)}
                                        />
                                    </div>
                                    {errors.price && (
                                        <span className="mt-1 block text-[12px] text-red-500">
                                            {errors.price}
                                        </span>
                                    )}
                                </Field>
                                <Field label="Compare-at Price">
                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-slate-400">
                                            $
                                        </span>
                                        <input
                                            className={`${inputClass} pl-7`}
                                            inputMode="decimal"
                                            value={form.comparePrice}
                                            onChange={(e) => update("comparePrice")(e.target.value)}
                                        />
                                    </div>
                                </Field>
                                <Field label="Discount">
                                    <Select
                                        value={form.discount}
                                        onChange={update("discount")}
                                        options={["5", "10", "15", "20", "25"]}
                                    />
                                </Field>
                                <Field label="Minimum Order">
                                    <input
                                        className={inputClass}
                                        inputMode="numeric"
                                        value={form.minOrder}
                                        onChange={(e) => update("minOrder")(e.target.value)}
                                    />
                                </Field>
                            </div>
                        </Card>

                        <Card
                            title="Product Image"
                            right={
                                <Info size={15} className="cursor-help text-slate-400" />
                            }
                        >
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={images.length >= 4}
                                    className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-teal-200 bg-teal-50/40 text-teal-600 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ImagePlus size={20} />
                                    <span className="text-[12px] font-medium">
                                        Click to Upload
                                    </span>
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={(e) => handleFiles(e.target.files)}
                                />

                                {images.map((img) => (
                                    <div
                                        key={img.id}
                                        className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                                    >
                                        {img.url ? (
                                            <img
                                                src={img.url}
                                                alt="Product"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-[11px] text-slate-300">
                                                no image
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(img.id)}
                                            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-md bg-red-500 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-sm transition group-hover:opacity-100"
                                        >
                                            <X size={11} /> Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-3 text-[12px] text-slate-400">
                                {images.length}/4 images · PNG or JPG, up to 5MB each
                            </p>
                        </Card>
                    </div>
                </div>

                {/* ------------------------------------------------------------ */}
                {/* Footer actions                                                */}
                {/* ------------------------------------------------------------ */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-[14px] font-medium text-slate-600 transition hover:bg-slate-50">
                        <Save size={16} />
                        Save Product
                    </button>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-4 py-2.5 text-[14px] font-medium text-teal-700 transition hover:bg-teal-100">
                            <CalendarClock size={16} />
                            Schedule
                        </button>
                        <button
                            onClick={handleAddProduct}
                            className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-[14px] font-medium text-white shadow-sm transition hover:bg-teal-700"
                        >
                            {saved ? <Check size={16} /> : <Plus size={16} />}
                            {saved ? "Product Added" : "Add Product"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}