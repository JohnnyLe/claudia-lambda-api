var ApiBuilder = require('claudia-api-builder'),
	Promise = require('bluebird'),
	DOC = require('dynamodb-doc'),
	api = new ApiBuilder(),
	docClient = Promise.promisifyAll(new DOC.DynamoDB());

module.exports = api;


// Create new user
api.post('/user', function (request) {
	'use strict';

	// Map to the item to store from the posted data
	// (psst should an application/x-form-www-urlencoded be used
	//	we could have read it below with request.post.userId etc.)
	var params = {
		TableName: "usuario",
		Item: {
			Id: request.body.userId,
			username: request.body.username,
			name: request.body.name,
            password: request.body.password
		}
	};

	// Store it and return the promise,
	// that will evaluate before reponding back to the client
	return docClient.putItemAsync(params);

}, { success: 201 }); // Return HTTP status 201 - Created when successful


// get user for {id}
api.get('/user/{id}', function (request) {
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
	return docClient.getItemAsync(params);

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
	return docClient.deleteItemAsync(params)
		.then(function () {
			return 'Deleted user with id "' + id + '"';
		});
}); //200 ok is standard for non-errors



// api.get('/user', function () {
//     'use strict';
    
//     var id, params;
    
//     params = {
// 		TableName: 'usuario',
// 		Key: {
// 			userid: "0"
// 		}
// 	};

// 	// Get the item using our promisified function
// 	return docClient.getItemAsync(params);
    
// });
