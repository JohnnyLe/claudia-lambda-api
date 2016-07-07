var AWS = require('aws-sdk'),
	Promise = require('bluebird'),
	shortid = require('shortid'),
	docClient = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient());

// Create new profissional
api.post('/agenda', function (request) {
	'use strict';

	// Map to the item to store from the posted data
	// (psst should an application/x-form-www-urlencoded be used
	//	we could have read it below with request.post.userId etc.)
	var params = {
		TableName: "agendamento",
		Item: {
			Id: shortid.generate(),
			IdServico: request.body.IdServico,
			DataAgendamento: request.body.Data,
            Horario: request.body.Horario,
            IdUsuario: request.body.IdUsuario,
			IdProfissional: request.body.IdProfissional,
            Intervalo: request.body.Intervalo,
            Tipo: request.body.Tipo
		}
	};

	// Store it and return the promise,
	// that will evaluate before reponding back to the client
	return docClient.putAsync(params);

}, { success: 201 }); // Return HTTP status 201 - Created when successful


// get user for {id}
api.get('/agenda/{id}/{data}', function (request) {
	'use strict';
	
	var id, data, params;
	
	// Get the id from the pathParams
	id = request.pathParams.id;
    data = request.pathParams.data;
	
	// Set up parameters for dynamo
	params = {
		TableName: 'agendamento',
		FilterExpression: 'IdProfissional = :id and DataAgendamento = :data',
		ExpressionAttributeValues: {
			':id': id,
			':data': data
		}
		//Key: { IdProfissional : id, DataAgendamento : data }
	};

	// Get the item using our promisified function
	return docClient.scanAsync(params);

}); //200 ok is standard for non-errors

