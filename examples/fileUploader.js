//File upload
//https://dev.to/zeeshanmehdi/uploading-multiple-files-with-multer-but-from-different-fields-node-js-58d6
//https://www.loginradius.com/blog/async/upload-files-with-node-and-multer/


// parse data with connect-multiparty. 
//app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
//app.use(formData.format());
// change the file objects to fs.ReadStream 
//app.use(formData.stream());
// union the body and the files
//app.use(formData.union());

const formData = require("express-form-data");
const multer = require('multer');
const path = require('path');
const os = require("os");

const express = require("express");
const app = express();

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload/photos")
    },
    filename: (req, file, cb) => {
        console.log(file);
      cb(null, Date.now() + "-" + file.originalname)
    },
});

let uploadStorage = multer({ storage: storage });

app.post("/upload", uploadStorage.array("image", 10), (req, res) => {

    console.log(req.files);
    console.log(req.body.name);
    res.send(`SUCCESS`);
});