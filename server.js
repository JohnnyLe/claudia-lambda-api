var apiBuilder = require('claudia-api-builder'),
    api = new apiBuilder();

module.exports = api;

api.get('/hello', function () {
    'use strict';
    return 'hi there!';
});
