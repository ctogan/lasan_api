
const Article = require('../models').Article;
const User = require('../models').user;
const {
    Sequelize
  } = require('sequelize');


module.exports = {

    author_recommendation(req,res){
        const lstoken = req.cookies.lstoken;
       
        if(!lstoken){
            return User
            .findAll({
              attributes: ['uuid','first_name','last_name','username','avatar','occupation'],
              order: Sequelize.literal('random()'),
              limit : 3
            })
            .then((User)=> res.status(200).send({
              'code'    : 200,
              "status"  : "true",
              "message" : "success",
              'data'    : User,
            }))
            .catch((error)=>{res.status(400).send(error);});
        }else{
            return User
            .findAll({
              attributes: ['uuid','first_name','last_name','username','avatar','occupation'],
              order: Sequelize.literal('random()'),
              limit : 6
            })
            .then((User)=> res.status(200).send({
              'code'    : 200,
              "status"  : "true",
              "message" : "success",
              'data'    : User,
            }))
            .catch((error)=>{res.status(400).send(error);});
        }
        
    },

    list_stories(req,res){
        const lstoken = req.cookies.lstoken;
       
        // if(!lstoken){
            return Article
            .findAll({
              order: Sequelize.literal('random()'),
              limit : 3
            })
            .then((Article)=> res.status(200).send({
              'code'    : 200,
              "status"  : "true",
              "message" : "success",
              'data'    : Article,
            }))
            .catch((error)=>{res.status(400).send(error);});
        // }
    }


}