import express from "express"
import {
    getMetaData, getMetaDataAddedUsers, getMetaMonths
} from "../Controllers/metaControllers.js"
const router = new express.Router()
router.get("/getMetaData", getMetaData)
router.get("/getMetaDataAddedUsers", getMetaDataAddedUsers)
router.get("/getMetaMonths", getMetaMonths)


export default router