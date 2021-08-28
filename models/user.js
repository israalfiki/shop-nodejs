const getDb = require('../util/database').getDb 
const ObjectId = require('mongodb').ObjectId

class User  {
    constructor(username,email,cart){
        this.username = username,
        this.email = email,
        this.cart = cart, 
        this._id = id
    }
    save(){
        const db = getDb()

        return db.collection('users').insertOne(this)
        .then(result=>{
            console.log(result)
        })
        .catch(err=>console.log(err))
    }

    static findById(id){
        const db = getDb();
        return db.collection('users').
        find({
            _id:new ObjectId(id)
        })
        .toArray()
        .then(users=>{
            return users[0]
        })
        .catch(err=>console.log(err))

    }

    static getProducts(){
        
    }

 

}

module.exports = User;