const express = require('express')
const router = express.Router()
const categoryController = require('../controller/categoryController')

router.get('/',
categoryController.getAllCategory
)

router.get('/:id',
categoryController.getCategory
)

router.post('/',
categoryController.createCategory
)

router.put('/:id',
categoryController.updateCatagory
)

router.delete('/:id',
categoryController.deleteCategory
)

module.exports = router