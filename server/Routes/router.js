import express from "express"
// import { Router } from "express"
import {
    userRegister, getAllUsers, getSingleUser, editUser,
    deleteUser, changeStatus, getMetaData, exportCsv
} from "../Controllers/usersControllers.js"
import { upload } from "../multerConfig/storageConfig.js"

const router = new express.Router()
//or const router =new Router()

//userRegister
router.post("/user/register", upload.single("user_profile"), userRegister)

//get all users
router.get("/user/getAllUsers", getAllUsers)

//get a single user
router.get("/user/:id", getSingleUser)

//update a user
router.put("/edit/user/:id", upload.single("user_profile"), editUser)

//delete a user
router.delete("/delete/user/:id", deleteUser)
//update status
router.put("/change/status/:id", changeStatus)
//
router.get("/getMetaData", getMetaData)
//export to csv
router.get("/exportCsv", exportCsv)

export default router