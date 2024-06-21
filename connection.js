const mongoose = require('mongoose');

async function connectToMongoDB(url) {
  return await mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
}


module.exports = {
    connectToMongoDB,
};