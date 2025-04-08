import moment from "moment" //A JavaScript date library/package for formatting dates.
import { users } from "../models/usersSchema.js"
import csv from "fast-csv"
import fs from "fs"
import { uploadOnCloudinary, removeFromCloudinary } from "../utilities/cloudinary.js"

//////////////////////////////////////////////// add new user ///////////////////////////////////////////////////////////////
export const userRegister = async (req, res) => {
    const file = req?.file?.filename
    const { fname, lname, email, mobile, gender, location, status } = req.body
    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !file) {
        return res.status(400).json("All fields are required!")
    }
    try {
        let user = await users.findOne({ email: email })

        if (user) {
            return res.status(400).json({ message: "user email already exists!" })
        } else {
            const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            console.log("date created ==>", dateCreated)// is of string type
            const uploadImage = await uploadOnCloudinary(process.cwd() + "/uploads/" + file)
            //////////////////////////////////////////// server/uploads/image2536.jpg
            if (!uploadImage) {
                return res.status(500).json({ message: "profile image not uploaded! plz try again!" })
            }
            const userData = new users({
                fname, lname, email, mobile, gender, location, status, profile: uploadImage?.url || "", dateCreated
            })
            // before saving validation of schema happens, if error occurs it will be passed to the catch block
            await userData.save()
            return res.status(201).json(userData)
        }
    } catch (error) {
        // console.log(error.message)
        return res.status(500).json(error.message)
    }
}
///////////////////////////////////////////////////////getAllUsers//////////////////////////////////////////////////////////////////////////
export const getAllUsers = async (req, res) => {
    const search = req.query.search || ""
    const gender = req.query.gender //default is All
    const status = req.query.status //default is all
    const sort = req.query.sort      // default is new

    const dateRange = req.headers["date-range"]
    console.log("dr==>", dateRange)//2025-03-05--2025-03-05
    let start = dateRange?.split("--")[0] + "T00:00:00Z"
    let end = dateRange?.split("--")[1] + "T23:59:59Z"

    const page = req.query.page || 1
    const ITEM_PER_PAGE = 4

    const query = { fname: { $regex: search, $options: "i" } }
    if (gender !== "All") {
        query.gender = gender
    }
    if (status !== "All") {
        query.status = status
    }
    if (dateRange !== "") {
        query.dateCreated = { $gte: start, $lte: end }
    }
    try {
        const totalDocs = await users.countDocuments(query)
        const skip = (page - 1) * ITEM_PER_PAGE
        const pageCount = Math.ceil(totalDocs / ITEM_PER_PAGE)//pageCount is total pages 8/4=2 pages
        const usersData = await users.find(query).skip(skip).limit(ITEM_PER_PAGE).sort({ dateCreated: sort == "new" ? -1 : 1 })

        return res.status(200).json({
            pagination: {
                pageCount
            },
            usersData
        })
    } catch (error) {
        // console.log(error.message)
        return res.status(500).json(error)
    }
}
////////////////////////////////////////////////////// getSingleUser//////////////////////////////////////////////////////////////////
export const getSingleUser = async (req, res) => {
    const { id } = req.params

    try {
        const usersData = await users.findOne({ _id: id })
        res.status(200).json(usersData)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

///////////////////////////////edit and update user ////////////////////////////////////////////////////////////////////////////////////////
export const editUser = async (req, res) => {
    const { id } = req.params
    const imgName = req.headers["img-name"]?.split(",")[7]?.split(".")[0]

    const { fname, lname, email, mobile, gender, location, status, user_profile } = req.body
    const filename = req.file ? req.file.filename : user_profile

    const dateUpdated = moment(new Date()).format("YY-MM-DD hh:mm:ss")
    try {
        let uploadImage
        if (filename.startsWith('img')) {
            // console.log(true)
            uploadImage = await uploadOnCloudinary(process.cwd() + "/uploads/" + filename)
            if (!uploadImage) {
                return res.status(500).json({ message: "profile image not uploaded! plz try again!" })
            }

            const removeImage = await removeFromCloudinary(imgName)

            console.log("removed image==>", removeImage)
        } else {
            console.log(false)
        }
        const updateUser = await users.findByIdAndUpdate(
            { _id: id },
            { fname, lname, email, mobile, gender, location, status, profile: uploadImage?.url || filename, dateUpdated },
            { new: true }
        )
        await updateUser.save()
        return res.status(200).json(updateUser)

    } catch (error) {
        console.log("rt", error.message)
        return res.status(500).json(error.message)
    }
}

///////////////////////////////////////// delete user /////////////////////////////////////////////////////

export const deleteUser = async (req, res) => {
    const { id } = req.params
    // console.log(id)
    try {
        const deletedData = await users.findByIdAndDelete({ _id: id })
        res.status(200).json(deletedData)

    } catch (error) {
        res.status(500).json(error)
    }
}

////////////////////////////////////////////////// update status////////////////////////////
export const changeStatus = async (req, res) => {
    const { id } = req.params
    const { data } = req.body
    try {
        const changedStatus = await users.findByIdAndUpdate({ _id: id }, { status: data }, { new: true })
        res.status(200).json(changedStatus)
    } catch (error) {
        res.status(500).json(error)
    }
}
/////////////////////////////////////////////////// export to csv ///////////////////////////////////
export const exportCsv = async (req, res) => {
    try {
        const usersData = await users.find()
        const csvStream = csv.format({ headers: true })
        if (!fs.existsSync("csv")) {
            fs.mkdirSync("csv")
            if (fs.existsSync("csv")) {
                fs.mkdirSync("csv/files")
            }
        }
        const writableStream = fs.createWriteStream(
            "csv/files/users.csv"
        )
        csvStream.pipe(writableStream)
        writableStream.on("finish", () => {
            res.status(200).json({ downloadUrl: `${process.env.b_url}/csv/files/users.csv` })
        })
        if (usersData.length > 0) {
            usersData.map(e => {
                csvStream.write({
                    Firstname: e.fname ? e.fname : "-",
                    Lastname: e.lname ? e.lname : "-",
                    Mobile: e.mobile ? e.mobile : "-",
                })
            })
        }
        csvStream.end()
        writableStream.end()
    } catch (error) {
        // console.log(error)
        res.status(500).json(error.message)
    }
}

