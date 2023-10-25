const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB

//this supported in old version
// {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// }