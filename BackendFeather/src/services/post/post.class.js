const { Service } = require('feathers-knex');

exports.Post = class Post extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'post'
    });
  }
};
