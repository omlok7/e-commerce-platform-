import React from "react";

function ProductDetailsModal({
  product,
  onClose,
  onEdit,
}) {

  if (!product) {
    return null;
  }

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >

      <div className="modal-dialog modal-lg">

        <div className="modal-content">


          {/* Header */}

          <div className="modal-header">

            <h5 className="modal-title">
              <i className="bi bi-box-seam me-2"></i>
              Product Details
            </h5>

            <button
              className="btn-close"
              onClick={onClose}
            ></button>

          </div>



          {/* Body */}

          <div className="modal-body">

            <div className="row">


              <div className="col-md-5">

                <img
                  src={
                    product.image
                      ? `http://localhost:5000/uploads/${product.image}`
                      : "https://placehold.co/400"
                  }
                  className="img-fluid rounded shadow"
                  alt={product.name}
                />

              </div>



              <div className="col-md-7">

                <h3>{product.name}</h3>

                <hr />


                <p>
                  <strong>Description:</strong>
                  <br />
                  {product.description}
                </p>


                <p>
                  <strong>Price:</strong> {product.price} TND
                </p>


                <p>
                  <strong>Category:</strong> {product.category}
                </p>


                <p>
                  <strong>Stock:</strong>{" "}
                  {product.stock > 0
                    ? `${product.stock} available`
                    : "Out of stock"}
                </p>


                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(product.createdAt)
                    .toLocaleDateString()}
                </p>


                <p>
                  <strong>Product ID:</strong>
                  <br />
                  {product._id}
                </p>


              </div>


            </div>

          </div>



          {/* Footer */}

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              <i className="bi bi-x-lg me-2"></i>
              Close
            </button>


            <button
              className="btn btn-warning"
              onClick={() => {
                onEdit(product);
                onClose();
              }}
            >
              <i className="bi bi-pencil me-2"></i>
              Edit Product
            </button>

          </div>


        </div>

      </div>

    </div>
  );
}

export default ProductDetailsModal;