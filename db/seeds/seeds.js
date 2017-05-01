exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {fb_id: 10155247762692453},
    {fb_id: 10103925748041255},
    {fb_id: 10155143864643444}
  ])
  .then(() => {
    return knex('resources').insert([
    {
      user_id: 10155247762692453,
      url: 'http://www.cnn.com/',
      title: 'Fake News!!!',
      description: 'View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN.com.',
      img_path: '/images/u1eYT0.jpg'
    },
    {
      user_id: 10103925748041255,
      url: 'http://www.foodnetwork.ca/',
      title: 'Watch Food Network Videos | Full Episodes Online - Anna Olson, Top Chef',
      description: 'Food Network Canada Videos, watch your favorite Food TV shows online; watch Top Chef, Bake with Anna Olson online for free and all Food Network Canada Shows Online.',
      img_path: '/images/FUzn4A.jpg'
    },
    {
      user_id: 10155247762692453,
      url: 'http://www.astonmartin.com/',
      title: 'Aston Martin | The Official Website',
      description: 'Official website of Aston Martin Lagonda Ltd., luxury British sports car manufacturer. View the latest information, news, and pictures from Aston Martin on our models including Vanquish, Vantage and DB9.',
      img_path: '/images/arg22c.jpg'
    }
    ])
  })
  // .then(() => {
  //   return knex('follow').insert([
  //     {leader_id: 1, follower_id: 3},
  //     {leader_id: 3, follower_id: 2}
  //   ])
  // })
  // .then(() => {
  //   return knex('likes').insert([
  //     {user_id: 1, resource_id: 3},
  //     {user_id: 1, resource_id: 1},
  //     {user_id: 1, resource_id: 2},
  //     {user_id: 2, resource_id: 3},
  //     {user_id: 2, resource_id: 1},
  //     {user_id: 3, resource_id: 3}
  //   ])
  // })
  .then(() => {
    return knex('ratings').insert([
      {user_id: 10155247762692453, resource_id: 3, rating: 5},
      {user_id: 10155247762692453, resource_id: 2, rating: 5},
      {user_id: 10155247762692453, resource_id: 1, rating: 4},
      {user_id: 10155143864643444, resource_id: 2, rating: 4},
      {user_id: 10155143864643444, resource_id: 1, rating: 2},
      {user_id: 10103925748041255, resource_id: 2, rating: 1}
    ])
  })
  // .then(() => {
  //   return knex('comments').insert([
  //     {user_id: 1, resource_id: 1, body: "This is all Fake News!!!!"},
  //     {user_id: 2, resource_id: 1, body: "Actually it's not fake news, just alt-facts"},
  //     {user_id: 3, resource_id: 3, body: "Wow what a nice looking website."}
  //   ])
  // })
  .then(() => {
    return knex('tags').insert([
      {tag: 'news'},
      {tag: 'cars'},
      {tag: 'responsive design'}
    ])
  })
  .then(() => {
    return knex('resource_tags').insert([
      {resource_id: 1, tag_id: 1},
      {resource_id: 2, tag_id: 1},
      {resource_id: 3, tag_id: 2},
      {resource_id: 3, tag_id: 3},
      {resource_id: 2, tag_id: 3}
    ])
  })
};
