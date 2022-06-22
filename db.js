import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://alberto_bautista:AlbertoBautista@cluster0.yxfz9mz.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err.message);
  });
