var Tweet = require('../models/Tweet');

module.exports = function (stream, io) {

  stream.on('data', function (data) {
    var tweetEntry;
    var tweet = {
      twid: data.id,
      active: false,
      author: data.user.name,
      avatar: data.user.profile_image_url,
      body: data.text,
      date: data.creatd_at,
      screenname: data.user.screen_name
    };

    tweetEntry = new Tweet(tweet);
    tweetEntry.save(function (err) {
      if (!err) {
        io.emit('tweet', tweet);
      }
    });
  });

};
