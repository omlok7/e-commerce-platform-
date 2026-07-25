const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts, getProductById,
     updateProduct,
      deleteProduct
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const {adminMiddleware } = require("../middleware/adminMiddleware");
router.post("/", protect,adminMiddleware, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect,adminMiddleware, updateProduct);
router.delete("/:id", protect,adminMiddleware , deleteProduct);
module.exports = router;