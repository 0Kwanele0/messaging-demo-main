const express = require("express");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

function generateToken(data, res) {
  jwt.sign({ userId: data._id }, process.env.SECRETE_KEY, (err, token) => {
    if (token) {
      res.send({
        token,
        user: { id: data._id, name: data.fullname },
      });
    } else {
      res.send({ error: "Failed to generate token" });
    }
  });
}

userRoute.post("/login", async (req, res) => {
  UserModel.find({ username: req.body.username })
    .then((data) => {
      if (data[0]) {
        const mydata = data[0];
        bcrypt.compare(req.body.password, mydata.password, (err, results) => {
          if (results) {
            generateToken(mydata, res);
          } else {
            res.status(404).send({ error: "Wrong password" });
          }
        });
      } else {
        throw "User doent exist";
      }
    })
    .catch((err) => {
      res.status(404).send({ error: err });
    });
});

userRoute.post("/register", async (req, res) => {
  const exist = await UserModel.find({ username: req.body.username });
  if (exist.length < 1) {
    try {
      bcrypt.genSalt(10, (err, salt) => {
        if (salt){

          bcrypt.hash(req.body.password, salt, (err, hash) => {
            const data = {
              fullname: req.body.fullname,
              username: req.body.username,
              password: hash,
            };
            const user = new UserModel(data);
            user.save().then((results) => {
              generateToken(results, res);
            });
          });
        }else{
          throw "Salt not generated"
        }
      });
    } catch (err) {
      res.send("user not created", err);
    }
  } else {
    res.send("Username already exist");
  }
});


userRoute.get("/", async(req, res)=>{
  try{
    await UserModel.find().then(user=>{
      res.send(user)
    })
  }catch(err){
    res.status(404).send("no users")
  }
})


userRoute.get("/:id", async(req, res)=>{
  try{
    const theUser = await UserModel.find({_id: req.params.id})
    if (theUser){
      res.send(theUser[0])
    }else{
      throw new Error("user not found")
    }
  }catch(error){
    res.status(404).send("User not found!")
  }
})

userRoute.delete("/:id", async(req, res)=>{
  try{
    const theUser = await UserModel.findByIdAndDelete({_id: req.params.id})
    if(theUser){
      res.send("User Deleted")
    }else{
      throw new Error("Unable to delete user!")
    }
  }catch(error){
    res.status(400).send(error.message)
  }
})

userRoute.put("/:id", async(req, res)=>{
  UserModel.findByIdAndUpdate(
    {_id: req.params.id},
    {
      fullname: req.body.fullname, 
      bio: req.body.bio
    }
    ).then(user =>{
      if (!user){
        res.status(404).json({msg: "user not found"})
      }else{
        res.send("User edited!")
      }
    })
    
})

module.exports = userRoute;
