
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const OCCUPATIONS = [
  "Estudiante", 
  "Profesional Independiente", 
  "Empleado", 
  "Pensionado", 
  "Empresario/Dueño de Negocio",
  "Trabajador Informal/Comerciante"
];

export const PRIORITIES = [
  "Más Datos (Gigas)", 
  "Precio más bajo (Ahorro)", 
  "Minutos Ilimitados", 
  "Redes Sociales sin consumo",
  "Beneficios Digitales (Prime/Video)", 
  "Seguridad/Escudo Claro"
];

export const PRODUCTS = [
  {
    id: "38179",
    name: "Conectados 26.1 E 52.9_AP1",
    brand: "Claro",
    category: "Amazon Prime",
    price: 52900,
    competitorPrice: 60000,
    data: "55GB",
    minutes: "Ilimitados",
    benefits: ["Amazon Prime", "Claro Video", "Claro Música", "Claro Drive 100GB", "Claro Club", "WhatsApp, FB, X"],
    description: "Excelente para entretenimiento con Prime y buenas gigas.",
    discount: "20% meses 1-5 ($41.480)",
    argument: "Señor(a), por $52.900 le entrego 55 Gigas y Amazon Prime incluido. En el otro operador le cobran por aparte las plataformas de video. Pásese y asegure entretenimiento para su familia con nuestra excelente cobertura nacional.",
    scoreFactors: {
      budget: 52900,
      priorities: ["Beneficios Digitales (Prime/Video)", "Más Datos (Gigas)"],
      occupations: ["Empleado", "Profesional Independiente"]
    }
  },
  {
    id: "38180",
    name: "Conectados 26.1 E 53.9_CN_EC",
    brand: "Claro",
    category: "Seguridad y Cine",
    price: 53900,
    competitorPrice: 60000,
    data: "55GB",
    minutes: "Ilimitados",
    benefits: ["Escudo Claro", "Beneficio Cine", "Claro Video", "Claro Música", "Claro Drive 100GB", "WhatsApp, FB, X"],
    description: "Seguridad total para su dispositivo y beneficios en cine.",
    discount: "20% meses 1-5 ($41.020)",
    argument: "Si la seguridad bancaria y de sus datos es importante, este plan incluye Escudo Claro que detecta sitios fraudulentos. Además tiene beneficios de cine. Con el otro operador no tendría este respaldo. Su información estará segura con nosotros.",
    scoreFactors: {
      budget: 53900,
      priorities: ["Seguridad/Escudo Claro", "Beneficios Digitales (Prime/Video)"],
      occupations: ["Empresario/Dueño de Negocio", "Profesional Independiente"]
    }
  },
  {
    id: "38081",
    name: "Conectados 26.1 V 53.9",
    brand: "Claro",
    category: "Datos Max",
    price: 53900,
    competitorPrice: 60000,
    data: "65GB",
    minutes: "Ilimitados",
    benefits: ["Claro Video", "Claro Música", "Claro Drive 100GB", "Claro Club", "WhatsApp, FB, X"],
    description: "Ideal para uso recurrente de datos.",
    discount: "20% meses 1-5 ($43.120)",
    argument: "Con 65 Gigas usted puede navegar tranquilo todo el mes. El otro operador le puede ofrecer lo mismo en papel, pero nuestra señal llega a donde ellos no llegan. Manténgase siempre conectado en su trabajo.",
    scoreFactors: {
      budget: 53900,
      priorities: ["Más Datos (Gigas)"],
      occupations: ["Estudiante", "Trabajador Informal/Comerciante"]
    }
  },
  {
    id: "37213",
    name: "Conectados 26.1 V 47.9",
    brand: "Claro",
    category: "Pospago Estándar",
    price: 47900,
    competitorPrice: 55000,
    data: "50GB",
    minutes: "Ilimitados",
    benefits: ["Claro Video", "Claro Música", "Claro Drive 100GB", "Claro Club", "WhatsApp, FB, X"],
    description: "El equilibrio de gigas a un precio increíble.",
    discount: "50% descuento en el MES 1 ($23.950)",
    argument: "Para qué darle más vueltas. Este plan de $47.900 le da 50 gigas y redes sociales libres. Además el primer mes solo paga la mitad. Es la mejor forma de empezar a ahorrar de verdad en su telefonía.",
    scoreFactors: {
      budget: 47900,
      priorities: ["Precio más bajo (Ahorro)", "Más Datos (Gigas)"],
      occupations: ["Empleado", "Estudiante"]
    }
  },
  {
    id: "30018",
    name: "Conectados 25 V 3.1",
    brand: "Claro",
    category: "Económico",
    price: 38900,
    competitorPrice: 45000,
    data: "47GB",
    minutes: "Ilimitados",
    benefits: ["Claro Video", "Claro Música", "Claro Drive 100GB", "Claro Club", "WhatsApp, FB, X"],
    description: "La opción de entrada más económica.",
    discount: "20% meses 1-5 ($31.120)",
    argument: "Mire, por solo $38.900 usted ya tiene un plan pospago que no lo deja botado. Es mucho mejor que estar pendiente de recargas a cada rato. Aproveche el descuento y obtenga la red de mayor cobertura.",
    scoreFactors: {
      budget: 38900,
      priorities: ["Precio más bajo (Ahorro)"],
      occupations: ["Pensionado", "Trabajador Informal/Comerciante"]
    }
  }
];

