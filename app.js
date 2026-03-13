const STANDARDS = {
  'W3C VC':    { cls:'c-w3c' }, 'mDL ISO': { cls:'c-mdoc' },
  'OID4VC':    { cls:'c-oidc' }, 'AnonCreds': { cls:'c-anoncred' },
  'SD-JWT VC': { cls:'c-sd-jwt' }, 'EBSI': { cls:'c-ebsi' },
};

const LANG_DATA = {
  es: {
    ui: {
      pageTitle: 'Estándares de Credenciales Verificables por Caso de Uso',
      tagline: 'Credenciales Verificables · Identidad Digital · Interoperabilidad',
      eyebrow: 'Identidad Digital',
      h1: '<span>Estándares de Credenciales Verificables</span><br>por Caso de Uso',
      subtitle: 'Análisis comparativo desde la perspectiva del usuario final: qué estándar encaja mejor según el contexto, la privacidad requerida y el ecosistema de confianza. Haz clic en cualquier tarjeta para ver el detalle.',
      legendTitle: 'Estándares cubiertos',
      sectionTitle: 'Comparativa de Capacidades',
      sectionSub: 'Evaluación técnica de cada estándar en las dimensiones más relevantes para la toma de decisiones',
      thStandard: 'Estándar',
      thZKP: 'Privacidad ZKP',
      thSD: 'Divulg. Selectiva',
      thOffline: 'Uso Offline',
      thGov: 'Interop. Gob.',
      thMaturity: 'Madurez',
      thBest: 'Mejor para',
      tableLegendTitle: 'Cómo leer esta tabla',
      tlCheck: 'Soportado de forma nativa y completa en producción',
      tlPartial: 'Soporte parcial, con condiciones o en desarrollo activo',
      tlCross: 'No soportado actualmente — no hay camino estándar definido',
      primaryLabel: 'Estándares primarios',
      secondaryLabel: 'Complementarios',
      factorPrivacy: 'Privacidad',
      factorInterop: 'Interop.',
      factorAdoption: 'Adopción',
      factorOffline: 'Offline',
      recStandards: 'ESTÁNDARES RECOMENDADOS',
      keyReqs: 'REQUISITOS CLAVE',
    },
    useCases: [
      {
        icon:'🪪', title:'Identidad Nacional Digital', category:'Gobierno · Ciudadano',
        description:'Pasaporte digital, DNI electrónico o cartera de identidad gubernamental. Requiere máxima interoperabilidad gubernamental y una base legal sólida.',
        primary:['EBSI','mDL ISO','OID4VC'], secondary:['W3C VC','SD-JWT VC'],
        privacy:60, interop:95, adoption:80, offline:85,
        detail:{
          why:'Los gobiernos necesitan estándares con reconocimiento legal. EBSI/eIDAS 2.0 aporta el marco legal EU, mDL ISO la base física-digital, y OID4VC la capa de presentación digital.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'RECOMENDADO EU',reason:'Obligatorio en Europa (EUDIW). Incluye Trust Anchors, reconocimiento legal transfronterizo y atributos de identidad estandarizados por la Comisión Europea.'},
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'FÍSICO/DIGITAL',reason:'Estándar para licencias y IDs digitales. Presentación offline vía NFC/QR. Ya desplegado en varios estados de EE.UU., Australia y pilotos EU.'},
            {name:'OID4VC',cls:'c-oidc',label:'CAPA TRANSPORTE',reason:'Protocolo de presentación sobre HTTPS compatible con infraestructura OAuth2 existente de bancos y administraciones.'},
          ],
          requirements:[
            {icon:'⚖️',text:'<strong>Marco legal</strong>: Reconocido en la jurisdicción objetivo (eIDAS, REAL ID Act, etc.)'},
            {icon:'🔄',text:'<strong>Interoperabilidad</strong>: Compatible con sistemas ICAO, DMV y registros civiles existentes'},
            {icon:'📵',text:'<strong>Uso offline</strong>: Presentación sin conectividad en puntos físicos de control'},
          ]
        }
      },
      {
        icon:'🎓', title:'Credenciales Educativas', category:'Educación · RRHH',
        description:'Diplomas, certificados, micro-credenciales y portafolios de aprendizaje verificables por empleadores o instituciones académicas globalmente.',
        primary:['W3C VC','OID4VC'], secondary:['EBSI','SD-JWT VC'],
        privacy:55, interop:90, adoption:75, offline:40,
        detail:{
          why:'Las credenciales educativas necesitan ser verificables por empleadores globales sin infraestructura propietaria. W3C VC con DIDs es el estándar más adoptado en este sector (Open Badges v3, Europass).',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'RECOMENDADO',reason:'Base de Open Badges v3.0, Europass y la infraestructura EDCI. Permite datos ricos de logros de aprendizaje con verificación descentralizada vía DIDs.'},
            {name:'OID4VC',cls:'c-oidc',label:'EMISIÓN/WALLET',reason:'Protocolo de emisión y presentación para wallets estudiantiles. Compatible con LMS existentes.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'DIVULGACIÓN SELECTIVA',reason:'Útil cuando el titular quiere revelar solo cursos o notas específicas sin exponer el expediente académico completo.'},
          ],
          requirements:[
            {icon:'🌍',text:'<strong>Verificación global</strong>: Un empleador en cualquier país puede verificar sin contactar a la institución'},
            {icon:'📋',text:'<strong>Datos ricos</strong>: Competencias, créditos ECTS, fecha, nivel NQF, entidad emisora acreditada'},
          ]
        }
      },
      {
        icon:'🚗', title:'Licencia de Conducir Digital', category:'Gobierno · Transporte',
        description:'Versión digital del permiso de conducción. El caso de uso paradigmático para presentación física offline, verificación de edad y divulgación mínima de datos.',
        primary:['mDL ISO'], secondary:['SD-JWT VC','OID4VC'],
        privacy:70, interop:80, adoption:90, offline:100,
        detail:{
          why:'ISO 18013-5 es el estándar nacido específicamente para este caso. Define el formato mDoc, el protocolo de presentación presencial y la divulgación selectiva de atributos.',
          standards:[
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'ESTÁNDAR DE FACTO',reason:'El único diseñado específicamente para licencias digitales. Define mDoc CBOR, protocolos de proximidad (NFC/BLE), verificación offline y divulgación selectiva nativa.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'ALTERNATIVA ONLINE',reason:'Para verificación remota (alquiler de coches, plataformas digitales). Más ligero que mDoc para contextos puramente digitales.'},
            {name:'OID4VC',cls:'c-oidc',label:'CAPA TRANSPORTE',reason:'Complementa el mDL en presentaciones online. Varios estados de EE.UU. y la EU combinan mDoc con OID4VP para presentación remota.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Offline obligatorio</strong>: Un agente de tráfico no puede depender de conectividad'},
            {icon:'🛡️',text:'<strong>Anti-clonación</strong>: Device binding mediante clave privada en secure enclave'},
            {icon:'⚡',text:'<strong>Velocidad</strong>: Verificación en segundos en una parada de tráfico'},
          ]
        }
      },
      {
        icon:'🏢', title:'Identidad Empresarial (PYME)', category:'Empresa · B2B',
        description:'Acreditación de PYMEs para licitaciones públicas, onboarding bancario, aduanas y comercio electrónico B2B. Incluye poderes de representación y credenciales de entidad legal.',
        primary:['EBSI','W3C VC'], secondary:['OID4VC','SD-JWT VC'],
        privacy:40, interop:85, adoption:65, offline:30,
        detail:{
          why:'Las empresas necesitan demostrar su existencia legal, poderes notariales y cumplimiento (AML, KYB) de forma verificable entre jurisdicciones. EBSI define el Legal Entity VC y el Power of Attorney VC.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'RECOMENDADO EU',reason:'Define credenciales para Entidades Legales (EORI, LEI), poderes de representación y los vincula a la EUDIW del representante legal. Base del proyecto GLEIF vLEI.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'INTEROP GLOBAL',reason:'Para ecosistemas fuera de Europa. GLEIF usa W3C VC para credenciales organizacionales. Permite representar certificados de cámara de comercio, ISO 9001, etc.'},
          ],
          requirements:[
            {icon:'🏛️',text:'<strong>Registro legal</strong>: Vínculo verificable con el registro oficial de empresas'},
            {icon:'👤',text:'<strong>Representación</strong>: Director o apoderado actuando en nombre de la empresa'},
            {icon:'🌐',text:'<strong>Reconocimiento transfronterizo</strong>: Válido en licitaciones públicas EU'},
          ]
        }
      },
      {
        icon:'🏥', title:'Credenciales de Salud', category:'Sanidad · Personal',
        description:'Historial médico portátil, recetas digitales, certificados de vacunación y acreditación de profesionales sanitarios.',
        primary:['AnonCreds','SD-JWT VC'], secondary:['W3C VC','OID4VC'],
        privacy:100, interop:70, adoption:55, offline:60,
        detail:{
          why:'Sanidad es el caso de uso con mayores requisitos de privacidad. Se necesita divulgación mínima y protección contra correlación entre proveedores.',
          standards:[
            {name:'AnonCreds (ZKP)',cls:'c-anoncred',label:'MÁXIMA PRIVACIDAD',reason:'Pruebas ZKP para demostrar atributos ("está vacunado", "tiene receta válida") sin revelar identidad ni datos adicionales. Imposible correlacionar presentaciones entre distintos proveedores.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'ENFOQUE EQUILIBRADO',reason:'Alternativa más simple con divulgación selectiva. Permite revelar solo un diagnóstico específico sin exponer el historial completo.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'SMART HEALTH',reason:'Base de SMART Health Cards (vacunas COVID, EHR portátil). Amplia adopción en EE.UU. y Canadá para certificados interoperables con HL7/FHIR.'},
          ],
          requirements:[
            {icon:'🔏',text:'<strong>HIPAA / GDPR</strong>: Minimización de datos, consentimiento granular'},
            {icon:'🚫',text:'<strong>Anti-correlación</strong>: Imposible rastrear al paciente entre distintos proveedores'},
          ]
        }
      },
      {
        icon:'🏦', title:'KYC / Identidad Financiera', category:'Finanzas · Compliance',
        description:'Onboarding bancario, verificación AML/KYC reutilizable entre entidades y acreditación de inversores para reducir la fricción regulatoria.',
        primary:['SD-JWT VC','OID4VC'], secondary:['W3C VC','AnonCreds'],
        privacy:65, interop:80, adoption:60, offline:20,
        detail:{
          why:'El sector financiero necesita cumplimiento regulatorio (AMLD, FATF) con KYC reutilizable: el cliente verifica una vez y comparte la credencial con múltiples entidades.',
          standards:[
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'RECOMENDADO',reason:'Permite revelar solo los atributos que necesita cada entidad sin compartir el dossier KYC completo. Formato JWT familiar para equipos fintech.'},
            {name:'OID4VC',cls:'c-oidc',label:'INTEGRACIÓN API',reason:'Flujo de presentación compatible con OAuth2/OIDC ya usado por bancos. Facilita integración con sistemas CIAM existentes (Okta, Azure AD, etc.).'},
            {name:'AnonCreds (ZKP)',cls:'c-anoncred',label:'PRIVACIDAD AVANZADA',reason:'Para casos que requieren prueba de rangos ("ingresos > 50K") o predicados ("mayor de 18") sin revelar el valor exacto.'},
          ],
          requirements:[
            {icon:'📋',text:'<strong>Trazabilidad regulatoria</strong>: Demostrar cumplimiento a auditores sin exponer datos del cliente'},
            {icon:'🔄',text:'<strong>Reutilización</strong>: KYC realizado una vez, válido en múltiples entidades del grupo o sector'},
          ]
        }
      },
      {
        icon:'⚖️', title:'Licencias Profesionales', category:'Regulación · Profesional',
        description:'Habilitación para ejercer profesiones reguladas: abogados, médicos, contadores, ingenieros, farmacéuticos. Verificación por colegios profesionales.',
        primary:['W3C VC','EBSI'], secondary:['OID4VC','SD-JWT VC'],
        privacy:50, interop:80, adoption:55, offline:45,
        detail:{
          why:'Los colegios profesionales necesitan emitir credenciales que empleadores y pacientes puedan verificar instantáneamente. W3C VC con el DID del colegio como emisor es el modelo más flexible.',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'RECOMENDADO',reason:'El emisor es el colegio profesional identificado por su DID. La credencial incluye número de matrícula, especialidades y estado del colegiado. Verificación sin llamar al registro.'},
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'MARCO EU',reason:'Para reconocimiento transfronterizo de cualificaciones profesionales entre estados miembros (Directiva 2005/36/CE actualizada).'},
          ],
          requirements:[
            {icon:'🏛️',text:'<strong>Autoridad emisora</strong>: El colegio debe tener un DID/identidad verificable y reconocida'},
            {icon:'🔄',text:'<strong>Vigencia</strong>: Actualizaciones automáticas de estado (suspensión, sanción, nueva especialidad)'},
            {icon:'🌍',text:'<strong>Transfronterizo</strong>: Reconocimiento entre países para profesionales móviles'},
          ]
        }
      },
      {
        icon:'🔞', title:'Verificación de Edad', category:'Privacidad · Consumidor',
        description:'Prueba de mayoría de edad para alcohol, apuestas, contenido adulto o servicios financieros, sin revelar fecha de nacimiento ni identidad completa.',
        primary:['AnonCreds','SD-JWT VC','mDL ISO'], secondary:['W3C VC'],
        privacy:95, interop:60, adoption:50, offline:75,
        detail:{
          why:'Este es el caso paradigmático de privacidad mínima: solo se necesita confirmar "mayor de X años" sin revelar ningún otro dato.',
          standards:[
            {name:'AnonCreds (ZKP)',cls:'c-anoncred',label:'PRIVACIDAD TOTAL',reason:'Prueba criptográfica de un predicado: "fecha_nacimiento < 2006-01-01" sin revelar la fecha real. El verificador solo sabe que se cumple la condición.'},
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'OFFLINE/FÍSICO',reason:'Divulgación selectiva del atributo "age_over_18: true" de un carnet de conducir. Ya implementado en Apple Wallet y Google Wallet.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'ONLINE',reason:'Para verificación de edad en plataformas digitales. El claim "age_over_18" puede revelarse selectivamente sin exponer nombre, dirección o fecha exacta.'},
          ],
          requirements:[
            {icon:'🚫',text:'<strong>Datos mínimos</strong>: Solo el booleano de edad, nada más'},
            {icon:'🔗',text:'<strong>No vinculabilidad</strong>: Imposible rastrear al usuario entre tiendas o plataformas'},
          ]
        }
      },
      {
        icon:'📦', title:'Cadena de Suministro', category:'Logística · Comercio',
        description:'Trazabilidad de productos, certificados de origen, auditorías ESG de sostenibilidad, aduanas y certificaciones de calidad a lo largo de la cadena de suministro.',
        primary:['W3C VC','OID4VC'], secondary:['SD-JWT VC','EBSI'],
        privacy:35, interop:90, adoption:50, offline:50,
        detail:{
          why:'En cadena de suministro, los "titulares" son empresas o productos, y la cadena de custodia requiere credenciales encadenadas. W3C VC con DIDs de organización es el modelo natural.',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'RECOMENDADO',reason:'Permite credenciales de producto (DID del producto + origen, composición, atributos de auditoría). Compatible con GS1 Digital Link. Base de Catena-X (cadena automotriz EU).'},
            {name:'OID4VC',cls:'c-oidc',label:'PRESENTACIÓN B2B',reason:'Para flujos de verificación en aduanas, plataformas de aprovisionamiento o auditorías ESG donde múltiples actores necesitan verificar credenciales vía API.'},
          ],
          requirements:[
            {icon:'🔗',text:'<strong>Cadena de custodia</strong>: Credenciales encadenadas de múltiples actores verificables de extremo a extremo'},
            {icon:'📋',text:'<strong>Estándares sectoriales</strong>: Alineación con GS1, ISO 14001, SA8000, etc.'},
            {icon:'🤖',text:'<strong>Machine-readable</strong>: Verificación automática en sistemas ERP sin intervención humana'},
          ]
        }
      },
      {
        icon:'✈️', title:'Turismo y Viajes Internacionales', category:'Viajes · Aviación · Fronteras',
        description:'Credenciales de viaje interoperables: pasaportes digitales, visas, datos de salud para viajeros, acceso a lounges, check-in sin papel y cruce de frontera digital.',
        primary:['mDL ISO','OID4VC'], secondary:['W3C VC','SD-JWT VC'],
        privacy:65, interop:90, adoption:60, offline:90,
        detail:{
          why:'La aviación y los viajes internacionales requieren credenciales que funcionen offline en aeropuertos sin conectividad, y que sean reconocidas por autoridades de distintos países. El sector IATA está convergiendo hacia mDoc+OID4VC como stack estándar.',
          standards:[
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'PRESENTACIÓN FÍSICA',reason:'La base técnica para Digital Travel Credentials (DTC). El formato mDoc funciona en lectores de aeropuertos, cruces fronterizos y escáneres de check-in sin conectividad. Ya soportado en Apple Wallet y Google Wallet para TSA en EE.UU.'},
            {name:'OID4VC',cls:'c-oidc',label:'PROTOCOLOS DIGITALES',reason:'IATA One ID usa OID4VP para presentación de credenciales de pasajero en plataformas digitales. Compatible con sistemas de reserva (Amadeus, Sabre) y portales web de aerolíneas.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'CREDENCIALES ADICIONALES',reason:'Para credenciales de salud del viajero (vacunas, pruebas PCR), tarjetas de fidelización verificables o acreditaciones de prensa. ICAO DTC Type 2 se basa en W3C VC para pasaportes digitales de próxima generación.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Offline obligatorio</strong>: Los aeropuertos y cruces fronterizos pueden no tener conectividad fiable'},
            {icon:'🌍',text:'<strong>Reconocimiento internacional</strong>: Aceptado por autoridades de distintos países (ICAO, Schengen, TSA)'},
            {icon:'⚡',text:'<strong>Velocidad</strong>: El cruce de frontera debe completarse en segundos'},
            {icon:'🔒',text:'<strong>Biometría</strong>: Vínculo entre la credencial y la biometría facial para anti-suplantación'},
          ]
        }
      },
      {
        icon:'🌾', title:'Agricultura y Trazabilidad Agroalimentaria', category:'Agro · ESG · Exportaciones',
        description:'Certificados de origen, trazabilidad de producto desde campo hasta consumidor, cumplimiento fitosanitario, credenciales de agricultor y acceso a financiamiento agrícola.',
        primary:['W3C VC','OID4VC'], secondary:['SD-JWT VC','EBSI'],
        privacy:40, interop:80, adoption:40, offline:70,
        detail:{
          why:'El sector agro necesita credenciales que funcionan en áreas rurales con conectividad limitada, que sean verificables por autoridades fitosanitarias internacionales y que permitan rastrear el producto desde el campo hasta el consumidor final, incluyendo certificaciones de sostenibilidad (orgánico, fair trade, carbono).',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'TRAZABILIDAD',reason:'Modelo ideal para credenciales de producto con DID propio (lote, finca, exportador). Compatible con GS1 Digital Link para integración con códigos QR/barcodes en etiquetas. Base del UN Transparency Protocol (UNTP) para huella de carbono verificable.'},
            {name:'OID4VC',cls:'c-oidc',label:'INTEROP B2B',reason:'Para la presentación de certificados fitosanitarios, cuarentena y cumplimiento HACCP entre exportadores, importadores y autoridades aduaneras. Compatible con plataformas de comercio electrónico B2B agrícola.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'DATOS SENSIBLES',reason:'Cuando el productor quiere compartir certificación orgánica con un comprador sin revelar sus costos de producción, contratos con proveedores o datos financieros del negocio.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Funcionalidad offline</strong>: Las fincas agrícolas suelen tener conectividad muy limitada o nula'},
            {icon:'🌱',text:'<strong>Certificaciones ESG</strong>: Orgánico, fair trade, Rainforest Alliance, huella de carbono verificable'},
            {icon:'📦',text:'<strong>Trazabilidad extremo a extremo</strong>: Del campo al consumidor, con cada actor de la cadena firmando'},
            {icon:'💰',text:'<strong>Acceso a financiamiento</strong>: Las credenciales verificables habilitan préstamos agrícolas basados en historial de producción'},
            {icon:'🏛️',text:'<strong>Cumplimiento regulatorio</strong>: SENASA, FDA, EFSA según mercado destino'},
          ]
        }
      },
      {
        icon:'🏛️', title:'Sector Público y Gobierno Digital', category:'Gobierno · Servicios Públicos',
        description:'Trámites gubernamentales digitales, acceso a beneficios sociales, expediente ciudadano único, voto electrónico y comunicación entre agencias sin silos de datos.',
        primary:['EBSI','W3C VC','OID4VC'], secondary:['SD-JWT VC','mDL ISO'],
        privacy:70, interop:85, adoption:65, offline:50,
        detail:{
          why:'Los gobiernos son los emisores más confiables del ecosistema (identidad, estado civil, tributario, laboral). El reto es hacer que las credenciales emitidas por un ministerio sean verificables en cualquier otra agencia, municipio o servicio privado acreditado, sin construir silos.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'MARCO LEGAL EU',reason:'Infraestructura técnica y legal para que los gobiernos europeos emitan y reconozcan credenciales entre sí. El PID (Person Identification Data) define el conjunto mínimo de atributos que cada EUDIW debe soportar. Obligatorio para servicios esenciales EU desde noviembre 2026.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'CREDENCIALES SECTORIALES',reason:'Para credenciales específicas de cada servicio: subsidios de desempleo, licencias de construcción, beneficios fiscales, registros de propiedad. Los DIDs de las agencias gubernamentales actúan como raíces de confianza verificables.'},
            {name:'OID4VC',cls:'c-oidc',label:'INTEGRACIÓN SISTEMAS',reason:'Permite integrar el flujo de credenciales con los sistemas de autenticación federada del gobierno (tipo Cl@ve en España, GOV.UK One Login, etc.) sin reemplazar la infraestructura existente.'},
          ],
          requirements:[
            {icon:'🔒',text:'<strong>Soberanía de datos</strong>: El ciudadano controla qué agencia ve qué datos, en línea con GDPR/LOPD'},
            {icon:'♿',text:'<strong>Accesibilidad</strong>: El sistema debe funcionar para ciudadanos sin smartphone (canal alternativo)'},
            {icon:'🔗',text:'<strong>Interoperabilidad inter-agencias</strong>: Una credencial del ministerio de educación debe ser reconocida por el ministerio de trabajo'},
            {icon:'🏛️',text:'<strong>Archivo y auditoría</strong>: Las presentaciones deben ser registrables para auditorías sin comprometer privacidad'},
          ]
        }
      }
    ],
    tableData: [
      { name:'W3C VC Data Model', org:'W3C / DIF', cls:'c-w3c', zkp:false, sd:'~', offline:false, gov:true, maturity:'Alta', pill:'c-w3c', best:'Educación, RRHH, B2B' },
      { name:'ISO 18013-5 mDL', org:'ISO / IEC', cls:'c-mdoc', zkp:false, sd:true, offline:true, gov:true, maturity:'Alta', pill:'c-mdoc', best:'Licencias, ID físico, Viajes' },
      { name:'OID4VC / OIDC', org:'OpenID Foundation', cls:'c-oidc', zkp:false, sd:'~', offline:false, gov:true, maturity:'Med-Alta', pill:'c-oidc', best:'Wallets, APIs, KYC' },
      { name:'AnonCreds (ZKP)', org:'Hyperledger / AnonCreds', cls:'c-anoncred', zkp:true, sd:true, offline:false, gov:false, maturity:'Media', pill:'c-anoncred', best:'Salud, edad, finanzas' },
      { name:'SD-JWT VC', org:'IETF OAuth WG', cls:'c-sd-jwt', zkp:false, sd:true, offline:false, gov:'~', maturity:'Med-Alta', pill:'c-sd-jwt', best:'KYC, datos sensibles' },
      { name:'EBSI / eIDAS 2.0', org:'Comisión Europea', cls:'c-ebsi', zkp:false, sd:'~', offline:false, gov:true, maturity:'Alta (EU)', pill:'c-ebsi', best:'ID Nacional EU, PYMEs, Gobierno' },
    ],
  },

  en: {
    ui: {
      pageTitle: 'Verifiable Credentials Standards by Use Case',
      tagline: 'Verifiable Credentials · Digital Identity · Interoperability',
      eyebrow: 'Digital Identity',
      h1: '<span>Verifiable Credentials Standards</span><br>by Use Case',
      subtitle: 'A comparative analysis from the end-user perspective: which standard fits best depending on the context, privacy requirements, and trust ecosystem. Click any card to see the full breakdown.',
      legendTitle: 'Standards covered',
      sectionTitle: 'Capability Comparison',
      sectionSub: 'Technical evaluation of each standard across the dimensions most relevant for decision-making',
      thStandard: 'Standard',
      thZKP: 'ZKP Privacy',
      thSD: 'Selective Disc.',
      thOffline: 'Offline Use',
      thGov: 'Gov. Interop.',
      thMaturity: 'Maturity',
      thBest: 'Best for',
      tableLegendTitle: 'How to read this table',
      tlCheck: 'Fully supported natively and in production',
      tlPartial: 'Partial support — with conditions or under active development',
      tlCross: 'Not currently supported — no defined standard path exists',
      primaryLabel: 'Primary standards',
      secondaryLabel: 'Complementary',
      factorPrivacy: 'Privacy',
      factorInterop: 'Interop.',
      factorAdoption: 'Adoption',
      factorOffline: 'Offline',
      recStandards: 'RECOMMENDED STANDARDS',
      keyReqs: 'KEY REQUIREMENTS',
    },
    useCases: [
      {
        icon:'🪪', title:'National Digital Identity', category:'Government · Citizen',
        description:'Digital passport, national ID, or government identity wallet. Requires maximum governmental interoperability and a solid legal basis.',
        primary:['EBSI','mDL ISO','OID4VC'], secondary:['W3C VC','SD-JWT VC'],
        privacy:60, interop:95, adoption:80, offline:85,
        detail:{
          why:'Governments need standards with legal recognition. EBSI/eIDAS 2.0 provides the EU legal framework, mDL ISO covers the physical-digital bridge, and OID4VC handles the digital presentation layer.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'EU MANDATORY',reason:'Required in Europe (EUDIW). Includes Trust Anchors, cross-border legal recognition, and identity attributes standardized by the European Commission.'},
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'PHYSICAL/DIGITAL',reason:'Standard for digital licenses and IDs. Offline presentation via NFC/QR. Already deployed in multiple US states, Australia, and EU pilots.'},
            {name:'OID4VC',cls:'c-oidc',label:'TRANSPORT LAYER',reason:'Presentation protocol over HTTPS compatible with existing OAuth2 infrastructure used by banks and public administrations.'},
          ],
          requirements:[
            {icon:'⚖️',text:'<strong>Legal framework</strong>: Recognized in the target jurisdiction (eIDAS, REAL ID Act, etc.)'},
            {icon:'🔄',text:'<strong>Interoperability</strong>: Compatible with existing ICAO, DMV, and civil registry systems'},
            {icon:'📵',text:'<strong>Offline use</strong>: Presentation without connectivity at physical checkpoints'},
          ]
        }
      },
      {
        icon:'🎓', title:'Educational Credentials', category:'Education · HR',
        description:'Degrees, certificates, micro-credentials, and learning portfolios verifiable by employers or academic institutions globally.',
        primary:['W3C VC','OID4VC'], secondary:['EBSI','SD-JWT VC'],
        privacy:55, interop:90, adoption:75, offline:40,
        detail:{
          why:'Educational credentials need to be verifiable by global employers without proprietary infrastructure. W3C VC with DIDs is the most adopted standard in this sector (Open Badges v3, Europass).',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'RECOMMENDED',reason:'Foundation of Open Badges v3.0, Europass, and the EDCI infrastructure. Enables rich learning achievement data with decentralized verification via DIDs.'},
            {name:'OID4VC',cls:'c-oidc',label:'ISSUANCE/WALLET',reason:'Issuance and presentation protocol for student wallets. Compatible with existing LMS systems.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'SELECTIVE DISCLOSURE',reason:'Useful when the holder wants to reveal only specific courses or grades without exposing the full academic transcript.'},
          ],
          requirements:[
            {icon:'🌍',text:'<strong>Global verification</strong>: An employer in any country can verify without contacting the institution'},
            {icon:'📋',text:'<strong>Rich data</strong>: Competencies, ECTS credits, date, NQF level, accredited issuing entity'},
          ]
        }
      },
      {
        icon:'🚗', title:"Driver's License (mDL)", category:'Government · Transport',
        description:"Digital version of the driver's license. The paradigmatic use case for offline physical presentation, age verification, and minimal data disclosure.",
        primary:['mDL ISO'], secondary:['SD-JWT VC','OID4VC'],
        privacy:70, interop:80, adoption:90, offline:100,
        detail:{
          why:"ISO 18013-5 is the standard born specifically for this use case. It defines the mDoc format, proximity presentation protocol, and native selective attribute disclosure.",
          standards:[
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'DE FACTO STANDARD',reason:'The only one designed specifically for digital licenses. Defines mDoc CBOR, proximity protocols (NFC/BLE), offline verification, and native selective disclosure.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'ONLINE ALTERNATIVE',reason:'For remote verification (car rental, digital platforms). Lighter than mDoc for purely digital contexts.'},
            {name:'OID4VC',cls:'c-oidc',label:'TRANSPORT LAYER',reason:"Complements mDL in online presentations. Multiple US states and the EU combine mDoc with OID4VP for remote presentation."},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Offline mandatory</strong>: A traffic officer cannot depend on connectivity'},
            {icon:'🛡️',text:'<strong>Anti-cloning</strong>: Device binding via private key in secure enclave'},
            {icon:'⚡',text:'<strong>Speed</strong>: Verification in seconds at a traffic stop'},
          ]
        }
      },
      {
        icon:'🏢', title:'Business Identity (SME)', category:'Enterprise · B2B',
        description:'SME accreditation for public tenders, bank onboarding, customs, and B2B e-commerce. Includes power of attorney and legal entity credentials.',
        primary:['EBSI','W3C VC'], secondary:['OID4VC','SD-JWT VC'],
        privacy:40, interop:85, adoption:65, offline:30,
        detail:{
          why:'Businesses need to prove their legal existence, notarial powers, and compliance (AML, KYB) in a verifiable way across jurisdictions. EBSI defines the Legal Entity VC and Power of Attorney VC.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'EU RECOMMENDED',reason:'Defines credentials for Legal Entities (EORI, LEI), powers of representation, linking them to the EUDIW of the legal representative. Basis of the GLEIF vLEI project.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'GLOBAL INTEROP',reason:'For ecosystems outside Europe. GLEIF uses W3C VC for organizational credentials. Allows representation of chamber of commerce certificates, ISO 9001, etc.'},
          ],
          requirements:[
            {icon:'🏛️',text:'<strong>Legal registry</strong>: Verifiable link to the official business registry'},
            {icon:'👤',text:'<strong>Representation</strong>: Director or proxy acting on behalf of the company'},
            {icon:'🌐',text:'<strong>Cross-border recognition</strong>: Valid in EU public tenders'},
          ]
        }
      },
      {
        icon:'🏥', title:'Health Credentials', category:'Healthcare · Personal',
        description:'Portable medical records, digital prescriptions, vaccination certificates, and healthcare professional accreditation.',
        primary:['AnonCreds','SD-JWT VC'], secondary:['W3C VC','OID4VC'],
        privacy:100, interop:70, adoption:55, offline:60,
        detail:{
          why:'Healthcare is the use case with the highest privacy requirements. Minimal disclosure and protection against correlation between providers is essential.',
          standards:[
            {name:'AnonCreds (ZKP)',cls:'c-anoncred',label:'MAXIMUM PRIVACY',reason:'ZKP proofs to demonstrate attributes ("is vaccinated", "has valid prescription") without revealing identity or additional data. Impossible to correlate presentations across different providers.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'BALANCED APPROACH',reason:'Simpler alternative with selective disclosure. Allows revealing only a specific diagnosis without exposing the complete medical history.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'SMART HEALTH',reason:'Foundation of SMART Health Cards (COVID vaccines, portable EHR). Wide adoption in the US and Canada for HL7/FHIR-interoperable certificates.'},
          ],
          requirements:[
            {icon:'🔏',text:'<strong>HIPAA / GDPR</strong>: Data minimization, granular consent'},
            {icon:'🚫',text:'<strong>Anti-correlation</strong>: Impossible to track the patient across different providers'},
          ]
        }
      },
      {
        icon:'🏦', title:'KYC / Financial Identity', category:'Finance · Compliance',
        description:'Bank onboarding, reusable AML/KYC verification across entities, and investor accreditation to reduce regulatory friction.',
        primary:['SD-JWT VC','OID4VC'], secondary:['W3C VC','AnonCreds'],
        privacy:65, interop:80, adoption:60, offline:20,
        detail:{
          why:'The financial sector needs regulatory compliance (AMLD, FATF) with reusable KYC: the customer verifies once and shares the credential with multiple entities.',
          standards:[
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'RECOMMENDED',reason:'Allows revealing only the attributes each entity needs without sharing the complete KYC dossier. JWT format familiar to fintech teams.'},
            {name:'OID4VC',cls:'c-oidc',label:'API INTEGRATION',reason:'Presentation flow compatible with OAuth2/OIDC already used by banks. Facilitates integration with existing CIAM systems (Okta, Azure AD, etc.).'},
            {name:'AnonCreds (ZKP)',cls:'c-anoncred',label:'ADVANCED PRIVACY',reason:'For cases requiring range proofs ("income > 50K") or predicates ("over 18") without revealing the exact value.'},
          ],
          requirements:[
            {icon:'📋',text:'<strong>Regulatory traceability</strong>: Demonstrate compliance to auditors without exposing customer data'},
            {icon:'🔄',text:'<strong>Reusability</strong>: KYC done once, valid across multiple entities in the group or sector'},
          ]
        }
      },
      {
        icon:'⚖️', title:'Professional Licenses', category:'Regulation · Professional',
        description:'Authorization to practice regulated professions: lawyers, doctors, accountants, engineers, pharmacists. Verification by professional associations.',
        primary:['W3C VC','EBSI'], secondary:['OID4VC','SD-JWT VC'],
        privacy:50, interop:80, adoption:55, offline:45,
        detail:{
          why:'Professional associations need to issue credentials that employers and patients can verify instantly. W3C VC with the association DID as issuer is the most flexible model.',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'RECOMMENDED',reason:"The issuer is the professional association identified by its DID. The credential includes registration number, specialties, and membership status. Verification without calling the registry."},
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'EU FRAMEWORK',reason:'For cross-border recognition of professional qualifications between member states (updated Directive 2005/36/EC).'},
          ],
          requirements:[
            {icon:'🏛️',text:'<strong>Issuing authority</strong>: The association must have a recognized, verifiable DID/identity'},
            {icon:'🔄',text:'<strong>Status updates</strong>: Automatic state changes (suspension, sanction, new specialty)'},
            {icon:'🌍',text:'<strong>Cross-border</strong>: Recognition across countries for mobile professionals'},
          ]
        }
      },
      {
        icon:'🔞', title:'Age Verification', category:'Privacy · Consumer',
        description:'Proof of legal age for alcohol, gambling, adult content, or financial services — without revealing date of birth or full identity.',
        primary:['AnonCreds','SD-JWT VC','mDL ISO'], secondary:['W3C VC'],
        privacy:95, interop:60, adoption:50, offline:75,
        detail:{
          why:"This is the paradigmatic minimal privacy case: only 'over X years old' needs to be confirmed without revealing any other data.",
          standards:[
            {name:'AnonCreds (ZKP)',cls:'c-anoncred',label:'FULL PRIVACY',reason:"Cryptographic proof of a predicate: 'date_of_birth < 2006-01-01' without revealing the actual date. The verifier only knows the condition is met."},
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'OFFLINE/PHYSICAL',reason:"Selective disclosure of the 'age_over_18: true' attribute from a driver's license. Already implemented in Apple Wallet and Google Wallet."},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'ONLINE',reason:"For age verification on digital platforms. The 'age_over_18' claim can be selectively revealed without exposing name, address, or exact date."},
          ],
          requirements:[
            {icon:'🚫',text:'<strong>Minimal data</strong>: Only the age boolean, nothing else'},
            {icon:'🔗',text:'<strong>Unlinkability</strong>: Impossible to track the user across stores or platforms'},
          ]
        }
      },
      {
        icon:'📦', title:'Supply Chain', category:'Logistics · Trade',
        description:'Product traceability, certificates of origin, ESG sustainability audits, customs, and quality certifications throughout the supply chain.',
        primary:['W3C VC','OID4VC'], secondary:['SD-JWT VC','EBSI'],
        privacy:35, interop:90, adoption:50, offline:50,
        detail:{
          why:'In supply chains, credential "holders" are companies or products, and chain of custody requires chained credentials. W3C VC with organization DIDs is the natural model.',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'RECOMMENDED',reason:'Enables product credentials (product DID + origin, composition, audit attributes). Compatible with GS1 Digital Link. Foundation of Catena-X (EU automotive supply chain).'},
            {name:'OID4VC',cls:'c-oidc',label:'B2B PRESENTATION',reason:'For verification flows in customs, procurement platforms, or ESG audits where multiple actors need to verify credentials via API.'},
          ],
          requirements:[
            {icon:'🔗',text:'<strong>Chain of custody</strong>: Chained credentials from multiple actors verifiable end-to-end'},
            {icon:'📋',text:'<strong>Sector standards</strong>: Alignment with GS1, ISO 14001, SA8000, etc.'},
            {icon:'🤖',text:'<strong>Machine-readable</strong>: Automated verification in ERP systems without human intervention'},
          ]
        }
      },
      {
        icon:'✈️', title:'Tourism & International Travel', category:'Travel · Aviation · Borders',
        description:'Interoperable travel credentials: digital passports, visas, traveler health data, lounge access, paperless check-in, and digital border crossing.',
        primary:['mDL ISO','OID4VC'], secondary:['W3C VC','SD-JWT VC'],
        privacy:65, interop:90, adoption:60, offline:90,
        detail:{
          why:'Aviation and international travel require credentials that work offline at airports without connectivity and are recognized by authorities in different countries. IATA is converging on mDoc+OID4VC as the standard stack.',
          standards:[
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'PHYSICAL PRESENTATION',reason:'The technical foundation for Digital Travel Credentials (DTC). The mDoc format works on airport readers, border crossings, and check-in scanners without connectivity. Already supported in Apple Wallet and Google Wallet for TSA in the US.'},
            {name:'OID4VC',cls:'c-oidc',label:'DIGITAL PROTOCOLS',reason:'IATA One ID uses OID4VP for passenger credential presentation on digital platforms. Compatible with booking systems (Amadeus, Sabre) and airline web portals.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'SUPPLEMENTARY CREDENTIALS',reason:'For traveler health credentials (vaccines, PCR tests), verifiable loyalty cards, or press accreditations. ICAO DTC Type 2 is based on W3C VC for next-generation digital passports.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Offline mandatory</strong>: Airports and border crossings may not have reliable connectivity'},
            {icon:'🌍',text:'<strong>International recognition</strong>: Accepted by authorities from different countries (ICAO, Schengen, TSA)'},
            {icon:'⚡',text:'<strong>Speed</strong>: Border crossing must complete in seconds'},
            {icon:'🔒',text:'<strong>Biometrics</strong>: Binding between credential and facial biometrics for anti-spoofing'},
          ]
        }
      },
      {
        icon:'🌾', title:'Agriculture & Agri-food Traceability', category:'Agro · ESG · Exports',
        description:'Certificates of origin, product traceability from farm to consumer, phytosanitary compliance, farmer credentials, and access to agricultural financing.',
        primary:['W3C VC','OID4VC'], secondary:['SD-JWT VC','EBSI'],
        privacy:40, interop:80, adoption:40, offline:70,
        detail:{
          why:'The agricultural sector needs credentials that work in rural areas with limited connectivity, that are verifiable by international phytosanitary authorities, and that enable product tracking from farm to end consumer — including sustainability certifications (organic, fair trade, carbon).',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'TRACEABILITY',reason:'Ideal model for product credentials with their own DID (batch, farm, exporter). Compatible with GS1 Digital Link for QR/barcode integration on labels. Foundation of the UN Transparency Protocol (UNTP) for verifiable carbon footprint.'},
            {name:'OID4VC',cls:'c-oidc',label:'B2B INTEROP',reason:'For presenting phytosanitary certificates, quarantine clearance, and HACCP compliance between exporters, importers, and customs authorities. Compatible with B2B agricultural e-commerce platforms.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'SENSITIVE DATA',reason:'When a producer wants to share an organic certification with a buyer without revealing production costs, supplier contracts, or business financial data.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Offline functionality</strong>: Agricultural farms often have very limited or no connectivity'},
            {icon:'🌱',text:'<strong>ESG certifications</strong>: Organic, fair trade, Rainforest Alliance, verifiable carbon footprint'},
            {icon:'📦',text:'<strong>End-to-end traceability</strong>: From field to consumer, with each supply chain actor signing'},
            {icon:'💰',text:'<strong>Financing access</strong>: Verifiable credentials enable agricultural loans based on production history'},
            {icon:'🏛️',text:'<strong>Regulatory compliance</strong>: USDA, FDA, EFSA depending on target market'},
          ]
        }
      },
      {
        icon:'🏛️', title:'Public Sector & Digital Government', category:'Government · Public Services',
        description:'Digital government procedures, access to social benefits, unified citizen records, e-voting, and inter-agency communication without data silos.',
        primary:['EBSI','W3C VC','OID4VC'], secondary:['SD-JWT VC','mDL ISO'],
        privacy:70, interop:85, adoption:65, offline:50,
        detail:{
          why:'Governments are the most trusted issuers in the ecosystem (identity, civil status, tax, labor). The challenge is making credentials issued by one ministry verifiable at any other agency, municipality, or accredited private service — without building silos.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'EU LEGAL FRAMEWORK',reason:'Technical and legal infrastructure for European governments to issue and mutually recognize credentials. The PID (Person Identification Data) defines the minimum attribute set each EUDIW must support. Mandatory for essential EU services from November 2026.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'SECTOR CREDENTIALS',reason:'For service-specific credentials: unemployment benefits, building permits, tax benefits, property records. Government agency DIDs act as verifiable trust roots.'},
            {name:'OID4VC',cls:'c-oidc',label:'SYSTEMS INTEGRATION',reason:"Allows integrating the credential flow with the government's federated authentication systems (like Spain's Cl@ve, GOV.UK One Login, etc.) without replacing existing infrastructure."},
          ],
          requirements:[
            {icon:'🔒',text:'<strong>Data sovereignty</strong>: The citizen controls which agency sees which data, in line with GDPR'},
            {icon:'♿',text:'<strong>Accessibility</strong>: The system must work for citizens without smartphones (alternative channel)'},
            {icon:'🔗',text:'<strong>Inter-agency interoperability</strong>: A credential from the education ministry must be recognized by the labor ministry'},
            {icon:'🏛️',text:'<strong>Archiving & audit</strong>: Presentations must be recordable for audits without compromising privacy'},
          ]
        }
      }
    ],
    tableData: [
      { name:'W3C VC Data Model', org:'W3C / DIF', cls:'c-w3c', zkp:false, sd:'~', offline:false, gov:true, maturity:'High', pill:'c-w3c', best:'Education, HR, B2B' },
      { name:'ISO 18013-5 mDL', org:'ISO / IEC', cls:'c-mdoc', zkp:false, sd:true, offline:true, gov:true, maturity:'High', pill:'c-mdoc', best:'Licenses, Physical ID, Travel' },
      { name:'OID4VC / OIDC', org:'OpenID Foundation', cls:'c-oidc', zkp:false, sd:'~', offline:false, gov:true, maturity:'Med-High', pill:'c-oidc', best:'Wallets, APIs, KYC' },
      { name:'AnonCreds (ZKP)', org:'Hyperledger / AnonCreds', cls:'c-anoncred', zkp:true, sd:true, offline:false, gov:false, maturity:'Medium', pill:'c-anoncred', best:'Health, age, finance' },
      { name:'SD-JWT VC', org:'IETF OAuth WG', cls:'c-sd-jwt', zkp:false, sd:true, offline:false, gov:'~', maturity:'Med-High', pill:'c-sd-jwt', best:'KYC, sensitive data' },
      { name:'EBSI / eIDAS 2.0', org:'European Commission', cls:'c-ebsi', zkp:false, sd:'~', offline:false, gov:true, maturity:'High (EU)', pill:'c-ebsi', best:'National ID, SMEs, Government' },
    ],
  },
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  const data = LANG_DATA[lang];
  document.documentElement.lang = lang;
  document.title = data.ui.pageTitle;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (data.ui[key] !== undefined) el.textContent = data.ui[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (data.ui[key] !== undefined) el.innerHTML = data.ui[key];
  });

  document.getElementById('cardsGrid').innerHTML = '';
  document.getElementById('compTable').innerHTML = '';
  renderCards();
  renderTable();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function renderCards() {
  const { useCases, ui } = LANG_DATA[currentLang];
  const grid = document.getElementById('cardsGrid');
  useCases.forEach(uc => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => openPanel(uc);
    const pt = uc.primary.map(s => `<span class="tag primary ${STANDARDS[s]?.cls}">${s}</span>`).join('');
    const st = uc.secondary.map(s => `<span class="tag secondary ${STANDARDS[s]?.cls}">${s}</span>`).join('');
    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon">${uc.icon}</div>
        <div><div class="card-title">${uc.title}</div><div class="card-category">${uc.category}</div></div>
      </div>
      <div class="card-description">${uc.description}</div>
      <div class="standards-section"><div class="standards-label">${ui.primaryLabel}</div><div class="tags">${pt}</div></div>
      <div class="standards-section"><div class="standards-label">${ui.secondaryLabel}</div><div class="tags">${st}</div></div>
      <div class="factors">
        <div class="factor"><div class="factor-label">${ui.factorPrivacy}</div><div class="factor-bar"><div class="factor-fill bar-privacy" style="width:${uc.privacy}%"></div></div></div>
        <div class="factor"><div class="factor-label">${ui.factorInterop}</div><div class="factor-bar"><div class="factor-fill bar-interop" style="width:${uc.interop}%"></div></div></div>
        <div class="factor"><div class="factor-label">${ui.factorAdoption}</div><div class="factor-bar"><div class="factor-fill bar-oidc" style="width:${uc.adoption}%"></div></div></div>
        <div class="factor"><div class="factor-label">${ui.factorOffline}</div><div class="factor-bar"><div class="factor-fill bar-mdoc" style="width:${uc.offline}%"></div></div></div>
      </div>`;
    grid.appendChild(card);
  });
}

function renderTable() {
  const { tableData } = LANG_DATA[currentLang];
  const tbody = document.getElementById('compTable');
  tableData.forEach(row => {
    const tr = document.createElement('tr');
    const ck = v => v === true ? '<span class="check">✓</span>' : v === false ? '<span class="cross">—</span>' : '<span class="partial">◑</span>';
    tr.innerHTML = `
      <td><div class="std-name">${row.name}</div><div class="std-org">${row.org}</div></td>
      <td>${ck(row.zkp)}</td><td>${ck(row.sd)}</td><td>${ck(row.offline)}</td>
      <td>${ck(row.gov)}</td>
      <td><span class="pill ${row.pill}">${row.maturity}</span></td>
      <td style="color:var(--text-dim);font-size:12px">${row.best}</td>`;
    tbody.appendChild(tr);
  });
}

function openPanel(uc) {
  const { ui } = LANG_DATA[currentLang];
  const stds = uc.detail.standards.map(s => `
    <div class="panel-std-block">
      <div class="panel-std-name"><span class="tag primary ${s.cls}" style="font-size:10px;padding:2px 8px">${s.label}</span>${s.name}</div>
      <div class="panel-std-why">${s.reason}</div>
    </div>`).join('');
  const reqs = uc.detail.requirements.map(r => `
    <div class="req-item"><span class="req-icon">${r.icon}</span><span class="req-text">${r.text}</span></div>`).join('');
  document.getElementById('panelContent').innerHTML = `
    <div style="font-size:40px;margin-bottom:8px">${uc.icon}</div>
    <div class="card-category">${uc.category}</div>
    <h2>${uc.title}</h2>
    <div class="desc">${uc.description}</div>
    <div style="color:var(--text-muted);font-size:13px;line-height:1.6;margin-bottom:20px">${uc.detail.why}</div>
    <div class="standards-label" style="margin-bottom:12px">${ui.recStandards}</div>${stds}
    <div class="reqs"><div class="standards-label" style="margin-bottom:8px">${ui.keyReqs}</div>${reqs}</div>`;
  document.getElementById('detailPanel').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function closePanel() {
  document.getElementById('detailPanel').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

setLanguage('en');
