import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost/chat-api")
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
