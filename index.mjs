import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async (event) => {
  if (event.operation === "PutItem") {
    const command = new PutCommand({
      TableName: "Animals",
      Item: {
        DeviceID: event.DeviceID,
        Timestamp: event.Timestamp,
        Data: event.data
      }
    });

    const response = await docClient.send(command);
    return response;
  } else if (event.operation === "Query") {
    const command = new QueryCommand({
      TableName: "Animals",
      KeyConditionExpression: "DeviceID = :id AND Timestamp > :ts",
      ExpressionAttributeValues: {
        ":id": event.DeviceID,
        ":ts": event.Timestamp
      }
    });

    const response = await docClient.send(command);
    return response;
  }

  return { message: "Invalid operation" };
};
