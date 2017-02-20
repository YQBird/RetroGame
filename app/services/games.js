import AWS from 'aws-sdk';
import fs from 'fs';
import { gameSchema } from './../models/game';
import path from 'path'

// get access credentials
import cred from './../config/user.json';

// create service object
var dynamodb = new AWS.DynamoDB(
	{
		apiVersions : '2012-08-10',
		accessKeyId : cred.Access_key,
		secretAccessKey : cred.Secret_access,
		region : 'us-west-2'
	}
);

// check if table exist, if not create new table
var DB_Init = () => {
	dynamodb.listTables({}, (err, data) => {
		if (err) {
			console.log(err, err.stack);
		}
		if (data.TableNames.length === 0) {
			console.log("Creating table Games...");
			createNewTable();
		}
		console.log("Get table Games from DynamoDB");
	});
}
	

var createNewTable = () => {
  dynamodb.createTable(gameSchema, (err, data) => {
  	if (err) {
  		console.log(err, err.stack);
  	}else{
  		console.log("Created table " + data.TableDescription.TableName);
  	}
  })
};

export { DB_Init };
