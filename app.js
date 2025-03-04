const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

   const url = "https://us8.api.mailchimp.com/3.0/lists/a6b951006d";
   const options = {
     method: "POST",
     auth : "Parakrama1:1b02db2cfef48e0e30f72ce3cc1f6c4e-us8"
   }
  const jsonData = JSON.stringify(data);
  const request = https.request(url,options,function(response){
    if(response.statusCode ===200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});


app.post("/success",function(req, res){
  res.redirect("/");
})

app.post("/failure",function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
