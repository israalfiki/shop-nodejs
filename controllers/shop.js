const Product = require('../models/product');

const Cart = require('../models/cart')
const User = require('../models/user')
const CartItem = require('../models/cart-item')



exports.getProducts = (req, res, next) => {   
    Product
    .returnProducts()
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
      Product.findById(id)
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
    console.log('were here')
    req.user
    .getCart()
    .then((cart) => {
        return cart.getProducts()
        .then((products)=> {
                res.render('shop/cart', {
                 path:'/cart',
                 pageTitle: 'Cart',
                 products:products
        })

        })
    })
    .catch((err) => console.log(err))  
}

exports.addToCart = (req,res,next)=> {
    const productId = req.body.productId; 
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        let products =cart.getProducts({where:{id:productId}});
       return products
    })
    .then(products=> {
        let product = products[0]
        if(product){
            let newQuantity = product.CartItem.quantity+1
            return fetchedCart.addProduct(product, {
                through: {quantity:newQuantity}
            })
        }
        else{
            let quantity =1
            return Product.findByPk(productId)
            .then(product =>{
                return fetchedCart.addProduct(product, {
                    through : { quantity:quantity}
                })
            })
            .catch(err=>console.log(err))   
        }
    })
    .then(()=>{
        res.redirect('/cart')
    })
    .catch((err) => console.log(err))

}

exports.deleteFromCart= (req,res,next) => {
    const productId = req.body.productId
    req.user.getCart()
    .then(cart =>{
        fetchedCart =cart
        return cart.getProducts({where:{id:productId}})
    })
    .then((product)=>{
        return fetchedCart.removeProduct(product)
    })
    .then(() => {
        console.log('deleted');
        res.redirect('/cart')
    })
    .catch(err=>console.log(err))
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

exports.addOrder = (req,res,next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProducts(products.map(product => {
                product.OrderItem = {quantity:product.CartItem.quantity}
                return product
            }

            ))
        })
        
        .catch(err => console.log(err))
    })
    .then(result=>{
        res.redirect('/orders')
    })
    .catch(err=>console.log(err))
}