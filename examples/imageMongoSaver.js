const mongoose = require("mongoose");
     
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