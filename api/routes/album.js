const express = require("express");
 
const app = express();

app.get("/albums", function(request, response){     
    response.send("<h1>О сайте</h1>");
});

app.post("/albums", function(request, response){     
    response.send("<h1>О сайте</h1>");
});

app.get("/albums/:id", function(request, response){     
    response.send("<h1>О сайте</h1>");
});

app.put("/albums/:id", function(request, response){     
    response.send("<h1>О сайте</h1>");
});

app.delete("/albums/:id", function(request, response){     
    response.send("<h1>О сайте</h1>");
});