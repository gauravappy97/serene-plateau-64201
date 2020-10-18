const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { static } = require('express');
const { STATUS_CODES } = require('http');

const app = express()
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html')
});

app.post('/',function(req,res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var Email = req.body.email;
    // console.log(firstName, lastName, Email);

    var data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    var option = {
        url: "https://us2.api.mailchimp.com/3.0/lists/bcb16b7360",
        method: "POST",
        headers: {
            "Authorization": "Gaurav c92c6f2777e05471d39a661f6d751820-us2"
        },
        body: jsonData
    };
    
    request(option,function(error,response,body){
        if(error){
            res.sendFile(__dirname+'/failure.html')
        }else{
            if(res.statusCode===200){
                res.sendFile(__dirname+'/success.html')
            }else{
                res.sendFile(__dirname+'/failure.html')
            }
        }
    });
});

app.post("/failure",function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log('server is running on port 3000');
});


//api key: c92c6f2777e05471d39a661f6d751820-us2
//listid : bcb16b7360