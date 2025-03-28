
import { users } from "../models/usersSchema.js"
import { getMonthDateRanges } from "../utilities/monthsMeta.js"

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

//////////////////////////////

export const getMetaMonths = async (req, res) => {
    try {

        const jan = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().January.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().January.lastDay + "T23:59:59Z"
            }
        })

        const feb = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().February.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().February.lastDay + "T23:59:59Z"
            }
        })
        const mar = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().March.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().March.lastDay + "T23:59:59Z"
            }
        })

        const apr = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().April.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().April.lastDay + "T23:59:59Z"
            }
        })

        const may = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().May.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().May.lastDay + "T23:59:59Z"
            }
        })

        const june = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().June.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().June.lastDay + "T23:59:59Z"
            }
        })

        const july = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().July.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().July.lastDay + "T23:59:59Z"
            }
        })

        const august = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().August.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().August.lastDay + "T23:59:59Z"
            }
        })

        const sep = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().September.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().September.lastDay + "T23:59:59Z"
            }
        })

        const oct = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().October.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().October.lastDay + "T23:59:59Z"
            }
        })

        const nov = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().November.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().November.lastDay + "T23:59:59Z"
            }
        })

        const dec = await users.countDocuments({
            dateCreated: {
                $gte: getMonthDateRanges().December.firstDay + "T00:00:00Z",
                $lt: getMonthDateRanges().December.lastDay + "T23:59:59Z"
            }
        })

        res.status(200).json({
            metaMonths: {
                january: jan, february: feb, march: mar,
                april: apr, may: may, june: june, july: july, august: august, september: sep,
                october: oct, november: nov, december: dec

            }
        })
    } catch (error) {

        res.status(500).json(error)
    }
}