import mongoose from "mongoose";
import 'dotenv/config'

export const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },{
        dbName:"Doctor Application MAnagement System Database"
    })
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

