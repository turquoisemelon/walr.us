exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (table) => {
      table.bigInteger('fb_id').primary().notNullable();
    })
    .createTableIfNotExists('resources', (table) => {
      table.increments('id').primary().notNullable();
      table.bigInteger('user_id').notNullable();
      table.foreign('user_id').references('users.fb_id');
      table.string('url').notNullable();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.string('img_path').notNullable();
      table.float('ratings_avg', 2, 1).notNullable().defaultTo(0);
      table.integer('likes_count').notNullable().defaultTo(0);
      table.integer('comments_count').notNullable().defaultTo(0);
    })
    .createTableIfNotExists('follow', (table) => {
      table.bigInteger('leader_id').notNullable();
      table.foreign('leader_id').references('users.fb_id');
      table.bigInteger('follower_id').notNullable();
      table.foreign('follower_id').references('users.fb_id');
    })
    .createTableIfNotExists('ratings', (table) => {
      table.bigInteger('user_id').notNullable();
      table.foreign('user_id').references('users.fb_id');
      table.integer('resource_id').notNullable();
      table.foreign('resource_id').references('resources.id');
      table.integer('rating').notNullable();
    })
    .createTableIfNotExists('likes', (table) => {
      table.bigInteger('user_id').notNullable();
      table.foreign('user_id').references('users.fb_id');
      table.integer('resource_id').notNullable();
      table.foreign('resource_id').references('resources.id');
    })
    .createTableIfNotExists('comments', (table) => {
      table.bigInteger('user_id').notNullable();
      table.foreign('user_id').references('users.fb_id');
      table.integer('resource_id').notNullable();
      table.foreign('resource_id').references('resources.id');
      table.text('body').notNullable();
    })
    .createTableIfNotExists('tags', (table) => {
      table.increments('id').primary().notNullable();
      table.string('tag', 63).notNullable();
    })
    .createTableIfNotExists('resource_tags', (table) => {
      table.integer('resource_id').notNullable();
      table.foreign('resource_id').references('resources.id');
      table.integer('tag_id').notNullable();
      table.foreign('tag_id').references('tags.id');
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
    .dropTableIfExists('resource_tags')
    .dropTableIfExists('tags')
    .dropTableIfExists('resources')
    .dropTableIfExists('users')
  ])
};
