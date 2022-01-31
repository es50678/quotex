import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  console.log(`Received event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Received context: ${JSON.stringify(context, null, 2)}`);

  return Promise.resolve({
    'statusCode': 200,
    'headers': { 'Content-Type': 'application/vnd.api+json' },
    'body': JSON.stringify({
      someThing: 'stringified body',
    }),
  });
};
