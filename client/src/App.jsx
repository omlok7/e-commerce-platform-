    import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

    import Navbar from "./components/Navbar";
    import Footer from "./components/Footer";

    import PrivateRoute from "./components/PrivateRoute";
    import AdminRoute from "./components/AdminRoute";

    import Home from "./pages/Home";
    import Login from "./pages/Login";
    import Register from "./pages/Register";
    import ProductDetails from "./pages/ProductDetails";
    import Cart from "./pages/Cart";
    import Orders from "./pages/Orders";


    // Admin
    import AdminLayout from "./components/admin/AdminLayout";
    import AdminDashboard from "./pages/AdminDashboard";
    import AdminProducts from "./pages/AdminProducts";
    import AdminOrders from "./pages/AdminOrders";
    import AdminUsers from "./pages/AdminUsers";


    // Context
    import { CartProvider } from "./context/CartContext";

    import "./App.css";
    import "./index.css";



    function AppContent() {

    const location = useLocation();

    // Vérifier si on est dans l'espace admin
    const isAdmin = location.pathname.startsWith("/admin");


    return (

        <>


        {/* Navbar visible partout */}
        <div className="top">
            <Navbar />
        </div>



        <Routes>


            {/* ================= PUBLIC ================= */}


            <Route 
            path="/" 
            element={<Login />} 
            />


            <Route 
            path="/home" 
            element={<Home />} 
            />


            <Route 
            path="/register" 
            element={<Register />} 
            />


            <Route 
            path="/product/:id" 
            element={<ProductDetails />} 
            />



            {/* ================= USER ================= */}


            <Route
            path="/cart"
            element={
                <PrivateRoute>
                <Cart />
                </PrivateRoute>
            }
            />


            <Route
            path="/orders"
            element={
                <PrivateRoute>
                <Orders />
                </PrivateRoute>
            }
            />



            {/* ================= ADMIN ================= */}


            <Route
            path="/admin"
            element={
                <AdminRoute>
                <AdminLayout />
                </AdminRoute>
            }
            >

            <Route 
                index 
                element={<AdminDashboard />} 
            />


            <Route
                path="products"
                element={<AdminProducts />}
            />


            <Route
                path="orders"
                element={<AdminOrders />}
            />


            <Route
                path="users"
                element={<AdminUsers />}
            />


            </Route>



        </Routes>



        {/* Footer caché dans admin */}
        {!isAdmin && <Footer />}



        </>

    );
    }





    function App() {

    return (

        <CartProvider>

        <BrowserRouter>

            <AppContent />

        </BrowserRouter>

        </CartProvider>

    );

    }



    export default App;