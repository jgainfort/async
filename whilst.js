var http = require('http');
var async = require('async');

var url = process.argv[2];
var count = 0;
var requestBody = '';

async.whilst(
    function() {
        return !/meerkat/.test(requestBody.trim());
    },
    function(cb){
        var body = '';
        http.get(url, function(res){
            res.on('data', function(chunk){
                body += chunk.toString();
            });
            res.on('end', function(){
                ++count;
                requestBody = body;
                cb();
            });
        }).on('error', cb);
    },
    function(err){
        if (err) console.log(err);
        console.log(count);
    }
);
