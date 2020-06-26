const multer = require('multer');
const uuid = require('uuid');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/media/');
    },
    filename: (req, file, callback) => {

        let originalName = file.originalname;
        let ext = path.extname(originalName);
        let newFileName = `${originalName}-${uuid.v4()}${ext}`;

        exports.filename = {newFileName};

        callback(null, newFileName);
    }
});

let upload = multer({storage});

exports.uploadImage = upload.single('file');