import React, { useState } from "react";

function ProductTable({ products, onView, onEdit, onDelete }) {

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);


  // Categories

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];


  // SEARCH + CATEGORY FILTER

  let filteredProducts = products.filter((product) => {

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());


    const categoryMatch =
      categoryFilter === "all" ||
      product.category === categoryFilter;


    return searchMatch && categoryMatch;

  });



  // SORT

  if (sort === "priceAsc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }


  if (sort === "priceDesc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }


  if (sort === "stockHigh") {
    filteredProducts.sort((a, b) => b.stock - a.stock);
  }


  if (sort === "stockLow") {
    filteredProducts.sort((a, b) => a.stock - b.stock);
  }



  // PAGINATION

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );


  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );



  return (

    <div className="table">


      <h3 className="text-black text-center">
        Products List
      </h3>



      {/* FILTERS */}

      <div className="p-3">

        <div className="row g-2">


          {/* Search */}

          <div className="col-md-4">

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>


              <input
                className="form-control"
                placeholder="Search product..."
                value={search}
                onChange={(e) => {

                  setSearch(e.target.value);
                  setCurrentPage(1);

                }}
              />

            </div>

          </div>




          {/* Category */}

          <div className="col-md-3">

            <select

              className="form-select"

              value={categoryFilter}

              onChange={(e) => {

                setCategoryFilter(e.target.value);
                setCurrentPage(1);

              }}

            >

              {categories.map((cat) => (

                <option
                  key={cat}
                  value={cat}
                >

                  {cat === "all"
                    ? "All Categories"
                    : cat}

                </option>

              ))}

            </select>

          </div>





          {/* Sort */}

          <div className="col-md-3">

            <select

              className="form-select"

              value={sort}

              onChange={(e)=>setSort(e.target.value)}

            >

              <option value="">
                Sort By
              </option>

              <option value="priceAsc">
                Price ↑
              </option>

              <option value="priceDesc">
                Price ↓
              </option>

              <option value="stockHigh">
                Stock High
              </option>

              <option value="stockLow">
                Stock Low
              </option>


            </select>


          </div>





          {/* Pagination size */}

          <div className="col-md-2">

            <select

              className="form-select"

              value={productsPerPage}

              onChange={(e)=>{

                setProductsPerPage(Number(e.target.value));
                setCurrentPage(1);

              }}

            >

              <option value="5">
                5 / page
              </option>


              <option value="10">
                10 / page
              </option>


              <option value="20">
                20 / page
              </option>


            </select>


          </div>


        </div>

      </div>





      {/* TABLE */}


      <div className="table-responsive">


        <table className="table table-hover mb-0">


          <thead>

            <tr>

              <th>
                Image
              </th>

              <th>
                Name
              </th>

              <th>
                Price
              </th>

              <th>
                Category
              </th>

              <th>
                Stock
              </th>

              <th>
                Actions
              </th>


            </tr>

          </thead>




          <tbody>


          {
            currentProducts.length === 0 ?

            (

              <tr>

                <td
                  colSpan="6"
                  className="text-center"
                >

                  No products found

                </td>

              </tr>


            )

            :

            (

            currentProducts.map((product)=>(


              <tr key={product._id}>


                <td>

                  <img

                    src={
                      product.image
                      ?
                      `http://localhost:5000/uploads/${product.image}`
                      :
                      "https://placehold.co/80"
                    }

                    width="70"

                    height="70"

                    className="rounded"

                    alt={product.name}

                  />

                </td>




                <td>
                  {product.name}
                </td>




                <td>
                  {product.price} TND
                </td>




                <td>
                  {product.category}
                </td>




                <td>

                  <span

                    className={
                      product.stock > 0
                      ?
                      "badge bg-success"
                      :
                      "badge bg-danger"
                    }

                  >

                    {
                      product.stock > 0
                      ?
                      `${product.stock} available`
                      :
                      "Out"
                    }


                  </span>


                </td>




                <td>


                  {/* View */}

                  <button

                    className="btn btn-info btn-sm me-2"

                    onClick={()=>onView(product)}

                    title="View"

                  >

                    <i className="bi bi-eye"></i>


                  </button>





                  {/* Edit */}

                  <button

                    className="btn btn-warning btn-sm me-2"

                    onClick={()=>onEdit(product)}

                    title="Edit"

                  >

                    <i className="bi bi-pencil-square"></i>


                  </button>





                  {/* Delete */}

                  <button

                    className="btn btn-danger btn-sm"

                    onClick={()=>onDelete(product._id)}

                    title="Delete"

                  >

                    <i className="bi bi-trash"></i>


                  </button>



                </td>



              </tr>


            ))

            )

          }



          </tbody>


        </table>


      </div>





      {/* PAGINATION */}


      <div className="d-flex justify-content-center align-items-center p-3">


        <button

          className="btn btn-secondary me-3"

          disabled={currentPage === 1}

          onClick={()=>setCurrentPage(currentPage - 1)}

        >

          <i className="bi bi-chevron-left"></i>


        </button>




        <span>

          Page {currentPage} / {totalPages || 1}

        </span>





        <button

          className="btn btn-secondary ms-3"

          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }

          onClick={()=>setCurrentPage(currentPage + 1)}

        >

          <i className="bi bi-chevron-right"></i>


        </button>


      </div>



    </div>

  );

}


export default ProductTable;