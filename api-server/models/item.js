const mongoose =  require( 'mongoose')

const itemSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: [ true, "Item name must be specified"]
    },
    quantity: {
        type: Number, 
        required: true
    },
    price: {
        type: Number, 
        required: [ true, "Price must be specified"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [ true, "Category must be specified"]
    },
    notes:{
        type: String,
    }
},
{
    timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item