const express = require("express");

const router = express.Router();


const {

getUsers,

deleteUser,

updateUserRole,

getUserDetails

}=require("../controllers/userController");



const {protect}=require("../middleware/authMiddleware");

const {adminMiddleware}=require("../middleware/adminMiddleware");




// GET USERS

router.get(

"/",

protect,

adminMiddleware,

getUsers

);




// DELETE USER

router.delete(

"/:id",

protect,

adminMiddleware,

deleteUser

);




// UPDATE ROLE

router.put(

"/:id/role",

protect,

adminMiddleware,

updateUserRole

);





// USER DETAILS

router.get(

"/:id/details",

protect,

adminMiddleware,

getUserDetails

);





module.exports=router;