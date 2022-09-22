
const Article = require('../models').Article;
const Topic = require('../models').Topic;
const User = require('../models').User;

const utils = require('../helpers/utils');
const slugify = require('slugify')
const options = {
  replacement: '-',
  remove: undefined,
  lower: true,
  strict: false,
  locale: 'en',
  trim: true,
}


module.exports = {
    list(req,res){
        return Article
        .findAll({
          attributes: ['slug','title',['created_at','date'],'image',['reading_time','read_calculation']],
          include:[
            {
              model: Topic,
              as: 'categories',
              attributes: [['topic','topic_name']],
            },
            // {
            //   model: User,
            //   as: 'author',
            //   required:false
            // }
        ],
          order:[
              ['created_at','DESC']
          ]
        })
        .then((Article)=> res.status(200).send({
         
          'code'    : 200,
          "status"  : "true",
          "message" : "success",
          'data'    : Article,

        }))
        .catch((error)=>{res.status(400).send(error);});
    },
    add(req,res){
        return Article
        .create({
            topic_id          : req.body.topic_id,
            user_id           : req.body.user_id,
            title             : req.body.title,
            subtitle          : req.body.subtitle,
            article           : req.body.article,
            image             : req.body.image,
            status            : req.body.status,
            slug              : slugify(req.body.title, options),
            total_likes       : req.body.total_likes,
            total_views       : req.body.total_views,
            total_whistlists  : req.body.total_whistlists,
            reading_time      : req.body.reading_time,

        })
        .then((Article) => res.status(201).send(Article))
        .catch((error) => res.status(400).send(error));
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
      
      recommended(req, res) {
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
      selected(req, res) {
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

      newest(req, res){
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
      
      popular(req, res){
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
      }      

}