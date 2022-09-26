const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    try {
        const {firstNumber, secondNumber} = req.body
        res.status(200)
        res.send({sum: firstNumber + secondNumber, message: 'Sukses'})
    } catch (e) {
        res.status(400)
        res.send({message: e.message})
    }
});

module.exports = router;