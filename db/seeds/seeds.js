exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users')
      .del()
      .then(function () {
        return knex('users').insert([
          {fb_id: 1},
          {fb_id: 2},
          {fb_id: 3}
        ])
        .then( () =>{
          return knex('resources').insert([
          {
            user_id: 1,
            url: 'http://www.cnn.com',
            title: 'Fake News!!!',
            description: 'View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN.com.',
            img_path: '/public/img/123.jpg',
            ratings_avg: 3.4,
            likes_count: 6,
            comments_count: 2
          }])
        });
      })
      ]);
};
