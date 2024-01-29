import multer from "multer";
import { v4 } from "uuid";

const upload = multer({
    storage: multer.diskStorage({
        destination: "product-data/images",
        filename: function (req, file, cb) {
            cb(null, v4() + '-' + file.originalname);
        }
    })
});

const cMM = upload.single("image");

export default cMM;