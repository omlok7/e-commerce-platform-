const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, stock } = req.body;

        // Validation
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        });

        res.status(201).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const updateProduct = async (req,res)=>{

    try{


        const product = await Product.findById(
            req.params.id
        );


        if(!product){

            return res.status(404).json({

                message:"Product not found"

            });

        }



        product.name = req.body.name;

        product.description = req.body.description;

        product.price = req.body.price;

        product.category = req.body.category;

        product.stock = req.body.stock;



        if(req.body.image){

            product.image = req.body.image;

        }



        const updatedProduct =
            await product.save();



        res.status(200).json({

            message:"Product updated successfully",

            product: updatedProduct

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    } };
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};