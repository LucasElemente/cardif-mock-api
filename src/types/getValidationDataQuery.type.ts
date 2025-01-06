import { ApiProperty } from '@nestjs/swagger';

export class GetValidationDataQuery {
  @ApiProperty({ description: "Customer's id" })
  customerId: string;

  @ApiProperty({ description: "Customer's document type" })
  documentType: string;
}
