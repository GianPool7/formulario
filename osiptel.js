'use strict';

(function () {
  const API_ENDPOINTS = {
    identificationTypes: 'https://app-externos.fiberpro.com.pe/api/get_identification_type',
    districts: (provinceId = 128) => `https://app-externos.fiberpro.com.pe/api/get_district/${provinceId}`,
    contacts: (documentNumber) => `https://app-externos.fiberpro.com.pe/api/get_contacts/${documentNumber}`,
    submit: 'https://libro-reclamaciones-fiberpro-e2b1f36f0380.herokuapp.com/api/reclamos/reclamo'
  };

  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result || '').toString().split(',')[1] || '');
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const DOCUMENT_SELECT_IDS = ['tipodocumentoidentidad', 'tipoDoc', 'tipoDoc-ica'];
  const DISTRICT_SELECT_IDS = ['distritos', 'distritoCalidad', 'distritofs'];

  const STEP_SEQUENCE = ['select-type-claim', 'select-type-user', 'datos-personales', 'materia-reclamo', 'dato-servicio', 'preguntas', 'descargo-cliente', 'finalizar'];

  const APPEAL_MAP = {
    apelacionOne: 6,
    apelacionTwo: 1,
    apelacionThree: 2,
    apelacionFour: 3,
    apelacionFive: 4,
    apelacionSix: 5
  };
  const APPEAL_SECTION_IDS = ['apelacionUno', 'apelacionDos', 'apelacionTres', 'apelacionCuatro', 'apelacionCinco', 'apelacionSeis'];

  const COMPLAINT_MAP = {
    quejaSeis: 6,
    quejaUno: 1,
    quejaDos: 2,
    quejaTres: 3,
    quejaCuatro: 4,
    quejaCinco: 5
  };

  const COMPLAINT_SECTION_IDS = {
    1: 'quejaPreguntaUno',
    2: 'quejaPreguntaDos',
    3: 'quejaPreguntaTres',
    4: 'quejaPreguntaCuatro',
    5: 'quejaPreguntaCinco',
    6: 'quejaPreguntaSeis'
  };

  const CLAIM_CATEGORY_MAP = {
    fcs: { id: 1, container: 'fc', section: 'contenedorFacturacionCobro' },
    calidad: { id: 2, container: 'cs', section: 'calidadReclamableOpcion' },
    oferta: { id: 3, container: 'op', section: 'incumplimentoReclamble' },
    falta: { id: 4, container: 'fs', section: 'servicioReclamable' },
    instalacion: { id: 5, container: 'ia', section: 'instalacionReclamable' },
    baja: { id: 6, container: 'sus', section: 'bajaReclamables' },
    contratacion: { id: 7, container: 'ct', section: 'contratosReclamable' },
    migracion: { id: 8, container: 'mi', section: 'migracionReclamable' },
    xmaterias: { id: 9, container: 'xma', section: 'xmaterias' }
  };

  const VISIBILITY_RULES = [
    { fn: 'canal', source: 'canalPresentacion', target: 'canalQueja', values: ['6'], display: 'flex' },
    { fn: 'adjuntaPruebaQueja', source: 'adjuntaPrueba', target: 'pruebaQuejas', values: ['True'], display: 'flex' },
    { fn: 'constanciaPago', source: 'constanciaPagoQueja', target: 'constanciaPago', values: ['True'], display: 'flex' },
    { fn: 'dptramitacion', source: 'pagoCuentaQueja', target: 'dpagocuenta', values: ['otros'], display: 'flex' },
    { fn: 'capturaQueja', source: 'capturaQuejaCinco', target: 'mpQueja', values: ['True'], display: 'flex' },
    { fn: 'defectos', source: 'dtramitacion', target: 'dptramitacion', values: ['True'], display: 'flex' },
    { fn: 'mdPagoFacturacion', source: 'mPago', target: 'especificarMPfacturacion', values: ['otro'], display: 'block' },
    { fn: 'hojaFacturado', source: 'hpfacturado', target: 'fhpf', values: ['si'], display: 'flex' },
    { fn: 'canalPromocion', source: 'cbpromocionfs', target: 'txtcpromocion', values: ['otro'], display: 'block' },
    { fn: 'canalPromocionCuatro', source: 'cnPromocionCuatro', target: 'txtcpromocioC', values: ['otro'], display: 'block' },
    { fn: 'fsrecibo', source: 'adrecibos', target: 'adRecibofs', values: ['True'], display: 'flex' },
    { fn: 'mpagosfs', source: 'mpagos', target: 'txtmpagos', values: ['otros'], display: 'flex' },
    { fn: 'fsreciboPendiente', source: 'adrecibosPendiente', target: 'adReciboPendientefs', values: ['True'], display: 'flex' },
    { fn: 'soltrasladoe', source: 'strasladoe', target: 'estraslado', values: ['otros'], display: 'flex' },
    { fn: 'adsTraslado', source: 'adsOpcionTraslado', target: 'adsot', values: ['True'], display: 'flex' },
    { fn: 'canalTrasladoCinco', source: 'ctopcionCinco', target: 'txtCincoTraslado', values: ['otros'], display: 'block' },
    { fn: 'opcionTrasladoCuatro', source: 'opcionCuatroTraslado', target: 'asbaja', values: ['True'], display: 'flex' },
    { fn: 'canaldBaja', source: 'cbaja', target: 'txtcanalbaja', values: ['otros'], display: 'block' },
    { fn: 'adjuntarBaja', source: 'asb', target: 'documento-baja', values: ['True'], display: 'flex' },
    { fn: 'canalTraslado', source: 'ctraslado', target: 'txtcanalTraslado', values: ['otros'], display: 'block' },
    { fn: 'adjuntarTraslado', source: 'asT', target: 'asTraslado', values: ['True'], display: 'flex' },
    { fn: 'canalMigracion', source: 'cmigracion', target: 'canaldmigracion', values: ['otros'], display: 'block' },
    { fn: 'asolicitud', source: 'asm', target: 'asmf', values: ['True'], display: 'flex' },
    { fn: 'canalContratacion', source: 'ccontratacion', target: 'txtcontratacion', values: ['otros'], display: 'block' },
    { fn: 'cPresentacionFLL', source: 'cpresentacion', target: 'cpresentacionf', values: ['otros'], display: 'block' },
    { fn: 'solicitudfll', source: 'sasfll', target: 'asfll', values: ['True'], display: 'flex' }
  ];

  const TICKET_CONFIG = {
    reclamo: { id: 'reclamo', value: '1', label: 'Reclamo', buttonId: 'materiaReclamobtn' },
    queja: { id: 'queja', value: '2', label: 'Queja', buttonId: 'materiaQuejabtn' },
    apelacion: { id: 'apelacion', value: '3', label: 'Apelación', buttonId: null }
  };

  const USER_CONFIG = {
    abonado: { value: '1', label: 'Abonado' },
    usuario: { value: '2', label: 'Usuario' },
    representante: { value: '3', label: 'Representante' }
  };

  const NUMERIC_INPUT_IDS = [
    'numDoc',
    'numDoc-ica',
    'numerodocumentoidentidad',
    'numeroContacto',
    'montoTarifa',
    'numeroServicioApelacion',
    'numeroServicioContratadoReclamo',
    'numeroCartaApelacion'
  ];

  const state = {
    currentStep: 1,
    maxStepReached: 1,
    ticketType: '',
    userType: '',
    appealId: null,
    appealValue: null,
    complaintId: null,
    complaintValue: null,
    claimId: null,
    claimCategory: null,
    claimSubType: null
  };

  const elements = {};

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    cacheElements();
    ensureFieldNames();
    bindGlobalAPIs();
    resetInitialView();
    initRemoteData();
    initContactLookup();
    initNumericConstraints();
    initTicketCards();
    initUserCards();
    initStepper();
    initValidationFlow();
    initAppealFlow();
    initComplaintFlow();
    initClaimFlow();
    initSimpleVisibilityRules();
    initFormSubmission();
  }
  function cacheElements() {
    elements.ticketCards = getEl('contenedorOpcionesQRA');
    elements.userCards = getEl('content-susbcriber-user-Representative');
    elements.sequenceNav = getEl('sequence-data');
    elements.stepBoxes = Array.from(document.querySelectorAll('.contenedor-caja-sequencia'));
    elements.validation = getEl('validation');
    elements.personalData = getEl('content-datos');
    elements.materiaSection = getEl('content-materia-selection');
    elements.materiaWrapper = getEl('materia-elegido-datos-servicio');
    elements.dataService = getEl('data-service-complete');
    elements.dataServiceTitle = getEl('data-service-title');
    elements.dataServiceButtons = getEl('content-btn-cargar');
    elements.appealData = getEl('data-content-apelacion');
    elements.complaintData = getEl('data-content-queja');
    elements.claimData = getEl('data-content-reclamo');
    elements.descargoCliente = getEl('contents-descargo-cliente');
    elements.politicas = getEl('politicas-privacidad');
    elements.codeBox = getEl('code');
    elements.message = getEl('message');
    elements.submitButton = getEl('enviarFormulario');
    elements.backButton = getEl('back');
    elements.ticketTypeInput = getEl('tipoticket');
    elements.userTypeInput = getEl('tipo-user');
    elements.titleTicketStep = getEl('title_type_select');
    elements.titleUserStep = getEl('title_type_user');
    elements.titleMateria = getEl('title-rqa-elegida');
    elements.titleDescargo = getEl('title-descargo-cliente');
    elements.btnAppealContinue = getEl('cargar-apelacion');
    elements.btnComplaintContinue = getEl('cargar-queja');
    elements.btnClaimContinue = getEl('cargar-reclamo');
    elements.nextAppeal = getEl('seguir-apelacion');
    elements.nextComplaint = getEl('seguir-queja');
    elements.nextClaim = getEl('seguir-reclamo');
    elements.sequenceChecks = {
      typeUser: getEl('check-type-user'),
      personal: getEl('check-datos-personales'),
      materia: getEl('check-materia'),
      servicio: getEl('check-datos-servicio'),
      preguntas: getEl('check-preguntas'),
      descargo: getEl('check-descargo-cliente'),
      final: getEl('check-finalizar')
    };
  }

  function ensureFieldNames() {
    document.querySelectorAll('input[id], select[id], textarea[id]').forEach((el) => {
      if (!el.name) {
        el.name = el.id;
      }
    });
  }

  function getEl(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
  }

  function showElement(el, display = 'block') {
    if (el) {
      el.style.display = display;
    }
  }

  function hideElement(el) {
    if (el) {
      el.style.display = 'none';
    }
  }

  function toggleElement(el, condition, display = 'block') {
    if (!el) return;
    if (condition) {
      showElement(el, display);
    } else {
      hideElement(el);
    }
  }

  function setText(target, text) {
    const el = getEl(target);
    if (el) {
      el.textContent = text ?? '';
    }
  }

  function resetFields(container) {
    const node = getEl(container);
    if (!node) return;
    node.querySelectorAll('input, select, textarea').forEach((field) => {
      if (field.type === 'checkbox' || field.type === 'radio') {
        field.checked = false;
      } else if (field.tagName === 'SELECT') {
        field.selectedIndex = 0;
      } else {
        field.value = '';
      }
    });
  }

  function toggleByValue(sourceId, targetRef, allowedValues, display = 'block') {
    const source = getEl(sourceId);
    const target = typeof targetRef === 'function' ? targetRef() : getEl(targetRef);
    if (!source || !target) return;
    const show = allowedValues.includes(source.value);
    toggleElement(target, show, display);
    if (!show) {
      resetFields(target);
    }
  }

  async function fetchJSON(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }
    return response.json();
  }

  function markStepAsComplete(stepKey, completed) {
    const icon = elements.sequenceChecks[stepKey];
    if (!icon) return;
    icon.classList.remove('fa-solid', 'fa-circle-check', 'fa-regular', 'fa-circle');
    if (completed) {
      icon.classList.add('fa-solid', 'fa-circle-check');
    } else {
      icon.classList.add('fa-regular', 'fa-circle');
    }
  }

  function updateMaxStep(stepIndex) {
    if (stepIndex > state.maxStepReached) {
      state.maxStepReached = stepIndex;
    }
  }
  function resetInitialView() {
    hideElement(elements.sequenceNav);
    hideElement(elements.userCards);
    hideElement(elements.validation);
    hideElement(elements.personalData);
    hideElement(elements.materiaWrapper);
    hideElement(elements.materiaSection);
    hideElement(elements.dataService);
    hideElement(elements.appealData);
    hideElement(elements.complaintData);
    hideElement(elements.claimData);
    hideElement(elements.descargoCliente);
    hideElement(elements.politicas);
    hideElement(elements.codeBox);
    hideElement(elements.btnAppealContinue);
    hideElement(elements.btnComplaintContinue);
    hideElement(elements.btnClaimContinue);
    hideElement(elements.nextAppeal);
    hideElement(elements.nextComplaint);
    hideElement(elements.nextClaim);
  }

  function bindGlobalAPIs() {
    window.buscarcliente = buscarcliente;
    window.validarDatosPersonales = validarDatosPersonales;
    window.options_appels = handleAppealSelection;
    window.pestañaApelacion = showAppealQuestions;
    window.continuarApelacion = continueAppealFlow;
    window.continuarpoliticas = showPolicies;
    window.quejas = handleComplaintSelection;
    window.pestañaQueja = showComplaintQuestions;
    window.continuaQueja = continueComplaintFlow;
    window.reclamo = handleClaimCategory;
    window.reclamos = handleClaimSelection;
    window.pestañaReclamo = showClaimQuestions;
    window.continuarReclamo = continueClaimFlow;
    window.tipoDocIca = tipoDocIca;
    window.toggleApelacion = toggleConditionalAppealBlock;
    VISIBILITY_RULES.forEach((rule) => {
      window[rule.fn] = () => toggleByValue(rule.source, rule.target, rule.values, rule.display);
    });
    window.canalMigracionTres = handleMigrationThreeChannel;
  }
  async function initRemoteData() {
    try {
      await Promise.all([loadIdentificationTypes(), loadDistricts()]);
    } catch (error) {
      console.error('No se pudo cargar data remota:', error);
    }
  }

  async function loadIdentificationTypes() {
    DOCUMENT_SELECT_IDS.forEach((id) => {
      const select = getEl(id);
      if (select) {
        select.innerHTML = '<option value="">Cargando...</option>';
      }
    });

    try {
      const data = await fetchJSON(API_ENDPOINTS.identificationTypes);
      DOCUMENT_SELECT_IDS.forEach((id) => {
        const select = getEl(id);
        if (!select) return;
        select.innerHTML = '<option value="">Seleccione una opción</option>';
        data.forEach((item) => {
          const option = document.createElement('option');
          option.value = item.id;
          option.textContent = item.name;
          select.appendChild(option);
        });
      });
    } catch (error) {
      console.error('Error al cargar tipos de documento', error);
      DOCUMENT_SELECT_IDS.forEach((id) => {
        const select = getEl(id);
        if (select) {
          select.innerHTML = '<option value="">No disponible</option>';
        }
      });
    }
  }

  async function loadDistricts() {
    DISTRICT_SELECT_IDS.forEach((id) => {
      const select = getEl(id);
      if (select) {
        select.innerHTML = '<option value="">Cargando distritos...</option>';
      }
    });

    try {
      const districts = await fetchJSON(API_ENDPOINTS.districts());
      DISTRICT_SELECT_IDS.forEach((id) => {
        const select = getEl(id);
        if (!select) return;
        select.innerHTML = '<option value="">Seleccionar Opción</option>';
        districts.forEach((district) => {
          const option = document.createElement('option');
          option.value = district.value;
          option.textContent = district.label;
          select.appendChild(option);
        });
      });
    } catch (error) {
      console.error('Error al cargar distritos', error);
      DISTRICT_SELECT_IDS.forEach((id) => {
        const select = getEl(id);
        if (select) {
          select.innerHTML = '<option value="">No disponible</option>';
        }
      });
    }
  }
  async function buscarcliente() {
    const documentInput = getEl('numDoc');
    const errorLabel = getEl('campo-numero-doc');
    if (!documentInput) return;

    const documentNumber = documentInput.value.trim();
    if (!documentNumber) {
      if (errorLabel) errorLabel.style.display = 'block';
      return;
    }
    if (errorLabel) errorLabel.style.display = 'none';

    try {
      const data = await fetchJSON(API_ENDPOINTS.contacts(documentNumber));
      if (!data?.exists || !data?.partner) {
        alert('No se encontró un contacto con ese documento.');
        return;
      }

      const partner = data.partner;
      const fullName = (partner.name || '').trim().split(/\s+/);
      const apellidos = fullName.slice(0, 2).join(' ');
      const nombres = fullName.slice(2).join(' ');

      setInputValue('apellidos', apellidos);
      setInputValue('name', nombres);
      setInputValue('numeroContacto', partner.phone || '');
      setInputValue('direccion', partner.street || '');
      setInputValue('correo', partner.email || '');
    } catch (error) {
      console.error('Error al buscar cliente', error);
      alert('No se pudo recuperar la información del contacto.');
    }
  }

  function setInputValue(id, value) {
    const input = getEl(id);
    if (input) {
      input.value = value || '';
    }
  }
  function initNumericConstraints() {
    NUMERIC_INPUT_IDS.forEach((id) => {
      const input = getEl(id);
      if (!input) return;
      input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, '');
      });
    });

    const correoInput = getEl('correo');
    const correoError = getEl('campo-correo');
    if (correoInput) {
      correoInput.addEventListener('input', () => {
        const value = correoInput.value.trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!valid && correoError) {
          correoError.style.display = 'block';
          correoInput.classList.add('input-error');
        } else if (correoError) {
          correoError.style.display = 'none';
          correoInput.classList.remove('input-error');
        }
      });
    }
  }

  function tipoDocIca() {
    const select = getEl('tipoDoc-ica');
    const input = getEl('numDoc-ica');
    if (!select || !input) return;

    const limits = { DNI: 8, Pasaporte: 12, 'C.E.': 12, RUC: 11 };
    const max = limits[select.value] || 0;
    input.disabled = max === 0;
    input.maxLength = max;
    if (max === 0) {
      input.value = '';
    }
  }
  function initTicketCards() {
    Object.entries(TICKET_CONFIG).forEach(([key, config]) => {
      const trigger = getEl(config.id);
      if (trigger) {
        trigger.addEventListener('click', () => selectTicketType(key));
      }
    });
  }

  function selectTicketType(key) {
    const config = TICKET_CONFIG[key];
    if (!config) return;

    state.ticketType = config.value;
    if (elements.ticketTypeInput) {
      elements.ticketTypeInput.value = config.value;
    }

    hideElement(elements.ticketCards);
    showElement(elements.userCards, 'flex');
    showElement(elements.sequenceNav, 'flex');

    if (elements.titleTicketStep) {
      elements.titleTicketStep.textContent = config.label;
    }

    const btnReclamo = getEl('materiaReclamobtn');
    const btnQueja = getEl('materiaQuejabtn');
    hideElement(btnReclamo);
    hideElement(btnQueja);
    if (config.buttonId) {
      showElement(getEl(config.buttonId), 'block');
    }

    markStepAsComplete('typeUser', false);
    markStepAsComplete('personal', false);
    markStepAsComplete('materia', false);
    markStepAsComplete('servicio', false);
    markStepAsComplete('preguntas', false);
    markStepAsComplete('descargo', false);
    markStepAsComplete('final', false);
    state.maxStepReached = Math.max(state.maxStepReached, 2);
    showStep(2);
  }
  function initUserCards() {
    Object.keys(USER_CONFIG).forEach((key) => {
      const trigger = getEl(key);
      if (trigger) {
        trigger.addEventListener('click', () => selectUserType(key));
      }
    });
  }

  function selectUserType(key) {
    const config = USER_CONFIG[key];
    if (!config) return;

    state.userType = config.value;
    if (elements.userTypeInput) {
      elements.userTypeInput.value = config.value;
    }

    const subscriberContent = getEl('validation-subscriber');
    const subscriberDate = getEl('subscriber-date');
    const userContent = getEl('type-user');
    const facturacion = getEl('content-facturacion-abonado');
    const familyUser = getEl('family-user');
    const repCP = getEl('cp-representatives');
    const repRS = getEl('rs-representatives');

    hideElement(subscriberContent);
    hideElement(subscriberDate);
    hideElement(userContent);
    hideElement(facturacion);
    hideElement(familyUser);
    hideElement(repCP);
    hideElement(repRS);

    hideElement(elements.descargoCliente);
    hideElement(elements.politicas);
    hideElement(elements.appealData);
    hideElement(elements.complaintData);
    hideElement(elements.claimData);
    hideElement(elements.materiaWrapper);
    hideElement(elements.dataService);
    hideElement(elements.questionsPersonal);

    switch (key) {
      case 'abonado':
        showElement(elements.validation, 'block');
        showElement(subscriberContent, 'block');
        showElement(subscriberDate, 'flex');
        hideElement(userContent);
        hideElement(facturacion);
        hideElement(familyUser);
        hideElement(repCP);
        hideElement(repRS);
        break;
      case 'usuario':
        showElement(elements.validation, 'block');
        showElement(userContent, 'flex');
        showElement(facturacion, 'flex');
        showElement(familyUser, 'flex');
        hideElement(subscriberContent);
        hideElement(subscriberDate);
        hideElement(repCP);
        hideElement(repRS);
        break;
      case 'representante':
        hideElement(elements.validation);
        showElement(elements.questionsPersonal, 'block');
        showElement(repCP, 'block');
        showElement(repRS, 'block');
        break;
      default:
        break;
    }

    if (elements.titleUserStep) {
      elements.titleUserStep.textContent = config.label;
    }

    markStepAsComplete('typeUser', true);
    state.maxStepReached = Math.max(state.maxStepReached, 3);
    showStep(3);
  }
  function clearEntireForm() {
    document.querySelectorAll('input, select, textarea').forEach((field) => {
      if (field.type === 'checkbox' || field.type === 'radio') {
        field.checked = false;
      } else if (field.tagName === 'SELECT') {
        field.selectedIndex = 0;
      } else {
        field.value = '';
      }
    });
  }
  function initStepper() {
    if (!elements.stepBoxes) return;
    elements.stepBoxes.forEach((box) => {
      box.addEventListener('click', () => {
        const index = Number(box.dataset.index);
        if (!index || index > state.maxStepReached) return;
        showStep(index);
      });
    });
  }

  function showStep(index) {
    state.currentStep = index;
    switch (String(index)) {
      case '1':
        showElement(elements.ticketCards, 'flex');
        hideElement(elements.userCards);
        hideElement(elements.sequenceNav);
        hideElement(elements.validation);
        hideElement(elements.personalData);
        hideElement(elements.materiaWrapper);
        hideElement(elements.dataService);
        hideElement(elements.appealData);
        hideElement(elements.complaintData);
        hideElement(elements.claimData);
        hideElement(elements.descargoCliente);
        hideElement(elements.politicas);
        hideElement(elements.codeBox);
        markStepAsComplete('typeUser', false);
        markStepAsComplete('personal', false);
        markStepAsComplete('materia', false);
        markStepAsComplete('servicio', false);
        markStepAsComplete('preguntas', false);
        markStepAsComplete('descargo', false);
        markStepAsComplete('final', false);
        clearEntireForm();
        break;
      case '2':
        hideElement(elements.ticketCards);
        showElement(elements.userCards, 'flex');
        hideElement(elements.validation);
        hideElement(elements.personalData);
        hideElement(elements.materiaWrapper);
        hideElement(elements.dataService);
        hideElement(elements.appealData);
        hideElement(elements.complaintData);
        hideElement(elements.claimData);
        hideElement(elements.descargoCliente);
        hideElement(elements.politicas);
        break;
      case '3':
        hideElement(elements.materiaWrapper);
        hideElement(elements.dataService);
        hideElement(elements.appealData);
        hideElement(elements.complaintData);
        hideElement(elements.claimData);
        hideElement(elements.descargoCliente);
        hideElement(elements.politicas);
        if (state.userType === USER_CONFIG.representante.value) {
          hideElement(elements.validation);
          showElement(elements.personalData, 'block');
        } else {
          showElement(elements.validation, 'block');
          hideElement(elements.personalData);
        }
        break;
      case '4':
        showElement(elements.materiaWrapper, 'block');
        showElement(elements.materiaSection, 'block');
        hideElement(elements.dataService);
        hideElement(elements.appealData);
        hideElement(elements.complaintData);
        hideElement(elements.claimData);
        hideElement(elements.descargoCliente);
        hideElement(elements.politicas);
        break;
      case '5':
        hideElement(elements.materiaSection);
        showElement(elements.dataService, 'block');
        hideElement(elements.appealData);
        hideElement(elements.complaintData);
        hideElement(elements.claimData);
        hideElement(elements.descargoCliente);
        hideElement(elements.politicas);
        break;
      case '6':
        hideElement(elements.dataService);
        hideElement(elements.descargoCliente);
        hideElement(elements.politicas);
        switch (state.ticketType) {
          case TICKET_CONFIG.reclamo.value:
            showElement(elements.claimData, 'block');
            hideElement(elements.complaintData);
            hideElement(elements.appealData);
            break;
          case TICKET_CONFIG.queja.value:
            showElement(elements.complaintData, 'block');
            hideElement(elements.claimData);
            hideElement(elements.appealData);
            break;
          case TICKET_CONFIG.apelacion.value:
            showElement(elements.appealData, 'block');
            hideElement(elements.claimData);
            hideElement(elements.complaintData);
            break;
          default:
            hideElement(elements.appealData);
            hideElement(elements.complaintData);
            hideElement(elements.claimData);
            break;
        }
        break;
      case '7':
        hideElement(elements.appealData);
        hideElement(elements.complaintData);
        hideElement(elements.claimData);
        hideElement(elements.politicas);
        showElement(elements.descargoCliente, 'flex');
        break;
      case '8':
        hideElement(elements.appealData);
        hideElement(elements.complaintData);
        hideElement(elements.claimData);
        hideElement(elements.descargoCliente);
        showElement(elements.politicas, 'block');
        break;
      default:
        break;
    }
  }
  function initValidationFlow() {
    const continuar = getEl('validarFormularioContinuar');
    if (continuar) {
      continuar.addEventListener('click', () => {
        const general = validarCamposGenerales();
        const autorizacion = validarCamposAutorizacion();
        const tipoUsuario = validarCamposTipoUsuario();
        if (general && autorizacion && tipoUsuario) {
          hideElement(elements.validation);
          showElement(elements.personalData, 'block');
          showMateriaSelection();
          markStepAsComplete('personal', true);
          state.maxStepReached = Math.max(state.maxStepReached, 4);
          showStep(4);
        }
      });
    }
  }

  function validarDatosPersonales() {
    const errors = document.querySelectorAll('.msg-error');
    errors.forEach((error) => (error.style.display = 'none'));

    let isValid = true;
    const tipoUsuario = state.userType;

    if (tipoUsuario === USER_CONFIG.abonado.value) {
      isValid = checkRequiredField('tipodocumentoidentidad', 'error-tipo-doc-identidad') && isValid;
      isValid = checkRequiredField('numerodocumentoidentidad', 'error-num-doc') && isValid;
      isValid = checkRequiredField('fechaEmisionDocumentoIdentidad', 'error-fecha-emision') && isValid;
      isValid = checkRequiredField('nombrePadre', 'error-nombre-padre') && isValid;
      isValid = checkRequiredField('nombreMadre', 'error-tipo-doc-madre') && isValid;
      isValid = checkRequiredField('lugarNacimiento', 'error-lugar-nacimiento') && isValid;
      isValid = checkRequiredField('fechaNacimiento', 'error-fecha-nacimiento') && isValid;
    }

    if (tipoUsuario === USER_CONFIG.usuario.value) {
      isValid = checkRequiredField('tipodocumentoidentidad', 'error-tipo-doc-identidad') && isValid;
      isValid = checkRequiredField('numerodocumentoidentidad', 'error-num-doc') && isValid;
      isValid = checkRequiredField('montoTarifa', 'error-monto') && isValid;
      isValid = checkRequiredField('fechaVencimiento', 'error-fecha-vencimiento') && isValid;
      isValid = checkRequiredField('direccionFacturacion', 'error-direccion-facturacion') && isValid;
    }

    if (isValid) {
      hideElement(elements.validation);
      showElement(elements.personalData, 'block');
      state.maxStepReached = Math.max(state.maxStepReached, 3);
      showStep(3);
    }
  }

  function checkRequiredField(fieldId, errorId) {
    const field = getEl(fieldId);
    const error = getEl(errorId);
    if (!field) return true;
    const value = field.value?.trim();
    const valid = Boolean(value);
    if (error) {
      error.style.display = valid ? 'none' : 'block';
    }
    return valid;
  }

  function validarCamposGenerales() {
    const sedeInput = getEl('sedes-ica-lima');
    const esLima = sedeInput ? sedeInput.value === '1' : true;
    const campos = esLima
      ? ['tipoDoc', 'numDoc', 'name', 'apellidos', 'numeroContacto', 'distritos', 'direccion', 'correo']
      : ['tipoDoc-ica', 'numDoc-ica', 'name', 'apellidos', 'numeroContacto', 'direccion', 'correo'];

    let valido = true;
    campos.forEach((id) => {
      const campo = getEl(id);
      const error = campo?.parentElement?.querySelector('.msg-error');
      const value = campo?.value?.trim();
      if (!campo) return;
      if (!value) {
        valido = false;
        if (error) error.style.display = 'block';
      } else if (error) {
        error.style.display = 'none';
      }
    });
    return valido;
  }

  function validarCamposAutorizacion() {
    const si = getEl('autoriza_si');
    const no = getEl('autoriza_no');
    const error = getEl('campo-autorizacion');
    if (!si || !no) return true;
    const checked = (si.checked || no.checked);
    if (error) {
      error.style.display = checked ? 'none' : 'block';
    }
    return checked;
  }

  function validarCamposTipoUsuario() {
    if (state.userType !== USER_CONFIG.representante.value) return true;
    const razon = getEl('razonsocial');
    const error = getEl('campo-razon-social');
    if (!razon) return true;
    const hasValue = Boolean(razon.value.trim());
    if (error) {
      error.style.display = hasValue ? 'none' : 'block';
    }
    return hasValue;
  }

  function showMateriaSelection() {
    showElement(elements.materiaWrapper, 'block');
    showElement(elements.materiaSection, 'block');
    hideElement(elements.dataService);
    hideElement(elements.appealData);
    hideElement(elements.complaintData);
    hideElement(elements.claimData);
    hideElement(elements.descargoCliente);
    hideElement(elements.politicas);

    switch (state.ticketType) {
      case TICKET_CONFIG.reclamo.value:
        setText(elements.titleMateria, 'Materia Reclamable');
        showElement(getEl('select-reclamo'), 'flex');
        hideElement(getEl('select-queja'));
        hideElement(getEl('select-apelacion'));
        showElement(elements.btnClaimContinue, 'block');
        hideElement(elements.btnComplaintContinue);
        hideElement(elements.btnAppealContinue);
        break;
      case TICKET_CONFIG.queja.value:
        setText(elements.titleMateria, 'Objeto de la Queja');
        showElement(getEl('select-queja'), 'flex');
        hideElement(getEl('select-reclamo'));
        hideElement(getEl('select-apelacion'));
        showElement(elements.btnComplaintContinue, 'block');
        hideElement(elements.btnClaimContinue);
        hideElement(elements.btnAppealContinue);
        break;
      case TICKET_CONFIG.apelacion.value:
        setText(elements.titleMateria, 'Apelación específica');
        showElement(getEl('select-apelacion'), 'flex');
        hideElement(getEl('select-queja'));
        hideElement(getEl('select-reclamo'));
        showElement(elements.btnAppealContinue, 'block');
        hideElement(elements.btnClaimContinue);
        hideElement(elements.btnComplaintContinue);
        break;
      default:
        setText(elements.titleMateria, 'Materia');
        hideElement(getEl('select-apelacion'));
        hideElement(getEl('select-queja'));
        hideElement(getEl('select-reclamo'));
        hideElement(elements.btnAppealContinue);
        hideElement(elements.btnComplaintContinue);
        hideElement(elements.btnClaimContinue);
        break;
    }
    markStepAsComplete('materia', true);
    state.maxStepReached = Math.max(state.maxStepReached, 5);
  }
  function initAppealFlow() {
    const select = getEl('apelacionOpciones');
    if (select) {
      select.addEventListener('change', handleAppealSelection);
    }
    if (elements.btnAppealContinue) {
      elements.btnAppealContinue.addEventListener('click', showAppealQuestions);
    }
    if (elements.nextAppeal) {
      elements.nextAppeal.addEventListener('click', continueAppealFlow);
    }
  }

  function handleAppealSelection() {
    const select = getEl('apelacionOpciones');
    if (!select) return;
    const value = select.value;

    if (value === 'ninguno') {
      state.appealId = null;
      state.appealValue = null;
      hideElement(elements.dataService);
       hideElement(elements.dataServiceButtons);
      hideElement(elements.btnAppealContinue);
      hideElement(elements.nextAppeal);
      return;
    }

    state.appealId = APPEAL_MAP[value] || null;
    state.appealValue = value;

    setText(elements.dataServiceTitle, 'Datos de servicio - Apelación');
    showElement(elements.dataService, 'block');
    showElement(elements.dataServiceButtons, 'flex');
    showElement(elements.btnAppealContinue, 'block');

    const hideNext = value === 'apelacionFive' || value === 'apelacionSix';
    toggleElement(elements.nextAppeal, !hideNext, 'block');
  }

  function showAppealQuestions() {
    if (!state.appealValue) {
      alert('Seleccione una apelación antes de continuar.');
      return;
    }
    showElement(elements.appealData, 'block');
    hideElement(elements.dataService);
    hideElement(elements.dataServiceButtons);
    hideElement(elements.btnAppealContinue);
    markStepAsComplete('servicio', true);
    state.maxStepReached = Math.max(state.maxStepReached, 6);

    APPEAL_SECTION_IDS.forEach((id) => hideElement(getEl(id)));
    const sectionIndex = {
      apelacionOne: 0,
      apelacionTwo: 1,
      apelacionThree: 2,
      apelacionFour: 3,
      apelacionFive: 4,
      apelacionSix: 5
    }[state.appealValue];
    const sectionId = sectionIndex != null ? APPEAL_SECTION_IDS[sectionIndex] : null;
    if (sectionId) {
      showElement(getEl(sectionId), 'block');
      resetFields(getEl(sectionId));
    }
  }

  function toggleConditionalAppealBlock(selectId, containerId) {
    const select = getEl(selectId);
    const container = getEl(containerId);
    if (!select || !container) return;
    if (!select.value) {
      hideElement(container);
      hideElement(elements.nextAppeal);
      return;
    }
    const show = select.value === 'si';
    toggleElement(container, show, 'block');
    if (elements.nextAppeal) {
      elements.nextAppeal.style.display = 'block';
    }
  }

  function continueAppealFlow() {
    hideElement(elements.appealData);
    showElement(elements.descargoCliente, 'flex');
    markStepAsComplete('preguntas', true);
    state.maxStepReached = Math.max(state.maxStepReached, 7);
  }

  function showPolicies() {
    hideElement(elements.descargoCliente);
    showElement(elements.politicas, 'block');
    markStepAsComplete('descargo', true);
    state.maxStepReached = Math.max(state.maxStepReached, 8);
  }
  function initComplaintFlow() {
    const trigger = getEl('materiaQuejabtn');
    if (trigger) {
      trigger.addEventListener('click', handleComplaintSelection);
    }
    if (elements.btnComplaintContinue) {
      elements.btnComplaintContinue.addEventListener('click', showComplaintQuestions);
    }
    if (elements.nextComplaint) {
      elements.nextComplaint.addEventListener('click', continueComplaintFlow);
    }
  }

  function handleComplaintSelection() {
    const select = getEl('quejasOpciones');
    if (!select) return;
    if (select.value === 'ninguna') {
      state.complaintId = null;
      state.complaintValue = null;
      hideElement(elements.dataService);
      hideElement(elements.btnComplaintContinue);
      alert('Seleccione un objeto de queja.');
      return;
    }
    state.complaintId = COMPLAINT_MAP[select.value] || null;
    state.complaintValue = select.value;

    setText(elements.dataServiceTitle, 'Datos de servicio - Queja');
    showElement(elements.dataService, 'block');
    showElement(elements.dataServiceButtons, 'flex');
    showElement(elements.btnComplaintContinue, 'block');
    markStepAsComplete('materia', true);
  }

  function showComplaintQuestions() {
    if (!state.complaintId) {
      alert('Debe seleccionar un objeto de queja.');
      return;
    }
    hideElement(elements.dataService);
    hideElement(elements.dataServiceButtons);
    hideElement(elements.btnComplaintContinue);
    showElement(elements.complaintData, 'block');
    markStepAsComplete('servicio', true);
    state.maxStepReached = Math.max(state.maxStepReached, 6);

    Object.values(COMPLAINT_SECTION_IDS).forEach((id) => hideElement(getEl(id)));
    const sectionId = COMPLAINT_SECTION_IDS[state.complaintId];
    if (sectionId) {
      showElement(getEl(sectionId), 'flex');
    }
  }

  function continueComplaintFlow() {
    hideElement(elements.complaintData);
    showElement(elements.descargoCliente, 'flex');
    markStepAsComplete('preguntas', true);
    state.maxStepReached = Math.max(state.maxStepReached, 7);
    setText(elements.titleDescargo, 'Descripción del problema');
  }
  function initClaimFlow() {
    const trigger = getEl('materiaReclamobtn');
    if (trigger) {
      trigger.addEventListener('click', handleClaimSelection);
    }
    if (elements.btnClaimContinue) {
      elements.btnClaimContinue.addEventListener('click', showClaimQuestions);
    }
    if (elements.nextClaim) {
      elements.nextClaim.addEventListener('click', continueClaimFlow);
    }
  }

  function handleClaimCategory() {
    const select = getEl('matter-claim');
    if (!select) return;

    Object.values(CLAIM_CATEGORY_MAP).forEach((config) => {
      hideElement(getEl(config.container));
      hideElement(getEl(config.section));
    });

    const config = CLAIM_CATEGORY_MAP[select.value];
    if (!config) {
      state.claimId = null;
      state.claimCategory = null;
      state.claimSubType = null;
      hideElement(elements.btnClaimContinue);
      hideElement(elements.dataService);
      return;
    }

    state.claimId = config.id;
    state.claimCategory = select.value;
    state.claimSubType = null;
    showElement(getEl(config.container), 'block');
  }

  function handleClaimSelection() {
    if (!state.claimId) {
      alert('Selecciona una materia de reclamo.');
      return;
    }
    setText(elements.dataServiceTitle, 'Datos de servicio - Reclamo');
    showElement(elements.dataService, 'block');
    showElement(elements.dataServiceButtons, 'flex');
    showElement(elements.btnClaimContinue, 'block');
    markStepAsComplete('materia', true);
  }

  function showClaimQuestions() {
    if (!state.claimCategory) {
      alert('Selecciona una materia de reclamo.');
      return;
    }
    hideElement(elements.dataService);
    hideElement(elements.dataServiceButtons);
    hideElement(elements.btnClaimContinue);
    showElement(elements.claimData, 'block');
    markStepAsComplete('servicio', true);
    state.maxStepReached = Math.max(state.maxStepReached, 6);

    const config = CLAIM_CATEGORY_MAP[state.claimCategory];
    if (config?.section) {
      showElement(getEl(config.section), 'block');
    }
  }

  function continueClaimFlow() {
    hideElement(elements.claimData);
    showElement(elements.descargoCliente, 'flex');
    markStepAsComplete('preguntas', true);
    state.maxStepReached = Math.max(state.maxStepReached, 7);
    setText(elements.titleDescargo, 'Detalle del reclamo');
  }
  function updateClaimSubType(selectId) {
    const select = getEl(selectId);
    if (!select) return null;
    state.claimSubType = select.value || null;
    return state.claimSubType;
  }

  function facturado() {
    updateClaimSubType('facturados');
    showElement(getEl('contenedorFacturacionCobro'), 'block');
  }

  function calidad() {
    updateClaimSubType('calidadidoneidad');
    showElement(getEl('calidadReclamableOpcion'), 'block');
  }

  function incumpliento() {
    updateClaimSubType('ofertas');
    showElement(getEl('incumplimentoReclamble'), 'block');
  }

  function faltaServicios() {
    updateClaimSubType('fservicio');
    showElement(getEl('servicioReclamable'), 'block');
  }

  function instalaciones() {
    updateClaimSubType('instalacion');
    showElement(getEl('instalacionReclamable'), 'block');
  }

  function baja() {
    updateClaimSubType('sb');
    showElement(getEl('bajaReclamables'), 'block');
  }

  function contratos() {
    updateClaimSubType('con');
    showElement(getEl('contratosReclamable'), 'block');
  }

  function migracionReclamable() {
    updateClaimSubType('mig');
    showElement(getEl('migracionReclamable'), 'block');
  }

  function xMaterias() {
    updateClaimSubType('x');
    showElement(getEl('xmaterias'), 'block');
  }
  function initSimpleVisibilityRules() {
    VISIBILITY_RULES.forEach((rule) => {
      const source = getEl(rule.source);
      if (!source) return;
      const handler = () => toggleByValue(rule.source, rule.target, rule.values, rule.display || 'block');
      source.addEventListener('change', handler);
      handler();
    });
    const migrationThree = getEl('cmigracion-tres');
    if (migrationThree) {
      migrationThree.addEventListener('change', handleMigrationThreeChannel);
      handleMigrationThreeChannel();
    }
  }

  function handleMigrationThreeChannel() {
    const select = getEl('cmigracion-tres');
    const specify = document.getElementById('especificar-tres');
    const container = specify ? specify.parentElement : null;
    if (!select || !container) return;
    const show = select.value === 'otros' || select.value === 'otro';
    toggleElement(container, show, 'block');
    if (!show) {
      specify.value = '';
    }
  }
  function initFormSubmission() {
    const form = document.getElementById('claimForm');
    if (!form) return;
    form.addEventListener('submit', handleFormSubmit);
    if (elements.submitButton) {
      elements.submitButton.addEventListener('click', () => markStepAsComplete('final', true));
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = await buildPayload(form);

    payload.tipo_ticket = state.ticketType;
    payload.tipo_user = state.userType;
    payload.idApelacion = state.appealId;
    payload.idQueja = state.complaintId;
    payload.idReclamo = state.claimId;
    payload.idReclamoEscogido = state.claimSubType;

    const autorizacion = document.querySelector('input[name="autorizacion"]:checked');
    payload.booleanValue = autorizacion ? autorizacion.value === 'True' : false;

    await submitPayload(payload);
  }

  async function buildPayload(form) {
    const formData = new FormData(form);
    const payload = {};
    const filePromises = [];

    formData.forEach((value, key) => {
      if (value instanceof File) {
        if (value.size > 0) {
          filePromises.push(
            convertFileToBase64(value).then((base64) => {
              payload[key] = base64;
            })
          );
        }
      } else {
        const sanitized = typeof value === 'string' ? value.trim() : value;
        if (sanitized === '' || sanitized == null) return;
        if (payload[key]) {
          if (!Array.isArray(payload[key])) {
            payload[key] = [payload[key]];
          }
          payload[key].push(sanitized);
        } else {
          payload[key] = sanitized;
        }
      }
    });

    await Promise.all(filePromises);
    return payload;
  }

  async function submitPayload(payload) {
    if (elements.submitButton) {
      elements.submitButton.disabled = true;
      elements.submitButton.textContent = 'Enviando...';
    }
    if (elements.backButton) {
      elements.backButton.disabled = true;
    }

    try {
      const response = await fetch(API_ENDPOINTS.submit, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Error desconocido');
      }
      handleSuccessResponse(data);
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      if (elements.message) {
        elements.message.innerHTML = `<span class="error">${error.message}</span>`;
      } else {
        alert(error.message);
      }
      if (elements.submitButton) {
        elements.submitButton.disabled = false;
        elements.submitButton.textContent = 'Enviar';
      }
      if (elements.backButton) {
        elements.backButton.disabled = false;
      }
    }
  }

  function handleSuccessResponse(responseData) {
    const codigo = responseData.ticket_name || 'Código no disponible';
    if (elements.message) {
      elements.message.innerHTML = `<span class="success">Código generado correctamente: ${codigo}</span>`;
    }
    const codigoGenerado = getEl('codigoGenerado');
    if (codigoGenerado) {
      codigoGenerado.textContent = codigo;
    }

    showElement(elements.codeBox, 'block');
    hideElement(elements.submitButton);
    hideElement(elements.backButton);
    hideElement(elements.btnAppealContinue);
    hideElement(elements.btnComplaintContinue);
    hideElement(elements.btnClaimContinue);
    hideElement(elements.dataServiceButtons);

    const gracias = getEl('gracias');
    if (gracias) {
      gracias.innerHTML = 'Gracias, su solicitud fue aceptada. En breve recibirá una confirmación.';
    }
    const inicio = getEl('inicio');
    if (inicio) {
      inicio.style.display = 'block';
    }
    markStepAsComplete('final', true);

    document.querySelectorAll('input, select, textarea').forEach((field) => {
      if (field.type === 'checkbox' || field.type === 'radio') {
        field.checked = false;
      } else if (field.tagName === 'SELECT') {
        field.selectedIndex = 0;
      } else {
        field.value = '';
      }
    });
  }
  function initContactLookup() {
    const lookupButton = document.querySelector('#content-datos .search');
    if (lookupButton) {
      lookupButton.addEventListener('click', buscarcliente);
    }
  }
})();
