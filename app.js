const path = require('path');

const express= require('express');

const sequelize =require('./util/database')

const Product = require('./models/product')
const User = require('./models/user')

User.hasMany(Product);
Product.belongsTo(User, { constraints:true, onDelete:'CASCADE'});



sequelize
.sync()
.then((result) => {
    console.log(result);
})
.catch((err)=>{
    console.log(err)
})



const bodyParser= require('body-parser');

const handleError = require('./controllers/404')

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes= require('./routes/admin')
const userRoutes= require('./routes/shop')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(handleError.loadNotFound);

app.listen(5000);