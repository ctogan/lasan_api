
const Topic = require('../models').Topic;

module.exports = {
    list(req,res){
        return Topic
        .findAll({
            include:[],
            order:[
                ['createdAt','DESC']
            ]
        })
        .then((Topic)=> res.status(200).send(Topic))
        .catch((error)=>{res.status(400).send(error);});
    },
    add(req,res){
        return Topic
        .create({
            id: req.body.id,
            topic : req.body.topic,
            status : req.body.status,
        })
        .then((topic) => res.status(201).send(topic))
        .catch((error) => res.status(400).send(error));
    }

}