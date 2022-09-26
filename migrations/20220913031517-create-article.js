'use strict';
const { faker } =  require("@faker-js/faker")

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      topic_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      article: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.STRING
      },
      slug:{
        type: Sequelize.STRING
      },
      total_likes:{
        type: Sequelize.INTEGER
      },
      total_views:{
        type: Sequelize.INTEGER
      },
      total_whistlists:{
        type: Sequelize.INTEGER
      },
      total_comments:{
        type: Sequelize.INTEGER
      },
      reading_time:{
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
    const item = fakeArticle(200);
    await queryInterface.bulkInsert("articles" , item , {})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('articles');
  }
};


function fakeArticle(count){
  const data = [];
  for (let i = 0; i < count; i++) {
    const rowItem = {
            topic_id          : faker.datatype.number({ min: 1, max: 50}),
            user_id           : faker.datatype.number(),
            title             : faker.lorem.sentence(5),
            subtitle          : faker.lorem.sentence(5),
            article           : faker.lorem.paragraph(3 ,'<br/>\n'),
            image             : faker.image.abstract(640, 640, true),
            status            : 'active',
            slug              : faker.lorem.slug(10),
            total_likes       : faker.datatype.number({ min: 1, max: 50}),
            total_views       : faker.datatype.number({ min: 1, max: 50}),
            total_whistlists  : faker.datatype.number({ min: 1, max: 50}),
            total_comments    : faker.datatype.number({ min: 1, max: 50}),
            reading_time      : faker.datatype.number({ min: 1, max: 50}),
            created_at        : faker.date.between(),
            updated_at        : faker.date.between()
    }
    data.push(rowItem)
  }
  return data;
}
