const Order = require("../models/Order");

const Cart = require("../models/Cart");





// CREATE ORDER

const createOrder = async(req,res)=>{


try{



const cart = await Cart.findOne({

user:req.user._id

})

.populate("items.product");






if(!cart || cart.items.length===0){


return res.status(400).json({

message:"Cart is empty"

});


}





let totalPrice=0;



cart.items.forEach(item=>{


if(item.product){


totalPrice += 

item.product.price * item.quantity;


}



});








const order = await Order.create({



user:req.user._id,



items:

cart.items

.filter(item=>item.product)

.map(item=>({

product:item.product._id,

quantity:item.quantity


})),



totalPrice



});






cart.items=[];


await cart.save();





res.status(201).json({


message:"Order created successfully",


order


});





}catch(error){


console.log(error);


res.status(500).json({

message:error.message

});


}



};









// USER GET ORDERS


const getOrders = async(req,res)=>{


try{



const orders = await Order.find({

user:req.user._id

})

.populate({

path:"items.product",

select:"name price image"

})

.sort({

createdAt:-1

});






res.json(orders);





}catch(error){


res.status(500).json({

message:error.message

});


}



};











// ADMIN GET ORDERS


const getAllOrdersAdmin = async(req,res)=>{


try{



const orders = await Order.find()


.populate({

path:"user",

select:"name email"

})


.populate({

path:"items.product",

select:"name price image"

})

.sort({

createdAt:-1

});




res.json(orders);





}catch(error){


res.status(500).json({

message:error.message

});


}



};







// UPDATE STATUS ADMIN


const updateOrderStatus=async(req,res)=>{


try{


const order = await Order.findById(

req.params.id

);



if(!order){


return res.status(404).json({

message:"Order not found"

});


}




order.status=req.body.status;


await order.save();





res.json(order);





}catch(error){


res.status(500).json({

message:error.message

});


}



};









module.exports={

createOrder,

getOrders,

getAllOrdersAdmin,

updateOrderStatus

};