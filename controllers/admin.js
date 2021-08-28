const Product = require('../models/product');


exports.getProducts = (req, res, next) => { 
    Product
    .returnProducts()
    .then(products=>{
            res.render('admin/products', {
            products: products,
            path:'/admin/products', 
            pageTitle: 'Shop'});
    })
    .catch((err)=> {
        console.log(err)
    }) 
}
    


exports.getAddProduct = (req, res,next) => { 
    // res.sendFile(path.join(rootDir,'views','add-product.html')); 
    res.render('admin/add-product', {
        title: 'Add Product', 
        pageTitle: 'Add Product', 
        path: '/add-product'})

}

exports.postAddProduct = (req,res,next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title,price,imageUrl,description);
    product.save()
    .then(result => {
        res.redirect('/admin/products')

    })
    .catch((err)=>{console.log(err)})

}

exports.getEditProduct = (req,res,next) => {
    Product
    .findById(req.params.productID)
    .then(product => {
            res.render('admin/edit-product', {
                product: product,
                pageTitle: 'Edit Product',
                path :'/edit-product'
            })
    })
    .catch((err) => {
        console.log(err)
    })

}

exports.updateProduct = (req,res,next) => {
    const id= req.body.productID;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const updatedProduct = {
        title:title,
        imageUrl:imageUrl,
        price:price,
        description:description
    }

    Product.updateProduct(id,updatedProduct)
    .then((result) => {
        res.redirect('/admin/products')
    })
    .catch(err=>console.log(err));


}

exports.deleteProduct=  (req,res,next) =>{
    const id= req.body.productID;
    Product.deleteProduct(id)
    .then(() => {
        res.redirect('/admin/products')
    })
    .catch(err=>console.log(err));

    

    
}