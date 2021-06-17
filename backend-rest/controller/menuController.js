const { Catagory, Menu } = require('../models')

exports.getAllMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findAll()

    res.status(200).json({ menu })

  } catch (err) {
    next (err)
  }
}

exports.getMenu = async (req, res, next) => {
  try {
    const { id } = req.params
    const menu = await Menu.findOne({ where: { id }})

    res.status(200).json({ menu })
  } catch (err) {
    next (err)
  }
}

exports.createMenu = async (req, res, next) => {
  try {
    const { name, price, catagoryId } = req.body

    const category = await Catagory.findOne({ where: { id: catagoryId }})
    if (!category) return res.status(400).json({ message: 'This category is not defined'})
    
    const menu = await Menu.create({
      name,
      price,
      catagoryId
    })

    res.status(201).json({ menu })

  } catch (err) {
    next (err)
  }
}

exports.updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, price, catagoryId } = req.body

    if (catagoryId) {
      const category = await Catagory.findOne({ where: { id: catagoryId }})
      if (!category) return res.status(400).json({ message: 'This category is not defined'})
    }

    await Menu.update({
      name,
      price,
      catagoryId
    },
    {
      where: { id }
    }
    )

    res.status(200).json({ message: 'update menu data complete' })

  } catch (err) {
    next (err)
  }
}

exports.deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params

    const menu = await Menu.findOne({ where: { id } })

    if (!menu) return res.status(400).json({ message: 'menu not found'})

    await menu.destroy();

    res.status(204).json();

  } catch (err) {
    next (err)
  }
}