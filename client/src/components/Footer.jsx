import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">

      <div className="container py-5">

        <div className="row">


          {/* Logo + Description */}
          <div className="col-md-4 mb-4">

            <h3 className="text-warning">
              <i className="bi bi-shop"></i> MyShop
            </h3>

            <p>
              Votre boutique en ligne pour acheter
              des produits de qualité au meilleur prix.
            </p>


            <div className="d-flex gap-3">

              <a href="#" className="text-white fs-4">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#" className="text-white fs-4">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#" className="text-white fs-4">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#" className="text-white fs-4">
                <i className="bi bi-linkedin"></i>
              </a>

            </div>

          </div>



          {/* Navigation */}
          <div className="col-md-4 mb-4">

            <h5 className="text-warning">
              Navigation
            </h5>


            <ul className="list-unstyled">

              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none">
                  <i className="bi bi-house"></i> Accueil
                </a>
              </li>


              <li className="mb-2">
                <a href="/Home" className="text-white text-decoration-none">
                  <i className="bi bi-bag"></i> Produits
                </a>
              </li>


              <li className="mb-2">
                <a href="/cart" className="text-white text-decoration-none">
                  <i className="bi bi-cart"></i> Panier
                </a>
              </li>


              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  <i className="bi bi-envelope"></i> Contact
                </a>
              </li>


            </ul>

          </div>



          {/* Contact */}
          <div className="col-md-4 mb-4">


            <h5 className="text-warning">
              Contact
            </h5>


            <p>
              <i className="bi bi-geo-alt-fill"></i>
              &nbsp; Tunis, Tunisie
            </p>


            <p>
              <i className="bi bi-telephone-fill"></i>
              &nbsp; +216 XX XXX XXX
            </p>


            <p>
              <i className="bi bi-envelope-fill"></i>
              &nbsp; contact@myshop.com
            </p>


          </div>


        </div>

      </div>



      {/* Copyright */}

      <div className="border-top text-center py-3">

        <p className="mb-0">
          © 2026 
          <strong className="text-warning"> MyShop </strong>
          - Tous droits réservés
        </p>

      </div>


    </footer>
  );
}

export default Footer;