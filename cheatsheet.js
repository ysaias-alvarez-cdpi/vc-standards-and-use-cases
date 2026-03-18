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
 
    stackTitle: 'The Four Layers (Stack)',
    l4text: 'Trust Registry · EBSI · OpenID Federation',
    l3text: 'OID4VCI · OID4VP · DIDComm · ISO proximity',
    l2text: 'W3C VC · SD-JWT VC · mDoc · AnonCreds',
    l1text: 'DID Core · did:web · did:key · did:jwk',

    footer: 'W3C · OpenID Foundation · ISO/IEC · IETF · EBSI · Hyperledger · MOSIP · IATA · UNTP',
  },

  fr: {
    pageTitle: 'Aide-mémoire de l\'Écosystème VC',
    headerTitle: 'Justificatifs Vérifiables : <span>Normes, Cas d\'Usage &amp; Plateformes DPG</span>',
    headerSubtitle: 'Aide-mémoire de Référence · Session de 30 Minutes',

    col1Header: 'Normes &amp; Formats',
    col1HeaderSub: 'La forme que prend le justificatif',
    sixStandardsTitle: 'Les Six Normes',

    w3cBest: 'Éducation · B2B · Chaîne d\'approvisionnement · IoT',
    mdocBest: 'Licences · ID physique · Voyages · Hors-ligne',
    oidcBest: 'Wallets · APIs · Émission · Vérification',
    anonBest: 'Santé · Prédicats d\'âge · Confidentialité maximale',
    sdjwtBest: 'KYC · Divulgation sélective · Fintech',
    ebsiBest: 'ID National · Gouv. EU · PME · EUDIW',

    useCasesTitle: '13 Cas d\'Usage en un Coup d\'Œil',
    ucNationalId: 'Identité Nationale',
    ucEducation: 'Éducation',
    ucDriverLicense: 'Permis de Conduire',
    ucSME: 'Identité d\'Entreprise',
    ucHealthcare: 'Santé',
    ucKYC: 'KYC / Finance',
    ucProfLicenses: 'Licences Professionnelles',
    ucAgeVerif: 'Vérification d\'Âge',
    ucSupplyChain: 'Chaîne d\'Approvisionnement',
    ucTourism: 'Tourisme / Voyages',
    ucAgriculture: 'Agriculture / ESG',
    ucGovDigital: 'Services Numériques Gouvernementaux',

    col2Header: 'Matrice Plateforme DPG × Cas d\'Usage',
    col2HeaderSub: 'Quelle plateforme supporte quoi aujourd\'hui',
    matrixUseCase: 'Cas d\'Usage',
    matrixNationalId: '🪪 Identité Nationale',
    matrixEducation: '🎓 Éducation',
    matrixDriverLicense: '🚗 Permis de Conduire',
    matrixTourism: '✈️ Tourisme / Voyages',
    matrixHealthcare: '🏥 Santé / ZKP',
    matrixKYC: '🏦 KYC / Finance',
    matrixAgriculture: '🌾 Agriculture / ESG',
    matrixGovDigital: '🏛️ Gouvernement Numérique',

    legendNative: 'Support natif en production',
    legendPartial: 'Partiel / en développement',
    legendNot: 'Non supporté aujourd\'hui',

    gapsTitle: 'Lacunes Critiques d\'Interopérabilité',
    gap1Title: 'AnonCreds ≠ OID4VP (aujourd\'hui)',
    gap1Body: 'La capacité ZKP de CREDEBL fonctionne uniquement sur DIDComm. Aucun chemin OID4VP standard pour l\'instant. ETA : 12–24 mois.',
    gap2Title: 'Divergence WACI-DIDComm de QuarkID',
    gap2Body: 'WACI-DIDComm n\'est pas directement compatible avec les vérificateurs OID4VP. Un bridge est requis pour l\'interop globale.',
    gap3Title: 'Apple Wallet : mDoc uniquement (sans OID4VP)',
    gap3Body: 'L\'API Safari DC ne supporte que org-iso-mdoc. SD-JWT VC et W3C VC ne peuvent pas être présentés via Safari aujourd\'hui.',
    gap4Title: 'Patron Bridge — éprouvé en production',
    gap4Body: 'Hybride OID4VC ↔ DIDComm possible : endpoint DIDComm intégré dans le DID après handshake OID4VC. Démontré : IATA One ID (oct. 2024).',

    col3Header: 'Plateformes DPG',
    col3HeaderSub: 'Architecture &amp; point fort',

    injiSweet: '🎯 Programmes nationaux de justificatifs à l\'échelle gouvernementale. +100M d\'IDs en production dans +10 pays. OID4VC + mDL natif. Composants : Inji Wallet, Inji Web, Inji Certify, Inji Verify.',
    credeblSweet: '🎯 Cas d\'usage de confidentialité maximale ZKP. Seul DPG avec des prédicats AnonCreds en production. Construit sur Credo (ex-Aries Framework JS). Double stack : DIDComm legacy + OID4VC moderne.',
    waltSweet: '🎯 Contextes réglementaires EU et wallets multi-format. Plateforme la plus alignée avec ARF/HAIP. Support simultané de tous les formats majeurs. Meilleure option pour les pilotes EUDIW.',
    quarkSweet: '🎯 Identité numérique gouvernementale en LATAM. Confiance ancrée dans la blockchain (zkSync). En production à Buenos Aires. DIDComm-first — bridge OID4VC nécessaire pour l\'interop globale.',

    decisionTitle: 'Guide Rapide de Décision',
    d1: '🏛️ <strong>Échelle gouv. + OID4VC</strong> → <span style="color:var(--inji);font-weight:600">INJI</span>',
    d2: '🇪🇺 <strong>Réglementaire EU / EUDIW</strong> → <span style="color:var(--walt);font-weight:600">walt.id</span>',
    d3: '🔏 <strong>Confidentialité ZKP maximale</strong> → <span style="color:var(--credebl);font-weight:600">CREDEBL</span>',
    d4: '🌎 <strong>Gouvernement LATAM</strong> → <span style="color:var(--quark);font-weight:600">QuarkID</span>',
    d5: '🪪 <strong>mDL / ID physique hors-ligne</strong> → <span style="color:var(--inji);font-weight:600">INJI</span> ou <span style="color:var(--walt);font-weight:600">walt.id</span>',
    d6: '📦 <strong>Chaîne d\'approvisionnement / agriculture</strong> → <span style="color:var(--walt);font-weight:600">walt.id</span> + W3C VC + OID4VC',

    stackTitle: 'Les Quatre Couches (Stack)',
    l4text: 'Registre de Confiance · EBSI · OpenID Federation',
    l3text: 'OID4VCI · OID4VP · DIDComm · Proximité ISO',
    l2text: 'W3C VC · SD-JWT VC · mDoc · AnonCreds',
    l1text: 'DID Core · did:web · did:key · did:jwk',

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

    stackTitle: 'Las Cuatro Capas (Stack)',
    l4text: 'Trust Registry · EBSI · OpenID Federation',
    l3text: 'OID4VCI · OID4VP · DIDComm · Proximidad ISO',
    l2text: 'W3C VC · SD-JWT VC · mDoc · AnonCreds',
    l1text: 'DID Core · did:web · did:key · did:jwk',

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
