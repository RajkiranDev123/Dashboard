import express from "express"
// import { Router } from "express"
import {
    userRegister, getAllUsers, getSingleUser, editUser,
    deleteUser, changeStatus, exportCsv
} from "../Controllers/usersControllers.js"
import { upload } from "../multerConfig/storageConfig.js"

const router = new express.Router()
//or const router =new Router()

//userRegister
router.post("/register", upload.single("user_profile"), userRegister)

//get all users
router.get("/getAllUsers", getAllUsers)

//get a single user
router.get("/getSingleUser/:id", getSingleUser)

//update a user
router.put("/editUser/:id", upload.single("user_profile"), editUser)

//delete a user
router.delete("/deleteUser/:id", deleteUser)
//update status
router.put("/changeStatus/:id", changeStatus)

//export to csv
router.get("/exportCsv", exportCsv)


export default router