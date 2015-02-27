// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var fs = require('fs');
var http = require('http');
var request = require('request');


exports.fetchWebsite = function(url){

  request('http://' + url).pipe(fs.createWriteStream("../web/archives/sites/" + url));

};

//fetgc


