var http = require('http');
var async = require('async');

var hostname = process.argv[2];
var port = process.argv[3];
var url = 'http://' + hostname + ':' + port

async.series({
    post: function(done){
        function add_user(user_id, cb){
            var opts = {
                hostname: hostname,
                port: port,
                path: '/users/create',
                method: 'POST'
            };
            var req = http.request(opts, function(res){
                res.on('data', function(chunk){});
                res.on('end', function(){
                    cb();
                })
            });

            req.write(JSON.stringify({'user_id': user_id}));
            req.end();
        }

        async.times(5, function(n, next){
            add_user(++n, function(err){
                next(err);
            })
        }, function(err){
                if (err) return done(err);
                done(null, 'saved');
        });
    },
    get: function(done){
        var body = '';
        http.get(url + '/users', function(res){
            res.on('data', function(chunk){
                body += chunk.toString();
            });
            res.on('end', function(){
                done(null, body);
            });
        }).on('error', done);
    }
}, function(err, result){
    if (err) return console.error(err);
    console.log(result.get);
})