export const OBJECTIONS = [
  {
    id: "obj_wom_price",
    title: "El otro operador me cobra más barato",
    icon: "DollarSign",
    general: "Lo barato sale caro. Otras marcas tienen cobertura limitada y procesos inestables.",
    arguments: {
      "General": "Don/Doña [Nombre], la diferencia pueden ser unos cuantos pesos, pero con nosotros tiene múltiples beneficios digitales incluidos y una red robusta. En otro operador, si sale de la ciudad, se queda sin señal. Pague por lo que de verdad le va a funcionar.",
      "Trabajador Informal/Comerciante": "Mire, para su negocio estar incomunicado un día significa perder plata. Con nosotros tiene señal en todo lado sin problemas. Usted necesita estabilidad real, no arriesgue su conectividad por un pequeño ahorro."
    }
  },
  {
    id: "obj_tigo_usa",
    title: "La competencia me da beneficios que ustedes no",
    icon: "WifiOff",
    general: "Hay que comparar correctamente las ofertas. Nosotros incluimos más beneficios de entretenimiento y navegación.",
    arguments: {
      "General": "A nivel de beneficios adicionales somos los más fuertes. Usted no solo recibe navegación, le damos plataformas de video, música y almacenamiento gratis. Eso es un gran ahorro mensual si tuviera que pagarlo aparte.",
      "Empleado": "En la competencia le cobran más caro por beneficios que no usará. Aquí el plan es más económico y le incluye beneficios reales que puede disfrutar desde hoy mismo con su familia."
    }
  },
  {
    id: "obj_signal",
    title: "En el pasado tuve mala señal con Claro",
    icon: "ArrowUpCircle",
    general: "Tenemos la red más moderna de Colombia y amplísima cobertura local.",
    arguments: {
      "General": "Eso es cosa del pasado. Hoy operamos la inmensa mayoría de las antenas modernas del país. Invertimos como nadie para que su señal fluya. Denos la oportunidad de mostrarle nuestra calidad actual.",
      "Pensionado": "Entiendo su duda, pero ahora nuestra cobertura llega a casi todo el país. Y si algo ocurre, tenemos miles de puntos de atención físicos. Siempre habrá un asesor de Claro para ayudarle cerquita."
    }
  },
  {
    id: "obj_no_benefits",
    title: "Dicen que Claro no da beneficios",
    icon: "Clipboard",
    general: "El ecosistema Claro es el más completo: Video, Música, Drive y Club de descuentos.",
    arguments: {
      "General": "Al contrario, ¡somos los que más damos! Todos nuestros planes incluyen Claro Video, Música, 100GB en la nube y Claro Club para descuentos. El paquete digital que le regalo tiene un enorme valor mensual.",
      "Trabajador Informal/Comerciante": "Usted recibe mucho más que datos, recibe un ecosistema completo que le sirve hasta para entretenimiento familiar. Ningún otro operador le ayuda a optimizar tanto su dinero como nosotros."
    }
  }
];

