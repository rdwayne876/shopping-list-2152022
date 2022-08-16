const Category = require( '../models/category')

exports.create = async( req, res) => {
    try{
        //get category data from deconstructor
        const { name, description} = req.body

        //create the category
        const category = await Category.create({
            name,
            description
        })

        //return response
        res.status( 201).json({
            success: true,
            message: 'Category added successfully',
            data: {
                category
            }
        })
    } catch( err){
        console.error( err);
    }
}

exports.find = async( req, res) => {
    try {
        //get all categorys
        const categorys = await Category.find().populate( 'items')

        // return all categorys
        res.status( 200).json({
            success: true,
            message: 'Categorys found',
            data: {
                categorys
            }
        })
    } catch ( err) {
        console.error( err)
    }
}

exports.findOne = async( req, res) => {
    try {
        //use param id to find category
        const category = await Category.findById(req.params.id).populate( 'items')

        //check if category exists
        if( !category){
            res.status( 404).json({
                success: false,
                message: 'Category not found'
            })
        }

        //return the category
        res.status( 200).json({
            success: true, 
            message: 'Category found',
            data: {
                category
            }
        })
    } catch ( err) {
        console.error( err);
    }
}

exports.update = async( req, res) => {
    try{
        // update category, finding category by id
        const category = await Category.findByIdAndUpdate( req.params.id, req.body)

        //check if category was found
        if( !category){
            res.status( 404).json({
                success: false,
                message: 'Category not found'
            })
        }

        //return the updated category
        res.status( 200).json({
            success: true,
            message: 'Category updated successfully',
            data: {
                category
            }
        })
    } catch( err){
        console.error( err);
    }
}

exports.deleteOne = async( req, res) => {
    try {
        //find and delete category
        const category = await Category.findByIdAndDelete({
            _id: req.params.id
        })

        //check if category was found
        if( !category){
            res.status( 404).json({
                success: false,
                message: 'Category not found'
            })
        }

        //return success
        res.status( 200).json({
            success: true,
            message: 'Category deleted successfully',
            data: {
                category
            }
        })
    } catch ( err) {
        console.error( err);
    }
}