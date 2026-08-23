import './Dashboard.css'
const Dashboard = () => {
    return (
        <div>
                {/* div CONTENT  */}
                <div className="main">

                    {/*  HEADER  */}
                    <header className="header">
                        <div>
                            <h1>Dashboard</h1>
                            <p>Welcome back, John. Here's what's happening today.</p>
                        </div>

                        <div className="header-right">
                            <input className="search" type="text" placeholder="Search anything..." />
                            <div className="notification">♧</div>
                        </div>
                    </header>

                    {/* STAT CARDS  */}
                    <section className="cards">

                        <div className="dash-card">
                            <div className="card-top">
                                <span className="card-title">Total Revenue</span>
                                <div className="card-icon">₹</div>
                            </div>
                            <h2>₹84,920</h2>
                            <span className="growth">↑ 12.5% from last month</span>
                        </div>

                        <div className="dash-card">
                            <div className="card-top">
                                <span className="card-title">Total Orders</span>
                                <div className="card-icon">▣</div>
                            </div>
                            <h2>2,840</h2>
                            <span className="growth">↑ 8.2% from last month</span>
                        </div>

                        <div className="dash-card">
                            <div className="card-top">
                                <span className="card-title">Customers</span>
                                <div className="card-icon">♧</div>
                            </div>
                            <h2>12,580</h2>
                            <span className="growth">↑ 5.7% from last month</span>
                        </div>

                        <div className="dash-card">
                            <div className="card-top">
                                <span className="card-title">Products Sold</span>
                                <div className="card-icon">◈</div>
                            </div>
                            <h2>5,492</h2>
                            <span className="growth">↑ 10.4% from last month</span>
                        </div>

                    </section>

                    {/* CHART + TOP PRODUCTS  */}
                    <section className="content-grid">

                        <div className="panel">

                            <div className="panel-header">
                                <h3>Sales Overview</h3>

                                <select className="select">
                                    <option>Last 7 Months</option>
                                    <option>Last 30 Days</option>
                                    <option>This Year</option>
                                </select>
                            </div>

                            <div className="chart">

                                <div className="bar-wrapper">
                                    <div className="bar" style={{ height: "40%;" }}></div>
                                    <span className="bar-label">Feb</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar" style={{ height: "55%;" }}></div>
                                    <span className="bar-label">Mar</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar" style={{ height: "48%;" }}></div>
                                    <span className="bar-label">Apr</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar" style={{ height: "68%;" }}></div>
                                    <span className="bar-label">May</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar" style={{ height: "61%;" }}></div>
                                    <span className="bar-label">Jun</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar" style={{ height: "82%;" }}></div>
                                    <span className="bar-label">Jul</span>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar" style={{ height: "95%; background:#d9a441;" }}></div>
                                    <span className="bar-label">Aug</span>
                                </div>

                            </div>

                        </div>

                        {/* TOP PRODUCTS  */}
                        <div className="panel">

                            <div className="panel-header">
                                <h3>Top Products</h3>
                                <span style={{fontSize:"12px",color:"#b17c1d;"}}>View all →</span>
                            </div>

                            <div className="product-list">

                                <div className="product">
                                    <div className="product-img" style={{background:"#e9d9c7;"}}></div>

                                    <div className="product-info">
                                        <h4>Classic Linen Blazer</h4>
                                        <span>248 sold</span>
                                    </div>

                                    <div className="price">₹129</div>
                                </div>

                                <div className="product">
                                    <div className="product-img" style={{background:"#d5d8dc;"}}></div>

                                    <div className="product-info">
                                        <h4>Minimal White Dress</h4>
                                        <span>192 sold</span>
                                    </div>

                                    <div className="price">₹89</div>
                                </div>

                                <div className="product">
                                    <div className="product-img" style={{background:"#b8a999;"}}></div>

                                    <div className="product-info">
                                        <h4>Oversized Wool Coat</h4>
                                        <span>175 sold</span>
                                    </div>

                                    <div className="price">₹199</div>
                                </div>

                                <div className="product">
                                    <div className="product-img" style={{background:"#252525;"}}></div>

                                    <div className="product-info">
                                        <h4>Leather Shoulder Bag</h4>
                                        <span>154 sold</span>
                                    </div>

                                    <div className="price">₹149</div>
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* RECENT ORDERS  */}
                    <section className="table-panel">

                        <div className="panel-header">
                            <h3>Recent Orders</h3>
                            <span style={{fontSize:"12px",color:"#b17c1d;"}}>View all orders →</span>
                        </div>

                        <table>

                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>
                                        <div className="customer">
                                            <div className="customer-avatar">AS</div>
                                            <span>Anna Smith</span>
                                        </div>
                                    </td>
                                    <td>#MOD-8291</td>
                                    <td>Linen Blazer</td>
                                    <td>Aug 22, 2026</td>
                                    <td>₹129.00</td>
                                    <td><span className="status delivered">Delivered</span></td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="customer">
                                            <div className="customer-avatar">MJ</div>
                                            <span>Michael Jones</span>
                                        </div>
                                    </td>
                                    <td>#MOD-8290</td>
                                    <td>White Dress</td>
                                    <td>Aug 22, 2026</td>
                                    <td>₹89.00</td>
                                    <td><span className="status processing">Processing</span></td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="customer">
                                            <div className="customer-avatar">EW</div>
                                            <span>Emma Wilson</span>
                                        </div>
                                    </td>
                                    <td>#MOD-8289</td>
                                    <td>Wool Coat</td>
                                    <td>Aug 21, 2026</td>
                                    <td>₹199.00</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="customer">
                                            <div className="customer-avatar">RB</div>
                                            <span>Robert Brown</span>
                                        </div>
                                    </td>
                                    <td>#MOD-8288</td>
                                    <td>Leather Bag</td>
                                    <td>Aug 21, 2026</td>
                                    <td>₹149.00</td>
                                    <td><span className="status delivered">Delivered</span></td>
                                </tr>

                            </tbody>

                        </table>

                    </section>

                </div>

        </div>
    );
}
export default Dashboard;