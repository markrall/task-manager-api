import mongoose from 'mongoose'

mongoose
  .connect(<string>process.env.MDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected')
  })
  .catch((err: any) => {
    console.log('Databse connection error', err)
    process.exit()
  })
