const express = require('express')
const router = express.Router();
const { SMTPClient } = require('emailjs')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const User = require('../models/User')
const smtp = {
    host: "smtp.gmail.com",
    port: 465,
    user: "sbssmartbusinesssolution@gmail.com",
    password: "glwgelcqruwdctzr",
    ssl: true,
    tls: false,
}
const client = new SMTPClient(smtp);


async function SendMail(content, email, { text = "", subject = "" }) {
    return new Promise((resolve, reject) => {
        try {
            const message = {
                text: content,
                from: smtp.user,
                to: email,
                subject: subject || "No Subject",
                // attachment: { data: content, alternative: true },
            };

            client.send(message, (error, msg) => {
                if (error) {
                    console.log(message);
                    reject(error);
                    return
                }
                resolve(msg);

            });
            if (process.env.DEV_MODE) this.SaveMail(message);
        } catch (error) {
            reject(error);
        }
    });
}

router.put("/updatePassword/:email", async (req, res) => {
    const ResourceEmail = req.params.email;
  

    try {
        const existingResource = await User.findOne({ Email :ResourceEmail});
        if (!existingResource) {
            return res.status(404).json({ message: "Resource not found" });
        }

      console.log(existingResource)
     console.log(existingResource.Password)

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync("vmcekqfzhhlbudza", salt);
        existingResource.Password = hashedPassword;
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

router.post('/Send', async (req, res) => {
    try {
        const body = req.body
        const existingResource = await User.findOne({ Email :body.Email});
        if (!existingResource) {
            return res.status(404).json({ message: "Resource not found" });
        }
       
        const message = ` Hello ${existingResource.FirstName} Did you forget your password? Here is your new Password : vmcekqfzhhlbudza  `;
        await SendMail(message, body.Email, { subject: body.subject })
        return res.send({ msg: "ok" });
    } catch (error) {

        return res.status(400).send({ error: (error).message || error });
    }
});

module.exports = router