import { Controller, Post, Body, Query } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { GetResponseToReasonForCancellationType } from 'src/types/getResponseToReasonForCancellationQuery.type';
import { GetResponseToPolicyAndReasonForCancellationType } from 'src/types/getResponseToPolicyAndReasonForCancellationQuery.type';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('/retention/reason-for-cancellation')
  getResponseToReasonForCancellation(
    @Query() query: GetResponseToReasonForCancellationType,
  ) {
    return this.toolsService.getResponseToReasonForCancellation(query.reason);
  }

  @Post('/retention/policy-and-reason-for-cancellation')
  getResponseToPolicyAndReasonForCancellation(
    @Query() query: GetResponseToPolicyAndReasonForCancellationType,
  ) {
    return this.toolsService.getResponseToPolicyAndReasonForCancellation(
      // query.policy,
      query.reason,
    );
  }

  @Post('identity-verification')
  verifyIdentity(@Body() data: any) {
    return this.toolsService.verifyIdentity(data);
  }

  @Post('policy-lookup')
  lookupPolicy(@Body() data: any) {
    return this.toolsService.lookupPolicy(data);
  }

  @Post('benefits-explanation')
  explainBenefits(@Body() data: any) {
    return this.toolsService.explainBenefits(data);
  }

  @Post('communication-update')
  updateCommunication(@Body() data: any) {
    return this.toolsService.updateCommunication(data);
  }

  @Post('document-sharing')
  shareDocument(@Body() data: any) {
    return this.toolsService.shareDocument(data);
  }

  @Post('optional-benefits')
  optionalBenefits(@Body() data: any) {
    return this.toolsService.optionalBenefits(data);
  }

  @Post('survey-feedback')
  collectFeedback(@Body() data: any) {
    return this.toolsService.collectFeedback(data);
  }

  @Post('retention-proposal')
  retentionProposal(@Body() data: any) {
    return this.toolsService.retentionProposal(data);
  }
}
