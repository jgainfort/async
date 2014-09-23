var http = require('http');
var async = require('async');
var fs = require('fs');

async.waterfall([
    function(cb){
        var filename = process.argv[2];
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) throw cb(err);
            cb(null, data);
        });
    },
    function(data, cb){
        var body = ''
        http.get(data, function(res){
            res.on('data', function(chunk){
                body += chunk.toString();
            });
            res.on('end', function(){
                cb(null, body);
            }).on('error', function(err) {
                cb(err);
            });
        });
    }
], function(err, result){
    if (err) return console.error(err);
    console.log(result);
});
