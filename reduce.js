var http = require('http');
var async = require('async');

var url = process.argv[2];

async.reduce(['one', 'two', 'three'], 0, function(memo, item, callback){
    var body = ''
    http.get(url + '?number=' + item, function(res){
        res.on('data', function(chunk){
            body += chunk.toString();
        });
        res.on('end', function(){
            callback(null, memo + Number(body));
        });
    }).on('error', callback);
}, function(err, result){
    if (err) console.log(err);
    console.log(result);
});
