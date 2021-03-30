
const multer = require('multer');
const path = require('path');
const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Photo = mongoose.model('Photos', photoSchema);

exports.create = (data) => {
    const photo = new Photo(data);
    return photo.save();
};

exports.findById = (id) => {
    return photo.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

exports.patch = (id, photoData) => {
    return photo.findOneAndUpdate({
        _id: id
    }, photoData);
};

exports.removeById = (photoId) => {
    return new Promise((resolve, reject) => {
        photo.deleteMany({_id: photoId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        photo.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, photos) {
                if (err) {
                    reject(err);
                } else {
                    resolve(photos);
                }
            })
    });
};

exports.Photo = Photo;