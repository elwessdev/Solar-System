const express = require('express');
const router = express.Router();
const planet = require("../Models/planet");

const isAuth = require('../middleware/passport');

// Add Planet
router.post("/add", async (req,res) => {
    try{
        const {photo,name,distance,masse,description,gallery,videos} = req.body;
        let new_planet = new planet({
            name : name,
            imageUrl : photo,
            distanceFromSun : distance,
            mass : masse,
            description : description,
            gallery : gallery,
            videos : videos
        });
        let result = await new_planet.save();
        res.send({success: "done"});
    } catch(error){
        return res.send({error: error});
    }
});
router.post("/planets", async (req,res) => {
    try{
        let planets = await planet.find();
        res.send({planets: planets});
    } catch(error){
        return res.send({error: error});
    }
});
router.post("/edit", async (req,res) => {
    try{
        const {id,photo,name,distance,masse,description,gallery,videos} = req.body;
        let searchedPlanet = await planet.findById(id);
        searchedPlanet.name = name;
        searchedPlanet.imageUrl = photo;
        searchedPlanet.distanceFromSun = distance;
        searchedPlanet.mass = masse;
        searchedPlanet.description = description;
        searchedPlanet.gallery = gallery;
        searchedPlanet.videos = videos;
        let result = await searchedPlanet.save();
        res.send({success: "done"});
    } catch(error){
        return res.send({error: error});
    }
});
router.delete("/delete/:id", async (req,res) => {
    const {id} = req.params;
    try{
        let result = await planet.findByIdAndDelete(id);
        res.send({success: "done"});
    } catch(error){
        return res.send({error: error});
    }
});

// Comments
router.get("/getComments", async (req,res) => {
    try{
        let planets = await planet.find();
        let comments = [];
        planets.forEach(planet => {
            planet.comments.forEach(comment => {
                comments.push({
                    planetID: planet._id,
                    planetName: planet.name,
                    commentID: comment._id,
                    username: comment.username,
                    content: comment.content,
                    status: comment.status
                });
            });
        });
        res.send({comments: comments});
    } catch(error){
        console.log({error: error});
    }
})
router.get("/getCommentsById", async (req,res) => {
    const { planetID } = req.query;
    try{
        let planets = await planet.findById(planetID);
        res.send({comments: planets.comments});
    } catch(error){
        console.log({error: error});
    }
})
router.post("/addComment", async (req,res) => {
    try{
        const {userID, username, comment, planetID} = req.body;
        let searchedPlanet = await planet.findById(planetID);
        searchedPlanet.comments.push({userId: userID, username: username, content: comment});
        await searchedPlanet.save();
        res.send({success: "done add comment"});
    } catch(error){
        return res.send({error: error});
    }
})
router.post("/commentStatus", async (req,res) => {
    const {planetID,commentID,status} = req.body;
    try{
        let searchedPlanet = await planet.findById(planetID);
        searchedPlanet.comments.id(commentID).status = status;
        await searchedPlanet.save();
        res.send({success: "done status changed comment"});
    } catch(error){
        return res.send({error: error});
    }
})
router.delete('/deleteComment/:planetId/:commentId', async (req, res) => {
    const { planetId, commentId } = req.params;
    try {
        const searchedPlanet = await planet.findById(planetId);
        const commentIndex = searchedPlanet.comments.findIndex(
            (comment) => comment._id.toString() === commentId
        );
        if (commentIndex === -1) {
            return res.status(404).send({ error: "Comment not found" });
        }
        searchedPlanet.comments.splice(commentIndex, 1);
        await searchedPlanet.save();
        res.send({ success: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = router;