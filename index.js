var ApiBuilder = require('claudia-api-builder'),
	Promise = require('bluebird'),
	AWS = require('aws-sdk'),
	shortid = require('shortid');
	api = new ApiBuilder(),
	docClient = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient());

module.exports = api;

require('./professional-service.js')
require('./agenda.js')

// Create new user
api.post('/user', function (request) {
	'use strict';

	var params = {
		TableName: "usuario",
		Item: {
			Id: request.body.id > 0 ? request.body.id : shortid.generate(),
			username: request.body.username,
			name: request.body.name,
            password: request.body.password,
			email: request.body.email,
			cpf: request.body.cpf
		}
	};

	// Store it and return the promise,
	// that will evaluate before reponding back to the client
	return docClient.putAsync(params);

}, { success: 201 }); // Return HTTP status 201 - Created when successful


// get user for {id}
api.get('/user/{id}', function (request) {
	'use strict';
	 var id, params;
	
	// // Get the id from the pathParams
	id = request.pathParams.id;

	// Set up parameters for dynamo
	params = {
		TableName: 'usuario',
		Key: {
			Id: id
		}
	};
	
	// Get the item using our promisified function
	return docClient.getAsync(params);

}); //200 ok is standard for non-errors


// delete user with {id}
api.delete('/user/{id}', function (request) {
	'use strict';
	var id, params;
	// Get the id from the pathParams
	id = request.pathParams.id;

	// Set up parameters for dynamo
	params = {
		TableName: 'usuario',
		Key: {
			Id: id
		}
	};

	// Get the item using our promisified function
	// return a nice little message in the .then-clause
	return docClient.deleteAsync(params)
		.then(function () {
			return 'Deleted user with id "' + id + '"';
		});
}); //200 ok is standard for non-errors