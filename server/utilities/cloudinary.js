import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import "dotenv/config"

cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
})
///////////////////////////////////////// server/uploads/image2536.jpg
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })

        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export const removeFromCloudinary = async (imageName) => {
    const removedResponse = await cloudinary.uploader.destroy(imageName, function (result) { console.log(result) });
    return removedResponse?.result
}