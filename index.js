const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRouter = require("./api/routes/user.js");
const photoRouter = require("./api/routes/photo.js");

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