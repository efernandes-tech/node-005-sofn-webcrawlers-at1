var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {

  var options = {
    url: 'http://www.themovieblog.com/category/features/reviews/',
    method: 'GET',
  };

  request(options, function(error, response, body) {
    if (error || response.statusCode != 200) {
      return;
    }

    var $ = cheerio.load(body);

    var arr = [];

    var postItem = $('.genaral-post-item');

    $(postItem).each(function(index, element) {
      var item = element;

      var headerTitle = $(item).find('.genpost-entry-header > .genpost-entry-title > a');
      var content = $(item).find('.genpost-entry-content > p');
      var moreTag = $(content).find('a')

      return arr.push({
        header: $(headerTitle).text(),
        content: {
          text: $(content).text(),
          more: $(moreTag).attr('href')
        }
      })
    });

    res.status(200)
      .json(arr);

  });

});

module.exports = router;
