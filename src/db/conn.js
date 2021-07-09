import mongoose from "mongoose";

const ConnectMongo = async () => {
  const Connection = await mongoose.connect(
    "mongodb+srv://parth:mongodb@1499@cluster0.flhkg.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  if (!Connection) {
    console.log("unable to connect database !");
  } else {
    console.log("Connected to MongoDB Cloud Successfully !");
  }
};

export { ConnectMongo };
