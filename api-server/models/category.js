const mongoose =  require( 'mongoose')

const categorySchema =  new mongoose.Schema({
    name:{
        type: String,
        required: [ true, "Category name must be specified"]
    },
    description:{
        type: String,
    }, 
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
},
{
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category