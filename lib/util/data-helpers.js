function test (knex) {
  return knex
    .select("*")
    .from("users");
}

function saveComment (user_id, resource_id, body){
  return  knex('comments')
    .insert({
      user_id : user_id,
      resource_id : resource_id,
      body : body
    });
}

function saveRating (user_id, resource_id, rating){
  return knex('ratings')
    .insert({
      user_id : user_id,
      resource_id : resource_id,
      rating : rating
    });
}

function saveLike (user_id, resource_id){
  return knex('likes')
    .insert({
      user_id : user_id,
      resource_id : resource_id
    });
}

function saveResource (user_id, url, title, description, img_path){
  return knex('resources')
    .insert({
      user_id : user_id,
      url : url,
      title : title,
      description : description,
      img_path : img_path
    });
}

function newUser (fb_id){
  return knex('users')
    .insert({fb_id : fb_id});
}



module.exports = {
  test : test,
  saveComment : saveComment,
  saveRating : saveRating,
  saveLike : saveLike,
  saveResource : saveResource,
  newUser : newUser;
}
