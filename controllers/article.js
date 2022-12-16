
const Article = require('../models').Article;
const Topic = require('../models').Topic;
const User = require('../models').User;
const UserLike = require('../models').UserLike
const UserArchive = require('../models').UserArchive
const ArticleComments = require('../models').ArticleComments
const ArticleCommentLike = require('../models').ArticleCommentLikes
const UserStory = require('../models').UserStory

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
                parent_id : 0,
                status: 'active',
              },
              include:[
                  {
                    model: User,
                    as: 'user',
                    attributes: [['username','name'],['avatar','profile_picture']],
                  },
                  {
                    model: ArticleCommentLike,
                    as: 'comment_like',
                    attributes: ['is_like'],
                  },
                  {
                    model: ArticleComments,
                    as: 'comment_replies',
                    include: [
                      {
                        model: User,
                        as:'user',
                        attributes: [['username','name'],['avatar','profile_picture']],
                      },
                      {
                        model: ArticleCommentLike,
                        as: 'comment_like',
                        attributes: ['is_like'],
                      },
                      
                  ],
                    attributes: [['id','comment_reply_id'],'total_comment_like','comment','created_at'],
                  },
              
              ],
              
              attributes: [['id','comment_id'],'comment','media','total_comment_like','total_comment_reply','created_at'],
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
                      parent_id             : 0,
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
              model: Article,
              as: 'article',
              // attributes: ['uuid','first_name','last_name','username','avatar','occupation'],
            },      
           
        ],
        where: {
          id: req.body.comment_id,
        },
      })
      .then((data) => {

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
                    article_id            : data.article_id,
                    parent_id             : data.id,
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
                        comment_id          : data.id, 
                        created_at          : data.created_at,
                        comment             : data.comment,
                        is_like             : false,
                        total_comment_like  : data.total_comment_like,
                        total_comment_reply : data.total_comment_reply,
                        comment_replies     :{
                          user,
                          comment_reply_id    : comments.id,
                          comment             : comments.comment,
                          is_like             : false,
                          total_comment_like  : comments.total_comment_like,
                          created_at          : comments.created_at,
                        }
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
          
                    
      })
      .catch((error) => {
        res.status(400).send({
          status: false,
          message: 'Bad Request',
          errors: error
        });
      });
    },

    edit_comment(req,res){
            
        ArticleComments.update(
          {
            comment: req.body.comment,
          },{
          where:{
            id: req.body.comment_id,
            user_id:req.userId
          }
        }).then((data)=>{

          var result = {
            code    : 200,
            status  : 'success',
            message : 'Success',
            data    : []
          }  

          return res.status(200).send(result);

        }).catch((error) => {
          res.status(400).send({
            status: false,
            message: 'Update error',
            errors: error
          })
        });   
    },

    stories_list(req,res){

      User
      .findAll({
          include:[
              {
                model: UserStory,
                as: 'story',
                required:true,
                include:[
                  {
                    model: Article,
                    as: 'article',
                    attributes: ['slug','title',['created_at','date'],'image',['subtitle','short_description']],
                    include:[
                      {
                        model: Topic,
                        as: 'categories',
                        attributes: [['topic','name']],
                      },      
                    ],
                  },       
                ],
                attributes: ['content',['created_at','date']],
              },      
            
          ],
          attributes: ['uuid','first_name','last_name','username','avatar','occupation'], 

      }).then((users)=>{

          var result = {
            code    : 200,
            status  : 'success',
            message : 'success',
            data    : users
          }
          return res.status(200).send(result);

      });

    },
    add_story(req,res){
        Article.
        findOne({
          where: {
            slug: req.body.slug,
           },
        }).then((article)=>{
           

            if (!article) {
              return res.status(200).send({
                code    : 200,
                status  : 'error',
                message : 'Article Not Found',
                data    : []
              });
            }

            UserStory
            .create({
                user_id           : req.userId,
                article_id        : article.id,
                content           : req.body.content,
            });

            var result = {
              code    : 200,
              status  : 'success',
              message : 'Success add story',
              data    : []
            }      
            return res.status(200).send(result);


        }).catch((error) => {
          res.status(400).send({
            status: false,
            message: 'story error',
            errors: error
          })
        });   
    }
}