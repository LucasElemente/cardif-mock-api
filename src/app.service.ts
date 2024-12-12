import { Injectable } from '@nestjs/common';
import { ValidateCustomerType } from './types/validateCustomer.type';
import { GetCustomerDataType } from './types/getCustomerData.type';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getCustomerData(query: GetCustomerDataType) {
    const { document_number } = query;

    const defaultValue = {
      email: 'test@elemente.ai',
      policyName: 'Mocked policy',
      averagePremium: 100,
    };

    const dataMap = {
      '1': {
        email_address: 'sai@elemente.ai',
        policyName: 'Mocked policy',
        averagePremium: 10,
      },
      '2': {
        email_address: 'lucas@elemente.ai',
        policyName: 'Mocked policy',
        averagePremium: 20,
      },
      '3': {
        email_address: 'dean@elemente.ai',
        policyName: 'Mocked policy',
        averagePremium: 30,
      },
      '4': {
        email_address: 'cesar@elemente.ai',
        policyName: 'Mocked policy',
        averagePremium: 40,
      },
      '5': {
        email_address: 'navi@elemente.ai',
        policyName: 'Mocked policy',
        averagePremium: 50,
      },
    };

    return dataMap[document_number] || defaultValue;
  }

  async validateCustomer(query: ValidateCustomerType): Promise<boolean> {
    const {
      birth_city,
      birth_date,
      current_city,
      email,
      full_name,
      phone_number,
    } = query;

    console.log({
      birth_city,
      birth_date,
      current_city,
      email,
      full_name,
      phone_number,
    });

    if (
      birth_city === 'New York' &&
      current_city === 'New Jersey' &&
      full_name === 'Sai Sidam'
    )
      return true;
  }
}
