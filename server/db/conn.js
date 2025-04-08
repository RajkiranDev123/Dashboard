import mongoose from "mongoose";

export function dbConnection() {

    //  mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true,useNewUrlParser: true})
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("Database connected"))
        .catch((err) => console.log("Error from db connection ==>", err))
}



//export const db=()=>{}