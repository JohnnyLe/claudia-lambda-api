var AWS = require('aws-sdk'),
	Promise = require('bluebird'),
	shortid = require('shortid'),
	docClient = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient());

// Create new profissional
api.post('/profissional', function (request) {
	'use strict';

	// Map to the item to store from the posted data
	// (psst should an application/x-form-www-urlencoded be used
	//	we could have read it below with request.post.userId etc.)
	var params = {
		TableName: "profissional",
		Item: {
			Id: shortid.generate(),
			NomeProfissional: request.body.nomeProfissional,
			Cidade: request.body.cidade,
            Estado: request.body.estado,
			Endereco: request.body.endereco,
			Bairro: request.body.bairro,
            Telefone: request.body.telefone,
            Celular: request.body.celular,
            CelularSecundario: request.body.celularSecundario
		}
	};

	// Store it and return the promise,
	// that will evaluate before reponding back to the client
	return docClient.putAsync(params);

}, { success: 201 }); // Return HTTP status 201 - Created when successful

// scan profis
api.get('/profissional', function (request) {
	'use strict';
	var params;
	
	// Set up parameters for dynamo
	params = {
		TableName: 'profissional'
	};

	// Get the item using our promisified function
	return docClient.scanAsync(params);

}); //200 ok is standard for non-errors

// get profi for {id}
api.get('/profissional/{id}', function (request) {
	'use strict';
	
	var idUsuario, params;

	// Get the id from the pathParams
	idUsuario = request.pathParams.id;
	
	// Set up parameters for dynamo
	params = {
		TableName: 'profissional',
		FilterExpression: 'IdUsuario = :id',
		ExpressionAttributeValues: {
			':id': idUsuario
		}
		//Key: { IdProfissional : id, DataAgendamento : data }
	};
	
	// Get the item using our promisified function
	return docClient.scanAsync(params);

}); //200 ok is standard for non-errors

// get user for {id}
api.get('/profissional/{id}/services', function (request) {
	'use strict';
	
	var id, params;
	
	// Get the id from the pathParams
	id = request.pathParams.id;
	
	// Set up parameters for dynamo
	params = {
		TableName: 'profissional_servico',
		Key: { IdUsuario : id }
	};

	// Get the item using our promisified function
	return docClient.scanAsync(params);

}); //200 ok is standard for non-errors

