const mongoose = require('mongoose')

mongoose
  .connect(process.env.MDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => {
    console.log('Databse connection error', err)
    process.exit()
  })
