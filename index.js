var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'm9epAwpDezs11Lnnjyji7rDVC',
  consumer_secret: '3t1l8qZmodRCSwzpG06qpWevyO7qPeNSiO9sX5YK0E2WLSe0WO',
  access_token_key: '495585923-WpFmmcYtjfQxWYbVLPMmPmekmFBZG0o2mhE9eJ4y',
  access_token_secret: 'UPoVOP9gNhG6yC2Fsaplq5V4GPnKAWuSdmBNBqRpKnC5f'
});

var params = {screen_name: 'jkup'};
var one_way_following = [];
var users_to_display = [];

client.get('followers/ids', params, function(error, followers_results, response){
  if (error)
    throw error;

    var followers = followers_results.ids;

    client.get('friends/ids', params, function(error, following_results, response){
      if(error)
        throw error;

        var following = following_results.ids;

        //console.log(following);

        following.forEach(function(person){
          if(followers.indexOf(person) === -1)
            one_way_following.push(person);
        });

        //console.log(one_way_following);

        // only take the first 100 users
        one_way_following = one_way_following.slice(0,99);

        var one_way_following_string = one_way_following.join();

        client.get('users/lookup', {user_id: one_way_following_string}, function(error, users_results, response){
          users_results.forEach(function(user){
            var userObj = {
              name: user.name,
              screen_name: user.screen_name,
              avatar: user.profile_image_url
            }
            users_to_display.push(userObj);
          });
          console.log(users_to_display);
        });


    });

});



    // iterate through following seeing who is not also a follower

    //display list