export const GUION_HABEAS_DIGITAL = `GUION HABEAS DATA: Venta Digital
Sr(a) [Nombre] con el fin de poder continuar con la contratación de los servicios informados, siendo hoy [Fecha] le enviaré un documento seguro, de forma digital para que autorice a Claro el tratamiento de sus datos y consulta a centrales de riesgo conforme a lo establecido en la Ley 1266 de 2008 y Ley 1581 de 2012 relacionado al tratamiento de datos.

¿Acepta Ud.? Si o no.

Sr(a) [Nombre] Me confirma su número de documento de identidad, Nombre completo y numero celular o correo electrónico para enviar el documento digital.`;

export const GUION_HABEAS_GRABADO = `GUION HABEAS DATA: Contrato Grabado
Sr(a) [Nombre] con el fin de poder continuar con la contratación de los servicios informados, autoriza a CLARO, siendo hoy [Fecha] para consultar su documento de identidad ante cualquier fuente y/o reporte en cualquier operador de información su comportamiento y crédito comercial, hábito de pago y en general el cumplimiento de sus obligaciones comerciales y pecuniarias, así como el tratamiento de sus datos personales, según lo dispuesto en la ley 1266 de 2008 y Ley 1581 de 2012.

¿Acepta Ud.? Si o no.

Sr(a) [Nombre] Me confirma su número de documento de identidad, Nombre completo y correo electrónico.`;

