const express = require("express");
const Note = require("../models/Notes");
const feedRoutes = express.Router();

feedRoutes.post("/notes", async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
      authorName: req.body.authorName,
    };

    const newNote = new Note(data);
    newNote.save().then((data) => {
      res.send(data);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

feedRoutes.get("/", async(req, res)=>{
  try{
    Note.find().then(notes=>res.send(notes))
  }catch(err){
    res.status(404).send("Unable to retreve data")
  }
})

feedRoutes.get("/:id", async (req, res)=>{
  Note.find({userId: req.params.id}).then(data=>{res.send(data)}).catch(err=>res.status(404).send({message: "Data not found"}))
})
feedRoutes.delete("/:id", async (req, res)=>{
  Note.findOneAndDelete({_id: req.params.id}).then(data=>{res.send(data)}).catch(err=>res.status(404).send({message: "Data not found"}))
})

module.exports = feedRoutes;
