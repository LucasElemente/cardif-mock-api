import { Controller, Post, Body } from '@nestjs/common';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

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