export const CONTRATO_ENTREGA_SIM = `CONTRATO MOVIL PORTABILIDAD ENTREGA DE SIM
Persona Natural + con IVA + bajo puerta

1. Señor/Señora [Nombre], Realizaremos la grabación del contrato para efectos de calidad y prestación de los servicios.
2. El prestador de servicios es Comcel en Adelante Claro.
3. Señor/Señora [Nombre], informar los siguientes datos tal cual como aparecen en su documento de identidad:
• Nombre y Apellidos: [Nombre]
• Número de cédula: [ID]

4. Señor/Señora [Nombre], autoriza a CLARO para obtener de cualquier fuente toda la información relevante para conocer su desempeño como deudor, y que la misma sea utilizada en caso de reporte y actualización de información desde y ante entidades crediticias o centrales que Administran datos. Acepta SI/NO.

5. Señor/Señora [Nombre], autoriza a CLARO para realizar el tratamiento de sus datos personales, con fines de prestación del servicio, relación contractual comerciales, publicitarios y trasmisión de datos a terceros, en los términos detallados en la política de tratamiento disponible para consulta en www.claro.com.co, Así mismo autoriza a CLARO el tratamiento de su dato sensible de voz para prevenir fraudes en la adquisición de productos y servicios y validar su identidad en próximos contactos telefónicos. Usted puede consultar, actualizar y rectificar sus datos, solicitar o revocar esta autorización, conocer el uso dado a sus datos y contactar a la Superintendencia de Industria y Comercio. Acepta SI/NO.

6. Señor/Señora [Nombre], confirmarme la línea que quiere Portar: [Numero_Portar].

7. Autoriza a CLARO para que realice, en su nombre, las peticiones y trámites administrativos necesarios y destinados a gestionar la portabilidad de la línea [Numero_Portar] desde su actual operador hacia CLARO. Acepta SI/NO.

8. A continuación, le solicitaré unos datos:
• Indíqueme su número de Teléfono de contacto.
• Indíqueme su dirección de correo electrónico
• Indíqueme su dirección física de correspondencia con ciudad y departamento.

10. ¿Autoriza a CLARO el envío de información por medio de mensajes de texto a su celular? Acepta SI/NO.

11. Señor/Señora [Nombre], Los productos que usted ha contratado con CLARO son los siguientes:
• Nombre del plan: [Nombre_Plan]
• Internet móvil de [Gigas_Plan]
• Las aplicaciones que podrá seguir usando terminada capacidad de datos del plan son: [Beneficios_Plan]
• Minutos nacionales: Ilimitados
• Mensajes de texto: Ilimitados
- Su plan cuenta con promoción de: [Descuento].

12. Los servicios adicionales que usted adquiere son: Ninguno. La fecha del cobro de los servicios adicionales será informada en el contrato final de la venta.

13. Los servicios tendrán un costo fijo de [Precio_Plan] Incluido IVA. Claro podrá incrementar anualmente el valor de su plan hasta un máximo de 17.7% del precio vigente.

14. La facturación será mensual anticipada.

15. La primera factura puede variar Proporcionalmente según la fecha de activación o instalación y los días trascurridos de la prestación de los servicios y por consumo de servicios adicionales.

16. Señor/Señora [Nombre], ¿Está de acuerdo con estas condiciones y con el plan adquirido? Acepta SI/NO.
- El plan es de uso exclusivo del suscriptor y no se permite su comercialización ni reventa, son causales para terminar el contrato, sin requerimiento previo.

17. Usted puede retractarse del contrato dentro de los (5) días hábiles siguientes a la entrega, siempre y cuando la prestación del servicio no haya empezado a ejecutarse.

18. Está de acuerdo en que su portabilidad sea realizada el dia DD/MM/AA. SI O NO.

19. Le informo que la entrega de la sim card se realizará en la dirección indicada, O hasta donde se permita el ingreso, ¿está de acuerdo SI O NO?

20. ¿Autoriza a Claro y a nuestro operador logístico para que lo contacte y asegure la entrega de su Sim Card? SI O NO.

21. Le informaremos a través de mensaje de texto si se presenta retraso en la entrega de la SIM o cualquier novedad en el proceso de portabilidad, usted acepta contactarnos a través de nuestras líneas telefónicas *611. para gestonar la solicitud? SI O NO.

22. Tenga en cuenta que, al momento de no tener servicio con su operador actual, podrá insertar su sim card y disfrutar los servicios de Claro.

23. CLARO remitirá por medios electrónicos (o a su dirección física) la factura, el contrato, las comunicaciones y las notificaciones de peticiones, quejas y recursos.

Condiciones Generales del contrato

24. El contrato será remitido dentro de los siguientes 30 días hábiles a su correo electrónico (o dirección informada). Tendrá (15) días hábiles para presentar objeciones.

25. Este contrato se renovará por un plazo de 12 meses, igual al inicialmente pactado de manera sucesiva y automáticamente.

26. Usted puede terminar el contrato en cualquier momento sin penalidades. Para esto debe realizar una solicitud a través de nuestros medios de atención mínimo 3 días hábiles antes del corte de facturación.

27. La mora en el pago genera suspensión del servicio, causará intereses a la máxima tasa legal, perderá los beneficios promocionales y un costo de reconexión de $ 6.191 IVA incluido Subsistiendo la obligación de cancelar la deuda.

28. En nuestros canales digitales www.claro.com.co y/o descargando la App Mi Claro, usted puede conocer el detalle de su plan, consumos, fecha de facturación, fecha límite de pago, consultar y efectuar el pago de su factura de forma inmediata, requerir soporte técnico en la línea gratuita *611, o puede conocer los números telefónicos locales o Centros de Atención y Ventas (CAV) o puntos de pago Claro a nivel nacional.

- Recuerde que mi nombre es ASESOR CLARO, Bienvenido a Claro. Estamos comprometidos con el mejor servicio.`;

