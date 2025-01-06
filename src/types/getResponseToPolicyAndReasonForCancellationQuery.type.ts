import { ApiProperty } from '@nestjs/swagger';
import { ECancellationReasons, EPolicies } from 'src/shared/enums';

export class GetSecondRoundOfObjectionsForRetention {
  @ApiProperty({
    description:
      "Customer's policy (RANDOM, until we have policy lookup working)",
  })
  policy: EPolicies;

  @ApiProperty({ description: "Customer's reason for cancellation" })
  reason: ECancellationReasons;
}
