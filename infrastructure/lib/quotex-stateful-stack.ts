import { NestedStack, NestedStackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { QuotexApiGateway } from './quotex-api-gateway';

export class QuotexStatefulStack extends NestedStack {
  quotexApiWrapper: QuotexApiGateway;

  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    this.quotexApiWrapper = new QuotexApiGateway(this, 'quotexApiGateway', {
      apiName: 'QuotexApiGateway',
      description: 'Api gateway for quotex product',
    });
  }
}
