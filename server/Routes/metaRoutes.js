import express from "express"
import {
    getMetaData, getMetaDataAddedUsers
} from "../Controllers/metaControllers.js"
const router = new express.Router()
router.get("/getMetaData", getMetaData)
router.get("/getMetaDataAddedUsers", getMetaDataAddedUsers)

export default router