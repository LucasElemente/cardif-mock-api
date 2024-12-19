import { Injectable, Logger } from '@nestjs/common';
import { ECancellationReasons, EPolicies } from 'src/shared/enums';

@Injectable()
export class ToolsService {
  private readonly logger = new Logger(ToolsService.name);

  private pickRandomItems(sourceArray, count) {
    // Make a copy of the sourceArray to avoid modifying the original
    const sourceCopy = [...sourceArray];
    const selectedItems = [];

    // Pick `count` random items
    for (let i = 0; i < count; i++) {
      if (sourceCopy.length === 0) break; // Stop if there are no more items to pick
      const randomIndex = Math.floor(Math.random() * sourceCopy.length);
      selectedItems.push(sourceCopy[randomIndex]);
      sourceCopy.splice(randomIndex, 1); // Remove the selected item
    }

    // Add selected items to the target array
    return selectedItems;
  }

  private getRandomPolicy() {
    const values = Object.values(EPolicies); // Get all enum values
    const randomIndex = Math.floor(Math.random() * values.length); // Pick a random index
    return values[randomIndex];
  }

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
        policyName: 'Cuota protegida',
        startDate: '2022-02-19',
        coverage: '$10.000',
      },
    };
  }

  explainBenefits(data: any) {
    this.logger.log(
      `[explainBenefits] with values ${JSON.stringify(data ?? {}, null, 3)}`,
    );

    // const benefits = [
    //   'Protection against accidental death',
    //   'Covers debit and credit card fraud',
    //   "You have Tax guidance, which means that you can do your taxes with the help of our platform, at no extra cost, only requiring the policy's monthly payment",
    //   "You have access to the Coursera platform, with over 1500 courses, for you, and for a beneficiary, For instance, if you or a family member wants to take a course in English, IT, or economics, you can do so through that platform at no additional cost, only requiring the policy's monthly payment",
    // ];

    const benefits = [
      'Protección contra muerte accidental',
      'Cubre fraudes en tarjetas de débito y crédito',
      'Cuenta con orientación tributaria, lo que significa que puede realizar su declaración de impuestos con la ayuda de nuestra plataforma, sin costo adicional, solo requiriendo el pago mensual de la póliza',
      'Tiene acceso a la plataforma Coursera, con más de 1500 cursos, para usted y un beneficiario. Por ejemplo, si usted o un miembro de su familia desea tomar un curso de inglés, informática o economía, puede hacerlo a través de esa plataforma sin costo adicional, solo requiriendo el pago mensual de la póliza',
    ];

    return {
      success: true,
      message: 'Beneficios explicados con éxito.',
      benefits: this.pickRandomItems(benefits, 2),
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

  getResponseToReasonForCancellation(reason: ECancellationReasons) {
    this.logger.log(
      `[getResponseToReasonForCancellation] with values ${JSON.stringify(reason ?? '', null, 3)}`,
    );

    this.logger.log({ reason });

    const responses = {
      no_accepta_el_seguro: `
        Entiendo perfectamente \${nombre_cliente}, y valoro que me hayas compartido tu situación.
        Nuestro objetivo es asegurarnos de que toda la información relacionada con nuestros seguros sea clara y transparente para ti.
      `,
      no_interesa_o_no_necesita: `
        \${nombre_cliente}, entiendo que estés considerando cancelar tu póliza porque sientes que no la necesitas o no te interesa en este momento.
        Sin embargo, quiero recordarte que, aunque ahora no lo percibas, tu seguro sigue siendo una herramienta importante para tu protección y la de tu familia.
        Las coberturas de tu póliza están diseñadas para ayudarte en imprevistos.
      `,
      motivos_economicos: `
        \${nombre_cliente}, lamento mucho escuchar que estás considerando cancelar tu seguro debido a razones económicas. 
        Entiendo que pueden haber momentos en los que ajustar los gastos es necesario. 💸
        Sin embargo, recuerda que los seguros son una inversión a futuro que pueden ayudarte en los momentos difíciles.
      `,
      ya_tiene_seguro: `
        \${nombre_cliente}, ¡qué bueno que cuentes con otros seguros! 
        Es muy importante proteger tu futuro y el de tu familia. 
        Sin embargo, quiero recordarte que no todos los seguros tienen las mismas coberturas, y siempre es útil evaluar si todas tus necesidades están completamente cubiertas.
      `,
      objecion_de_siniestro: `
        \${nombre_cliente}, entiendo perfectamente lo frustrante que puede ser enfrentar situaciones como la que estás viviendo. 
        Es completamente comprensible que te sientas insatisfecho con la respuesta sobre el siniestro, y que eso te lleve a considerar la cancelación de tu seguro. 
        Aunque no tengo todos los detalles de tu caso, a veces este tipo de situaciones pueden ocurrir cuando no se conocen a fondo las condiciones y los beneficios que tu seguro ofrece.
      `,
      entrega_de_producto_financiero_credito: `
        \${nombre_cliente}, entiendo que hayas terminado de pagar tu crédito antes de tiempo, ¡felicitaciones por esa gran decisión financiera! 
        Sin embargo, ten en cuenta que tu póliza sigue siendo una protección valiosa para ti y tu familia, incluso después de haber terminado de pagar tu crédito. 
        Las coberturas que ofrece tu póliza te protegen frente a imprevistos y pueden ayudarte a mantener tu estabilidad financiera en caso de cualquier eventualidad, ya que los riesgos no desaparecen con el pago del crédito.
      `,
      entrega_de_producto_financiero_tc: `
        \${nombre_cliente}, entiendo que estés considerando cancelar tu \${producto_financiero} y la póliza asociada a él. 
        Sin embargo, quiero recordarte que tu seguro sigue siendo una protección importante para ti y tu familia. 
        Si decides cancelar tu \${producto_financiero}, tal vez podamos explorar alternativas para mantener tu cobertura activa. 
        Estoy aquí para ayudarte a tomar la mejor decisión y asegurar que sigas protegido.
      `,
    };

    const defaultResponse = `
        \${nombre_cliente}, entiendo que estés considerando cancelar tu póliza, y quiero asegurarme de que tomes la mejor decisión para ti. 
        Las coberturas de tu póliza están diseñadas para protegerte a ti y a tu familia, brindándote tranquilidad ante situaciones imprevistas.
      `;

    const message =
      responses[reason.toLocaleLowerCase().replace(/\$/g, '')] ||
      defaultResponse;

    return {
      success: true,
      message,
    };
  }

  getResponseToPolicyAndReasonForCancellation(
    // policy: EPolicies,
    reason: ECancellationReasons,
  ) {
    this.logger.log(
      `[getResponseToPolicyAndReasonForCancellation] with values ${JSON.stringify(reason ?? '', null, 3)}`,
    );

    this.logger.log({ reason });

    const randomPolicy = this.getRandomPolicy();

    const responses = {
      cancer: {
        no_interesa_o_no_necesita: `
            ¿Sabías que el cáncer puede afectar a cualquier persona sin previo aviso? 
            ¿Qué plan tienes para enfrentar los gastos de un tratamiento si llegara a suceder?
          `,
        motivos_economicos: `
            ¿Has considerado el costo de un tratamiento de cáncer y cómo podría este seguro proteger tus ahorros y los de tu familia?
          `,
        ya_tiene_seguro: `
            ¿Estás seguro de que tu cobertura actual incluye todas las enfermedades críticas y sus costos? 
            Este seguro puede complementar y garantizar tu protección total.
          `,
        objecion_de_un_siniestro: `
            Sabemos que tu experiencia pasada puede no haber sido la ideal, pero ¿te has planteado cómo enfrentarías un diagnóstico futuro sin esta cobertura?
          `,
        entrega_producto_financiero: `
            Entendemos que estás cancelando el producto financiero, pero ¿has considerado que este seguro puede seguir protegiéndote de manera independiente ante un diagnóstico inesperado?
          `,
        otros_motivos: `
            ¿Sabías que mantener un seguro contra enfermedades críticas podría ser tu mayor respaldo ante un diagnóstico inesperado?
          `,
      },
      desempleo: {
        no_interesa_o_no_necesita: `
            ¿Qué pasaría si enfrentaras una situación de desempleo inesperada? 
            ¿Te sentirías preparado para mantener tus gastos fijos sin el respaldo de este seguro?
          `,
        motivos_economicos: `
            Aunque estés ajustando tus finanzas, ¿te has planteado cómo cubrirías tus gastos si perdieras tu empleo y no tuvieras esta protección?
          `,
        ya_tiene_seguro: `
            ¿Tu otro seguro cubre de manera específica el desempleo? 
            Este producto puede ser un complemento importante para garantizar estabilidad financiera.
          `,
        objecion_de_un_siniestro: `
            ¿Crees que la experiencia pasada refleja todas las posibles ventajas que este seguro puede ofrecerte en el futuro?
          `,
        entrega_producto_financiero: `
            Sabemos que deseas cancelar el producto financiero, pero ¿te gustaría mantener esta protección que te respalda en caso de una situación de desempleo inesperada?
          `,
        otros_motivos: `
            ¿Te has planteado cómo podrías mantener tus gastos si perdieras tu empleo sin tener este respaldo?
          `,
      },
      accidentes_personales: {
        no_interesa_o_no_necesita: `
            ¿Qué pasaría si un accidente te impidiera trabajar o realizar tus actividades diarias? 
            ¿Cómo cubrirías esos gastos adicionales?
          `,
        motivos_economicos: `
            Sabemos que cuidar el presupuesto es importante, pero ¿cómo manejarías los gastos de un accidente inesperado sin esta protección?
          `,
        ya_tiene_seguro: `
            ¿Tu seguro actual cubre todas las eventualidades relacionadas con accidentes personales? 
            Este puede complementar tu protección.
          `,
        objecion_de_un_siniestro: `
            Entendemos tu experiencia pasada, pero ¿no crees que estar protegido para futuros eventos es esencial?
          `,
        entrega_producto_financiero: `
            Aunque estés cancelando el producto financiero, ¿te has planteado cómo podrías afrontar los gastos de un accidente sin este seguro?
          `,
        otros_motivos: `
            ¿Has considerado la tranquilidad que brinda este seguro para enfrentar los costos inesperados de un accidente?
          `,
      },
    };

    const response = responses[randomPolicy] || responses[EPolicies.DESEMPLEO];
    const message =
      response[reason.toLocaleLowerCase().replace(/\$/g, '')] ||
      response['otros_motivos'];

    return {
      success: true,
      message,
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
