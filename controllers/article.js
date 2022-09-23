
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
              attributes: [
                ['topic','topic_name']
              ],
            },
            {
              model: User,
              as: 'author',
              attributes: [
                ['first_name','name'],
                ['avatar','profile_picture'],
                'occupation'
              ],
            },
        ],
          order:[
              ['created_at','DESC']
          ]
        })
        .then((Article)=> res.status(200).send({
         
          'code'    : 200,
          "status"  : "true",
          "message" : "success",
          "auth"    : req.userId,
          'data'    : Article,

        }))
        .catch((error)=>{res.status(400).send(error);});
    },
    add(req,res){
        return Article
        .create({
            topic_id          : req.body.topic_id,
            user_id           : req.userId,
            title             : req.body.title,
            subtitle          : req.body.subtitle,
            article           : req.body.article,
            image             : req.body.image,
            status            : req.body.status,
            slug              : slugify(req.body.title, options),
            total_likes       : 0,
            total_views       : 0,
            total_whistlists  : 0,
            total_comments    : 0,
            reading_time      : req.body.reading_time,

        })
        .then((Article) => res.status(201).send(Article))
        .catch((error) => res.status(400).send(error));
    },

    get_detail(req, res) {
    
      return Article
        .findOne({
          where: {
            slug: req.body.slug,
           },
          include: [
             {
              model: Topic,
              as: 'categories',
              attributes: [['topic','topic_name']],
            },
            {
              model: User,
              as: 'author',
              // attributes: [['name','avatar','occupation']],
            },
          ],
        })
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              code    : 200,
              status  : false,
              message : 'Article Not Found',
              data    : []
            });
          }
          const results = {
            status: true,
            message: 'success',
            data    : data,
            errors: null
          }
          return res.status(200).send(results);
        })
        .catch((error) => {
          res.status(400).send({
            status: false,
            message: 'Bad Request',
            errors: error
          });
        });
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