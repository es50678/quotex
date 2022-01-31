#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { QuotexCoreStack } from '../lib/quotex-core-stack';

const app = new cdk.App();
new QuotexCoreStack(app, 'QuotexInfrastructureStack');
