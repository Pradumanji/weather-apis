const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, res) {
    const query = req.body.cityName;
    console.log(query);
    const apikey = "250937f819ec8b8ac0783dbea887ac6e";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            console.log(temp);
            console.log(desc);
            console.log(icon);
            res.write("<p> The weather is currently " + desc + "</p>");
            res.write("<h1> The tempreture in "+ query +" is " + temp + " degrees Celcius.");
            res.write("<img src = " + imageURL + ">");
            res.send();
        })
    })
   // res.send("Server is up and running.");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})