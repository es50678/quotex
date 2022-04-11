import { z } from 'zod';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';

export class QuoteCreator {
  dynamoClient: DynamoDBDocumentClient;
  tableName: string;

  constructor(config: Config) {
    this.dynamoClient = config.dynamoClient;
    this.tableName = config.tableName;
  }

  async create(quote: Quote) {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        uuid: uuid(),
        ...quote,
      },
    });

    return this.dynamoClient.send(command);
  }
}

const Schema = {
  Config: z.object({
    dynamoClient: z.custom<DynamoDBDocumentClient>((i) => i instanceof DynamoDBDocumentClient),
    tableName: z.string(),
  }),
};
type Config = z.infer<typeof Schema['Config']>;

export interface Author {
  FirstName: string;
  LastName: string;
}
export interface Quote {
  Content: string;
  Author: Author;
}
