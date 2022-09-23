
const UserTopic = require('../models').userTopic;
const Topic = require('../models').Topic;

module.exports = {
    list(req,res){
        // console.log("testing");
        return UserTopic
        .findAll({
            include:[
                // {
                //     model: Topic,
                //     as: 'topic'
                // }
            ],
            order:[
                ['created_at','DESC']
            ]
        })
        .then((usertopic)=> res.status(200).send(usertopic))
        .catch((error)=>{res.status(400).send(error);});
    },
    
    add(req,res){
        return UserTopic
        .create({
            topic_id : req.body.topic_id,
            user_id : req.userId,
        })
        .then((usertopic) => res.status(201).send(usertopic))
        .catch((error) => res.status(400).send(error));
    }

}

