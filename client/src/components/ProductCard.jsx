import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {

  const formattedPrice = new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
  }).format(product.price);


  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">

      <Link
        to={`/product/${product._id}`}
        className="text-decoration-none text-dark"
      >

        <div className="product-card h-100">


          <div className="product-image-wrapper">

            <img
              src={
                product.image
                  ? `http://localhost:5000/uploads/${product.image}`
                  : "https://placehold.co/300x300?text=No+Image"
              }
              alt={product.name}
              className="product-image"
            />


            <span
              className={`stock-badge ${
                product.stock > 0
                  ? "stock-success"
                  : "stock-danger"
              }`}
            >
              {product.stock > 0 ? "En stock" : "Rupture"}
            </span>

          </div>



          <div className="product-body d-flex flex-column">


            <span className="product-category">
              {product.category}
            </span>


            <h6 className="product-title">
              {product.name}
            </h6>


            <p className="product-description">
              {product.description}
            </p>


            <h5 className="product-price mt-auto">
              {formattedPrice}
            </h5>



            <button
              className="btn btn-warning w-100 mt-2"
              disabled={product.stock === 0}
              onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
                <i className="bi bi-cart3 me-2"></i> Ajouter
            </button>


          </div>


        </div>

      </Link>

    </div>
  );
}


export default ProductCard;