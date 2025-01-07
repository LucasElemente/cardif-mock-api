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
      no_accepta_el_seguro: `Entiendo perfectamente \${nombre_cliente}, y valoro que me hayas compartido tu situación.Nuestro objetivo es asegurarnos de que toda la información relacionada con nuestros seguros sea clara y transparente para ti.`,
      no_interesa_o_no_necesita: `\${nombre_cliente}, entiendo que estés considerando cancelar tu póliza porque sientes que no la necesitas o no te interesa en este momento.Sin embargo, quiero recordarte que, aunque ahora no lo percibas, tu seguro sigue siendo una herramienta importante para tu protección y la de tu familia.Las coberturas de tu póliza están diseñadas para ayudarte en imprevistos.`,
      motivos_economicos: `\${nombre_cliente}, lamento mucho escuchar que estás considerando cancelar tu seguro debido a razones económicas. Entiendo que pueden haber momentos en los que ajustar los gastos es necesario. 💸Sin embargo, recuerda que los seguros son una inversión a futuro que pueden ayudarte en los momentos difíciles.`,
      ya_tiene_seguro: `\${nombre_cliente}, ¡qué bueno que cuentes con otros seguros! Es muy importante proteger tu futuro y el de tu familia. Sin embargo, quiero recordarte que no todos los seguros tienen las mismas coberturas, y siempre es útil evaluar si todas tus necesidades están completamente cubiertas.`,
      objecion_de_siniestro: `\${nombre_cliente}, entiendo perfectamente lo frustrante que puede ser enfrentar situaciones como la que estás viviendo. Es completamente comprensible que te sientas insatisfecho con la respuesta sobre el siniestro, y que eso te lleve a considerar la cancelación de tu seguro. Aunque no tengo todos los detalles de tu caso, a veces este tipo de situaciones pueden ocurrir cuando no se conocen a fondo las condiciones y los beneficios que tu seguro ofrece.`,
      entrega_de_producto_financiero_credito: `\${nombre_cliente}, entiendo que hayas terminado de pagar tu crédito antes de tiempo, ¡felicitaciones por esa gran decisión financiera! Sin embargo, ten en cuenta que tu póliza sigue siendo una protección valiosa para ti y tu familia, incluso después de haber terminado de pagar tu crédito. Las coberturas que ofrece tu póliza te protegen frente a imprevistos y pueden ayudarte a mantener tu estabilidad financiera en caso de cualquier eventualidad, ya que los riesgos no desaparecen con el pago del crédito.`,
      entrega_de_producto_financiero_tc: `\${nombre_cliente}, entiendo que estés considerando cancelar tu \${producto_financiero} y la póliza asociada a él. Sin embargo, quiero recordarte que tu seguro sigue siendo una protección importante para ti y tu familia. Si decides cancelar tu \${producto_financiero}, tal vez podamos explorar alternativas para mantener tu cobertura activa. Estoy aquí para ayudarte a tomar la mejor decisión y asegurar que sigas protegido.`,
    };

    const defaultResponse = `\${nombre_cliente}, entiendo que estés considerando cancelar tu póliza, y quiero asegurarme de que tomes la mejor decisión para ti. Las coberturas de tu póliza están diseñadas para protegerte a ti y a tu familia, brindándote tranquilidad ante situaciones imprevistas.`;

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
        no_interesa_o_no_necesita: `En Colombia, cada vez más familias enfrentan esta enfermedad. Este seguro no solo cubre gastos médicos, sino que también te da tranquilidad para afrontar lo inesperado con dignidad y seguridad.¿Te has preguntado cómo sería enfrentar esta situación sin el respaldo de un seguro?`,
        motivos_economicos: `Entiendo que cuidar tu presupuesto es importante, pero un diagnóstico de cáncer puede traer gastos que desestabilizan cualquier hogar.Este seguro está diseñado para evitar que ese peso recaiga sobre ti o tus seres queridos.¿Qué opinas de invertir en tu tranquilidad y la de tu familia con un costo accesible?`,
        ya_tiene_seguro: `Es excelente que ya cuentes con otra póliza; estar asegurado es una decisión inteligente.Sin embargo, mantener tu póliza actual también te da acceso a servicios adicionales que podrían sumar experiencias positivas a tu día a día y aprovecharlos puede ser un beneficio que no querrías dejar pasar.¿Estás seguro de que quieres perder estos beneficios?`,
        objecion_de_un_siniestro: `No tengo conocimiento del motivo de rechazo de tu siniestros, pero quiero recordarte que mantener tu póliza activa te ofrece mucho más que solo protección ante imprevistos.Además, te da acceso a servicios digitales exclusivos que pueden hacer tu vida mucho más fácil y ágil.¿Te has preguntado qué más podrías estar aprovechando con estos servicios disponibles para ti?`,
        entrega_producto_financiero: `Al mantener tu seguro, no solo cuentas con la cobertura esencial ante cualquier imprevisto, sino que también obtienes acceso a beneficios adicionales, como servicios digitales que pueden hacer tu vida más fácil y cómoda.Además, continuar con tu seguro te ofrece tranquilidad, sabiendo que estarás protegido ante situaciones inesperadas que pueden surgir en cualquier momento.¿No crees que mantener esta protección te da una seguridad extra y te facilita afrontar cualquier eventualidad que pueda ocurrir?`,
        otros_motivos: `Entiendo tus razones, pero quiero recordarte que este seguro está diseñado para apoyarte en uno de los momentos más desafiantes que alguien puede enfrentar.Mantenerlo activo significa contar con respaldo económico para tratamientos, medicamentos y cuidados esenciales, ofreciéndote tranquilidad en caso de cualquier eventualidad.¿Has pensado en cómo este respaldo podría marcar una diferencia para ti o tus seres queridos en el futuro?`,
      },
      desempleo: {
        no_interesa_o_no_necesita: `Se que hoy tu empleo es estable, pero las circunstancias pueden cambiar rápidamente.Este seguro te ofrece un respaldo en los momentos de transición para que tú y tu familia no tengan que preocuparse por lo económico.¿Te imaginas cómo sería contar con este apoyo si alguna vez lo necesitas?`,
        motivos_economicos: `Aunque estés ajustando tus finanzas, ¿te has planteado cómo cubrirías tus gastos si perdieras tu empleo y no tuvieras esta protección?`,
        ya_tiene_seguro: `Es excelente que ya cuentes con otra póliza; estar asegurado es una decisión inteligente.Sin embargo, mantener tu póliza actual también te da acceso a servicios adicionales que podrían sumar experiencias positivas a tu día a día y aprovecharlos puede ser un beneficio que no querrías dejar pasar.¿Estás seguro de que quieres perder estos beneficios?`,
        objecion_de_un_siniestro: `No tengo conocimiento del motivo de rechazo de tu siniestros, pero quiero recordarte que mantener tu póliza activa te ofrece mucho más que solo protección ante imprevistos.Además, te da acceso a servicios digitales exclusivos que pueden hacer tu vida mucho más fácil y ágil.¿Te has preguntado qué más podrías estar aprovechando con estos servicios disponibles para ti?`,
        entrega_producto_financiero: `Al mantener tu seguro, no solo cuentas con la cobertura esencial ante cualquier imprevisto, sino que también obtienes acceso a beneficios adicionales, como servicios digitales que pueden hacer tu vida más fácil y cómoda.Además, continuar con tu seguro te ofrece tranquilidad, sabiendo que estarás protegido ante situaciones inesperadas que pueden surgir en cualquier momento.¿No crees que mantener esta protección te da una seguridad extra y te facilita afrontar cualquier eventualidad que pueda ocurrir?`,
        otros_motivos: `Sé que estás tomando esta decisión por motivos personales, pero quiero que consideres que este seguro está pensado para brindarte estabilidad financiera en caso de pérdida inesperada de empleo.Mantenerlo activo te garantiza un respaldo que puede marcar la diferencia en momentos difíciles.¿Te has preguntado qué tan útil podría ser contar con esta ayuda cuando más lo necesites?`,
      },
      accidentes_personales: {
        no_interesa_o_no_necesita: `Entiendo que hoy puedas sentir que no necesitas este seguro, pero los accidentes no avisan y pueden ocurrir en los momentos más inesperados, incluso en actividades cotidianas como ir al trabajo o hacer deporte.Este seguro está diseñado para brindarte tranquilidad y apoyo financiero en caso de un accidente, evitando que un imprevisto afecte tus planes o a tu familia.¿Has pensado cómo enfrentarías una situación inesperada sin esta protección?`,
        motivos_economicos: `Es completamente comprensible querer cuidar cada peso, especialmente en estos tiempos.El costo de este seguro es mínimo comparado con lo que podrías gastar en una consulta médica, medicamentos o días de incapacidad sin ingresos.Un accidente inesperado puede generar gastos que desestabilicen tu presupuesto.Este seguro evita que tengas que asumir esos costos por completo.¿Cómo crees que manejarías los gastos si un accidente inesperado llegara a ocurrir?`,
        ya_tiene_seguro: `Es excelente que ya cuentes con otra póliza; estar asegurado es una decisión inteligente.Sin embargo, mantener tu póliza actual también te da acceso a servicios adicionales que podrían sumar experiencias positivas a tu día a día y aprovecharlos puede ser un beneficio que no querrías dejar pasar.¿Estás seguro de que quieres perder estos beneficios?`,
        objecion_de_un_siniestro: `No tengo conocimiento del motivo de rechazo de tu siniestros, pero quiero recordarte que mantener tu póliza activa te ofrece mucho más que solo protección ante imprevistos.Además, te da acceso a servicios digitales exclusivos que pueden hacer tu vida mucho más fácil y ágil.¿Te has preguntado qué más podrías estar aprovechando con estos servicios disponibles para ti?`,
        entrega_producto_financiero: `Al mantener tu seguro, no solo cuentas con la cobertura esencial ante cualquier imprevisto, sino que también obtienes acceso a beneficios adicionales, como servicios digitales que pueden hacer tu vida más fácil y cómoda.Además, continuar con tu seguro te ofrece tranquilidad, sabiendo que estarás protegido ante situaciones inesperadas que pueden surgir en cualquier momento.¿No crees que mantener esta protección te da una seguridad extra y te facilita afrontar cualquier eventualidad que pueda ocurrir?`,
        otros_motivos: `Entiendo tus motivos, pero este seguro es una forma de protegerte frente a situaciones inesperadas que podrían impactar tu vida y tus finanzas.Tenerlo activo significa que estarás preparado para cubrir gastos médicos o necesidades derivadas de un accidente.¿Te has detenido a pensar en cómo esta preparación podría aliviar el impacto de un imprevisto en tu vida o en la de tu familia?`,
      },
      enfermedades_graves: {
        no_interesa_o_no_necesita: `Sabemos que pensar en enfermedades graves no es fácil, pero estar preparado puede marcar la diferencia. La póliza de enfermedades graves de Cardif está diseñada para respaldarte en situaciones difíciles, como un infarto del miocardio, derrame cerebral, insuficiencia renal, trasplante de órganos o Esclerosis multiple. Estas son condiciones que, aunque nadie espera enfrentar, pueden sucederle a cualquiera y generar costos médicos y financieros significativos. Este seguro te ofrece apoyo económico cuando más lo necesitas, para que puedas concentrarte en tu recuperación sin preocuparte por los gastos.¿Te has puesto a pensar en cómo podrías afrontar una situación así sin contar con este respaldo?`,
        motivos_economicos: `Entiendo que cuidar tu presupuesto es una prioridad, sobre todo en momentos complicados. A veces pensamos que ahorrar en cosas como el seguro es la mejor opción, pero déjame plantearte algo: si mañana llegara a ocurrir algo inesperado como un infarto del miocardio, derrame cerebral, insuficiencia renal, trasplante de órganos o Esclerosis multiple, los gastos médicos podrían ser muchísimo más altos de lo que cuesta este seguro. Este seguro no es solo un gasto, es una manera de protegerte a ti y a tu familia de algo que podría afectarles mucho más. Sé que no es fácil, pero ¿te imaginas lo difícil que sería enfrentar esos costos sin esta ayuda?`,
        ya_tiene_seguro: `Es excelente que ya cuentes con otra póliza; estar asegurado es una decisión inteligente. Sin embargo, mantener tu póliza actual también te da acceso a servicios adicionales que podrían sumar experiencias positivas a tu día a día y aprovecharlos puede ser un beneficio que no querrías dejar pasar. ¿Estás seguro de que quieres perder estos beneficios?`,
        objecion_de_un_siniestro: `No tengo conocimiento del motivo de rechazo de tu siniestros, pero quiero recordarte que mantener tu póliza activa te ofrece mucho más que solo protección ante imprevistos. Además, te da acceso a servicios digitales exclusivos que pueden hacer tu vida mucho más fácil y ágil.¿Te has preguntado qué más podrías estar aprovechando con estos servicios disponibles para ti?`,
        entrega_producto_financiero: `Al mantener tu seguro, no solo cuentas con la cobertura esencial ante cualquier imprevisto, sino que también obtienes acceso a beneficios adicionales, como servicios digitales que pueden hacer tu vida más fácil y cómoda. Además, continuar con tu seguro te ofrece tranquilidad, sabiendo que estarás protegido ante situaciones inesperadas que pueden surgir en cualquier momento.¿No crees que mantener esta protección te da una seguridad extra y te facilita afrontar cualquier eventualidad que pueda ocurrir?`,
        otros_motivos: `Entiendo tu decisión, pero este seguro está diseñado para protegerte en los momentos más críticos de salud como lo puede ser  un infarto del miocardio, derrame cerebral, insuficiencia renal, trasplante de órganos o Esclerosis multiple . Tenerlo activo te asegura un respaldo financiero para tratamientos costosos y te permite concentrarte en lo más importante: tu recuperación.¿Has considerado cómo este apoyo podría darte tranquilidad si llegas a necesitarlo en el futuro`,
      },
      hogar: {
        no_interesa_o_no_necesita: `Tu hogar es más que un lugar; es donde construyes recuerdos y guardas lo más valioso para ti. Esta póliza de hogar protege tanto la estructura de tu vivienda ante imprevistos como incendios, inundaciones o daños eléctricos, como tus pertenencias frente a daños accidentales dentro de la casa. Nadie espera que ocurran este tipo de situaciones, pero estar preparado puede evitar preocupaciones y gastos inesperados. Este seguro te brinda la tranquilidad de saber que, pase lo que pase, tendrás un respaldo para proteger tu hogar y todo lo que significa para ti. ¿Te has puesto a pensar en cómo podrías afrontar estos imprevistos sin esta protección?`,
        motivos_economicos: `Sé que estás pensando en ajustar tus gastos, lo entiendo completamente. Ahora, imagina que un corto circuito daña tu sistema eléctrico y algunos electrodomésticos esenciales. Sin la póliza, ese gasto inesperado tendría que salir directamente de tu bolsillo, y sabemos lo complicado que puede ser afrontar esos costos en el momento menos esperado. Este seguro no es solo un gasto más, es una forma de proteger tu tranquilidad y tus recursos frente a imprevistos que pueden suceder en cualquier momento. ¿Crees que vale la pena mantener esta protección para evitar mayores preocupaciones más adelante?`,
        ya_tiene_seguro: `Es excelente que ya cuentes con otra póliza; estar asegurado es una decisión inteligente. Sin embargo, mantener tu póliza actual también te da acceso a servicios adicionales que podrían sumar experiencias positivas a tu día a día y aprovecharlos puede ser un beneficio que no querrías dejar pasar. ¿Estás seguro de que quieres perder estos beneficios?`,
        objecion_de_un_siniestro: `No tengo conocimiento del motivo de rechazo de tu siniestros, pero quiero recordarte que mantener tu póliza activa te ofrece mucho más que solo protección ante imprevistos. Además, te da acceso a servicios digitales exclusivos que pueden hacer tu vida mucho más fácil y ágil.¿Te has preguntado qué más podrías estar aprovechando con estos servicios disponibles para ti?`,
        entrega_producto_financiero: `Al mantener tu seguro, no solo cuentas con la cobertura esencial ante cualquier imprevisto, sino que también obtienes acceso a beneficios adicionales, como servicios digitales que pueden hacer tu vida más fácil y cómoda. Además, continuar con tu seguro te ofrece tranquilidad, sabiendo que estarás protegido ante situaciones inesperadas que pueden surgir en cualquier momento.¿No crees que mantener esta protección te da una seguridad extra y te facilita afrontar cualquier eventualidad que pueda ocurrir?`,
        otros_motivos: `Sé que puedes estar tomando en cuenta varias razones para cancelar, pero imagina esto: un día llegas a casa y, al abrir la puerta, te das cuenta de que un corto circuito en la electricidad ha afectado el sistema de cableado y ha dañado algunos electrodomésticos importantes. Sin un seguro, los costos de reparar la parte estructural de la instalación eléctrica y reemplazar los objetos dañados caerían directamente sobre ti. Este seguro te ayudaría a cubrir los gastos de reparar el daño estructural y/o reemplazar los artículos afectados, sin que tengas que asumir el costo total. ¿No crees que esta protección te ofrece tranquilidad frente a posibles imprevistos que podrían ser costosos de manejar?`,
      },
      fraude: {
        no_interesa_o_no_necesita: `Se que puede parecer algo poco probable, pero en muchas ciudades de Colombia, el robo y el fraude digital son situaciones más comunes de lo que imaginamos. Según las estadísticas, se reportaron más de 300,000 casos de robo solo el año pasado, y los fraudes digitales están aumentando rápidamente, con un crecimiento del 859% en los últimos tres años.Este seguro está pensado precisamente para cubrir esos imprevistos, como el robo de tus documentos o dinero, y protegerte ante posibles fraudes digitales. ¿Te imaginas cómo podrías manejar una situación como esa sin el respaldo adecuado?`,
        motivos_economicos: `Entiendo que las preocupaciones económicas son algo importante, y a veces puede parecer que cancelar el seguro es una forma de ahorrar. Sin embargo, en Colombia, el robo y el fraude digital son más comunes de lo que pensamos. El año pasado se reportaron más de 300,000 casos de robo, y los fraudes digitales han aumentado un 859% en los últimos años.Si alguna vez pierdes tu billetera o eres víctima de un fraude, los gastos para reponer tus documentos y bloquear tarjetas pueden ser mucho mayores de lo que imaginas. Este seguro está diseñado para ayudarte a cubrir esos imprevistos y protegerte frente a esos gastos inesperados.¿No crees que sería una buena idea mantener tu seguro, ya que solo necesitas invertir un poco hoy para evitar un gran gasto mañana?`,
        ya_tiene_seguro: `Es excelente que ya cuentes con otra póliza; estar asegurado es una decisión inteligente. Sin embargo, mantener tu póliza actual también te da acceso a servicios adicionales que podrían sumar experiencias positivas a tu día a día y aprovecharlos puede ser un beneficio que no querrías dejar pasar. ¿Estás seguro de que quieres perder estos beneficios?`,
        objecion_de_un_siniestro: `No tengo conocimiento del motivo de rechazo de tu siniestros, pero quiero recordarte que mantener tu póliza activa te ofrece mucho más que solo protección ante imprevistos. Además, te da acceso a servicios digitales exclusivos que pueden hacer tu vida mucho más fácil y ágil.¿Te has preguntado qué más podrías estar aprovechando con estos servicios disponibles para ti?`,
        entrega_producto_financiero: `Al mantener tu seguro, no solo cuentas con la cobertura esencial ante cualquier imprevisto, sino que también obtienes acceso a beneficios adicionales, como servicios digitales que pueden hacer tu vida más fácil y cómoda. Además, continuar con tu seguro te ofrece tranquilidad, sabiendo que estarás protegido ante situaciones inesperadas que pueden surgir en cualquier momento.¿No crees que mantener esta protección te da una seguridad extra y te facilita afrontar cualquier eventualidad que pueda ocurrir?`,
        otros_motivos: `Se  que pueden surgir diferentes razones para querer cancelar tu seguro, pero queremos recordarte lo importante que es mantenerlo. En Colombia, el robo y el fraude digital son más comunes de lo que pensamos. El año pasado, se reportaron más de 300,000 casos de robo, y el fraude digital ha aumentado un 859% en los últimos años.  Este seguro está diseñado para ofrecerte protección en esos momentos inesperados, cubriendo no solo la reposición de documentos o tarjetas, sino también ayudándote frente a los riesgos de fraude digital que pueden afectar tu economía. Mantener tu seguro es una forma de cuidar tu bienestar y el de tu familia, sin tener que afrontar grandes gastos en situaciones difíciles. ¿Realmente te gustaría correr el riesgo de enfrentarte a estos imprevistos sin estar respaldado?`,
      },
      perdida_o_robo_del_bolso: {
        no_interesa_o_no_necesita: `Se que puede parecer algo poco probable, pero en muchas ciudades de Colombia, el robo y el fraude digital son situaciones más comunes de lo que imaginamos. Según las estadísticas, se reportaron más de 300,000 casos de robo solo el año pasado, y los fraudes digitales están aumentando rápidamente, con un crecimiento del 859% en los últimos tres años.Este seguro está pensado precisamente para cubrir esos imprevistos, como el robo de tus documentos o dinero, y protegerte ante posibles fraudes digitales. ¿Te imaginas cómo podrías manejar una situación como esa sin el respaldo adecuado?`,
        motivos_economicos: `Entiendo que las preocupaciones económicas son algo importante, y a veces puede parecer que cancelar el seguro es una forma de ahorrar. Sin embargo, en Colombia, el robo y el fraude digital son más comunes de lo que pensamos. El año pasado se reportaron más de 300,000 casos de robo, y los fraudes digitales han aumentado un 859% en los últimos años.Si alguna vez pierdes tu billetera o eres víctima de un fraude, los gastos para reponer tus documentos y bloquear tarjetas pueden ser mucho mayores de lo que imaginas. Este seguro está diseñado para ayudarte a cubrir esos imprevistos y protegerte frente a esos gastos inesperados.¿No crees que sería una buena idea mantener tu seguro, ya que solo necesitas invertir un poco hoy para evitar un gran gasto mañana?`,
        ya_tiene_seguro: `Es excelente que ya cuentes con otra póliza; estar asegurado es una decisión inteligente. Sin embargo, mantener tu póliza actual también te da acceso a servicios adicionales que podrían sumar experiencias positivas a tu día a día y aprovecharlos puede ser un beneficio que no querrías dejar pasar. ¿Estás seguro de que quieres perder estos beneficios?`,
        objecion_de_un_siniestro: `No tengo conocimiento del motivo de rechazo de tu siniestros, pero quiero recordarte que mantener tu póliza activa te ofrece mucho más que solo protección ante imprevistos. Además, te da acceso a servicios digitales exclusivos que pueden hacer tu vida mucho más fácil y ágil.¿Te has preguntado qué más podrías estar aprovechando con estos servicios disponibles para ti?`,
        entrega_producto_financiero: `Al mantener tu seguro, no solo cuentas con la cobertura esencial ante cualquier imprevisto, sino que también obtienes acceso a beneficios adicionales, como servicios digitales que pueden hacer tu vida más fácil y cómoda. Además, continuar con tu seguro te ofrece tranquilidad, sabiendo que estarás protegido ante situaciones inesperadas que pueden surgir en cualquier momento.¿No crees que mantener esta protección te da una seguridad extra y te facilita afrontar cualquier eventualidad que pueda ocurrir?`,
        otros_motivos: `Se  que pueden surgir diferentes razones para querer cancelar tu seguro, pero queremos recordarte lo importante que es mantenerlo. En Colombia, el robo y el fraude digital son más comunes de lo que pensamos. El año pasado, se reportaron más de 300,000 casos de robo, y el fraude digital ha aumentado un 859% en los últimos años.  Este seguro está diseñado para ofrecerte protección en esos momentos inesperados, cubriendo no solo la reposición de documentos o tarjetas, sino también ayudándote frente a los riesgos de fraude digital que pueden afectar tu economía. Mantener tu seguro es una forma de cuidar tu bienestar y el de tu familia, sin tener que afrontar grandes gastos en situaciones difíciles. ¿Realmente te gustaría correr el riesgo de enfrentarte a estos imprevistos sin estar respaldado?`,
      },
      billetera_documentos: {
        no_interesa_o_no_necesita: `Se que puede parecer algo poco probable, pero en muchas ciudades de Colombia, el robo y el fraude digital son situaciones más comunes de lo que imaginamos. Según las estadísticas, se reportaron más de 300,000 casos de robo solo el año pasado, y los fraudes digitales están aumentando rápidamente, con un crecimiento del 859% en los últimos tres años.Este seguro está pensado precisamente para cubrir esos imprevistos, como el robo de tus documentos o dinero, y protegerte ante posibles fraudes digitales. ¿Te imaginas cómo podrías manejar una situación como esa sin el respaldo adecuado?`,
        motivos_economicos: `Entiendo que las preocupaciones económicas son algo importante, y a veces puede parecer que cancelar el seguro es una forma de ahorrar. Sin embargo, en Colombia, el robo y el fraude digital son más comunes de lo que pensamos. El año pasado se reportaron más de 300,000 casos de robo, y los fraudes digitales han aumentado un 859% en los últimos años.Si alguna vez pierdes tu billetera o eres víctima de un fraude, los gastos para reponer tus documentos y bloquear tarjetas pueden ser mucho mayores de lo que imaginas. Este seguro está diseñado para ayudarte a cubrir esos imprevistos y protegerte frente a esos gastos inesperados.¿No crees que sería una buena idea mantener tu seguro, ya que solo necesitas invertir un poco hoy para evitar un gran gasto mañana?`,
        ya_tiene_seguro: `Es excelente que ya cuentes con otra póliza; estar asegurado es una decisión inteligente. Sin embargo, mantener tu póliza actual también te da acceso a servicios adicionales que podrían sumar experiencias positivas a tu día a día y aprovecharlos puede ser un beneficio que no querrías dejar pasar. ¿Estás seguro de que quieres perder estos beneficios?`,
        objecion_de_un_siniestro: `No tengo conocimiento del motivo de rechazo de tu siniestros, pero quiero recordarte que mantener tu póliza activa te ofrece mucho más que solo protección ante imprevistos. Además, te da acceso a servicios digitales exclusivos que pueden hacer tu vida mucho más fácil y ágil.¿Te has preguntado qué más podrías estar aprovechando con estos servicios disponibles para ti?`,
        entrega_producto_financiero: `Al mantener tu seguro, no solo cuentas con la cobertura esencial ante cualquier imprevisto, sino que también obtienes acceso a beneficios adicionales, como servicios digitales que pueden hacer tu vida más fácil y cómoda. Además, continuar con tu seguro te ofrece tranquilidad, sabiendo que estarás protegido ante situaciones inesperadas que pueden surgir en cualquier momento.¿No crees que mantener esta protección te da una seguridad extra y te facilita afrontar cualquier eventualidad que pueda ocurrir?`,
        otros_motivos: `Se  que pueden surgir diferentes razones para querer cancelar tu seguro, pero queremos recordarte lo importante que es mantenerlo. En Colombia, el robo y el fraude digital son más comunes de lo que pensamos. El año pasado, se reportaron más de 300,000 casos de robo, y el fraude digital ha aumentado un 859% en los últimos años.  Este seguro está diseñado para ofrecerte protección en esos momentos inesperados, cubriendo no solo la reposición de documentos o tarjetas, sino también ayudándote frente a los riesgos de fraude digital que pueden afectar tu economía. Mantener tu seguro es una forma de cuidar tu bienestar y el de tu familia, sin tener que afrontar grandes gastos en situaciones difíciles. ¿Realmente te gustaría correr el riesgo de enfrentarte a estos imprevistos sin estar respaldado?`,
      },
    };

    const response = responses[query.policy.toLocaleLowerCase()];
    const message =
      response[query.reason.toLocaleLowerCase().replace(/\$/g, '')] ||
      response['otros_motivos'];

    return {
      success: true,
      message,
    };
  }
}
