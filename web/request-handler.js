var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var helpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var headers = helpers.headers;

exports.handleRequest = function (req, res) {
  var pathname = require('url').parse(req.url).pathname;
  var archivePath = "./archives/sites" + pathname;


  if (req.method ==="GET"){
    if (pathname === '/') {
      // archive.addUrlToList("456");
      headers['Content-Type'] = 'application/json';
      res.writeHead(200, headers);
      res.end(JSON.stringify("<input"));
    } else if (fs.existsSync(archivePath)) {
      headers['Content-Type'] = 'application/json';
      res.writeHead(200, headers);
      fs.readFile(archivePath, "utf-8",function(err, data){
        if(err) console.log(err);
        res.end(JSON.stringify(data));
      });
    } else if (!archive.isUrlInList(pathname)) {
      //fs.writeFileSync(archive.paths.list, pathname + "\n");
      headers['Content-Type'] = 'application/json';
      res.writeHead(302, headers);
      res.end(JSON.stringify("Please wait"));
    }
    else {
      headers['Content-Type'] = 'application/json';
      res.writeHead(404, headers);
      res.end("File not found!");
    }
  } else if (req.method ==="POST") {
    var url = req._postData.url;
    if (!archive.isUrlInList(url)) {

      console.log('in the url not found branch');
      var data = '';
      req.on('data', function(chunk) {
        data += chunk;
      });

      req.on('end', function() {
        archive.addUrlToList(url);
        res.writeHead(302, headers);
        res.end(JSON.stringify(data));
      });
      //fs.writeFileSync(archive.paths.list, pathname + "\n");
      //TELL client we are working on archiving the page
      //PUT requested site into sites.txt
      //PUT html of site into archives/sites folder as its own file
    } else {
      console.log('in the url IS found branch')
    }
  }

  // res.end(archive.paths.list);
};


