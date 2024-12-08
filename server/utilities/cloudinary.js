import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import "dotenv/config"

cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
})

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("localFilePath from cloudinary", localFilePath)
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })

        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}