export const CONTRATO_SIM_ADQUIRIDA = `CONTRATO MOVIL PORTABILIDAD SIM ADQUIRIDA
Persona Natural + con IVA + En punto

1. Señor/Señora [Nombre], Realizaremos la grabación del contrato para efectos de calidad y prestación de los servicios.
2. El prestador de servicios es Comcel en Adelante Claro.
3. Señor/Señora [Nombre], informar los siguientes datos tal cual como aparecen en su documento de identidad:
• Nombre y Apellidos: [Nombre]
• Número de cédula: [ID]

4. Señor/Señora [Nombre], autoriza a CLARO para obtener de cualquier fuente toda la información relevante para conocer su desempeño como deudor, y que la misma sea utilizada en caso de reporte y actualización de información desde y ante entidades crediticias o centrales que Administran datos. Acepta SI/NO.

5. Señor/Señora [Nombre], autoriza a CLARO para realizar el tratamiento de sus datos personales, con fines de prestación del servicio, relación contractual comerciales, publicitarios y trasmisión de datos a terceros, en los términos detallados en la política de tratamiento disponible para consulta en www.claro.com.co, Así mismo autoriza a CLARO el tratamiento de su dato sensible de voz para prevenir fraudes en la adquisición de productos y servicios y validar su identidad en próximos contactos telefónicos. Usted puede consultar, actualizar y rectificar sus datos, solicitar o revocar esta autorización, conocer el uso dado a sus datos y contactar a la Superintendencia de Industria y Comercio. Acepta SI/NO.

6. Señor/Señora [Nombre], confirmarme la línea que quiere Portar: [Numero_Portar].

7. Autoriza a CLARO para que realice, en su nombre, las peticiones y trámites administrativos necesarios y destinados a gestionar la portabilidad de la línea [Numero_Portar] desde su actual operador hacia CLARO. Acepta SI/NO.

8. A continuación, le solicitaré unos datos:
• Indíqueme su número de Teléfono de contacto.
• Indíqueme su dirección de correo electrónico
• Indíqueme su dirección física de correspondencia con ciudad y departamento.

10. ¿Autoriza a CLARO el envío de información por medio de mensajes de texto a su celular? Acepta SI/NO.

11. Señor/Señora [Nombre], Los productos que usted ha contratado con CLARO son los siguientes:
• Nombre del plan: [Nombre_Plan]
• Internet móvil de [Gigas_Plan]
• Las aplicaciones que podrá seguir usando terminada capacidad de datos del plan son: [Beneficios_Plan]
• Minutos nacionales: Ilimitados
• Mensajes de texto: Ilimitados
- Su plan cuenta con promoción de: [Descuento].

12. Los servicios adicionales que usted adquiere son: Ninguno. La fecha del cobro de los servicios adicionales será informada en el contrato final de la venta.

13. Los servicios tendrán un costo fijo de [Precio_Plan] Incluido IVA. Claro podrá incrementar anualmente el valor de su plan hasta un máximo de 17.7% del precio vigente.

14. La facturación será mensual anticipada.

15. La primera factura puede variar Proporcionalmente según la fecha de activación o instalación y los días trascurridos de la prestación de los servicios y por consumo de servicios adicionales.

16. Señor/Señora [Nombre], ¿Está de acuerdo con estas condiciones y con el plan adquirido? Acepta SI/NO.
- El plan es de uso exclusivo del suscriptor y no se permite su comercialización ni reventa, son causales para terminar el contrato, sin requerimiento previo.

17. Usted puede retractarse del contrato dentro de los (5) días hábiles siguientes a la entrega, siempre y cuando la prestación del servicio no haya empezado a ejecutarse.

18. Está de acuerdo en que su portabilidad sea realizada el dia DD/MM/AA. SI O NO.

19. CLARO remitirá por medios electrónicos (o a su dirección física) la factura, el contrato, las comunicaciones y las notificaciones de peticiones, quejas y recursos.

Condiciones Generales del contrato

20. El contrato será remitido dentro de los siguientes 30 días hábiles a su correo electrónico (o dirección informada). Tendrá (15) días hábiles para presentar objeciones.

21. Este contrato se renovará por un plazo de 12 meses, igual al inicialmente pactado de manera sucesiva y automáticamente.

22. Usted puede terminar el contrato en cualquier momento sin penalidades. Para esto debe realizar una solicitud a través de nuestros medios de atención mínimo 3 días hábiles antes del corte de facturación.

23. La mora en el pago genera suspensión del servicio, causará intereses a la máxima tasa legal, perderá los beneficios promocionales y un costo de reconexión de $ 6.191 IVA incluido Subsistiendo la obligación de cancelar la deuda.

24. En nuestros canales digitales www.claro.com.co y/o descargando la App Mi Claro, usted puede conocer el detalle de su plan, consumos, fecha de facturación, fecha límite de pago, consultar y efectuar el pago de su factura de forma inmediata, requerir soporte técnico en la línea gratuita *611, o puede conocer los números telefónicos locales o Centros de Atención y Ventas (CAV) o puntos de pago Claro a nivel nacional.

- Recuerde que mi nombre es ASESOR CLARO, Bienvenido a Claro. Estamos comprometidos con el mejor servicio.`;

