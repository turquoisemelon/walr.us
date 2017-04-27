exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (table) => {
      table.bigInteger('fb_id').primary();
    })
    .createTableIfNotExists('resources', (table) => {
      table.increments('id').primary();
      table.bigInteger('user_id');
      table.foreign('user_id').references('users.fb_id');
      table.string('url');
      table.string('title');
      table.text('description');
      table.string('img_path');
      table.float('ratings_avg', 2, 1);
      table.integer('likes_count');
      table.integer('comments_count');
    })
    .createTableIfNotExists('follow', (table) => {
      table.bigInteger('leader_id');
      table.foreign('leader_id').references('users.fb_id');
      table.bigInteger('follower_id');
      table.foreign('follower_id').references('users.fb_id');
    })
    .createTableIfNotExists('ratings', (table) => {
      table.bigInteger('user_id');
      table.foreign('user_id').references('users.fb_id');
      table.integer('resource_id');
      table.foreign('resource_id').references('resources.id');
      table.integer('rating');
    })
    .createTableIfNotExists('likes', (table) => {
      table.bigInteger('user_id');
      table.foreign('user_id').references('users.fb_id');
      table.integer('resource_id');
      table.foreign('resource_id').references('resources.id');
    })
    .createTableIfNotExists('comments', (table) => {
      table.bigInteger('user_id');
      table.foreign('user_id').references('users.fb_id');
      table.integer('resource_id');
      table.foreign('resource_id').references('resources.id');
      table.text('body');
    })
    .createTableIfNotExists('tags', (table) => {
      table.increments('id').primary();
      table.string('tag', 63)
    })
    .createTableIfNotExists('reourse_tags', (table) => {
      table.integer('resource_id');
      table.foreign('resource_id').references('resources.id');
      table.integer('tag_id');
      table.foreign('tag_id').references('tags.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .dropTableIfExists('follow')
    .dropTableIfExists('ratings')
    .dropTableIfExists('likes')
    .dropTableIfExists('comments')
    .dropTableIfExists('reourse_tags')
    .dropTableIfExists('tags')
    .dropTableIfExists('resources')
    .dropTableIfExists('users')
  ]);
};
