const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')



//res.header("Access-Control-Allow-Origin", "*");
router.post('/Signup', async (req, res) => {
    data = req.body;
    user = new User(data);
    salt = bcrypt.genSaltSync(10);
    console.log(data)
    cryptedPass = await bcrypt.hashSync(data.Password, salt);
    user.Password = cryptedPass;

    user.save()
        .then(
            (saved) => {
                res.status(200).send(saved)
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err)
            }
        )
})

router.post('/Login', async (req, res) => {
    data = req.body;
    user = await User.findOne({ Email: data.Email })
    console.log(user.Password)
    console.log(data.Password)
    if (!user) {
        res.status(404).send('Email or Password invalid :3')

    } else {
        validPass = bcrypt.compareSync(data.Password, user.Password)
        console.log(validPass)
        if (!validPass) {
            res.status(401).send("Password invalid :3")
        }

        else {
            payload = {
                _id: user._id,
                Email: user.Email,
                FirstName: user.FirstName,
                LastName: user.LastName
            }
            token = Jwt.sign(payload, '123456789')
            res.status(200).send({ mytoken: token })


        }
    }


})
router.get("/allusers", async (req, res) => {

    try {
        users = await User.find()
        res.send(users)

    }
    catch (error) {
        res.send(error)

    }
})


router.delete("/deluser/:id", async (req, res) => {

    try {
        id = req.params.id
        deletedUser = await User.findByIdAndDelete({ _id: id })
        res.send(deletedUser)

    }
    catch (error) {
        res.send(error)

    }
})


router.get("/User/:id", async (req, res) => {

    try {
        const id = req.params.id;
        Find = await User.find({ _id: id })
        res.send(Find)

    }
    catch (error) {
        res.send(error)

    }
})
router.put("/updateUser/:id", async (req, res) => {
    const resourceId = req.params.id;
    const updateData = req.body;

    try {
        const existingResource = await User.findById(resourceId);
        if (!existingResource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        // Update other properties
        existingResource.FirstName = updateData.FirstName;
        existingResource.LastName = updateData.LastName;
        existingResource.Email = updateData.Email;
        existingResource.Phone = updateData.Phone;

        // Update the hashed password if a new password was provided
        console.log(updateData.Password)
        if (updateData.Password) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hashSync(updateData.Password, salt);
            existingResource.Password = hashedPassword;
        }
        console.log(existingResource.Password)
        const updatedResource = await existingResource.save();
        res
            .status(200)
            .json({ message: "Resource updated successfully", data: updatedResource });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router