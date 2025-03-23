import multer from "multer"

//Multer adds a file object to the request object. (req.file.filename)
const storage = multer.diskStorage(
    {
        destination: (req, file, callback) => {
            callback(null, "./uploads")
        },
        // add filename property to req.file object ==> req.file={filename:"M.jpg"}
        filename: (req, file, callback) => {
            console.log("file from multer==>",file)
            //Date. now() returns the number of milliseconds since January 1, 1970.
            const noOfMilliseconds = Date.now();
            const time = new Date(noOfMilliseconds).toString().split(" ").join("-").split("-")[4].split(":").join("")
            const todayDate = new Date(noOfMilliseconds).toString().split(" ").join("-").slice(0, 16)
            const merge = todayDate + time
            const filename = `img-${merge}_${file.originalname}`
            callback(null, filename)
        },
    }
)

//filter
const filefilter = (req, file, callback) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new Error("not supported"))
    }
}

export const upload = multer({ storage: storage, fileFilter: filefilter })
// Multer comes in handy when forms contain multipart data that includes files,
//which the body-parser library cannot handle.