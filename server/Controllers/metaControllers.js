
import { users } from "../models/usersSchema.js"


//////////////////////////////////////////////////// meta ////////////////////////////////////////////////////////
export const getMetaData = async (req, res) => {
    try {

        const metaData1 = await users.aggregate(
            [
                {
                    $match: {
                        gender: "Male"
                    }
                },
                {
                    $count: "maleCount"
                }
            ],
        )
        const metaData2 = await users.aggregate(
            [
                {//stage 1
                    $match: {
                        gender: "Female"
                    }
                },
                {//stage 2
                    $count: "femaleCount"
                }
            ],
        )
        const metaData3 = await users.aggregate(
            [
                {//stage 1
                    $match: {
                        status: "Active"
                    }
                },
                {//stage 2
                    $count: "activeCount"
                }
            ],
        )
        const metaData4 = await users.aggregate(
            [
                {
                    $match: {
                        status: "InActive"
                    }
                },
                {
                    $count: "inActiveCount"
                }
            ],
        )
        console.log("mm", metaData4)
        let male = metaData1[0]?.maleCount
        let female = metaData2[0]?.femaleCount
        let active = metaData3[0]?.activeCount
        let inActive = metaData4[0]?.inActiveCount
        res.status(200).json({ male, female, active, inActive })
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error)
    }
}
////////////////////////////////////////////////////// meta no of users added /////////////////////////////////////////////////////////////////

export const getMetaDataAddedUsers = async (req, res) => {
    try {
        // today
        const timeElapsed = Date.now();
        const tdobj = new Date(timeElapsed);
        const tdstr = tdobj.toISOString().split("T")[0];
        console.log(tdstr)

        //yesterday
        let date = new Date();
        date.setDate(date.getDate() - 1)
        var yes = date.toISOString().split("T")[0];

        // first day of the current month
        var d = new Date();
        var fd = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
        const totalDocs = await users.countDocuments()


        const metaDataToday = await users.countDocuments({
            dateCreated: {
                $gte: tdstr + "T00:00:00Z",
                $lt: tdstr + "T23:59:59Z"
            }
        })
        const metaDataYesterday = await users.countDocuments({
            dateCreated: {
                $gte: yes + "T00:00:00Z",
                $lt: yes + "T23:59:59Z"
            }
        })
        const metaDataMonth = await users.countDocuments({
            dateCreated: {
                $gte: fd + "T00:00:00Z",
                $lt: tdstr + "T23:59:59Z"
            }
        })
        res.status(200).json({ metaDataToday: metaDataToday, metaDataYesterday: metaDataYesterday, metaDataMonth: metaDataMonth, totalDocs: totalDocs })
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error)
    }
}