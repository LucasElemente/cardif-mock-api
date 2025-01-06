import { ApiProperty } from '@nestjs/swagger';
import { ECancellationReasons } from 'src/shared/enums';

export class GetFirstRoundOfObjectionsForRetentionQuery {
  @ApiProperty({ description: "Customer's reason for cancellation" })
  reason: ECancellationReasons;
}
