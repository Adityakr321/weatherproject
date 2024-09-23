const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const city = req.body.cityName;
    const appkey = "82e48dc0490885f4d7073d2b57b77fc6";
    const unit = "metric"
    const URL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appkey+"&units="+unit+"" ;
    https.get(URL,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherdata = JSON.parse(data)
        const temp = weatherdata.main.temp;
        const desc = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>The weather is currently"+ desc +"</p>");
        res.write("<h1>The temperature in " +city + " is " + temp + " degree celcius</h1>");
        res.write("<img src="+imageURL+">"); 
        res.send()
    });
  });
});



app.listen(3000,function(){
    console.log("new server 3000 is running");
});