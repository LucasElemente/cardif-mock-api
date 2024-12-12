import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ToolsService {
  private readonly logger = new Logger(ToolsService.name);

  verifyIdentity(data: any) {
    this.logger.log(
      `[verifyIdentity] with values ${JSON.stringify(data ?? {}, null, 3)}`,
    );

    return {
      success: true,
      message: 'Identity verified successfully.',
      data,
    };
  }

  lookupPolicy(data: any) {
    this.logger.log(
      `[lookupPolicy] with values ${JSON.stringify(data ?? {}, null, 3)}`,
    );

    return {
      success: true,
      message: 'Policy details retrieved successfully.',
      policyDetails: {
        policyName: 'Fraude Integral',
        startDate: '2022-02-19',
        coverage: '$39,179,000',
      },
    };
  }

  explainBenefits(data: any) {
    this.logger.log(
      `[explainBenefits] with values ${JSON.stringify(data ?? {}, null, 3)}`,
    );

    return {
      success: true,
      message: 'Benefits explained successfully.',
      benefits: [
        'Protection against accidental death',
        'Covers debit and credit card fraud',
      ],
    };
  }

  updateCommunication(data: any) {
    this.logger.log(
      `[updateCommunication] with values ${JSON.stringify(data ?? {}, null, 3)}`,
    );

    return {
      success: true,
      message: 'Contact information updated successfully.',
      data,
    };
  }

  shareDocument(data: any) {
    this.logger.log(
      `[shareDocument] with values ${JSON.stringify(data ?? {}, null, 3)}`,
    );

    return {
      success: true,
      message: 'Document shared successfully.',
      link: data.documentLink,
    };
  }

  optionalBenefits(data: any) {
    this.logger.log(
      `[optionalBenefits] with values ${JSON.stringify(data ?? {}, null, 3)}`,
    );

    return {
      success: true,
      message: 'Optional benefits shared successfully.',
      benefits: [
        'Free tax declaration services',
        'Access to an educational platform',
      ],
    };
  }

  collectFeedback(data: any) {
    this.logger.log(
      `[collectFeedback] with values ${JSON.stringify(data ?? {}, null, 3)}`,
    );

    const mockedQuestions = [
      'From 1 to 10, How satisfied are you with the resolution for your call?',
      'From 1 to 10, How much did the agent understand your needs?',
    ];

    return {
      success: true,
      message: 'Feedback collected successfully.',
      feedback: mockedQuestions.map((q: string, i: number) => ({
        question: q,
        answer: `Sample answer ${i + 1}`,
      })),
    };
  }

  retentionProposal(data: any) {
    this.logger.log(
      `[retentionProposal] with values ${JSON.stringify(data ?? {}, null, 3)}`,
    );

    return {
      success: true,
      message: 'Retention proposal processed successfully.',
      proposal: {
        discountOffered: data.discountOffered,
        alternativePlan: data.alternativePlan,
      },
    };
  }
}
