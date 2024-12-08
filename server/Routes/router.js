import express, { Router } from "express"
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

router.get("/user/getAllUsers", getAllUsers)

router.get("/user/:id", getSingleUser)

router.put("/edit/user/:id", upload.single("user_profile"), editUser)

router.delete("/delete/user/:id", deleteUser)

router.put("/change/status/:id", changeStatus)

router.get("/getMetaData", getMetaData)

router.get("/exportCsv", exportCsv)








export default router