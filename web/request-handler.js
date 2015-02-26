var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var helpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var headers = helpers.headers;

exports.handleRequest = function (req, res) {
  var pathname = require('url').parse(req.url).pathname;
  var archivePath = "./archives/sites" + pathname;
  // console.log(pathname);
  // console.log(archivePath);

  if (pathname === '/') {

    headers['Content-Type'] = 'application/json';
    res.writeHead(200, headers);
    res.end(JSON.stringify("<input"));
  } else if (fs.existsSync(archivePath)) {
    console.log(archive.isUrlInList("www.facebook.com"));

    headers['Content-Type'] = 'application/json';
    res.writeHead(200, headers);
    fs.readFile(archivePath, "utf-8",function(err, data){
      if(err) console.log(err);
      res.end(JSON.stringify(data));
    });
  } else if (!archive.isUrlInList()) {
    archive.addUrlToList();

    fs.writeFileSync(archive.paths.list, pathname + "\n");
    headers['Content-Type'] = 'application/json';
    res.writeHead(302, headers);
    res.end(JSON.stringify("Please wait"));
  }
  else {
    headers['Content-Type'] = 'application/json';
    res.writeHead(404, headers);
    res.end("File not found!");
  }
  // res.end(archive.paths.list);
};


