import { Injectable, Logger } from '@nestjs/common';
import { GetFirstRoundOfObjectionsForRetentionQuery } from 'src/types/getFirstRoundOfObjectionsForRetentionQuery.type';
import { GetSecondRoundOfObjectionsForRetention } from 'src/types/getResponseToPolicyAndReasonForCancellationQuery.type';
import { GetValidationDataQuery } from 'src/types/getValidationDataQuery.type';

@Injectable()
export class ToolsService {
  private readonly logger = new Logger(ToolsService.name);

  private readonly defaultCustomerData = {
    fullName: 'Liza Franco',
    birthDate: '19/04/2000',
    phoneNumber: '1234567',
    email: 'liza@gmail.com',
    documentNumber: '789123',
    documentType: 'CC',
    policies: [
      {
        status: 'V',
        name: 'Accidentes Personales',
        dateStart: '19/05/2022',
        prdId: '7032',
        grossValue: '1440000.0',
        valuePerMonth: '60000.0',
        valuePerDay: '2000.0',
        currency: 'COP',
      },
    ],
  };

  private readonly customerPool = {
    '123456': {
      fullName: 'Cesar Llajaruna',
      birthDate: '19/01/1999',
      phoneNumber: '1234567',
      email: 'cesar@gmail.com',
      documentNumber: '123456',
      documentType: 'CC',
      policies: [
        {
          status: 'V',
          name: 'Vida Prestige',
          dateStart: '19/05/2022',
          prdId: '7032',
          grossValue: '1440000.0',
          valuePerMonth: '60000.0',
          valuePerDay: '2000.0',
          currency: 'COP',
        },
      ],
    },
    '456789': {
      fullName: 'Lucas Felipe Dalamarta',
      birthDate: '17/03/1998',
      phoneNumber: '1234567',
      email: 'lucas@gmail.com',
      documentNumber: '456789',
      documentType: 'CC',
      policies: [
        {
          status: 'V',
          name: 'Unemployment',
          dateStart: '19/05/2022',
          prdId: '7032',
          grossValue: '1440000.0',
          valuePerMonth: '60000.0',
          valuePerDay: '2000.0',
          currency: 'COP',
        },
      ],
    },
    '789123': {
      fullName: 'Liza Franco',
      birthDate: '19/04/2000',
      phoneNumber: '1234567',
      email: 'liza@gmail.com',
      documentNumber: '789123',
      documentType: 'CC',
      policies: [
        {
          status: 'V',
          name: 'Accidentes Personales',
          dateStart: '19/05/2022',
          prdId: '7032',
          grossValue: '1440000.0',
          valuePerMonth: '60000.0',
          valuePerDay: '2000.0',
          currency: 'COP',
        },
      ],
    },
  };

  verifyIdentity(query: GetValidationDataQuery) {
    this.logger.log({ query });
    this.logger.log(
      `[verifyIdentity] with values ${JSON.stringify(query ?? {}, null, 3)}`,
    );

    return {
      success: true,
      message: 'Identity verified successfully.',
      data: this.customerPool[query.customerId] || this.defaultCustomerData,
    };
  }

  firstRoundOfObjectionsForRetention(
    query: GetFirstRoundOfObjectionsForRetentionQuery,
  ) {
    this.logger.log(
      `[getResponseToReasonForCancellation] with values ${JSON.stringify(query ?? {}, null, 3)}`,
    );

    this.logger.log({ query });

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
      responses[query.reason.toLocaleLowerCase().replace(/\$/g, '')] ||
      defaultResponse;

    return {
      success: true,
      message,
    };
  }

