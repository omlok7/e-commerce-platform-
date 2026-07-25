import { useEffect, useState } from "react";

import api from "../services/api";

import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";
import ProductDetailsModal from "../components/admin/ProductDetailsModal";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // ============================
  // GET PRODUCTS
  // ============================

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // DELETE PRODUCT
  // ============================

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">    <i className="bi bi-box-seam me-2"></i>Products Management</h2>

      {/* PRODUCT FORM */}

      <ProductForm
        editingProduct={editingProduct}
        onSuccess={() => {
          fetchProducts();

          setEditingProduct(null);
        }}
      />

      {/* PRODUCT TABLE */}

      <ProductTable
        products={products}
        onView={(product) => {
          setSelectedProduct(product);
        }}
        onEdit={(product) => {
          setEditingProduct(product);

          window.scrollTo({
            top: 0,

            behavior: "smooth",
          });
        }}
        onDelete={deleteProduct}
      />

      {/* DETAILS MODAL */}

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default AdminProducts;
