
const Article = require('../models').Article;
const Topic = require('../models').Topic;
const User = require('../models').User;
const UserLike = require('../models').UserLike
const UserArchive = require('../models').UserArchive
const ArticleComments = require('../models').ArticleComments

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
      
      let limit = 20
      let offset = 0 + (req.query.page - 1) * limit
        return Article
        .findAndCountAll({
          attributes: ['slug','title','subtitle',['created_at','date'],'image',['reading_time','read_calculation'],['total_likes','likes_count'],['total_views','views_count'],['total_whistlists','wishlists_count']],
          offset: offset,
          limit: limit,
          include:[
            {
              model: Topic,
              as: 'categories',
              attributes: [['topic','topic_name']],
            },
            {
              model: User,
              as: 'author',
              attributes: ['uuid','first_name','last_name','username','avatar','occupation'],
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
            total_likes       : req.body.total_likes,
            total_views       : req.body.total_views,
            total_whistlists  : req.body.total_whistlists,
            reading_time      : req.body.reading_time,

        })
        .then((Article) => res.status(201).send(Article))
        .catch((error) => res.status(400).send(error));
    },

    get_detail(req, res) {
      
      return Article
        .findOne( {
          attributes: {exclude: ['id']},
          include: [
             {
              model: Topic,
              as: 'categories',
              attributes: [['topic','topic_name']],
            },
            {
              model: User,
              as: 'author',
              attributes: ['uuid','first_name','last_name','username','avatar','occupation'],
            },
          ],
          where: {
            slug: req.body.slug,
           },
        })
        .then((data) => {
          if (!data) {
            return res.status(200).send({
              code    : 200,
              status  : 'error',
              message : 'Article Not Found',
              data    : []
            });
          }
          const article = {
            status: true,
            message: data,
            errors: null
          }
          return res.status(200).send(data);
        })
        .catch((error) => {
          res.status(400).send({
            status: false,
            message: 'Bad Request',
            errors: error
          });
        });
    },

    like(req, res) {

       Article
        .findOne( {
          where: {
            slug: req.body.slug,
           },
        })
        .then((data) => {
         
          if (!data) {
            return res.status(200).send({
              code    : 200,
              status  : 'error',
              message : 'Article Not Found',
              data    : []
            });
          }
          UserLike
          .findOne({
            where:{
              user_id           : req.userId,
              article_id        :data.id,
            }
          }).then((articlelike) =>{
              if(!articlelike){

                UserLike
                .create({
                    user_id           : req.userId,
                    article_id        : data.id,
                });

                var result = {
                  code    : 200,
                  status  : 'success',
                  message : 'Success follow',
                  data    : articlelike
                }            
                
              }else{
                var result = {
                  code    : 200,
                  status  : 'success',
                  message : 'have like',
                  data    : []
                }
              }
              return res.status(200).send(result);
          }).catch((error) => {
            res.status(400).send({
              status: false,
              message: 'Bad Request',
              errors: error
            });
          })
          
        })
        .catch((error) => {
          res.status(400).send({
            status: false,
            message: 'Bad Request',
            errors: error
          });
        });
        
      // return UserLike
      // .create({
      //     user_id           : req.userId,
      //     article_id        : req.body.article_id,

      // })
      // .then((data) => res.status(201).send(data))
      // .catch((error) => res.status(400).send(error));
    },

    archive(req,res){
      return UserArchive
      .create({
          user_id           : req.userId,
          article_id        : req.body.article_id,

      })
      .then((data) => res.status(201).send(data))
      .catch((error) => res.status(400).send(error));
    },
    trending(req,res){
  
      return Article
      .findAll({
        attributes: ['slug','title',['created_at','date'],'image',['reading_time','read_calculation']],
        limit: 4,
        include:[
          {
            model: Topic,
            as: 'categories',
            attributes: [['topic','topic_name']],
          },
          {
            model: User,
            as: 'author',
            attributes: ['uuid','first_name','last_name','username','avatar','occupation'],
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

    recommended(req, res) {
      return Article
      .findAll({
          include:[{
              model: Topic,
              as: 'topic'
            }],
          order:[
              ['created_at','DESC']
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
              ['created_at','DESC']
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
              ['created_at','DESC']
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
              ['created_at','DESC']
          ]
      })
      .then((Article)=> res.status(200).send(Article))
      .catch((error)=>{res.status(400).send(error);});
    },

    get_comment(req,res){
      // console.log(req.body.slug)
      // return res.status(200).send([]);
      Article
      .findOne({
          where :{
            slug:req.body.slug,
          }
      }).then((article)=>{
          ArticleComments
          .findAll({
              where: {
                article_id: article.id,
                status: 'active',
              },
              include:[
                  {
                    model: User,
                    as: 'user',
                    attributes: ['uuid','first_name','last_name','username','avatar','occupation'],
                  },
                  {
                    model: ArticleComments,
                    // required: true,
                    as: 'child',
                    attributes: [['id','comment_reply_id'],'comment','total_comment_like','total_comment_reply','created_at','updated_at'],
                    
                  },
                  
              ],
              // raw: true,
              attributes: [['id','comment_id'],'comment','media','total_comment_like','total_comment_reply','created_at','updated_at'],
              order:[
                  ['created_at','DESC']
              ]
          })
          .then((comments) => {
              var result = {
                code    : 200,
                status  : 'success',
                message : 'success',
                data    : comments
              }
            
            return res.status(200).send(result);
          
          })
          .catch((error)=>{res.status(400).send(error);});
      })
    },
    add_comment(req,res){   
        // console.log('testing');
          Article
          .findOne( {
            where: {
              slug: req.body.slug,
            },
          })
          .then((data) => {
            if (!data) {
              return res.status(200).send({
                code    : 200,
                status  : 'error',
                message : 'Article Not Found',
                data    : []
              });
            }
            User
            .findOne( {
              attributes: [['username','name'],['avatar','profile_picture']],
              where: {
                id: req.userId,
              },
            }).then((user) => {

                if(!user){
                  return res.status(200).send({
                    code    : 200,
                    status  : 'error',
                    message : 'User Not Found',
                    data    : []
                  });
                }
                 ArticleComments
                  .create({
                      article_id            : data.id,
                      parent_id             : '',
                      user_id               : req.userId,
                      comment               : req.body.comment,
                      status                : 'active',
                      media                 : '',
                      total_comment_like    : 0,
                      total_comment_reply   : 0,
                  }) .then((comments) => {
                      var result = {
                        code    : 200,
                        status  : 'success',
                        message : 'Success',
                        data    : {
                          user,
                          comment_id          : comments.id, 
                          created_at          : comments.created_at,
                          comment             : comments.comment,
                          is_like             : false,
                          total_comment_like  : comments.total_comment_like,
                          total_comment_reply : comments.total_comment_reply,
                          comment_replies     :[]
                        }
                      }  
                      return res.status(200).send(result);
                  });                  
            });
                        
          })
          .catch((error) => {
            res.status(400).send({
              status: false,
              message: 'Bad Request',
              errors: error
            });
          });
        
    },
    reply_comment(req,res){   

      ArticleComments
      .findOne( {
        include:[
            {
              model: User,
              as: 'user',
              attributes: ['uuid','first_name','last_name','username','avatar','occupation'],
            },
            {
              model: ArticleComments,
              as: 'article',
              // attributes: ['uuid','first_name','last_name','username','avatar','occupation'],
            },
           
        ],
        where: {
          id: req.body.comment_id,
        },
      })
      .then((data) => {
        
                    
      })
      .catch((error) => {
        res.status(400).send({
          status: false,
          message: 'Bad Request',
          errors: error
        });
      });
    }
}