exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.bigInteger('fb_id');
    }).then((res) => {
      return Promise.all([
      knex.schema.createTableIfNotExists('follow', function(table){
        table.foreign('leader_id').references('users.fb_id');
        table.foreign('follower_id').references('users.fb_id');
      }),
      knex.schema.createTableIfNotExists('ratings', function(table){
        table.foreign('user_id').references('users.fb_id');
        // table.foreign('resource_id').references('resource.id');
      })
      ])}
    )
    ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
