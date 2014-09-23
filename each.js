var http = require('http');
var async = require('async');

var url1 = process.argv[2];
var url2 = process.argv[3];

async.each([url1, url2], function(item, done){
    var body = ''
    http.get(item, function(res){
        res.on('data', function(chunk){
            body += chunk.toString();
        });
        res.on('end', function(){
            done(null, body);
        }).on('error', function(err) {
            done(err);
        });
    });
}, function(err){
    if (err) console.log(err);
});
