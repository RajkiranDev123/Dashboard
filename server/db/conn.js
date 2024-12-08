import mongoose from "mongoose";
export async function dbConnection() {
    console.log("\n\t meta url from conn.js ==>", import.meta.url)

    // return await mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true,useNewUrlParser: true})
    return await mongoose.connect(process.env.DATABASE_URL)

        .then(() => console.log("Database connected"))
        .catch((err) => console.log("Error from db connection ==>", err))
}



