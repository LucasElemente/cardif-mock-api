import { ApiProperty } from '@nestjs/swagger';
import { ECancellationReasons } from 'src/shared/enums';

export class GetResponseToReasonForCancellationType {
  @ApiProperty({ description: "Customer's reason for cancellation" })
  reason: ECancellationReasons;
}
