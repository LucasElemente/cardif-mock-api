import { Controller, Post, Query } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { GetFirstRoundOfObjectionsForRetentionQuery } from 'src/types/getFirstRoundOfObjectionsForRetentionQuery.type';
import { GetSecondRoundOfObjectionsForRetention } from 'src/types/getResponseToPolicyAndReasonForCancellationQuery.type';
import { GetValidationDataQuery } from 'src/types/getValidationDataQuery.type';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('/identity-verification')
  async verifyIdentity(@Query() query: GetValidationDataQuery) {
    return this.toolsService.verifyIdentity(query);
  }

  @Post('/policy/info')
  async policyInfo(@Query() query) {
    return this.toolsService.policyInfo(query);
  }

  @Post('/policy/coverages')
  async policyCoverages(@Query() query) {
    return this.toolsService.policyCoverages(query);
  }

  @Post('/policy/ecosystem')
  async policyEcosystem(@Query() query) {
    return this.toolsService.policyEcosystem(query);
  }

  @Post('/retention/objections/first-round')
  firstRoundOfObjectionsForRetention(
    @Query() query: GetFirstRoundOfObjectionsForRetentionQuery,
  ) {
    return this.toolsService.firstRoundOfObjectionsForRetention(query);
  }

  @Post('/retention/objections/second-round')
  secondRoundOfObjectionsForRetention(
    @Query() query: GetSecondRoundOfObjectionsForRetention,
  ) {
    return this.toolsService.secondRoundOfObjectionsForRetention(query);
  }
}
