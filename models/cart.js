const fs = require('fs');

const path =require('path');

const Product =require('./product')

const p = path.join(path.dirname(require.main.filename), 
            'data', 
            'cart.json');

module.exports = class Cart {
    static getCartProducts =(cb) =>{
        fs.readFile(p, (err, fileContent)=> {
            if(err){
                return cb([]);
            }
            else{
                Product.returnProducts((prods) => {
                const productsData = []

                const cartProducts = JSON.parse(fileContent).products;
                
                prods.forEach(prod => {
                    cartProducts.forEach(p=>{
                        if(prod.id === p.productID){
                            productsData.push({
                                productData:prod,
                                qty:p.quantity
                            })
                        }
                    })
                    
                    
                   
                })
                return cb(productsData);


                })


            }
        })

    }
   
    static addProduct (id){
        const product = Product.findByID(id, (product) => {
            fs.readFile(p, (err, fileContent) => {
                
                let cart = {
                    products : [

                    ], 
                    totalPrice   :0     

                    }
                if(!err){
                    cart = JSON.parse(fileContent);
                    }

                let existingProductIndex = cart.products.findIndex(prod =>prod.productID===id );
                let existingProduct = cart.products[existingProductIndex];
                if(existingProduct){
                    let newProduct = {...existingProduct}
                    newProduct.quantity =newProduct.quantity +1;
                    cart.products[existingProductIndex] = newProduct                   
                }
                else{
                   
                    cart.products.push({
                        productID: product.id,
                        quantity:1
                    })
                        
                }
                cart.totalPrice += +product.price;  
        
                fs.writeFile(p, JSON.stringify(cart), (err)=>{
                    console.log(err)

                })
    
            })

        });

    }

    static deleteProduct = (id, price) => {
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return ;
            }

            let cart = JSON.parse(fileContent);
            console.log(id)
            console.log(cart.products.find(prod => prod.productID===id))
            const qty= cart.products.find(prod => prod.productID===id).quantity;
            const updatedProducts =cart.products.filter(prods => prods.productID !== id);
            const updatedTotalPrice = cart.totalPrice - (price*qty)

            cart = {
                products: updatedProducts,
                totalPrice:updatedTotalPrice
            }


            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })


        })

    }
}