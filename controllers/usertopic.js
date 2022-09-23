
const UserTopic = require('../models').userTopic;
const Topic = require('../models').Topic;

module.exports = {
    list(req,res){
        console.log(req.userId);
        return UserTopic
        .findAll({
            attributes:[],
            include:[
                {
                    model: Topic,
                    as: 'categories',
                    attributes: [['topic','topic_name']],
                }
            ],
            where: {
                user_id: req.userId,
            },
            order:[
                ['created_at','DESC']
            ]
        })
        
        .then((usertopic)=> {
            const results = {
                status: true,
                message: 'success',
                data    : usertopic,
                errors: null
              }
              return res.status(200).send(results);
        })
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

