const STANDARDS = {
  'W3C VC':    { cls:'c-w3c' }, 'mDL ISO': { cls:'c-mdoc' },
  'OID4VC':    { cls:'c-oidc' }, 'AnonCreds': { cls:'c-anoncred' },
  'SD-JWT VC': { cls:'c-sd-jwt' }, 'EBSI': { cls:'c-ebsi' },
};

// ── Shared code snippets (format-agnostic, shown in panel) ──────────────────
const _CODE = {
  nationalId:
`{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "type": ["VerifiableCredential", "EUPersonIdentificationData"],
  "issuer": "did:ebsi:zxPkFrHxBFLcgfTMpBCKXEp",
  "validFrom": "2025-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "did:key:z6MkwXG7sBtKJpMsZYs...",
    "family_name": "García",
    "given_name": "María",
    "birth_date": "1990-07-15",
    "nationality": "ES",
    "personal_identifier": "ES-12345678A"
  }
}`,
  education:
`{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://purl.imsglobal.org/spec/ob/v3p0/context.json"
  ],
  "type": ["VerifiableCredential", "OpenBadgeCredential"],
  "issuer": { "id": "did:web:mit.edu", "name": "MIT" },
  "credentialSubject": {
    "id": "did:key:z6MkwXG7sBtKJpMsZYs...",
    "achievement": {
      "name": "Bachelor of Computer Science",
      "description": "4-year undergraduate programme",
      "criteria": { "narrative": "Completed 180 ECTS credits" }
    }
  }
}`,
  driverLicense:
`// mDoc (CBOR-encoded) — decoded JSON representation:
{
  "docType": "org.iso.18013.5.1.mDL",
  "issuerSigned": {
    "nameSpaces": {
      "org.iso.18013.5.1": {
        "family_name": "Smith",
        "given_name": "John",
        "birth_date": "1985-03-22",
        "issuing_country": "US",
        "expiry_date": "2033-01-01",
        "driving_privileges": [
          { "vehicle_category_code": "B" }
        ],
        "age_over_18": true,
        "age_over_21": true
      }
    }
  }
}`,
  sme:
`{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "type": ["VerifiableCredential", "LegalEntityVerifiableID"],
  "issuer": "did:ebsi:zCMJfPJQmBVuFSmXkMXYi8P",
  "credentialSubject": {
    "id": "did:ebsi:zRFNXhBoYRVCqmQ6j3WDuGY",
    "legalName": "Acme Digital SL",
    "legalIdentifier": "ES-B12345678",
    "leiCode": "9695007HQJT00C6S7Z66",
    "vatNumber": "ESB12345678",
    "registeredAddress": { "countryCode": "ES" }
  }
}`,
  health:
`// AnonCreds Proof Request (ZKP predicate — no PII exposed):
{
  "name": "vaccination-proof",
  "version": "1.0",
  "requested_attributes": {},
  "requested_predicates": {
    "pred_vaccinated": {
      "name": "vaccination_status",
      "p_type": ">=",
      "p_value": 1,
      "restrictions": [{ "cred_def_id": "did:indy:sovrin:..." }]
    }
  },
  "non_revoked": { "to": 1735689600 }
}
// Verifier learns ONLY: vaccination_status >= 1 → true`,
  kyc:
`// SD-JWT VC (decoded payload):
{
  "vct": "IdentityCredential",
  "iss": "https://kyc.bank.com",
  "iat": 1704067200,
  "_sd_alg": "sha-256",
  "_sd": [
    "hash(given_name)", "hash(family_name)",
    "hash(address)",    "hash(tax_id)"
  ],
  "verification_level": "enhanced",
  "aml_cleared": true,
  "age_over_18": true
}
// Holder selects which _sd claims to disclose per verifier`,
  professionalLicense:
`{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "type": ["VerifiableCredential", "ProfessionalLicenseCredential"],
  "issuer": {
    "id": "did:web:medical-board.es",
    "name": "Colegio Oficial de Médicos de Madrid"
  },
  "credentialSubject": {
    "id": "did:key:z6MkwXG7sBtKJpMsZYs...",
    "licenseNumber": "ES-MED-12345",
    "specialty": "Cardiology",
    "licenseStatus": "active",
    "validUntil": "2027-12-31"
  }
}`,
  ageVerification:
`// SD-JWT presentation — selective disclosure:
{
  "vct": "AgeVerificationCredential",
  "iss": "https://gov.es/identity",
  "iat": 1704067200,
  "age_over_18": true
  // given_name, family_name, dob → NOT disclosed
}

// AnonCreds alternative — ZKP predicate proof:
// Proves: birth_date < 2007-01-01
// Verifier receives: true / false — nothing else`,
  supplyChain:
`{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://gs1.org/voc/"
  ],
  "type": ["VerifiableCredential", "ProductConformityCredential"],
  "issuer": "did:web:certifier.sgs.com",
  "credentialSubject": {
    "id": "https://id.gs1.org/01/09521234543213",
    "productName": "Organic Coffee Blend",
    "batchNumber": "LOT-2025-001",
    "originCountry": "CO",
    "certifications": ["organic", "fair-trade"],
    "carbonFootprint": { "value": 2.3, "unit": "kgCO2e/kg" }
  }
}`,
  tourism:
`// Digital Travel Credential (DTC) — mDoc format:
{
  "docType": "org.icao.mrtd.travel.dtc.1",
  "issuerSigned": {
    "nameSpaces": {
      "org.icao.mrtd.travel.dtc.1": {
        "doc_number": "AB123456",
        "family_name": "Müller",
        "given_name": "Hans",
        "nationality": "DE",
        "expiry_date": "2030-01-01",
        "issuing_state": "DE",
        "biometric_template": "<ISO-19794-5 face image>"
      }
    }
  }
}`,
  agriculture:
`{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://vocabulary.uncefact.org/untp/"
  ],
  "type": ["VerifiableCredential", "ConformityCredential"],
  "issuer": "did:web:certifier.organic-cert.com",
  "credentialSubject": {
    "id": "did:web:farm.agritech.co",
    "farmName": "Finca El Paraíso",
    "product": "Coffee",
    "certification": "USDA Organic",
    "validUntil": "2026-06-30",
    "sustainabilityScore": { "carbon": "A", "water": "B+" },
    "location": { "country": "CO", "region": "Huila" }
  }
}`,
  govDigital:
`{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "type": ["VerifiableCredential", "SocialBenefitEntitlement"],
  "issuer": "did:ebsi:zMinisterioBienestarES",
  "credentialSubject": {
    "id": "did:key:z6MkwXG7sBtKJpMsZYs...",
    "benefitType": "unemployment_benefit",
    "benefitAmount": { "currency": "EUR", "value": 850 },
    "eligibilityPeriod": {
      "startDate": "2025-01-01",
      "endDate":   "2025-12-31"
    }
  }
}`,
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
      codeExampleLabel: 'EJEMPLO DE FORMATO DE DATOS',
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
          ],
          codeExample:{ format:'EBSI PID · W3C VC Data Model 2.0', code:_CODE.nationalId, note:'Atributos mínimos del PID requeridos por la regulación EUDIW. El campo personal_identifier es vinculante entre jurisdicciones EU.' }
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
          ],
          codeExample:{ format:'Open Badges v3.0 · W3C VC Data Model', code:_CODE.education, note:'La estructura achievement permite representar competencias, micro-credenciales y grados completos en un único formato interoperable.' }
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
          ],
          codeExample:{ format:'ISO 18013-5 mDL · CBOR/mDoc (representación JSON decodificada)', code:_CODE.driverLicense, note:'age_over_18 se puede revelar selectivamente sin exponer fecha de nacimiento, nombre ni dirección. Nativo en Apple Wallet y Google Wallet.' }
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
          ],
          codeExample:{ format:'EBSI Legal Entity VC · W3C VC Data Model', code:_CODE.sme, note:'El LEI (Legal Entity Identifier) de GLEIF permite verificación global sin depender de registros nacionales propietarios.' }
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
          ],
          codeExample:{ format:'AnonCreds Proof Request · ZKP predicate (Hyperledger Indy)', code:_CODE.health, note:'El predicado ZKP demuestra la condición sin revelar el valor exacto. El verificador no puede correlacionar esta prueba con otras presentaciones del mismo titular.' }
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
          ],
          codeExample:{ format:'SD-JWT VC · IETF OAuth WG (RFC draft)', code:_CODE.kyc, note:'Los hashes en _sd sustituyen los valores reales. El titular elige qué atributos revelar en cada presentación usando los disclosure values correspondientes.' }
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
          ],
          codeExample:{ format:'W3C VC Data Model 2.0 · ProfessionalLicenseCredential', code:_CODE.professionalLicense, note:'El DID del emisor (did:web:medical-board.es) es la raíz de confianza. El verificador puede resolver el DID Document para obtener la clave pública y validar la firma sin contactar al colegio.' }
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
          ],
          codeExample:{ format:'SD-JWT VC + AnonCreds ZKP · age_over_18', code:_CODE.ageVerification, note:'Con SD-JWT el verificador ve el booleano true pero no puede inferir la fecha exacta. Con AnonCreds ZKP ni siquiera el booleano es correlacionable entre presentaciones.' }
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
          ],
          codeExample:{ format:'W3C VC · GS1 Digital Link + UN Transparency Protocol (UNTP)', code:_CODE.supplyChain, note:'El id del credentialSubject es un GTIN de GS1 — el producto tiene su propio identificador verificable. La credencial puede encadenarse con otras del productor, transportista y aduanas.' }
        }
      },
      {
        icon:'✈️', title:'Turismo y Viajes Internacionales', category:'Viajes · Aviación · Fronteras',
        description:'Credenciales de viaje interoperables: pasaportes digitales, visas, datos de salud para viajeros, acceso a lounges, check-in sin papel y cruce de frontera digital.',
        primary:['mDL ISO','OID4VC'], secondary:['W3C VC','SD-JWT VC'],
        privacy:65, interop:90, adoption:60, offline:90,
        detail:{
          why:'La aviación y los viajes internacionales requieren credenciales que funcionen offline en aeropuertos sin conectividad, y que sean reconocidas por autoridades de distintos países.',
          standards:[
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'PRESENTACIÓN FÍSICA',reason:'La base técnica para Digital Travel Credentials (DTC). El formato mDoc funciona en lectores de aeropuertos y cruces fronterizos sin conectividad. Ya soportado en Apple Wallet y Google Wallet para TSA en EE.UU.'},
            {name:'OID4VC',cls:'c-oidc',label:'PROTOCOLOS DIGITALES',reason:'IATA One ID usa OID4VP para presentación de credenciales de pasajero en plataformas digitales. Compatible con sistemas de reserva (Amadeus, Sabre).'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'CREDENCIALES ADICIONALES',reason:'Para credenciales de salud del viajero (vacunas, pruebas PCR), tarjetas de fidelización verificables. ICAO DTC Type 2 se basa en W3C VC.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Offline obligatorio</strong>: Los aeropuertos y cruces fronterizos pueden no tener conectividad fiable'},
            {icon:'🌍',text:'<strong>Reconocimiento internacional</strong>: Aceptado por autoridades de distintos países (ICAO, Schengen, TSA)'},
            {icon:'⚡',text:'<strong>Velocidad</strong>: El cruce de frontera debe completarse en segundos'},
            {icon:'🔒',text:'<strong>Biometría</strong>: Vínculo entre la credencial y la biometría facial para anti-suplantación'},
          ],
          codeExample:{ format:'ICAO DTC Type 1 · ISO 18013-5 mDoc (Digital Travel Credential)', code:_CODE.tourism, note:'El biometric_template vincula la credencial a la biometría facial del titular (ISO 19794-5). La lectura se realiza vía NFC/BLE sin conectividad a internet en lectores de pasaportes.' }
        }
      },
      {
        icon:'🌾', title:'Agricultura y Trazabilidad Agroalimentaria', category:'Agro · ESG · Exportaciones',
        description:'Certificados de origen, trazabilidad de producto desde campo hasta consumidor, cumplimiento fitosanitario, credenciales de agricultor y acceso a financiamiento agrícola.',
        primary:['W3C VC','OID4VC'], secondary:['SD-JWT VC','EBSI'],
        privacy:40, interop:80, adoption:40, offline:70,
        detail:{
          why:'El sector agro necesita credenciales que funcionan en áreas rurales con conectividad limitada, verificables por autoridades fitosanitarias internacionales y que permitan rastrear el producto desde el campo hasta el consumidor final.',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'TRAZABILIDAD',reason:'Modelo ideal para credenciales de producto con DID propio (lote, finca, exportador). Compatible con GS1 Digital Link. Base del UN Transparency Protocol (UNTP) para huella de carbono verificable.'},
            {name:'OID4VC',cls:'c-oidc',label:'INTEROP B2B',reason:'Para la presentación de certificados fitosanitarios, cuarentena y cumplimiento HACCP entre exportadores, importadores y autoridades aduaneras.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'DATOS SENSIBLES',reason:'Cuando el productor quiere compartir certificación orgánica con un comprador sin revelar sus costos de producción, contratos o datos financieros.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Funcionalidad offline</strong>: Las fincas agrícolas suelen tener conectividad muy limitada o nula'},
            {icon:'🌱',text:'<strong>Certificaciones ESG</strong>: Orgánico, fair trade, Rainforest Alliance, huella de carbono verificable'},
            {icon:'📦',text:'<strong>Trazabilidad extremo a extremo</strong>: Del campo al consumidor, con cada actor de la cadena firmando'},
            {icon:'💰',text:'<strong>Acceso a financiamiento</strong>: Las credenciales verificables habilitan préstamos agrícolas basados en historial de producción'},
          ],
          codeExample:{ format:'W3C VC · UN Transparency Protocol (UNTP) ConformityCredential', code:_CODE.agriculture, note:'El sustainabilityScore sigue el esquema UNTP para huella de carbono verificable. El DID de la finca permite encadenar credenciales del productor, certificador y exportador en un único grafo de confianza.' }
        }
      },
      {
        icon:'🏛️', title:'Sector Público y Gobierno Digital', category:'Gobierno · Servicios Públicos',
        description:'Trámites gubernamentales digitales, acceso a beneficios sociales, expediente ciudadano único, voto electrónico y comunicación entre agencias sin silos de datos.',
        primary:['EBSI','W3C VC','OID4VC'], secondary:['SD-JWT VC','mDL ISO'],
        privacy:70, interop:85, adoption:65, offline:50,
        detail:{
          why:'Los gobiernos son los emisores más confiables del ecosistema. El reto es hacer que las credenciales emitidas por un ministerio sean verificables en cualquier otra agencia, municipio o servicio privado acreditado, sin construir silos.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'MARCO LEGAL EU',reason:'Infraestructura técnica y legal para que los gobiernos europeos emitan y reconozcan credenciales entre sí. El PID define el conjunto mínimo de atributos que cada EUDIW debe soportar. Obligatorio para servicios esenciales EU desde noviembre 2026.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'CREDENCIALES SECTORIALES',reason:'Para credenciales específicas de cada servicio: subsidios, licencias de construcción, beneficios fiscales, registros de propiedad. Los DIDs de las agencias actúan como raíces de confianza.'},
            {name:'OID4VC',cls:'c-oidc',label:'INTEGRACIÓN SISTEMAS',reason:'Permite integrar el flujo de credenciales con los sistemas de autenticación federada del gobierno (Cl@ve, GOV.UK One Login, etc.) sin reemplazar la infraestructura existente.'},
          ],
          requirements:[
            {icon:'🔒',text:'<strong>Soberanía de datos</strong>: El ciudadano controla qué agencia ve qué datos, en línea con GDPR/LOPD'},
            {icon:'♿',text:'<strong>Accesibilidad</strong>: El sistema debe funcionar para ciudadanos sin smartphone (canal alternativo)'},
            {icon:'🔗',text:'<strong>Interoperabilidad inter-agencias</strong>: Una credencial del ministerio de educación debe ser reconocida por el ministerio de trabajo'},
            {icon:'🏛️',text:'<strong>Archivo y auditoría</strong>: Las presentaciones deben ser registrables para auditorías sin comprometer privacidad'},
          ],
          codeExample:{ format:'W3C VC Data Model 2.0 · SocialBenefitEntitlement', code:_CODE.govDigital, note:'El DID del ministerio emisor actúa como raíz de confianza publicada en el registro gubernamental. Cualquier agencia puede verificar la credencial sin llamar al ministerio emisor.' }
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
      codeExampleLabel: 'DATA FORMAT EXAMPLE',
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
          ],
          codeExample:{ format:'EBSI PID · W3C VC Data Model 2.0', code:_CODE.nationalId, note:'Minimum PID attributes required by EUDIW regulation. The personal_identifier is the binding cross-jurisdiction key across EU member states.' }
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
          ],
          codeExample:{ format:'Open Badges v3.0 · W3C VC Data Model', code:_CODE.education, note:'The achievement structure supports micro-credentials and full degrees in a single interoperable format. The issuer DID (did:web:mit.edu) is resolvable without contacting the institution.' }
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
          ],
          codeExample:{ format:'ISO 18013-5 mDL · CBOR/mDoc (decoded JSON representation)', code:_CODE.driverLicense, note:'age_over_18 can be selectively disclosed without revealing date of birth, name, or address. Already live in Apple Wallet and Google Wallet in multiple US states.' }
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
          ],
          codeExample:{ format:'EBSI Legal Entity VC · W3C VC Data Model', code:_CODE.sme, note:"The LEI (Legal Entity Identifier) from GLEIF enables global verification without relying on national proprietary registries. The issuer's DID links to the official EU trust registry." }
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
          ],
          codeExample:{ format:'AnonCreds Proof Request · ZKP predicate (Hyperledger Indy)', code:_CODE.health, note:'The ZKP predicate proves the condition without revealing the exact value. The verifier cannot correlate this proof with other presentations by the same holder — unlinkability by design.' }
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
          ],
          codeExample:{ format:'SD-JWT VC · IETF OAuth WG (RFC draft)', code:_CODE.kyc, note:'Hashes in _sd replace real values. The holder selects which attributes to reveal per verifier using corresponding disclosure values — the KYC dossier never leaves the wallet.' }
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
          ],
          codeExample:{ format:'W3C VC Data Model 2.0 · ProfessionalLicenseCredential', code:_CODE.professionalLicense, note:"The issuer DID (did:web:medical-board.es) is the trust root. Any verifier resolves the DID Document to get the public key and validate the signature — no registry call needed." }
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
          ],
          codeExample:{ format:'SD-JWT VC + AnonCreds ZKP · age_over_18', code:_CODE.ageVerification, note:'With SD-JWT the verifier sees the boolean true but cannot infer the exact date. With AnonCreds ZKP, not even the boolean is linkable across presentations — maximum unlinkability.' }
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
          ],
          codeExample:{ format:'W3C VC · GS1 Digital Link + UN Transparency Protocol (UNTP)', code:_CODE.supplyChain, note:"The credentialSubject id is a GS1 GTIN — the product has its own verifiable identifier. This credential chains with others from the producer, transporter, and customs to form an end-to-end provenance graph." }
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
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'PHYSICAL PRESENTATION',reason:'The technical foundation for Digital Travel Credentials (DTC). The mDoc format works on airport readers, border crossings, and check-in scanners without connectivity. Already in Apple/Google Wallet for TSA.'},
            {name:'OID4VC',cls:'c-oidc',label:'DIGITAL PROTOCOLS',reason:'IATA One ID uses OID4VP for passenger credential presentation on digital platforms. Compatible with booking systems (Amadeus, Sabre) and airline web portals.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'SUPPLEMENTARY CREDENTIALS',reason:'For traveler health credentials (vaccines, PCR tests), verifiable loyalty cards. ICAO DTC Type 2 is based on W3C VC for next-generation digital passports.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Offline mandatory</strong>: Airports and border crossings may not have reliable connectivity'},
            {icon:'🌍',text:'<strong>International recognition</strong>: Accepted by authorities from different countries (ICAO, Schengen, TSA)'},
            {icon:'⚡',text:'<strong>Speed</strong>: Border crossing must complete in seconds'},
            {icon:'🔒',text:'<strong>Biometrics</strong>: Binding between credential and facial biometrics for anti-spoofing'},
          ],
          codeExample:{ format:'ICAO DTC Type 1 · ISO 18013-5 mDoc (Digital Travel Credential)', code:_CODE.tourism, note:'The biometric_template binds the credential to the holder\'s face (ISO 19794-5). Readers at passport control use NFC/BLE — no internet connection required at the border crossing point.' }
        }
      },
      {
        icon:'🌾', title:'Agriculture & Agri-food Traceability', category:'Agro · ESG · Exports',
        description:'Certificates of origin, product traceability from farm to consumer, phytosanitary compliance, farmer credentials, and access to agricultural financing.',
        primary:['W3C VC','OID4VC'], secondary:['SD-JWT VC','EBSI'],
        privacy:40, interop:80, adoption:40, offline:70,
        detail:{
          why:'The agricultural sector needs credentials that work in rural areas with limited connectivity, verifiable by international phytosanitary authorities, and enabling product tracking from farm to end consumer.',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'TRACEABILITY',reason:'Ideal model for product credentials with their own DID (batch, farm, exporter). Compatible with GS1 Digital Link. Foundation of the UN Transparency Protocol (UNTP) for verifiable carbon footprint.'},
            {name:'OID4VC',cls:'c-oidc',label:'B2B INTEROP',reason:'For presenting phytosanitary certificates, quarantine clearance, and HACCP compliance between exporters, importers, and customs authorities.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'SENSITIVE DATA',reason:'When a producer wants to share an organic certification with a buyer without revealing production costs, supplier contracts, or business financial data.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Offline functionality</strong>: Agricultural farms often have very limited or no connectivity'},
            {icon:'🌱',text:'<strong>ESG certifications</strong>: Organic, fair trade, Rainforest Alliance, verifiable carbon footprint'},
            {icon:'📦',text:'<strong>End-to-end traceability</strong>: From field to consumer, with each supply chain actor signing'},
            {icon:'💰',text:'<strong>Financing access</strong>: Verifiable credentials enable agricultural loans based on production history'},
          ],
          codeExample:{ format:'W3C VC · UN Transparency Protocol (UNTP) ConformityCredential', code:_CODE.agriculture, note:'The sustainabilityScore follows the UNTP schema for verifiable carbon footprint. The farm DID allows chaining credentials from the producer, certifier, and exporter into a single trust graph.' }
        }
      },
      {
        icon:'🏛️', title:'Public Sector & Digital Government', category:'Government · Public Services',
        description:'Digital government procedures, access to social benefits, unified citizen records, e-voting, and inter-agency communication without data silos.',
        primary:['EBSI','W3C VC','OID4VC'], secondary:['SD-JWT VC','mDL ISO'],
        privacy:70, interop:85, adoption:65, offline:50,
        detail:{
          why:'Governments are the most trusted issuers in the ecosystem. The challenge is making credentials issued by one ministry verifiable at any other agency, municipality, or accredited private service — without building silos.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'EU LEGAL FRAMEWORK',reason:'Technical and legal infrastructure for European governments to issue and mutually recognize credentials. The PID defines the minimum attribute set each EUDIW must support. Mandatory for essential EU services from November 2026.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'SECTOR CREDENTIALS',reason:'For service-specific credentials: unemployment benefits, building permits, tax benefits, property records. Government agency DIDs act as verifiable trust roots.'},
            {name:'OID4VC',cls:'c-oidc',label:'SYSTEMS INTEGRATION',reason:"Allows integrating the credential flow with the government's federated authentication systems (Spain's Cl@ve, GOV.UK One Login, etc.) without replacing existing infrastructure."},
          ],
          requirements:[
            {icon:'🔒',text:'<strong>Data sovereignty</strong>: The citizen controls which agency sees which data, in line with GDPR'},
            {icon:'♿',text:'<strong>Accessibility</strong>: The system must work for citizens without smartphones (alternative channel)'},
            {icon:'🔗',text:'<strong>Inter-agency interoperability</strong>: A credential from the education ministry must be recognized by the labor ministry'},
            {icon:'🏛️',text:'<strong>Archiving & audit</strong>: Presentations must be recordable for audits without compromising privacy'},
          ],
          codeExample:{ format:'W3C VC Data Model 2.0 · SocialBenefitEntitlement', code:_CODE.govDigital, note:"The ministry's DID acts as a verifiable trust root published in the government registry. Any agency can verify the credential without calling the issuing ministry — enabling true inter-agency interoperability." }
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

  fr: {
    ui: {
      pageTitle: 'Normes de Justificatifs Vérifiables par Cas d\'Usage',
      tagline: 'Justificatifs Vérifiables · Identité Numérique · Interopérabilité',
      eyebrow: 'Identité Numérique',
      h1: '<span>Normes de Justificatifs Vérifiables</span><br>par Cas d\'Usage',
      subtitle: 'Analyse comparative du point de vue de l\'utilisateur final : quelle norme convient le mieux selon le contexte, les exigences de confidentialité et l\'écosystème de confiance. Cliquez sur une carte pour voir le détail complet.',
      legendTitle: 'Normes couvertes',
      sectionTitle: 'Comparaison des Capacités',
      sectionSub: 'Évaluation technique de chaque norme selon les dimensions les plus pertinentes pour la prise de décision',
      thStandard: 'Norme',
      thZKP: 'Confidentialité ZKP',
      thSD: 'Divulg. Sélective',
      thOffline: 'Usage Hors-ligne',
      thGov: 'Interop. Gouv.',
      thMaturity: 'Maturité',
      thBest: 'Idéal pour',
      tableLegendTitle: 'Comment lire ce tableau',
      tlCheck: 'Prise en charge native et complète en production',
      tlPartial: 'Support partiel — sous conditions ou en développement actif',
      tlCross: 'Non pris en charge — aucun chemin standard défini',
      primaryLabel: 'Normes primaires',
      secondaryLabel: 'Complémentaires',
      factorPrivacy: 'Confidentialité',
      factorInterop: 'Interop.',
      factorAdoption: 'Adoption',
      factorOffline: 'Hors-ligne',
      recStandards: 'NORMES RECOMMANDÉES',
      keyReqs: 'EXIGENCES CLÉS',
      codeExampleLabel: 'EXEMPLE DE FORMAT DE DONNÉES',
    },
    useCases: [
      {
        icon:'🪪', title:'Identité Nationale Numérique', category:'Gouvernement · Citoyen',
        description:'Passeport numérique, carte d\'identité électronique ou portefeuille d\'identité gouvernementale. Nécessite une interopérabilité gouvernementale maximale et une base juridique solide.',
        primary:['EBSI','mDL ISO','OID4VC'], secondary:['W3C VC','SD-JWT VC'],
        privacy:60, interop:95, adoption:80, offline:85,
        detail:{
          why:'Les gouvernements ont besoin de normes bénéficiant d\'une reconnaissance juridique. EBSI/eIDAS 2.0 fournit le cadre légal européen, mDL ISO couvre le pont physique-numérique, et OID4VC gère la couche de présentation numérique.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'OBLIGATOIRE EU',reason:'Requis en Europe (EUDIW). Inclut les Trust Anchors, la reconnaissance légale transfrontalière et les attributs d\'identité standardisés par la Commission Européenne.'},
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'PHYSIQUE/NUMÉRIQUE',reason:'Norme pour les licences et IDs numériques. Présentation hors-ligne via NFC/QR. Déjà déployé dans plusieurs États américains, en Australie et dans des pilotes EU.'},
            {name:'OID4VC',cls:'c-oidc',label:'COUCHE TRANSPORT',reason:'Protocole de présentation sur HTTPS compatible avec l\'infrastructure OAuth2 existante des banques et administrations.'},
          ],
          requirements:[
            {icon:'⚖️',text:'<strong>Cadre juridique</strong>: Reconnu dans la juridiction cible (eIDAS, REAL ID Act, etc.)'},
            {icon:'🔄',text:'<strong>Interopérabilité</strong>: Compatible avec les systèmes ICAO, DMV et registres d\'état civil existants'},
            {icon:'📵',text:'<strong>Usage hors-ligne</strong>: Présentation sans connectivité aux points de contrôle physiques'},
          ],
          codeExample:{ format:'EBSI PID · W3C VC Data Model 2.0', code:_CODE.nationalId, note:'Attributs PID minimaux requis par la réglementation EUDIW. Le personal_identifier est la clé de liaison transfrontalière entre les États membres de l\'UE.' }
        }
      },
      {
        icon:'🎓', title:'Justificatifs Éducatifs', category:'Éducation · RH',
        description:'Diplômes, certificats, micro-crédentiels et portfolios d\'apprentissage vérifiables par des employeurs ou des établissements académiques dans le monde entier.',
        primary:['W3C VC','OID4VC'], secondary:['EBSI','SD-JWT VC'],
        privacy:55, interop:90, adoption:75, offline:40,
        detail:{
          why:'Les justificatifs éducatifs doivent être vérifiables par des employeurs mondiaux sans infrastructure propriétaire. W3C VC avec DIDs est la norme la plus adoptée dans ce secteur (Open Badges v3, Europass).',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'RECOMMANDÉ',reason:'Base d\'Open Badges v3.0, Europass et l\'infrastructure EDCI. Permet des données riches sur les acquis d\'apprentissage avec vérification décentralisée via DIDs.'},
            {name:'OID4VC',cls:'c-oidc',label:'ÉMISSION/WALLET',reason:'Protocole d\'émission et de présentation pour les wallets étudiants. Compatible avec les LMS existants.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'DIVULGATION SÉLECTIVE',reason:'Utile quand le titulaire veut révéler uniquement des cours ou notes spécifiques sans exposer le relevé académique complet.'},
          ],
          requirements:[
            {icon:'🌍',text:'<strong>Vérification mondiale</strong>: Un employeur dans n\'importe quel pays peut vérifier sans contacter l\'établissement'},
            {icon:'📋',text:'<strong>Données riches</strong>: Compétences, crédits ECTS, date, niveau CEC, entité émettrice accréditée'},
          ],
          codeExample:{ format:'Open Badges v3.0 · W3C VC Data Model', code:_CODE.education, note:'La structure achievement supporte les micro-crédentiels et les diplômes complets dans un format interopérable unique. Le DID émetteur (did:web:mit.edu) est résolvable sans contacter l\'établissement.' }
        }
      },
      {
        icon:'🚗', title:'Permis de Conduire Numérique', category:'Gouvernement · Transport',
        description:'Version numérique du permis de conduire. Le cas d\'usage paradigmatique pour la présentation physique hors-ligne, la vérification d\'âge et la divulgation minimale de données.',
        primary:['mDL ISO'], secondary:['SD-JWT VC','OID4VC'],
        privacy:70, interop:80, adoption:90, offline:100,
        detail:{
          why:'ISO 18013-5 est la norme née spécifiquement pour ce cas d\'usage. Elle définit le format mDoc, le protocole de présentation en proximité et la divulgation sélective native des attributs.',
          standards:[
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'NORME DE FACTO',reason:'La seule conçue spécifiquement pour les permis numériques. Définit mDoc CBOR, les protocoles de proximité (NFC/BLE), la vérification hors-ligne et la divulgation sélective native.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'ALTERNATIVE EN LIGNE',reason:'Pour la vérification à distance (location de voitures, plateformes numériques). Plus léger que mDoc pour les contextes purement numériques.'},
            {name:'OID4VC',cls:'c-oidc',label:'COUCHE TRANSPORT',reason:'Complète le mDL dans les présentations en ligne. Plusieurs États américains et l\'UE combinent mDoc avec OID4VP pour la présentation à distance.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Hors-ligne obligatoire</strong>: Un agent de la circulation ne peut pas dépendre de la connectivité'},
            {icon:'🛡️',text:'<strong>Anti-clonage</strong>: Liaison au dispositif via clé privée dans l\'enclave sécurisée'},
            {icon:'⚡',text:'<strong>Vitesse</strong>: Vérification en quelques secondes lors d\'un contrôle'},
          ],
          codeExample:{ format:'ISO 18013-5 mDL · CBOR/mDoc (représentation JSON décodée)', code:_CODE.driverLicense, note:'age_over_18 peut être révélé sélectivement sans exposer la date de naissance, le nom ou l\'adresse. Déjà disponible dans Apple Wallet et Google Wallet dans plusieurs États américains.' }
        }
      },
      {
        icon:'🏢', title:'Identité d\'Entreprise (PME)', category:'Entreprise · B2B',
        description:'Accréditation des PME pour les appels d\'offres publics, l\'onboarding bancaire, les douanes et le commerce électronique B2B. Inclut les procurations et justificatifs d\'entité légale.',
        primary:['EBSI','W3C VC'], secondary:['OID4VC','SD-JWT VC'],
        privacy:40, interop:85, adoption:65, offline:30,
        detail:{
          why:'Les entreprises doivent prouver leur existence légale, leurs pouvoirs notariaux et leur conformité (AML, KYB) de manière vérifiable entre juridictions. EBSI définit le Legal Entity VC et le Power of Attorney VC.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'RECOMMANDÉ EU',reason:'Définit des justificatifs pour les entités légales (EORI, LEI), les pouvoirs de représentation, les liant à l\'EUDIW du représentant légal. Base du projet GLEIF vLEI.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'INTEROP MONDIALE',reason:'Pour les écosystèmes hors d\'Europe. GLEIF utilise W3C VC pour les justificatifs organisationnels. Permet de représenter des certificats de chambre de commerce, ISO 9001, etc.'},
          ],
          requirements:[
            {icon:'🏛️',text:'<strong>Registre légal</strong>: Lien vérifiable avec le registre officiel des entreprises'},
            {icon:'👤',text:'<strong>Représentation</strong>: Dirigeant ou mandataire agissant au nom de l\'entreprise'},
            {icon:'🌐',text:'<strong>Reconnaissance transfrontalière</strong>: Valide dans les appels d\'offres publics EU'},
          ],
          codeExample:{ format:'EBSI Legal Entity VC · W3C VC Data Model', code:_CODE.sme, note:'Le LEI (Legal Entity Identifier) du GLEIF permet une vérification mondiale sans dépendre des registres nationaux propriétaires. Le DID émetteur est lié au registre de confiance officiel EU.' }
        }
      },
      {
        icon:'🏥', title:'Justificatifs de Santé', category:'Santé · Personnel',
        description:'Dossiers médicaux portables, ordonnances numériques, certificats de vaccination et accréditation des professionnels de santé.',
        primary:['AnonCreds','SD-JWT VC'], secondary:['W3C VC','OID4VC'],
        privacy:100, interop:70, adoption:55, offline:60,
        detail:{
          why:'La santé est le cas d\'usage aux exigences de confidentialité les plus élevées. La divulgation minimale et la protection contre la corrélation entre prestataires sont essentielles.',
          standards:[
            {name:'AnonCreds (ZKP)',cls:'c-anoncred',label:'CONFIDENTIALITÉ MAXIMALE',reason:'Preuves ZKP pour démontrer des attributs ("est vacciné", "a une ordonnance valide") sans révéler l\'identité ni d\'autres données. Impossible de corréler les présentations entre différents prestataires.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'APPROCHE ÉQUILIBRÉE',reason:'Alternative plus simple avec divulgation sélective. Permet de révéler uniquement un diagnostic spécifique sans exposer l\'historique médical complet.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'SMART HEALTH',reason:'Base des SMART Health Cards (vaccins COVID, DSE portable). Large adoption aux États-Unis et au Canada pour les certificats interopérables avec HL7/FHIR.'},
          ],
          requirements:[
            {icon:'🔏',text:'<strong>HIPAA / RGPD</strong>: Minimisation des données, consentement granulaire'},
            {icon:'🚫',text:'<strong>Anti-corrélation</strong>: Impossible de tracer le patient entre différents prestataires'},
          ],
          codeExample:{ format:'AnonCreds Proof Request · prédicat ZKP (Hyperledger Indy)', code:_CODE.health, note:'Le prédicat ZKP prouve la condition sans révéler la valeur exacte. Le vérificateur ne peut pas corréler cette preuve avec d\'autres présentations du même titulaire — déliaison par conception.' }
        }
      },
      {
        icon:'🏦', title:'KYC / Identité Financière', category:'Finance · Conformité',
        description:'Onboarding bancaire, vérification AML/KYC réutilisable entre entités et accréditation d\'investisseurs pour réduire les frictions réglementaires.',
        primary:['SD-JWT VC','OID4VC'], secondary:['W3C VC','AnonCreds'],
        privacy:65, interop:80, adoption:60, offline:20,
        detail:{
          why:'Le secteur financier a besoin de conformité réglementaire (AMLD, FATF) avec un KYC réutilisable : le client se vérifie une fois et partage le justificatif avec plusieurs entités.',
          standards:[
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'RECOMMANDÉ',reason:'Permet de révéler uniquement les attributs dont chaque entité a besoin sans partager le dossier KYC complet. Format JWT familier pour les équipes fintech.'},
            {name:'OID4VC',cls:'c-oidc',label:'INTÉGRATION API',reason:'Flux de présentation compatible avec OAuth2/OIDC déjà utilisé par les banques. Facilite l\'intégration avec les systèmes CIAM existants (Okta, Azure AD, etc.).'},
            {name:'AnonCreds (ZKP)',cls:'c-anoncred',label:'CONFIDENTIALITÉ AVANCÉE',reason:'Pour les cas nécessitant des preuves de plage ("revenus > 50K") ou des prédicats ("majeur") sans révéler la valeur exacte.'},
          ],
          requirements:[
            {icon:'📋',text:'<strong>Traçabilité réglementaire</strong>: Démontrer la conformité aux auditeurs sans exposer les données client'},
            {icon:'🔄',text:'<strong>Réutilisabilité</strong>: KYC effectué une fois, valide auprès de plusieurs entités du groupe ou du secteur'},
          ],
          codeExample:{ format:'SD-JWT VC · IETF OAuth WG (RFC draft)', code:_CODE.kyc, note:'Les hashes dans _sd remplacent les vraies valeurs. Le titulaire choisit quels attributs révéler par vérificateur — le dossier KYC ne quitte jamais le wallet.' }
        }
      },
      {
        icon:'⚖️', title:'Licences Professionnelles', category:'Réglementation · Professionnel',
        description:'Autorisation d\'exercer des professions réglementées : avocats, médecins, comptables, ingénieurs, pharmaciens. Vérification par les ordres professionnels.',
        primary:['W3C VC','EBSI'], secondary:['OID4VC','SD-JWT VC'],
        privacy:50, interop:80, adoption:55, offline:45,
        detail:{
          why:'Les ordres professionnels doivent émettre des justificatifs que les employeurs et les patients peuvent vérifier instantanément. W3C VC avec le DID de l\'ordre comme émetteur est le modèle le plus flexible.',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'RECOMMANDÉ',reason:'L\'émetteur est l\'ordre professionnel identifié par son DID. Le justificatif inclut le numéro d\'inscription, les spécialités et le statut. Vérification sans appeler le registre.'},
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'CADRE EU',reason:'Pour la reconnaissance transfrontalière des qualifications professionnelles entre États membres (Directive 2005/36/CE révisée).'},
          ],
          requirements:[
            {icon:'🏛️',text:'<strong>Autorité émettrice</strong>: L\'ordre doit avoir un DID/identité vérifiable et reconnu'},
            {icon:'🔄',text:'<strong>Mises à jour de statut</strong>: Changements automatiques d\'état (suspension, sanction, nouvelle spécialité)'},
            {icon:'🌍',text:'<strong>Transfrontalier</strong>: Reconnaissance entre pays pour les professionnels mobiles'},
          ],
          codeExample:{ format:'W3C VC Data Model 2.0 · ProfessionalLicenseCredential', code:_CODE.professionalLicense, note:'Le DID émetteur (did:web:medical-board.es) est la racine de confiance. Tout vérificateur résout le DID Document pour obtenir la clé publique et valider la signature — sans appel au registre.' }
        }
      },
      {
        icon:'🔞', title:'Vérification d\'Âge', category:'Confidentialité · Consommateur',
        description:'Preuve de majorité légale pour l\'alcool, les jeux d\'argent, les contenus adultes ou les services financiers — sans révéler la date de naissance ni l\'identité complète.',
        primary:['AnonCreds','SD-JWT VC','mDL ISO'], secondary:['W3C VC'],
        privacy:95, interop:60, adoption:50, offline:75,
        detail:{
          why:'C\'est le cas paradigmatique de confidentialité minimale : seul "majeur" doit être confirmé sans révéler aucune autre donnée.',
          standards:[
            {name:'AnonCreds (ZKP)',cls:'c-anoncred',label:'CONFIDENTIALITÉ TOTALE',reason:'Preuve cryptographique d\'un prédicat : "date_of_birth < 2006-01-01" sans révéler la date réelle. Le vérificateur sait uniquement que la condition est remplie.'},
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'HORS-LIGNE/PHYSIQUE',reason:'Divulgation sélective de l\'attribut "age_over_18: true" d\'un permis de conduire. Déjà implémenté dans Apple Wallet et Google Wallet.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'EN LIGNE',reason:'Pour la vérification d\'âge sur les plateformes numériques. Le claim "age_over_18" peut être révélé sélectivement sans exposer le nom, l\'adresse ou la date exacte.'},
          ],
          requirements:[
            {icon:'🚫',text:'<strong>Données minimales</strong>: Uniquement le booléen d\'âge, rien d\'autre'},
            {icon:'🔗',text:'<strong>Non-liabilité</strong>: Impossible de tracer l\'utilisateur entre magasins ou plateformes'},
          ],
          codeExample:{ format:'SD-JWT VC + AnonCreds ZKP · age_over_18', code:_CODE.ageVerification, note:'Avec SD-JWT le vérificateur voit le booléen true mais ne peut pas inférer la date exacte. Avec AnonCreds ZKP, même le booléen n\'est pas corrélable entre présentations — déliaison maximale.' }
        }
      },
      {
        icon:'📦', title:'Chaîne d\'Approvisionnement', category:'Logistique · Commerce',
        description:'Traçabilité des produits, certificats d\'origine, audits de durabilité ESG, douanes et certifications qualité tout au long de la chaîne d\'approvisionnement.',
        primary:['W3C VC','OID4VC'], secondary:['SD-JWT VC','EBSI'],
        privacy:35, interop:90, adoption:50, offline:50,
        detail:{
          why:'Dans les chaînes d\'approvisionnement, les "titulaires" de justificatifs sont des entreprises ou des produits, et la chaîne de custody nécessite des justificatifs enchaînés. W3C VC avec DIDs d\'organisation est le modèle naturel.',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'RECOMMANDÉ',reason:'Permet des justificatifs de produit (DID du produit + origine, composition, attributs d\'audit). Compatible avec GS1 Digital Link. Base de Catena-X (chaîne automobile EU).'},
            {name:'OID4VC',cls:'c-oidc',label:'PRÉSENTATION B2B',reason:'Pour les flux de vérification en douane, sur des plateformes d\'approvisionnement ou lors d\'audits ESG où plusieurs acteurs doivent vérifier les justificatifs via API.'},
          ],
          requirements:[
            {icon:'🔗',text:'<strong>Chaîne de custody</strong>: Justificatifs enchaînés de plusieurs acteurs vérifiables de bout en bout'},
            {icon:'📋',text:'<strong>Normes sectorielles</strong>: Alignement avec GS1, ISO 14001, SA8000, etc.'},
            {icon:'🤖',text:'<strong>Machine-readable</strong>: Vérification automatisée dans les ERP sans intervention humaine'},
          ],
          codeExample:{ format:'W3C VC · GS1 Digital Link + UN Transparency Protocol (UNTP)', code:_CODE.supplyChain, note:'L\'id du credentialSubject est un GTIN GS1 — le produit a son propre identifiant vérifiable. Ce justificatif peut s\'enchaîner avec d\'autres du producteur, transporteur et douanes pour former un graphe de provenance bout en bout.' }
        }
      },
      {
        icon:'✈️', title:'Tourisme et Voyages Internationaux', category:'Voyages · Aviation · Frontières',
        description:'Justificatifs de voyage interopérables : passeports numériques, visas, données de santé du voyageur, accès aux lounges, enregistrement sans papier et passage de frontière numérique.',
        primary:['mDL ISO','OID4VC'], secondary:['W3C VC','SD-JWT VC'],
        privacy:65, interop:90, adoption:60, offline:90,
        detail:{
          why:'L\'aviation et les voyages internationaux nécessitent des justificatifs qui fonctionnent hors-ligne dans les aéroports sans connectivité et qui sont reconnus par les autorités de différents pays. L\'IATA converge vers mDoc+OID4VC comme stack standard.',
          standards:[
            {name:'ISO 18013-5 mDL',cls:'c-mdoc',label:'PRÉSENTATION PHYSIQUE',reason:'La base technique pour les Digital Travel Credentials (DTC). Le format mDoc fonctionne sur les lecteurs d\'aéroports et aux postes frontières sans connectivité. Déjà dans Apple/Google Wallet pour la TSA.'},
            {name:'OID4VC',cls:'c-oidc',label:'PROTOCOLES NUMÉRIQUES',reason:'IATA One ID utilise OID4VP pour la présentation de justificatifs passager sur les plateformes numériques. Compatible avec les systèmes de réservation (Amadeus, Sabre).'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'JUSTIFICATIFS COMPLÉMENTAIRES',reason:'Pour les justificatifs de santé du voyageur (vaccins, tests PCR), les cartes de fidélité vérifiables. ICAO DTC Type 2 est basé sur W3C VC.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Hors-ligne obligatoire</strong>: Les aéroports et postes frontières peuvent ne pas avoir de connectivité fiable'},
            {icon:'🌍',text:'<strong>Reconnaissance internationale</strong>: Accepté par les autorités de différents pays (ICAO, Schengen, TSA)'},
            {icon:'⚡',text:'<strong>Vitesse</strong>: Le passage de frontière doit se terminer en quelques secondes'},
            {icon:'🔒',text:'<strong>Biométrie</strong>: Liaison entre le justificatif et la biométrie faciale pour l\'anti-usurpation'},
          ],
          codeExample:{ format:'ICAO DTC Type 1 · ISO 18013-5 mDoc (Digital Travel Credential)', code:_CODE.tourism, note:'Le biometric_template lie le justificatif à la biométrie faciale du titulaire (ISO 19794-5). Les lecteurs aux postes frontières utilisent NFC/BLE — aucune connexion internet n\'est requise au point de passage.' }
        }
      },
      {
        icon:'🌾', title:'Agriculture et Traçabilité Agroalimentaire', category:'Agro · ESG · Exportations',
        description:'Certificats d\'origine, traçabilité du produit de la ferme au consommateur, conformité phytosanitaire, justificatifs d\'agriculteur et accès au financement agricole.',
        primary:['W3C VC','OID4VC'], secondary:['SD-JWT VC','EBSI'],
        privacy:40, interop:80, adoption:40, offline:70,
        detail:{
          why:'Le secteur agricole a besoin de justificatifs qui fonctionnent dans les zones rurales à connectivité limitée, vérifiables par les autorités phytosanitaires internationales et permettant de tracer le produit de la ferme au consommateur final.',
          standards:[
            {name:'W3C VC Data Model',cls:'c-w3c',label:'TRAÇABILITÉ',reason:'Modèle idéal pour les justificatifs de produit avec leur propre DID (lot, ferme, exportateur). Compatible avec GS1 Digital Link. Base du UN Transparency Protocol (UNTP) pour l\'empreinte carbone vérifiable.'},
            {name:'OID4VC',cls:'c-oidc',label:'INTEROP B2B',reason:'Pour la présentation de certificats phytosanitaires, de dédouanement et de conformité HACCP entre exportateurs, importateurs et autorités douanières.'},
            {name:'SD-JWT VC',cls:'c-sd-jwt',label:'DONNÉES SENSIBLES',reason:'Quand un producteur veut partager une certification biologique avec un acheteur sans révéler ses coûts de production, ses contrats ou ses données financières.'},
          ],
          requirements:[
            {icon:'📵',text:'<strong>Fonctionnalité hors-ligne</strong>: Les exploitations agricoles ont souvent une connectivité très limitée ou nulle'},
            {icon:'🌱',text:'<strong>Certifications ESG</strong>: Biologique, commerce équitable, Rainforest Alliance, empreinte carbone vérifiable'},
            {icon:'📦',text:'<strong>Traçabilité bout en bout</strong>: Du champ au consommateur, avec chaque acteur de la chaîne signant'},
            {icon:'💰',text:'<strong>Accès au financement</strong>: Les justificatifs vérifiables permettent des prêts agricoles basés sur l\'historique de production'},
          ],
          codeExample:{ format:'W3C VC · UN Transparency Protocol (UNTP) ConformityCredential', code:_CODE.agriculture, note:'Le sustainabilityScore suit le schéma UNTP pour l\'empreinte carbone vérifiable. Le DID de la ferme permet d\'enchaîner les justificatifs du producteur, du certificateur et de l\'exportateur en un graphe de confiance unique.' }
        }
      },
      {
        icon:'🏛️', title:'Secteur Public et Gouvernement Numérique', category:'Gouvernement · Services Publics',
        description:'Démarches gouvernementales numériques, accès aux prestations sociales, dossier citoyen unique, vote électronique et communication inter-agences sans silos de données.',
        primary:['EBSI','W3C VC','OID4VC'], secondary:['SD-JWT VC','mDL ISO'],
        privacy:70, interop:85, adoption:65, offline:50,
        detail:{
          why:'Les gouvernements sont les émetteurs les plus fiables de l\'écosystème. Le défi est de rendre les justificatifs émis par un ministère vérifiables dans toute autre agence, municipalité ou service privé accrédité — sans créer de silos.',
          standards:[
            {name:'EBSI / eIDAS 2.0',cls:'c-ebsi',label:'CADRE LÉGAL EU',reason:'Infrastructure technique et légale pour que les gouvernements européens émettent et reconnaissent mutuellement des justificatifs. Le PID définit l\'ensemble minimal d\'attributs que chaque EUDIW doit supporter. Obligatoire pour les services essentiels EU dès novembre 2026.'},
            {name:'W3C VC Data Model',cls:'c-w3c',label:'JUSTIFICATIFS SECTORIELS',reason:'Pour les justificatifs spécifiques à chaque service : allocations chômage, permis de construire, avantages fiscaux, registres fonciers. Les DIDs des agences gouvernementales agissent comme racines de confiance.'},
            {name:'OID4VC',cls:'c-oidc',label:'INTÉGRATION SYSTÈMES',reason:'Permet d\'intégrer le flux de justificatifs avec les systèmes d\'authentification fédérée du gouvernement (FranceConnect, GOV.UK One Login, etc.) sans remplacer l\'infrastructure existante.'},
          ],
          requirements:[
            {icon:'🔒',text:'<strong>Souveraineté des données</strong>: Le citoyen contrôle quelle agence voit quelles données, conformément au RGPD'},
            {icon:'♿',text:'<strong>Accessibilité</strong>: Le système doit fonctionner pour les citoyens sans smartphone (canal alternatif)'},
            {icon:'🔗',text:'<strong>Interopérabilité inter-agences</strong>: Un justificatif du ministère de l\'éducation doit être reconnu par le ministère du travail'},
            {icon:'🏛️',text:'<strong>Archivage et audit</strong>: Les présentations doivent être enregistrables pour les audits sans compromettre la vie privée'},
          ],
          codeExample:{ format:'W3C VC Data Model 2.0 · SocialBenefitEntitlement', code:_CODE.govDigital, note:'Le DID du ministère émetteur agit comme racine de confiance publiée dans le registre gouvernemental. Toute agence peut vérifier le justificatif sans appeler le ministère émetteur — interopérabilité inter-agences réelle.' }
        }
      }
    ],
    tableData: [
      { name:'W3C VC Data Model', org:'W3C / DIF', cls:'c-w3c', zkp:false, sd:'~', offline:false, gov:true, maturity:'Élevée', pill:'c-w3c', best:'Éducation, RH, B2B' },
      { name:'ISO 18013-5 mDL', org:'ISO / IEC', cls:'c-mdoc', zkp:false, sd:true, offline:true, gov:true, maturity:'Élevée', pill:'c-mdoc', best:'Licences, ID physique, Voyages' },
      { name:'OID4VC / OIDC', org:'OpenID Foundation', cls:'c-oidc', zkp:false, sd:'~', offline:false, gov:true, maturity:'Moy-Élevée', pill:'c-oidc', best:'Wallets, APIs, KYC' },
      { name:'AnonCreds (ZKP)', org:'Hyperledger / AnonCreds', cls:'c-anoncred', zkp:true, sd:true, offline:false, gov:false, maturity:'Moyenne', pill:'c-anoncred', best:'Santé, âge, finance' },
      { name:'SD-JWT VC', org:'IETF OAuth WG', cls:'c-sd-jwt', zkp:false, sd:true, offline:false, gov:'~', maturity:'Moy-Élevée', pill:'c-sd-jwt', best:'KYC, données sensibles' },
      { name:'EBSI / eIDAS 2.0', org:'Commission Européenne', cls:'c-ebsi', zkp:false, sd:'~', offline:false, gov:true, maturity:'Élevée (EU)', pill:'c-ebsi', best:'ID National, PMEs, Gouvernement' },
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
      `;
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

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
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

  const ex = uc.detail.codeExample;
  const codeBlock = ex ? `
    <div class="code-example-section">
      <div class="standards-label" style="margin-bottom:8px">${ui.codeExampleLabel}</div>
      <div class="code-format-label">${ex.format}</div>
      <pre class="code-block"><code>${escHtml(ex.code)}</code></pre>
      <div class="code-note">${ex.note}</div>
    </div>` : '';

  document.getElementById('panelContent').innerHTML = `
    <div style="font-size:40px;margin-bottom:8px">${uc.icon}</div>
    <div class="card-category">${uc.category}</div>
    <h2>${uc.title}</h2>
    <div class="desc">${uc.description}</div>
    <div style="color:var(--text-muted);font-size:13px;line-height:1.6;margin-bottom:20px">${uc.detail.why}</div>
    <div class="standards-label" style="margin-bottom:12px">${ui.recStandards}</div>${stds}
    <div class="reqs"><div class="standards-label" style="margin-bottom:8px">${ui.keyReqs}</div>${reqs}</div>
    ${codeBlock}`;
  document.getElementById('detailPanel').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function closePanel() {
  document.getElementById('detailPanel').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

setLanguage('en');
