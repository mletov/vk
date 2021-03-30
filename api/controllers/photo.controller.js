const multer = require('multer');
const path = require('path');
const photoModel = require("../../models/photo.model.js");

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload/photos');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

exports.insert = (req, res) => {        

    console.log("EMAIL:", req.email);

    let upload = multer({ storage: storage, fileFilter: fileFilter }).single('image');
    upload(req, res, function(err) {

            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
        
            photoModel.create(req.body)                
                    .then((result) => {
                        res.status(201).send({id: result._id});
                    });
   });
};

exports.getById = (req, res) => {
    photoModel.findById(req.params.id).then((result) => {
        res.status(200).send(result);
    });
};

exports.removeById = (req, res) => {
    photoModel.removeById(req.params.photoId)
              .then((result) => {
                    res.status(204).send({});
              });
};

exports.patchById = (req, res) => {
    photoModel.patchphoto(req.params.id, req.body)
    .then((result) => {
        res.status(201).send({id: result._id});
    });
};

exports.list = (req, res) => {

    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    photoModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    });
    
};