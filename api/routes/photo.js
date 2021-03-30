const formData = require("express-form-data");
const multer = require('multer');
const path = require('path');
const os = require("os");
const express = require("express");
const mongoose = require("mongoose");
const photoController = require("../controllers/photo.controller.js");
const photoRouter = express.Router();

const app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
   
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());
  


photoRouter.get("/", [photoController.list]);
photoRouter.post("/", urlencodedParser, [photoController.insert]);
photoRouter.get("/:id", [photoController.getById]);
photoRouter.patch("/:id", urlencodedParser, [photoController.patchById]);
photoRouter.delete("/:id", [photoController.removeById]);

module.exports = photoRouter;