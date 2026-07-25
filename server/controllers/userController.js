const User = require("../models/User");
const Order = require("../models/Order");


// GET ALL USERS
const getUsers = async(req,res)=>{

    try{

        const users = await User.find()
        .select("-password")
        .sort({createdAt:-1});


        res.json(users);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




// DELETE USER

const deleteUser = async(req,res)=>{

    try{


        const user = await User.findById(req.params.id);


        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }


        await user.deleteOne();



        res.json({

            message:"User deleted"

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};





// CHANGE ROLE

const updateUserRole = async(req,res)=>{


    try{


        const user = await User.findById(req.params.id);



        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }



        user.role=req.body.role;



        await user.save();



        res.json({

            message:"Role updated",

            user

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// USER DETAILS ADMIN

const getUserDetails = async(req,res)=>{


    try{


        const user = await User.findById(

            req.params.id

        )
        .select("-password");




        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }






        const orders = await Order.find({

            user:user._id

        })

        .populate(
            "items.product",
            "name price image"
        )

        .sort({

            createdAt:-1

        });







        const totalSpent = orders.reduce(

            (total,order)=>{

                return total + order.totalPrice;

            },

            0

        );






        res.json({


            user,


            ordersCount:orders.length,


            totalSpent,


            orders


        });





    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }



};






module.exports={

    getUsers,

    deleteUser,

    updateUserRole,

    getUserDetails

};