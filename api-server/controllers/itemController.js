const Item = require( '../models/item')
const Category = require( '../models/category')

exports.create = async( req, res) => {
    try{
        //get item data from deconstructor
        const { name, quantity, price, category, notes} = req.body

        //create the item
        const item = await Item.create({
            name,
            quantity,
            price,
            category,
            notes
        })

        const itemCategory =  await Category.findById( category)

        itemCategory['items'].push(item._id)

        itemCategory.save()

        //return response
        res.status( 201).json({
            success: true,
            message: 'Item added successfully',
            data: {
                item
            }
        })
    } catch( err){
        console.error( err);
    }
}

exports.find = async( req, res) => {
    try {
        //get all items
        const items = await Item.find().populate( 'category', '-items')

        // return all items
        res.status( 200).json({
            success: true,
            message: 'Items found',
            data: {
                items
            }
        })
    } catch ( err) {
        console.error( err)
    }
}

exports.findOne = async( req, res) => {
    try {
        //use param id to find item
        const item = await Item.findById(req.params.id).populate( 'category', '-items')

        //check if item exists
        if( !item){
            res.status( 404).json({
                success: false,
                message: 'Item not found'
            })
        }

        //return the item
        res.status( 200).json({
            success: true, 
            message: 'Item found',
            data: {
                item
            }
        })
    } catch ( err) {
        console.error( err);
    }
}

exports.update = async( req, res) => {
    try{
        // update item, finding item by id
        const item = await Item.findByIdAndUpdate( req.params.id, req.body)

        //check if item was found
        if( !item){
            res.status( 404).json({
                success: false,
                message: 'Item not found'
            })
        }

        //return the updated item
        res.status( 200).json({
            success: true,
            message: 'Item updated successfully',
            data: {
                item
            }
        })
    } catch( err){
        console.error( err);
    }
}

exports.deleteOne = async( req, res) => {
    try {
        //find and delete item
        const item = await Item.findByIdAndDelete({
            _id: req.params.id
        })

        //check if item was found
        if( !item){
            res.status( 404).json({
                success: false,
                message: 'Item not found'
            })
        }

        //return success
        res.status( 200).json({
            success: true,
            message: 'Item deleted successfully',
            data: {
                item
            }
        })
    } catch ( err) {
        console.error( err);
    }
}