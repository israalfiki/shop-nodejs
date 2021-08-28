const getDb= require('../util/database').getDb
const ObjectId = require('mongodb').ObjectID;

const mongodb =require('mongodb')

const path = require('path')
const fs = require('fs')


class Product  {
    constructor (title,price,imageUrl, description){
        this.title = title,
        this.price= price,
        this.imageUrl = imageUrl,
        this.description = description
    }
    save(){

        const db = getDb();
        return db.collection('products').insertOne(this)
        .then(result => {
            console.log(result)
        })
        .catch(err=>console.log(err))

    }
    static returnProducts(){
        const db= getDb()
       return db.collection('products')
        .find()
        .toArray()
        .then(products => {
            return products
        })
        .catch(err=>console.log(err))
    }

    static findById(id){
        const db = getDb()

        return db.collection('products')
        .find({
            _id:new ObjectId(id)
        })
        .toArray()
        .then(products=>{
            return products[0]
        })
        .catch(err=>console.log(err))

    }
    static updateProduct(id,updatedProduct){
        const db = getDb();
        return db.collection('products')
        .updateOne({_id:new ObjectId(id)},{
            $set:updatedProduct
        })
        .then(()=>{
            console.log('updated')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static deleteProduct(id){
        const db = getDb();
        return db.collection('products').deleteOne({
            _id:new ObjectId(id)
        })
        .then(()=> console.log('deleted'))
        .catch(err=>{
            console.log(err)
        })

    }

}
module.exports = Product;