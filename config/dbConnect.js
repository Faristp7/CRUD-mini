import mongoose from "mongoose";

function connectDB() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect("mongodb://127.0.0.1:27017/crud")
    .then((result) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("data base error \n" + err);
    });
}

export default connectDB;
