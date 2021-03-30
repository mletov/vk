const formData = require("express-form-data");
const multer = require('multer');
const path = require('path');
const os = require("os");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./api/routes/user.js");
const photoRouter = require("./api/routes/photo.js");

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
   
// parse data with connect-multiparty. 
//app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
//app.use(formData.format());
// change the file objects to fs.ReadStream 
//app.use(formData.stream());
// union the body and the files
//app.use(formData.union());

//https://dev.to/zeeshanmehdi/uploading-multiple-files-with-multer-but-from-different-fields-node-js-58d6
//https://www.loginradius.com/blog/async/upload-files-with-node-and-multer/

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

   // res.send(`SUCCESS`);
 
   // console.log(req.body.name);
    //console.log(req.files["image"][0]);
    //console.log(req.files);
    //let fileUp = req.files["image"][0];
    /*
    const userSchema = new mongoose.Schema({
        name: String,
    });
    */
    /*
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, '/upload/photos');
        },
    
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
           
            let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cb(null, Date.now() + ext);
        }
    });
    */
        /*
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

         console.log(req);
        

        if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`SUCCESS`);
      
    });
    */
       /*
        //NOT DELETE! Save to Mongo
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database
    
        var finalImg = {
            contentType: req.file.mimetype,
            image:  new Buffer(encode_image, 'base64')
        };
        db.collection('quotes').insertOne(finalImg, (err, result) => {
                console.log(result)
            
                if (err) return console.log(err)
            
                console.log('saved to database')
                res.redirect('/')        
        });
        */
    
});

app.use("/users", userRouter);
app.use("/photos", photoRouter);


app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

mongoose.connect("mongodb://localhost:27017/VK", { useUnifiedTopology: true, useNewUrlParser: true }, function(err) {
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});