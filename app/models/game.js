import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema definition
const gameSchema = {
  AttributeDefinitions: [
    {
      AttributeName: "name", 
      AttributeType: "S"
    }
  ], 
  KeySchema: [
    {
      AttributeName: "name", 
      KeyType: "HASH"
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, 
    WriteCapacityUnits: 5
  }, 
  TableName: "Games"
};

export { gameSchema };


