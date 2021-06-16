const { Store, Catagory } = require('../models')

exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await Catagory.findAll()

    res.status(200).json({ categories })

  } catch (err) {
    next (err)
  }
}

exports.getCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await Catagory.findOne({ where: { id }})

    res.status(200).json({ category })
  } catch (err) {
    next (err)
  }
}

exports.createCategory = async (req, res, next) => {
  try {
    const { name, storeId } = req.body

    const store = await Store.findOne({ where: { id: storeId }})
    if (!store) return res.status(400).json({ message: 'This store is not defined'})
    
    const category = await Catagory.create({
      name,
      storeId
    })

    res.status(201).json({ category })

  } catch (err) {
    next (err)
  }
}

exports.updateCatagory = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, storeId } = req.body

    const store = await Store.findOne({ where: { id: storeId }})
    if (!store) return res.status(400).json({ message: 'This store is not defined'})

    await Catagory.update({
      name,
      storeId
    },
    {
      where: { id }
    })

    res.status(200).json({ message: 'update category data complete' })

  } catch (err) {
    next (err)
  }
}

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params

    const category = await Catagory.findOne({ where: { id } })
    
    if (!category) return res.status(400).json({ message: 'category not found'})

    await category.destroy();

    res.status(204).json();

  } catch (err) {
    next (err)
  }
}