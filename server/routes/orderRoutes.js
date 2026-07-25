const express = require("express");

const router = express.Router();


const {
    createOrder,
    getOrders,
    getAllOrdersAdmin,
    updateOrderStatus
} = require("../controllers/orderController");


const { protect } = require("../middleware/authMiddleware");

const { adminMiddleware } = require("../middleware/adminMiddleware");





// USER CREATE ORDER

router.post(
    "/",
    protect,
    createOrder
);





// USER GET ORDERS

router.get(
    "/",
    protect,
    getOrders
);







// ADMIN GET ALL ORDERS

router.get(
    "/admin",
    protect,
    adminMiddleware,
    getAllOrdersAdmin
);







// ADMIN UPDATE STATUS

router.put(
    "/:id/status",
    protect,
    adminMiddleware,
    updateOrderStatus
);




module.exports = router;