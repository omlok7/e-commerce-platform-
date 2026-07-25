const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Vérifier les données
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

        // Vérifier que le produit existe
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Chercher le panier de l'utilisateur
        let cart = await Cart.findOne({
            user: req.user._id
        });

        // Si le panier n'existe pas, le créer
        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [
                    {
                        product: productId,
                        quantity: quantity || 1
                    }
                ]
            });
        } 
        
        else {
            // Vérifier si le produit existe déjà dans le panier
            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // Augmenter quantité
                cart.items[itemIndex].quantity += quantity || 1;
            } 
            else {
                // Ajouter nouveau produit
                cart.items.push({
                    product: productId,
                    quantity: quantity || 1
                });
            }

            await cart.save();
        }

        res.status(201).json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const getCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");


        if (!cart) {
            return res.status(404).json({
                message: "Cart is empty"
            });
        }


        res.status(200).json(cart);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const updateCartQuantity = async (req, res) => {
    try {

        const { quantity } = req.body;

        const cart = await Cart.findOne({
            user: req.user._id
        });


        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }


        const item = cart.items.find(
            item => item.product.toString() === req.params.productId
        );


        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }


        item.quantity = quantity;

        await cart.save();


        res.status(200).json({
            message: "Cart updated successfully",
            cart
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const removeFromCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id
        });


        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }


        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );


        await cart.save();


        res.status(200).json({
            message: "Product removed from cart",
            cart
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    addToCart ,
    getCart ,
    updateCartQuantity ,
    removeFromCart
};