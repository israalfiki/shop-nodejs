const Product = require('../models/product');


exports.getProducts = (req, res, next) => { 
    Product
    .findAll()
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
    res.render('add-product', {
        title: 'Add Product', 
        pageTitle: 'Add Product', 
        path: '/add-product'})

}

exports.postAddProduct = (req,res,next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.create({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description
    })
    .then((res) => {
        res.redirect('/admin/products')
    })
    .catch((err)=>{console.log(err)})

}

exports.getEditProduct = (req,res,next) => {
    Product
    .findByPk(req.params.productID)
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
    const id= req.body.productId
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.findByPk(id)
    .then((product => {
        product.title = title,
        product.imageUrl = imageUrl,
        product.price = price,
        product.description= description
        return product.save()
    }))
    .then((result) => {
        console.log(result)
        res.redirect('/admin/products');

    })
    .catch((err) => {console.log(err)})


}

exports.deleteProduct=  (req,res,next) =>{
    const id= req.body.productID;
    Product.findByPk(id)
    .then((product) => {
        product.destroy();
    })
    .then((result)=>{
        console.log('deleted');
        res.redirect('/admin/products');
    })
    .catch((err)=>{console.log(err)})

    
}