  secondRoundOfObjectionsForRetention(
    query: GetSecondRoundOfObjectionsForRetention,
  ) {
    this.logger.log(
      `[getResponseToPolicyAndReasonForCancellation] with values ${JSON.stringify(query ?? {}, null, 3)}`,
    );

    const responses = {
      cancer: {
        no_interesa_o_no_necesita: `
          En Colombia, cada vez más familias enfrentan esta enfermedad. 
          Este seguro no solo cubre gastos médicos, sino que también te da tranquilidad para afrontar lo inesperado con dignidad y seguridad.
          ¿Te has preguntado cómo sería enfrentar esta situación sin el respaldo de un seguro?
        `,
        motivos_economicos: `
          Entiendo que cuidar tu presupuesto es importante, pero un diagnóstico de cáncer puede traer gastos que desestabilizan cualquier hogar.
          Este seguro está diseñado para evitar que ese peso recaiga sobre ti o tus seres queridos.
          ¿Qué opinas de invertir en tu tranquilidad y la de tu familia con un costo accesible?
        `,
        ya_tiene_seguro: `
          Es excelente que ya cuentes con otra póliza; estar asegurado es una decisión inteligente.
          Sin embargo, mantener tu póliza actual también te da acceso a servicios adicionales que podrían sumar experiencias positivas a tu día a día y aprovecharlos puede ser un beneficio que no querrías dejar pasar.
          ¿Estás seguro de que quieres perder estos beneficios?
        `,
        objecion_de_un_siniestro: `
          No tengo conocimiento del motivo de rechazo de tu siniestros, pero quiero recordarte que mantener tu póliza activa te ofrece mucho más que solo protección ante imprevistos.
          Además, te da acceso a servicios digitales exclusivos que pueden hacer tu vida mucho más fácil y ágil.
          ¿Te has preguntado qué más podrías estar aprovechando con estos servicios disponibles para ti?
        `,
        entrega_producto_financiero: `
          Al mantener tu seguro, no solo cuentas con la cobertura esencial ante cualquier imprevisto, sino que también obtienes acceso a beneficios adicionales, como servicios digitales que pueden hacer tu vida más fácil y cómoda.
          Además, continuar con tu seguro te ofrece tranquilidad, sabiendo que estarás protegido ante situaciones inesperadas que pueden surgir en cualquier momento.
          ¿No crees que mantener esta protección te da una seguridad extra y te facilita afrontar cualquier eventualidad que pueda ocurrir?
        `,
        otros_motivos: `
          Entiendo tus razones, pero quiero recordarte que este seguro está diseñado para apoyarte en uno de los momentos más desafiantes que alguien puede enfrentar.
          Mantenerlo activo significa contar con respaldo económico para tratamientos, medicamentos y cuidados esenciales, ofreciéndote tranquilidad en caso de cualquier eventualidad.
          ¿Has pensado en cómo este respaldo podría marcar una diferencia para ti o tus seres queridos en el futuro?        `,
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
      fraude: {
        no_interesa_o_no_necesita: `
            ¿Qué harías si fueras víctima de un fraude financiero? 
            ¿Cómo cubrirías las pérdidas sin este seguro?
        `,
        motivos_economicos: `
            Aunque estés ajustando tus gastos, ¿te has planteado cuánto podría costarte enfrentar un fraude sin este respaldo?
        `,
        ya_tiene_seguro: `
            ¿Tu otro seguro incluye protección contra fraudes? 
            Este producto puede ser un complemento esencial.
        `,
        objecion_de_un_siniestro: `
            Sabemos que una experiencia previa puede generar dudas, pero ¿no crees que seguir protegido contra fraudes es más importante que nunca?
        `,
        entrega_producto_financiero: `
            Aunque estés cancelando el producto financiero, ¿has pensado en los riesgos de fraude que podrías enfrentar sin esta protección adicional?
        `,
        otros_motivos: `
            ¿Sabías que los fraudes financieros han incrementado y este seguro puede ayudarte a recuperar tu estabilidad?
        `,
      },
    };

    const response = responses[query.policy];
    const message =
      response[query.reason.toLocaleLowerCase().replace(/\$/g, '')] ||
      response['otros_motivos'];

    return {
      success: true,
      message,
    };
  }
}
