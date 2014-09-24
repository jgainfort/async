var http = require('http');
var async = require('async');

var url = process.argv[2];
var port = process.argv[3];

async.series({
    function(done){
        var opts = {
            hostname: url + ':' + port,
            path: '/users/create',
            method: 'POST'
      };
    },
