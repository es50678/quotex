import { Construct } from 'constructs';
import { CfnApi, CfnStage } from 'aws-cdk-lib/aws-apigatewayv2';

export class QuotexApiGateway extends Construct {
  _id: string;
  apiGatewayCfn: CfnApi;
  apiGatewayDefaultStageCfn: CfnStage;

  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id);
    this._id = id;

    this.apiGatewayCfn = new CfnApi(this, `${this._id}-QuotexApiGatewayCfn`, {
      name: props.apiName,
      description: props.description,
      protocolType: 'HTTP',
    });

    this.apiGatewayDefaultStageCfn = new CfnStage(this, `${this._id}-QuotexApiGatewayDefaultStageCfn`, {
      apiId: this.apiGatewayCfn.ref,
      stageName: '$default',
      autoDeploy: true,
    });
  }
}

export interface IProps {
  apiName: string;
  description?: string;
}
