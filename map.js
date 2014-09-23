var http = require('http');
var async = require('async');

var url1 = process.argv[2];
var url2 = process.argv[3];

async.map([url1, url2], function(item, done){
    http.get(item, function(res){
        var body = ''
        res.on('data', function(chunk){
            body += chunk.toString();
        });
        res.on('end', function(){
            return done(null, body);
        });
    }).on('error', function(err) {
        done(err);
    });
}, function(err, results){
    if (err) console.log(err);
    console.log(results)
});
