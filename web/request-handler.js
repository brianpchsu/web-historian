var path = require('path');
var http = require("http");
var archive = require('../helpers/archive-helpers.js');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var qs = require('querystring');
// require more modules/folders here!

var headers = helpers.headers;
var serveHTML = function(url, req, res){
  fs.readFile(url, function(err, html) {
    if (err) throw err;
    res.writeHead(200, {"Content-Type": 'text/html'});
    res.end(html, 'utf-8');
  });
};


exports.handleRequest = function (req, res) {
  var url = require('url').parse(req.url);
  var pathname = require('url').parse(req.url).pathname;
  var archivePath = "./archives/sites" + pathname;
  var defaultPath = './public/index.html';
  var redirectPath = './public/loading.html';

  if (req.method ==="GET"){
    if (pathname === '/') {
      serveHTML(defaultPath, req, res);
      // headers['Content-Type'] = 'application/json';
      // res.writeHead(200, headers);
      // res.end(JSON.stringify("<input"));
    } else if (fs.existsSync(archivePath)) {
      serveHTML(archivePath, req, res);
      // headers['Content-Type'] = 'application/json';
      // res.writeHead(200, headers);
      // fs.readFile(archivePath, "utf-8",function(err, data){
      //   if(err) console.log(err);
      //   res.end(JSON.stringify(data));
      // });
    }
    // else if (!archive.isUrlInList(pathname)) {
    //   //fs.writeFileSync(archive.paths.list, pathname + "\n");
    //   headers['Content-Type'] = 'application/json';
    //   res.writeHead(302, headers);
    //   res.end(JSON.stringify("Please wait"));
    // }
    else {
      headers['Content-Type'] = 'application/json';
      res.writeHead(404, headers);
      res.end("File not found!");
    }
  } else if (req.method ==="POST") {
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', function() {
      var allData = qs.parse(data);

      var askurl = allData.url;
      console.log(askurl);
      if (!archive.isUrlInList(askurl)) {
        //REDIRECT to loading
        serveHTML(redirectPath, req, res);
        //PUT requested site into sites.txt
        archive.addUrlToList(askurl);
        //TELLL worker to extract html and place in archive

      } else {
        console.log('in the url IS found branch')
      }



      res.writeHead(302, headers);
      res.end(JSON.stringify(data));
    });


  }

  // res.end(archive.paths.list);
};


