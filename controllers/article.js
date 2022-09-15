
const Article = require('../models').Article;
const Topic = require('../models').Topic;

module.exports = {
    list(req,res){
        return Article
        .findAll({
            include:[{
                model: Topic,
                as: 'topic'
              }],
            order:[
                ['createdAt','DESC']
            ]
        })
        .then((Article)=> res.status(200).send(Article))
        .catch((error)=>{res.status(400).send(error);});
    },

    add(req,res){
        
        console.log(req.body.topic_id);
        // return Article
        // .create({
        //     id: req.body.id,
        //     topic_id : req.body.topic_id,
        //     user_id : req.body.user_id,
        //     title : req.body.title,
        //     subtitle : req.body.subtitle,
        //     article : req.body.article,
        //     image : req.body.image,
        //     status : req.body.status,
        // })
        // .then((Article) => res.status(201).send(Article))
        // .catch((error) => res.status(400).send(error));
    },

    getById(req, res) {
        return Article
          .findByPk(req.params.id, {
            include: [{
              model: Topic,
              as: 'topic'
            }],
          })
          .then((Article) => {
            if (!Article) {
              return res.status(404).send({
                message: 'Article Not Found',
              });
            }
            return res.status(200).send(Article);
          })
          .catch((error) => res.status(400).send(error));
      },

}