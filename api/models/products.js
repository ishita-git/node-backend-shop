const mongooose = require('mongoose')

//how product should look like
const productSchema = mongooose.Schema({
   _id: mongooose.Schema.Types.ObjectId,
   name: String,
   price: Number

})

module.exports = mongooose.model('Product', productSchema)