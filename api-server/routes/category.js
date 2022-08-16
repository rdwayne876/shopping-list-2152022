const express =  require( 'express')
const { create, find, findOne, update, deleteOne } = require('../controllers/categoryController')
const router = express('router')

router.route('/').post(create)
                .get(find)

router.route('/:id').get(findOne)
                .patch(update)
                .delete(deleteOne)

module.exports = router