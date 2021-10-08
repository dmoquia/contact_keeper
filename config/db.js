const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  try {
    mongoose.connect(db, { useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  // mongoose
  //   .connect(db, {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false,
  //   })
  //   .then(() => console.log("mongo db connected"))
  //   .catch((err) => {
  //     console.error(err.message);
  //     process.exit(1);
  //   });
};

module.exports = connectDB;