export const GUION_MOVIL = `GUION MÓVIL
SR(A) [Nombre] CON NUMERO DE CC [ID] LE CONFIRMO EL SERVICIO QUE HA CONTRATADO CON NOSOTROS ES EL SIGUIENTE, SERVICIOS MÓVILES: [Nombre_Plan] ([Beneficios_Plan], [Descuento]), ESTOS SERVICIOS TENDRÁN UN COSTO FIJO DE [Precio_Plan] INCLUIDO IVA. ESTÁ DE ACUERDO CON ESTAS CONDICIONES Y CON EL PLAN ADQUIRIDO. CLIENTE: SI/NO.`;

export const OPENING_SCRIPTS = [
  {
    id: "fomo",
    title: "FOMO (Miedo a perderse algo)",
    text: "Hola [Nombre], le hablo de Claro porque hoy estamos cerrando una jornada especial de portabilidad para su zona. Es un beneficio de 'Doble de Datos' que solo estamos dando a quienes se pasen hoy mismo. ¿Le gustaría saber cómo quedar pagando lo mismo pero con el doble de internet?"
  },
  {
    id: "benefit",
    title: "BENEFICIO (Directo al ahorro)",
    text: "Hola [Nombre], ¿cómo está? Le llamo porque revisando su perfil vemos que está pagando demasiado por su plan actual. En Claro tenemos una oferta donde le bajamos la factura mensual y le incluimos servicios de video gratis. ¿Me permite 30 segundos y le muestro cuánto se va a ahorrar?"
  },
  {
    id: "pain",
    title: "DOLOR (Señal y Calidad)",
    text: "Hola [Nombre], ¿le ha pasado que se le caen las llamadas o el internet se pone lento cuando más lo necesita? Llamo para ofrecerle estabilidad total con la red de mayor cobertura en Colombia y un plan que sí le alcance hasta fin de mes. ¿Podemos revisar su ahorro hoy?"
  }
];

export const HABEAS_DATA_TEXT = `
"Señor(a) [Nombre], con el fin de poder continuar con la oferta de servicios informados, ¿autoriza usted a COMCEL S.A. (Claro), siendo hoy [Fecha], para consultar su documento de identidad ante cualquier fuente y/o reporte en cualquier operador de información su comportamiento y crédito comercial, hábito de pago y en general el cumplimiento de sus obligaciones, así como el tratamiento de sus datos personales, según lo dispuesto en la Ley 1266 de 2008 y Ley 1581 de 2012?"
(Esperar respuesta del cliente: SI/NO)
`;

export const CONTRACT_GENERIC_SCRIPT = `
"Yo, [Nombre_Agente], identificado con código de asesor [Codigo_Asesor], procedo a realizar la grabación del contrato para el señor(a) [Nombre_Cliente] con identificación [ID_Cliente]. 
Usted está adquiriendo el plan [Nombre_Plan] que incluye:
- [Gigas_Plan] de navegación mensual.
- Minutos y SMS ilimitados a nivel nacional.
- Beneficios adicionales: [Beneficios_Plan].
- Valor del Cargo Fijo Mensual: $[Precio_Plan] IVA incluído.
¿Usted acepta las condiciones del servicio, el plazo de facturación y autoriza la portabilidad de su línea [Numero_Portar] a la red de Claro Colombia?"
`;

export const LEGAL_TEXT = `
POLÍTICA DE TRATAMIENTO DE DATOS Y PORTABILIDAD:
1. El cliente autoriza el tratamiento de datos personales (Ley 1581 de 2012).
2. El cliente autoriza la consulta en centrales de riesgo (Ley 1266 de 2008).
3. La portabilidad se realizará en 24 horas hábiles tras la aceptación del NIP.
4. El plan es de carácter Pospago con factura mensual.
5. Los beneficios de meses gratis están sujetos a la permanencia del servicio.
`;
