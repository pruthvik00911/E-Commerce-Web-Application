const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const authenticate = require('../../middleware/authentication')

//importing product schema
const Product = require("../../Models/Schemas/product");
const Cart = require("../../Models/Schemas/cart");
const { default: mongoose } = require("mongoose");


//routes
<<<<<<< HEAD
route.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({message: "Successfully found the products", success: true, products: products});
  } catch (err) {
    res.status(404).json({ message: "Error while loading the products", success: false });
  }
});

route.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({message: "Successfully found the products",success: true,product: product});
  } catch (err) {
    res.status(404).json({ message: "Error while loading the products", success: false });
  }
});
=======
route.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ message: "Successfully found the products", success: true, products: products })
    } catch (err) {
        res.status(404).json({ message: "Error while loading the products", success: false })
    }
})

route.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({ message: "Successfully found the products", success: true, product: product })
    } catch (err) {
        res.status(404).json({ message: "Error while loading the products", success: false })
    }
})
>>>>>>> c14a3e6accd9d63f7fac53f74850128145573e94

route.post("/addcart", authenticate ,async (req, res) => {
  try {
    const decodedId = req.userId
    const userCart = await Cart.findById({ _id: decodedId });
    if (userCart) {
      userCart.items = req.body.items
      await userCart.save()
      res.status(200).json({message: "Product Added to the cart",success: true,cart: userCart,})
    } else {
      const newCart = await Cart.create({
        userId: decodedId,
        items: req.body.items.map((i)=> ({item : mongoose.Schema.Types.ObjectId(i)})),
      })
      res.status(200).json({message: "Product Added to the cart",success: true,cart: newCart,});
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error while adding cart", success: false });
  }
});

route.get('/getcart', authenticate ,async(req, res)=>{
  try {
    const userCart = await Cart.findOne({'userId' : req.userId})
    console.log(userCart, req.userId)
    await userCart.populate({
      path:"Products",
    })
    console.log(userCart);
    res.status(200).json({cart : userCart})
  } catch (err) {
    console.log(err)
  }
})

module.exports = route;
