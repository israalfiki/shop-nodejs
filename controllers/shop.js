const Product = require('../models/product');

const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {   
    Product
    .findAll()
    .then(products=>{
            res.render('../views/shop.ejs', {
            products: products,
            path:'/', 
            pageTitle: 'Shop'});
    })
    .catch((err)=> {
        console.log(err)
    }) 
      
}

exports.getProduct = (req,res,next) => {
     const id= req.params.productID;
      Product.findByPk(id)
              .then((product) => {
                  console.log(product)
                    res.render('shop/view-product', {
                    product: product, 
                    pageTitle: product.title,
                    path:'/'
                })

              })
              .catch((err) => {
                  console.log(err)
              })
   
}

exports.getCart = (req,res,next) => {
    const products = Cart.getCartProducts((products) =>{
        console.log(products)
        res.render('shop/cart', {
            path:'/cart',
            pageTitle: 'Cart',
            products:products
        })

    });
  
}

exports.addToCart = (req,res,next) => {
    const productID = req.body.productId;
    Cart.addProduct(productID)
    res.redirect('/cart')
    
}

exports.deleteFromCart= (req,res,next) => {
    const id = req.body.productId
    const product = Product.findByID(id, (product) => {
        price = product.price;
        Cart.deleteProduct(id, price);
        res.redirect('/cart')


    })
    // const id= req.body.id; 

}

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        path: '/shop/checkout',
        pageTitle: 'Checkout'
    })
}

exports.getOrders = (req,res,next) => {
    res.render('shop/orders', {
        path:'/orders',
        pageTitle:'My Orders'
    })
}