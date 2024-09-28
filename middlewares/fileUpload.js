import multer from "multer";
// configuring multer for file upload
const storage = multer.diskStorage({
    destination : (req, file, next) => {
        next(null, './uploads/'); //path w.r.t index.js
    },
    filename : (req, file, next) => {
        next(null, file.originalname);
    }
});

export const uploadFile = multer({
    storage: storage
})