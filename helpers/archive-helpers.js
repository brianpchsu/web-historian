var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  var archivePath = '/../web/archives/sites.txt';
  var alldata = fs.readFileSync(__dirname + archivePath, "utf-8", function(err, data){
    if(err) console.log("error: " + err);
    return JSON.stringify(data);
  });

  console.log(typeof alldata);
  return alldata;
};

exports.isUrlInList = function(url){
  var list = this.readListOfUrls().split('\n');
  return _.contains(list, url); //["fb", 'google]
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
