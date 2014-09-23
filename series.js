var http = require('http');
var async = require('async');

var url1 = process.argv[2];
var url2 = process.argv[3];

async.series({
    requestOne: function(done){
        var body = ''
        http.get(url1, function(res){
            res.on('data', function(chunk){
                body += chunk.toString();
            });
            res.on('end', function(){
                done(null, body);
            }).on('error', function(err) {
                done(err);
            });
        });
    },
    requestTwo: function(done){
        var body = ''
        http.get(url2, function(res){
            res.on('data', function(chunk){
                body += chunk.toString();
            });
            res.on('end', function(){
                done(null, body);
            }).on('error', function(err) {
                done(err);
            });
        });
    }
}, function(err, result){
    if (err) return console.error(err);
    console.log(result);
});
