const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require('cors')
app.use(cors())
// const bcrypt = require("bcryptjs");



const mongoUrl="mongodb+srv://edoz-waitlist:edozie1993@cluster0.kwpqmac.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{console.log('connected to database');
})
.catch(e=>console.log(e))


app.listen(5000, () => {
    console.log('server started');
});

app.post("/post", async (req, res) => {
    console.log(req.body);
    const { data } = req.body;

    try {
        if (data === "waitlist") {
            res.send({ status: "ok"});
        } else {
            res.send({ status: "User Not Found" });
        }
    } catch (error) {
        res.send({ status: "Something went wrong try again" });
    }
});

app.get("/users", async (req, res) => {
    let results;
    try {
       results = await User.find();
     } catch (e) {
       res.send({ message: "Error in Fetching User" });
     }
     res.json({User: results.map(result => result.toObject({getters: true}) )});
   });


require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        const oldUser = await User.findOne({email});

        if(oldUser){
            return res.send({error: "User already exists"});
        }
        await User.create({
            firstName: firstName,
            lastName:lastName,
            email,
        });
        res.send({status:"OK"})
    } catch (error) {
        res.send({status: "error"})
    }
});