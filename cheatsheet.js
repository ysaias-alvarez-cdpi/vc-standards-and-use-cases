const UI = {
  en: {
    pageTitle: 'VC Ecosystem Cheatsheet',
    headerTitle: 'Verifiable Credentials: <span>Standards, Use Cases &amp; DPG Platforms</span>',
    headerSubtitle: 'Participant Reference Cheatsheet · 30-Minute Session',

    col1Header: 'Standards & Formats',
    col1HeaderSub: 'What shape the credential takes',
    sixStandardsTitle: 'The Six Standards',

    w3cBest: 'Education · B2B · Supply Chain · IoT',
    mdocBest: 'Licenses · Physical ID · Travel · Offline',
    oidcBest: 'Wallets · APIs · Issuance · Verification',
    anonBest: 'Health · Age predicates · Privacy-max',
    sdjwtBest: 'KYC · Selective disclosure · Fintech',
    ebsiBest: 'National ID · Gov EU · SME · EUDIW',

    useCasesTitle: '13 Use Cases at a Glance',
    ucNationalId: 'National ID',
    ucEducation: 'Education',
    ucDriverLicense: "Driver's License",
    ucSME: 'SME Identity',
    ucHealthcare: 'Healthcare',
    ucKYC: 'KYC / Finance',
    ucProfLicenses: 'Professional Licenses',
    ucAgeVerif: 'Age Verification',
    ucSupplyChain: 'Supply Chain',
    ucTourism: 'Tourism / Travel',
    ucAgriculture: 'Agriculture / ESG',
    ucGovDigital: 'Gov Digital Services',
    ucIoT: 'IoT / M2M Devices',

    col2Header: 'DPG Platform × Use Case Matrix',
    col2HeaderSub: 'Which platform supports what today',
    matrixUseCase: 'Use Case',
    matrixNationalId: '🪪 National ID',
    matrixEducation: '🎓 Education',
    matrixDriverLicense: "🚗 Driver's License",
    matrixTourism: '✈️ Tourism / Travel',
    matrixHealthcare: '🏥 Healthcare / ZKP',
    matrixKYC: '🏦 KYC / Finance',
    matrixAgriculture: '🌾 Agriculture / ESG',
    matrixGovDigital: '🏛️ Gov Digital',
    matrixIoT: '🌐 IoT / M2M',

    legendNative: 'Native production support',
    legendPartial: 'Partial / in development',
    legendNot: 'Not supported today',

    gapsTitle: 'Critical Interoperability Gaps',
    gap1Title: 'AnonCreds ≠ OID4VP (today)',
    gap1Body: "CREDEBL's ZKP capability only works over DIDComm. No standard OID4VP path yet. ETA: 12–24 months.",
    gap2Title: "QuarkID's WACI-DIDComm divergence",
    gap2Body: 'WACI-DIDComm is not directly compatible with OID4VP verifiers. Bridge required for global interop.',
    gap3Title: 'Apple Wallet: mDoc-only (no OID4VP)',
    gap3Body: 'Safari DC API supports org-iso-mdoc only. SD-JWT VC and W3C VC cannot be presented via Safari today.',
    gap4Title: 'Bridge pattern — proven in production',
    gap4Body: 'OID4VC ↔ DIDComm hybrid possible: DIDComm endpoint embedded in DID after OID4VC handshake. Demonstrated: IATA One ID (Oct 2024).',

    col3Header: 'DPG Platforms',
    col3HeaderSub: 'Architecture & sweet spot',

    injiSweet: '🎯 Government-scale national credential programs. 100M+ IDs in production across 10+ countries. OID4VC + mDL native. Components: Inji Wallet, Inji Web, Inji Certify, Inji Verify.',
    credeblSweet: '🎯 ZKP-max privacy use cases. Only DPG with production AnonCreds predicates. Built on Credo (ex-Aries Framework JS). Dual-stack: DIDComm legacy + OID4VC modern path.',
    waltSweet: '🎯 EU regulatory contexts and multi-format wallets. Most ARF/HAIP-aligned platform. Simultaneous support for all major formats. Best fit for EUDIW pilots.',
    quarkSweet: '🎯 LATAM government digital identity. Blockchain-anchored trust (zkSync). Production in Buenos Aires. DIDComm-primary — OID4VC bridge needed for global interop.',

    decisionTitle: 'Decision Quick-Guide',
    d1: '🏛️ <strong>Gov scale + OID4VC</strong> → <span style="color:var(--inji);font-weight:600">INJI</span>',
    d2: '🇪🇺 <strong>EU regulatory / EUDIW</strong> → <span style="color:var(--walt);font-weight:600">walt.id</span>',
    d3: '🔏 <strong>ZKP privacy-max</strong> → <span style="color:var(--credebl);font-weight:600">CREDEBL</span>',
    d4: '🌎 <strong>LATAM government</strong> → <span style="color:var(--quark);font-weight:600">QuarkID</span>',
    d5: '🪪 <strong>mDL / offline physical ID</strong> → <span style="color:var(--inji);font-weight:600">INJI</span> or <span style="color:var(--walt);font-weight:600">walt.id</span>',
    d6: '📦 <strong>Supply chain / agriculture</strong> → <span style="color:var(--walt);font-weight:600">walt.id</span> + W3C VC + OID4VC',
    d7: '🌐 <strong>IoT / M2M (frontier)</strong> → Any OID4VC + DIDComm layer',

    stackTitle: 'The Four Layers (Stack)',
    l4text: 'Trust Registry · EBSI · OpenID Federation',
    l3text: 'OID4VCI · OID4VP · DIDComm · ISO proximity',
    l2text: 'W3C VC · SD-JWT VC · mDoc · AnonCreds',
    l1text: 'DID Core · did:web · did:key · did:ion',

    footer: 'W3C · OpenID Foundation · ISO/IEC · IETF · EBSI · Hyperledger · MOSIP · IATA · UNTP',
  },

  es: {
    pageTitle: 'Cheatsheet del Ecosistema VC',
    headerTitle: 'Credenciales Verificables: <span>Estándares, Casos de Uso y Plataformas DPG</span>',
    headerSubtitle: 'Hoja de Referencia para Participantes · Sesión de 30 Minutos',

    col1Header: 'Estándares y Formatos',
    col1HeaderSub: 'La forma que toma la credencial',
    sixStandardsTitle: 'Los Seis Estándares',

    w3cBest: 'Educación · B2B · Cadena de Suministro · IoT',
    mdocBest: 'Licencias · ID Físico · Viajes · Offline',
    oidcBest: 'Wallets · APIs · Emisión · Verificación',
    anonBest: 'Salud · Predicados de edad · Privacidad máxima',
    sdjwtBest: 'KYC · Divulgación selectiva · Fintech',
    ebsiBest: 'ID Nacional · Gobierno EU · PYME · EUDIW',

    useCasesTitle: '13 Casos de Uso de un Vistazo',
    ucNationalId: 'Identidad Nacional',
    ucEducation: 'Educación',
    ucDriverLicense: 'Licencia de Conducir',
    ucSME: 'Identidad Empresarial',
    ucHealthcare: 'Salud',
    ucKYC: 'KYC / Finanzas',
    ucProfLicenses: 'Licencias Profesionales',
    ucAgeVerif: 'Verificación de Edad',
    ucSupplyChain: 'Cadena de Suministro',
    ucTourism: 'Turismo / Viajes',
    ucAgriculture: 'Agricultura / ESG',
    ucGovDigital: 'Servicios Digitales Gubernamentales',
    ucIoT: 'Dispositivos IoT / M2M',

    col2Header: 'Matriz Plataforma DPG × Caso de Uso',
    col2HeaderSub: 'Qué plataforma soporta qué hoy',
    matrixUseCase: 'Caso de Uso',
    matrixNationalId: '🪪 Identidad Nacional',
    matrixEducation: '🎓 Educación',
    matrixDriverLicense: '🚗 Licencia de Conducir',
    matrixTourism: '✈️ Turismo / Viajes',
    matrixHealthcare: '🏥 Salud / ZKP',
    matrixKYC: '🏦 KYC / Finanzas',
    matrixAgriculture: '🌾 Agricultura / ESG',
    matrixGovDigital: '🏛️ Gobierno Digital',
    matrixIoT: '🌐 IoT / M2M',

    legendNative: 'Soporte nativo en producción',
    legendPartial: 'Parcial / en desarrollo',
    legendNot: 'No soportado hoy',

    gapsTitle: 'Brechas Críticas de Interoperabilidad',
    gap1Title: 'AnonCreds ≠ OID4VP (hoy)',
    gap1Body: 'La capacidad ZKP de CREDEBL solo funciona sobre DIDComm. Aún no hay camino OID4VP estándar. ETA: 12–24 meses.',
    gap2Title: 'Divergencia WACI-DIDComm de QuarkID',
    gap2Body: 'WACI-DIDComm no es directamente compatible con verificadores OID4VP. Se requiere un bridge para interop global.',
    gap3Title: 'Apple Wallet: solo mDoc (sin OID4VP)',
    gap3Body: 'Safari DC API solo soporta org-iso-mdoc. SD-JWT VC y W3C VC no pueden presentarse vía Safari hoy.',
    gap4Title: 'Patrón Bridge — probado en producción',
    gap4Body: 'Híbrido OID4VC ↔ DIDComm posible: endpoint DIDComm embebido en DID tras handshake OID4VC. Demostrado: IATA One ID (oct 2024).',

    col3Header: 'Plataformas DPG',
    col3HeaderSub: 'Arquitectura y punto fuerte',

    injiSweet: '🎯 Programas nacionales de credenciales a escala gubernamental. +100M IDs en producción en +10 países. OID4VC + mDL nativo. Componentes: Inji Wallet, Inji Web, Inji Certify, Inji Verify.',
    credeblSweet: '🎯 Casos de uso de máxima privacidad ZKP. Único DPG con predicados AnonCreds en producción. Construido sobre Credo (ex-Aries Framework JS). Doble stack: DIDComm legacy + OID4VC moderno.',
    waltSweet: '🎯 Contextos regulatorios EU y wallets multi-formato. Plataforma más alineada con ARF/HAIP. Soporte simultáneo de todos los formatos principales. Mejor opción para pilotos EUDIW.',
    quarkSweet: '🎯 Identidad digital gubernamental en LATAM. Confianza anclada en blockchain (zkSync). En producción en Buenos Aires. DIDComm-first — se necesita bridge OID4VC para interop global.',

    decisionTitle: 'Guía Rápida de Decisión',
    d1: '🏛️ <strong>Escala gov + OID4VC</strong> → <span style="color:var(--inji);font-weight:600">INJI</span>',
    d2: '🇪🇺 <strong>Regulatorio EU / EUDIW</strong> → <span style="color:var(--walt);font-weight:600">walt.id</span>',
    d3: '🔏 <strong>Privacidad ZKP máxima</strong> → <span style="color:var(--credebl);font-weight:600">CREDEBL</span>',
    d4: '🌎 <strong>Gobierno LATAM</strong> → <span style="color:var(--quark);font-weight:600">QuarkID</span>',
    d5: '🪪 <strong>mDL / ID físico offline</strong> → <span style="color:var(--inji);font-weight:600">INJI</span> o <span style="color:var(--walt);font-weight:600">walt.id</span>',
    d6: '📦 <strong>Cadena de suministro / agricultura</strong> → <span style="color:var(--walt);font-weight:600">walt.id</span> + W3C VC + OID4VC',
    d7: '🌐 <strong>IoT / M2M (frontera)</strong> → Cualquier OID4VC + capa DIDComm',

    stackTitle: 'Las Cuatro Capas (Stack)',
    l4text: 'Trust Registry · EBSI · OpenID Federation',
    l3text: 'OID4VCI · OID4VP · DIDComm · Proximidad ISO',
    l2text: 'W3C VC · SD-JWT VC · mDoc · AnonCreds',
    l1text: 'DID Core · did:web · did:key · did:ion',

    footer: 'W3C · OpenID Foundation · ISO/IEC · IETF · EBSI · Hyperledger · MOSIP · IATA · UNTP',
  },
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  const t = UI[lang];

  document.documentElement.lang = lang;
  document.title = t.pageTitle;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

setLanguage('en');
