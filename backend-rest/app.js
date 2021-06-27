const express = require('express')
const app = express()
const cors = require('cors');

const errorMiddleware = require('./middlewares/error')

// const { sequelize } = require('./models')

const storeRoute = require('./routes/storeRoute')
const catagoryRoute = require('./routes/categoryRoute')
const menuRoute = require('./routes/menuRoute')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/store", storeRoute);
app.use("/category", catagoryRoute);
app.use("/menu", menuRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "path not found on this server" });
});

app.use(errorMiddleware);

// sequelize.sync({ force: true}).then(() => console.log('DB sync'))

port = 8888
app.listen(port, () => console.log(`server is running on port ${port}`))

module.exports = app