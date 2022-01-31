import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { aws_iam as awsIam, RemovalPolicy, Stack } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path from 'path';

export class GetQuotesLambda extends Construct {
  function: lambda.Function;
  _id: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this._id = id;
    this.function = new NodejsFunction(this, 'GetQuotesFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: path.resolve(__dirname, '../index.ts'),
      handler: 'handler',
      currentVersionOptions: { removalPolicy: RemovalPolicy.RETAIN },
      bundling: { sourceMap: true, keepNames: true, minify: true },
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
      },
    });
  }

  grantLambdaInvokeToApiGateway(props: { apiGatewayRef: string }) {
    this.function.addPermission(`${this._id}-Permission`, {
      principal: new awsIam.ServicePrincipal('apigateway.amazonaws.com'),
      action: 'lambda:InvokeFunction',
      sourceArn: Stack.of(this).formatArn({
        service: 'execute-api',
        resource: props.apiGatewayRef,
        resourceName: '*/*',
      }),
    });
  }
}
