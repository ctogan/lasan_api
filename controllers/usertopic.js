
const UserTopic = require('../models').userTopic;
const Topic = require('../models').Topic;

module.exports = {
    list(req,res){
        return UserTopic
        .findAll({
            include:[{
                model: Topic,
                as: 'topic'
              }],
            order:[
                ['createdAt','DESC']
            ]
        })
        .then((UserTopic)=> res.status(200).send(UserTopic))
        .catch((error)=>{res.status(400).send(error);});
    },
    
    add(req,res){
        return UserTopic
        .create({

            topic_id : req.body.topic_id,
            user_id : req.body.user_id,
        })
        .then((UserTopic) => res.status(201).send(UserTopic))
        .catch((error) => res.status(400).send(error));
    }

}

