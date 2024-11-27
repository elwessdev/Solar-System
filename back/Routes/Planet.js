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
router.post("/delete", async (req,res) => {
    try{
        const {id} = req.body;
        let result = await planet.findByIdAndDelete(id);
        res.send({success: "done"});
    } catch(error){
        return res.send({error: error});
    }
});

module.exports = router;