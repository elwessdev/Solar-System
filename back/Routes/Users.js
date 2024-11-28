const express = require('express');
const router = express.Router();
const users = require("../Models/users");

// Get users
router.get('/allUsers', async(req,res) => {
    try{
        const user = await users.find();
        res.send({users: user});
    } catch(error){
        return res.send({error: error});
    }
})
router.post('/userStatus', async(req,res) => {
    const {id,status} = req.body;
    try{
        const user = await users.findById(id);
        user.status = status;
        await user.save();
        res.send({success: "done"});
    } catch(error){
        return res.send({error: error});
    }
})
router.delete('/deleteUser/:id', async(req,res) => {
    const userId = req.params.id;
    try{
        const deletedUser = await users.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send({ success: "User deleted successfully" });
    } catch(error){
        return res.send({error: error});
    }
})


module.exports = router;