var ApiBuilder = require('claudia-api-builder'),
	Promise = require('bluebird'),
	DOC = require('dynamodb-doc'),
	api = new ApiBuilder(),
	docClient = Promise.promisifyAll(new DOC.DynamoDB());
    
    
// var apiBuilder = require('claudia-api-builder'),
//     api = new apiBuilder();
    
// var AWS = require('aws-sdk');

//var db = new AWS.DynamoDB();
// var dynamodb = new AWS.DynamoDB({apiVersion: 'latest'});

//  var DOC = require("dynamodb-doc");
//  var docClient = new DOC.DynamoDB();


// var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

module.exports = api;

api.get('/hello', function () {
    'use strict';
    
    var message = "";
    var id, params;
    
    //  .scan(
    //     {TableName: "dynamo-test", Limit:50},
    
    params = {
		TableName: 'dynamo-test',
		Key: {
			userid: "12"
		}
	};

	// Get the item using our promisified function
	return docClient.getItemAsync(params);
    
    // var params1 = {
    //     RequestItems: {
    //         'dynamo-test': {
    //             Keys: [
    //                 { userid: '12' },
    //             ]
    //         }
    //     }
    // };
    
    // var params = {
    //     TableName: "dynamo-test"
    // };
    
    // var dynamo = new AWS.DynamoDB();
    // message += "dynamo created";
    
    // var docClient = new AWS.DynamoDB.DocumentClient();
    // message += "- docClient created";

    // dynamo.scan(params, function(err, data) {
    //    message += "- entrou scan";
    //     if (err) {
    //         message += "- err :" + err;
    //     } else {
    //         message += "- data :" + data.userid;
    //     }
    // });

    // // return docClient;
    // docClient.batchGet(params, function(err, data) {
    //     message += "- entrou batchGet";
    //      if (err) {
    //         message += "- err bath:" + err;
    //     } else {
    //         message += "- data bath:" + data.userid;
    //     }
    // });

    //return message;

//    var params = {
//         Key: {
//             hashkey: 'userid',
//         },
//         TableName: 'dynamo-test'
//     };
    
    //return docClient;
    
    // docClient.get(params, function(err, data){
    //     return "entrou";
    //     // if (err) return "err";
    //     // else return "data"; 
    //     /**
    //      *  { 
    //      *      Item: { 
    //      *          hashkey: 'key'
    //      *          boolAttr: true,
    //      *          listAttr: [1, 'baz', true]
    //      *          mapAttr: {
    //      *              foo: 'bar'
    //      *          }
    //      *      }
    //      *  }
    //      **/
    // });
        
    //  docClient.listTables(function(err, data) {
    //    return dynamodb + " " + data.TableNames;
    // });

    // dynamoDB.putItem(
    // {
    //     "TableName": "Usuario",
    //     "Item": {
    //         "Id": {"N": "1"},
    //         "Username": {"S": "vsossella"},
    //         "Password": {"S": "123456"}
    //     }
    // }, function(result) {
    //     result.on('data', function(chunk) {
    //         console.log("" + chunk);
    //     });
    // });

    // return 'hi there updated!';
});
