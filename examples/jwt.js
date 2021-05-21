//JWT
//https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

//console.log(require('crypto').randomBytes(64).toString('hex'));

// access config var
process.env.TOKEN_SECRET;

//#region JWT
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// get config vars
dotenv.config();
//console.log("process.env.TOKEN_SECRET,", process.env.TOKEN_SECRET);

function generateAccessToken(username) {
    
   // console.log("TOKEN", process.env.TOKEN_SECRET);

    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

app.post('/api/createNewUser', urlencodedParser, (req, res) => {
   //console.log(req.body.username);
    const token = generateAccessToken({ username: req.body.username });
    res.json(token);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)  
      if (err) return res.sendStatus(403)  
      req.user = user  
      next()
    })
}

app.get('/api/userOrders', authenticateToken, (req, res) => {
    res.send(`SUCCESS`);
});
//#endregion
