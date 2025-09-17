const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pellakurutharunteja_db_user:cqPMmllQeldvGXHT@mycluster.5j3gnos.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
