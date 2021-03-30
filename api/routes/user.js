const mongoose = require("mongoose");
const userController = require("../controllers/user.controller.js");
const app = require("express");
const userRouter = app.Router();


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//const jsonParser = express.json();

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

/*
userRouter.post("/", urlencodedParser, (req, res) => {
    console.log(req.body.email);
    res.status(200).send("111");
});
*/

userRouter.get("/", [userController.list]);
userRouter.post("/", urlencodedParser, [userController.insert]);
userRouter.get("/:id", [userController.getById]);
userRouter.patch("/:id", urlencodedParser, [userController.patchById]);
userRouter.delete("/:id", [userController.removeById]);


module.exports = userRouter;
