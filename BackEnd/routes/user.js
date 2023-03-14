const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')




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
                FirstName: user.FirstName
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

router.put("/updateuser/:id", async (req, res) => {

    try {
        id = req.params.id
        newData = req.body
        updated = await User.findByIdAndUpdate({ _id: id }, newData)
        res.send(updated)

    }
    catch (error) {
        res.send(error)

    }
})



module.exports = router