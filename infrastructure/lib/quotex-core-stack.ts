import { Stack, aws_apigatewayv2 as gateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { QuotexStatefulStack } from './quotex-stateful-stack';
import { GetQuotesLambda } from '@es50678/quotex-lambda-get-quotes/constructs';

export class QuotexCoreStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const statefulStack = new QuotexStatefulStack(this, 'quotexStatefulStack');
    const apiGateway = statefulStack.quotexApiWrapper.apiGatewayCfn;

    const getQuotesLambda = new GetQuotesLambda(this, 'GetQuotesHandler');
    getQuotesLambda.grantLambdaInvokeToApiGateway({ apiGatewayRef: apiGateway.ref });

    const getQuotesLambdaIntegration = new gateway.CfnIntegration(this, 'QuotexApiGatewayGetQuotesRouteIntegration', {
      apiId: apiGateway.ref,
      integrationType: 'AWS_PROXY',
      integrationUri: getQuotesLambda.function.functionArn,
      payloadFormatVersion: '2.0',
    });

    const getQuotesRoute = new gateway.CfnRoute(this, 'QuotexApiGatewayGetQuotesRoute', {
      apiId: apiGateway.ref,
      routeKey: 'GET /get-quotes',
      authorizationType: 'NONE',
      target: `integrations/${getQuotesLambdaIntegration.ref}`,
    });
  }
}
