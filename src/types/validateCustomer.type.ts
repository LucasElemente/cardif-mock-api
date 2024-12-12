import { ApiProperty } from '@nestjs/swagger';

export class ValidateCustomerType {
  @ApiProperty({ description: "Customer's ID" })
  document_number: string;

  @ApiProperty({ description: "Customer's full name" })
  full_name: string;

  @ApiProperty({ description: "Customer's birth date" })
  birth_date: string;

  @ApiProperty({ description: "Customer's phone number" })
  phone_number: string;

  @ApiProperty({ description: "Customer's email" })
  email: string;

  @ApiProperty({ description: 'The where the Customer was born' })
  birth_city: string;

  @ApiProperty({ description: "Customer's current city" })
  current_city: string;
}
