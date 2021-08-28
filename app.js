const path = require('path');

const express= require('express');

const bodyParser= require('body-parser');

const handleError = require('./controllers/404')

const mongoConnect = require('./util/database').mongoConnect
const User = require('./models/user')

const app = express();


app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes= require('./routes/admin')
const userRoutes= require('./routes/shop');


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

// app.use((req, res, next) => {
//   User.findById('6001e602eb91be855317296a')
//   .then(user => {
//     req.user = new User(user.username,user.email, user.cart, user._id)
//   })
//   next()
//   .catch(err => console.log(err))
// });


app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(handleError.loadNotFound);

mongoConnect( () =>{
  console.log('connected to database!')
  app.listen(8000)
} );