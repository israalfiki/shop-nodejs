const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri ='mongodb+srv://itsisra:itsisra@cluster0.vq0vi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
let _db;


const mongoConnect = callback => {
  MongoClient.connect(uri
    ,{
      useUnifiedTopology:true, useNewUrlParser:true
    }
  )
    .then(client => {
      callback();
      return _db = client.db();

    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb =  function() {
  if (_db) {
     return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
