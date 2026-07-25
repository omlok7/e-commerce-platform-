  import { useEffect, useState } from "react";

  import api from "../services/api";

  import ProductCard from "../components/ProductCard";

  import Carousel from "react-bootstrap/Carousel";

  import banner1 from "../assets/banner1.jpg";
  import banner2 from "../assets/banner2.avif";
  import banner3 from "../assets/banner3.webp";

  function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // ADD TO CART

    const addToCart = async (product) => {
      try {
        await api.post(
          "/cart",

          {
            productId: product._id,

            quantity: 1,
          },
        );

        alert("Product added to cart 🛒");
      } catch (error) {
        console.log(error.response?.data || error);

        alert("Please login first");
      }
    };

    return (
      <>
        <div className="p-2  text-center mt-5">
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100 "
                src={banner1}
                alt="banner"
                style={{
                  height: "400px",

                  objectFit: "cover",
                }}
              />

              <Carousel.Caption>
                <h3>Best Products</h3>

                <p>Discover our latest products</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={banner2}
                alt="banner"
                style={{
                  height: "400px",

                  objectFit: "cover",
                }}
              />

              <Carousel.Caption>
                <h3>Technology Store</h3>

                <p>Smartphones, laptops and accessories</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={banner3}
                alt="banner"
                style={{
                  height: "400px",

                  objectFit: "cover",
                }}
              />

              <Carousel.Caption>
                <h3>Great Offers</h3>

                <p>Best prices for you</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

      <div className="container my-5">

    <h2 className="text-center mb-5">
      Our Products
    </h2>

    <div className="row g-4">

      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}

    </div>

  </div>
      </>
    );
  }

  export default Home;
