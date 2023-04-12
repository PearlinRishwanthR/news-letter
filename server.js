const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require("axios");
const mailchimp = require('@mailchimp/mailchimp_marketing');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mailchimp.setConfig({
    apiKey: "30b484363a7e47e00a6065cd43aa2721-us11",
    server: "us11"
  });

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const listId = "a63a111163";
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email= req.body.email;

    async function run() {
      try{
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        });
   
        console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id}.`
          );
          res.sendFile(__dirname+"/sucess.html");
        }catch(err){
          res.sendFile(__dirname+"/failure.html");
        }
      }
     
      run();

})

app.post("/failure",(req,res)=>{
  res.redirect("/")
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("App running in port 3000");
})


// api key
// 30b484363a7e47e00a6065cd43aa2721-us11

//list id
//a63a111163