import { ApiProperty } from '@nestjs/swagger';

export class GetCustomerDataType {
  @ApiProperty({ description: "Customer's ID" })
  document_number: string;
}
