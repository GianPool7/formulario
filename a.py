from flask import Flask, request, jsonify
from flask_cors import CORS
import xmlrpc.client
import base64
from datetime import datetime

# Crear la aplicación Flask
app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir solicitudes desde el frontend

# Conexión con Odoo
url = 'https://fiberpro-2-12-2024-16837403.dev.odoo.com/'
db = 'fiberpro-2-12-2024-16837403'
username = 'z.barreto@fiberpro.com.pe'
password = 'ae6cd458ff84c2774a628a3fb3bd3c14edd310a1'

# Conexión a Odoo usando XML-RPC
common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

# Función para autenticar al usuario en Odoo
def authenticate():
    uid = common.authenticate(db, username, password, {})
    return uid

# Función para validar las fechas (en formato YYYY-MM-DD)
def validate_date(date_str):
    if not date_str:
        return None
    try:
        # Intentamos convertir la fecha en formato 'YYYY-MM-DD'
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        # Devolvemos la fecha en formato de cadena 'YYYY-MM-DD'
        return date_obj.strftime('%Y-%m-%d')
    except ValueError:
        return None  # Si no es una fecha válida, devolvemos None

# Función para corregir el relleno de base64
def corregir_base64(cadena_base64):
    try:
        # Eliminar saltos de línea y espacios innecesarios
        cadena_base64 = cadena_base64.replace('\n', '').replace('\r', '')
        
        # Corregir el padding de base64 si es necesario
        padding = len(cadena_base64) % 4
        if padding != 0:
            cadena_base64 += '=' * (4 - padding)
        
        # Intentar decodificar la cadena base64
        return base64.b64decode(cadena_base64)
    except Exception as e:
        # Si hay un error en la decodificación, podemos manejarlo y devolver None o lanzar un error
        return None  # O puedes devolver un mensaje de error como 'Codificación base64 incorrecta'

@app.route('/api/reclamos', methods=['POST'])
def crear_reclamo():
    data = request.json

    # Lista de campos de fecha que necesitan validación
    fecha_fields = [
        # datos personales
        'fechaNacimiento','fechaVencimiento',
        # reclamos
        'fechaEmisionFC',
        'fechaVencimientoFC',
        'fechaEstimadaPagoFC',
        'fechaInicioCalidadI',
        'fechaIncumplimientos',
        'fechAproximadaIncumplimiento',
        'fechaCualPincumplimiento',
        'fechaEmisionIncumplimineto',
        'fechavencimientoIncumplimineto',
        'fechaAproxInfoOmitida',
        'fechaInicioProblemafs',
        'fechaReactivarServicio',
        'fechaPagoPendiente',
        'fechaSIMCARD',
        'fechaContratacionServicioInstalacion',
        'fechaSolicitudTrasladoInstalacion',
        'fechaContratacionSInstalacion',
        'fechaSolicitudBaja',
        'fechaSolicitudSuspensionBaja',
        'fechaEmisionBaja',
        'fechaVencimientoBaja',
        'fechaEmisionContratacion',
        'fechaVencimientoContratacion',
        'fechaSolicitudMigracionX',
        'fechaEmisionMigracionIII',
        'fechaMovimientoMigracion',
        'fechaEmisionII',
        'fechaVencimientoMigracionII',
        'fechaEmisionMigracion',
        'fechaVencimientoMigracion',
        'fechaSolicitudX',
        'fechaEmisionX',
        'fechaVencimientoX',
        'fechaSolicitudFacturacionX',

        # reclamos

        # quejas fechas
        'fechaPresentacionQueja', 'fechaNegativaQueja', 'fechaSuspendioServicioQueja',
        'fechaOtroCampoFecha1', 'fechaOtroCampoFecha2',  # Añadir más campos de fecha
        # Puedes seguir agregando más campos aquí

        #apelaciones
        'fechaEmisionCartaApelacion',
        'fechaEmisionApelacionSiCuatro',
        'fechaVencimientoApelacionSiCuatro',
        'fechaEmisionApelacionSiCinco',
    ]

    # Iterar sobre los campos de fecha y validarlos
    for field in fecha_fields:
        if field in data:
            data[field] = validate_date(data[field])

    # Validación de campos requeridos
    required_fields = [
        # tipo usuario
        'tipoUsuarioSeleccionado',
        # datos personales
        'nombrePadre',
        'nombreMadre',
        'lugarNacimiento',
        'montoTarifa',
        'direccionFacturacion',
        'cartaPoder',
        'nombre',
        'apellidos',
        'relacion',
        'razonSocial',
        'numeroContacto',
        'tipoDoc',
        'numDoc',
        'distritos',
        'direccion',
        'correo',
        'autoriza',

        # TIPO DE TICKET
        'tipoticket',

        # SELECCIONABLE
        'selectReclamos',
        'problemaEspecificoValor',

        # SELECCIONABLE
        'empresaOperadora',
        'servicioContratado',
        'servicioMateriaReclamo',
        'numeroServicioContratado',

        # RECLAMOS FC
        'correoFC',
        'numeroReciboFC',
        'numeroDocumentoCobroFC',
        'montoReclamadoFC',
        'conceptoFacturadoFC',
        'tarifaUsuarioFC',
        'modalidadPagoFC',
        'especificarModalidadPagoFC',
        'adjuntarHojaPagoFC',
        'constancia',

        #CALIDAD
        'direccionCalidadI',
        'departamentoCalidadI',
        'provinciaCalidadI',
        'distritoCalidad',
        'calleJrAvCalidad',
        'codigoReportePrevioCalidad',

        # INCUMPLIMIENTO
        'detalleCondicionIncumplimiento',
        'detalleOfertaIncumplimiento',
        'oportunidadBrindoOfertaIncumplimiento',
        'cbpromocionfs',
        'especificarIncumplimiento',
        'codigOtorgamientoIncumplimiento',
        'detalleAtributosIncumplimiento',
        'reciboCorrespondienteIncumplimiento',
        'numeroRecivoIncumplimiento',
        'oportunidadBrindoInfoOmitida',

        #falta servicio
        'direccionProblemafs',
        'direccionServicio',
        'departamentofs',
        'provinciafs',
        'distritofs',
        'calleJrAvfs',
        'numerofs',
        'adrecibos',
        'adjuntarVinculo',
        'mpagos',
        'especificarMedioPago',
        'adrecibosPendiente',
        'vinculoAdjuntarSolicitud',

        # Instalacion
        'strasladoe',
        'especificarCanalSinstalacion',
        'codigoPedidoII',
        'adsOpcionTraslado',
        'vinculoSolicitudReclamo',
        'ctopcionCinco',
        'especificarInstalacion',
        'codigoPedidoInstalacion',
        'opcionCuatroTraslado',
        'adjuntarSolicitudReclamoCuatro',
        'montoPendienteInstalacion',

        # baja
        'cbaja',
        'especificarCanalBaja',
        'codigoPedidoBaja',
        'asb',
        'solicitudBajaReclamo',
        'ctraslado',
        'especificarCanalTraslado',
        'cPedidoBaja',
        'asT',
        'adjuntarVinculoSolicitud',
        'datosRecibosCuestionadoBaja',
        'numeroReciboBaja',
        'montoReclamadoBaja',

        #contratacion
        'detalleServicioAdicional',
        'detallePaquete',
        'datosRecibomrContatacion',
        'numeroReciboContratacion',
        'montoReclamadoContratacion',

        # migracion
        'canalMigracion',
        'especificarCanalMigracion',
        'codigoPedidoMigracion',
        'planTarifarioMigracion',
        'motivoNegativaMigracion',
        'solicitudAdjunta',
        'documentoSolicitudMigracionOne',
        'numeroReciboMigracionII',
        'montoReclamadoMigracionMigracion',
        'numeroReciboII',
        'numeroReciboMigracion',
        'montoReclamadoMigracion',

        # otros
        'ccontratacion',
        'especificarx',
        'servicioContratarX',
        'planTarifarioX',
        'numeroReciboX',
        'mesReciboPentregaX',
        'direccionFisicaX',
        'cpresentacion',
        'especificarCanalX',
        'codigoPedidoX',
        'sasfll',
        'vinculoSolicitudSX',
        'detallePedidoX',

        # descargo
        'informacionNecesariaReclamo',
        'descripcionProblemaSolicitudReclamo',


        # quejas
        'fechaPresentacionQueja', 'negativaQueja', 'fechaNegativaQueja', 'canalPresentacion',
        'especificarCanalQuejaDos', 'adjuntaPrueba', 'fechaSuspendioServicioQueja', 'MediosCobranzasQuejas',
        'constanciaPagoQueja', 'pagoCuentaQueja', 'espeficiarQueja',
        'constanciaPagoMedioCobranza', 'medioProbatoriopgQueja','informacionNecesariaQueja'
        ,'descripcionProblemaQueja',

        #

        #apelacion
        'selectApelacion',

        'empresaOperadoraApelacion',
        'servicioMateriaApelacion',
        'numeroServicioApelacion',
        'codigoNumeroApelacion',
        'numeroCartaApelacion',


        'detallePruebaApelacionUno',
        'detallefsApelacionDos',
        'materiaEmpresaApelacionTres',
        'apelacionopcioncuatro',
        'numeroReciboApelacionSiCuatro',

        'montoReclamadoApelacionSiCuatro',
        'detalleReclamoApelacionSiCuatro',
        'apelacionOpcioncinco',
        'numeroReciboApelacionSiCinco',

        'montoTotalApelacionSiCinco',
        'detalleReclamoApelacionSiCinco',
        'materiaEmpresaEmitirApelacionSeis',

        'informacionNecesariaApelacion',
        'sustentoApelacion',


    ]

    # Verificar que todos los campos requeridos estén presentes
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Determinar el tipo de ticket basado en 'tipoticket'
    tipoticket = data.get('tipoticket')

    # Cambiar el modelo según el valor de 'tipoticket'
    if tipoticket == '3':
        model = 'reclamosfp'  # Cambiar a 'reclamosfp' si es un Reclamo
        ticket_data = {
            'state':"draft",
            'tipo_de_usuario':data.get('tipoUsuarioSeleccionado'),
            # datos personales
            # Validaciones de abonado
            'nombre_del_padre_abonado': data.get('nombrePadre'),
            'nombre_de_la_madre_abonado': data.get('nombreMadre'),
            'lugar_de_nacimiento_abonado': data.get('lugarNacimiento'),
            'fecha_de_nacimiento_abonado': data.get('fechaNacimiento'),
            'fecha_vencimiento_del_recibo_usuario': data.get('fechaVencimiento'),
            'monto_de_tarifa_usuario': data.get('montoTarifa'),
            'direccion_de_facturacion_usuario': data.get('direccionFacturacion'),

            # Datos personales
            'nombre_cliente': data.get('nombre'),
            'apellidos': data.get('apellidos'),
            'relacion_familiar': data.get('relacion'),
            'razon_social': data.get('razonSocial'),
            'carta_de_poder': data.get('cartaPoder'),
            'nro_contacto': data.get('numeroContacto'),
            'tipo_doc': data.get('tipoDoc'),
            'nro_documento': data.get('numDoc'),
            'distrito_cliente': data.get('distritos'),
            'direccion_cliente': data.get('direccion'),
            'correo_electronico': data.get('correo'),
            'notificacion_por_correo_electronico': data.get('autoriza'),

            # reclamos
            'reclamo_1': data.get('selectReclamos'),
            'trata_reclamo': data.get('problemaEspecificoValor'),

            # Datos del servicio de reclamo
            'empresa_operadora_dsr': data.get('empresaOperadora'),
            'servicio_contratado_dsr': data.get('servicioContratado'),
            'nmero_cdigo_servicio_contrato_dsr': data.get('servicioMateriaReclamo'),
            'servicio_materia_de_reclamo': data.get('numeroServicioContratado'),

            # reclamos

            # Facturación y cobro
            'numero_de_recibo': data.get('numeroReciboFC'),
            'documento_cobro': data.get('numeroDocumentoCobroFC'),
            'fecha_de_emisin': data.get('fechaEmisionFC'),
            'fecha_de_vencimiento_1': data.get('fechaVencimientoFC'),
            'monto_reclamado': data.get('montoReclamadoFC'),
            'concepto_facturado': data.get('conceptoFacturadoFC'),
            'tarifa_debio_aplicarse': data.get('tarifaUsuarioFC'),
            'fecha_efectu_el_pago': data.get('fechaEstimadaPagoFC'),
            'modalidad_de_pago': data.get('modalidadPagoFC'),
            'especificar_modalidad_pago': data.get('especificarModalidadPagoFC'),
            'adjunta_doc_cobro': data.get('constancia'),

            # # calidad
            'fecha_de_inicio_del_problema_1': data.get('fechaInicioCalidadI'),
            'direccin_presenta_problema': data.get('direccionCalidadI'),
            'departamento': data.get('departamentoCalidadI'),
            'provincia': data.get('provinciaCalidadI'),
            'distrito_calidad': data.get('distritoCalidad'),
            'calle_jr_av': data.get('calleJrAvCalidad'),
            #'x_studio_numero_contacto': data.get('numerocalidad'),
            'codigo': data.get('codigoReportePrevioCalidad'),

            # # # #opcion 3
            'detalle_condicin_': data.get('detalleCondicionIncumplimiento'),
            'fecha_de_incumplimiento_1': data.get('fechaIncumplimientos'),
            'detalle_oferta_promocin_brindada': data.get('detalleOfertaIncumplimiento'),
            'oportunidad_en_el_cual_se_brindo_la_oferta_o_promocin': data.get('oportunidadBrindoOfertaIncumplimiento'),
            'fecha_aproximada_1': data.get('fechAproximadaIncumplimiento'),
            #'x_studio_canal_oferta_promocion': data.get('cbpromocion'),
            'canal_oferta_promocion': data.get('cbpromocionfs'),
            'especificar_canal': data.get('especificarIncumplimiento'),
            'cdigo_de_oferta_o_promocin': data.get('codigOtorgamientoIncumplimiento'),
            'fecha_se_presento_incumplimiento': data.get('fechaCualPincumplimiento'),
            'detalles_atributos_descontando': data.get('detalleAtributosIncumplimiento'),
            'recibo_correspondiente_al_periodo': data.get('reciboCorrespondienteIncumplimiento'),
            'fecha_de_emisin_del_recibo': data.get('fechaEmisionIncumplimineto'),
            'numero_de_recibo_tres': data.get('numeroRecivoIncumplimiento'),
            'fecha_de_vencimiento_6': data.get('fechavencimientoIncumplimineto'),

            'oportunidad_brindo_informacin_inexacta': data.get('oportunidadBrindoInfoOmitida'),
            'fecha_aproximada_2': data.get('fechaAproxInfoOmitida'),
            #'x_studio_fecha_presento_incumplimiento': data.get('fechaCualPincumplimiento'),
            #'x_studio_detalles_atributos_descontando': data.get('detalleAtributosIncumplimiento'),

            # #falta de servicio
            'fecha_de_inicio_del_problema': data.get('fechaInicioProblemafs'),
            'direccion_1': data.get('direccionProblemafs'),
            'direccin_problema': data.get('direccionServicio'),
            'departamento_fs': data.get('departamentofs'),
            'provincia_fs': data.get('provinciafs'),
            'distrito_fs': data.get('distritofs'),
            'calle_jr_av_fs': data.get('calleJrAvfs'),
            'numero_de_servicio': data.get('numerofs'),
            'constancias_de_lugar_de_trabajo': data.get('adrecibos'),
            'documento': data.get('adjuntarVinculo'),
            'fecha_que_corresponda_reactivar_el_servicio': data.get('fechaReactivarServicio'),
            'fecha_de_pago_pendiente': data.get('fechaPagoPendiente'),
            'lugar_medio_de_pago': data.get('mpagos'),
            'especificar_medio_pago': data.get('especificarMedioPago'),
            'adjunta_recibo_pendiente': data.get('adrecibosPendiente'),
            'documento_1': data.get('vinculoAdjuntarSolicitud'),
            'fecha_que_se_ejecuto_el_cambio_sim_card': data.get('fechaSIMCARD'),

        # # # instalacion
            'fecha_de_contratacin_de_servicio': data.get('fechaContratacionServicioInstalacion'),
            'fecha_de_la_solicitud_de_traslado': data.get('fechaSolicitudTrasladoInstalacion'),
            'canal_solicitud_traslado': data.get('strasladoe'),
            'especificar_canal_2': data.get('especificarCanalSinstalacion'),
            'codigo_de_pedido': data.get('codigoPedidoII'),
            'se_adjunta_solicitud': data.get('adsOpcionTraslado'),
            'vinculo_de_documento_adjuntado': data.get('vinculoSolicitudReclamo'),
            'fecha_de_la_contratacin_o_solicitud_de_trabajo': data.get('fechaContratacionSInstalacion'),
            'canal_de_presentacin': data.get('ctopcionCinco'),
            'especificar_canal_3': data.get('especificarInstalacion'),
            'cdigo_de_pedido_2': data.get('codigoPedidoInstalacion'),
            'adjuntar_solicitud_1': data.get('opcionCuatroTraslado'),
            'vinculo_del_documento_adjuntando': data.get('adjuntarSolicitudReclamoCuatro'),
            'monto_pendiente': data.get('montoPendienteInstalacion'),

            # # Baja
            'fecha_de_la_solicitud_de_baja': data.get('fechaSolicitudBaja'),
            'canal_presentacin_baja': data.get('cbaja'),
            'especificar_canal_baja': data.get('especificarCanalBaja'),
            'cdigo_de_pedido': data.get('codigoPedidoBaja'),
            'adjuntar_solicitud': data.get('asb'),
            'vinculo_del_documento_2': data.get('solicitudBajaReclamo'),
            'fecha_de_solicitud_de_suspensin_1': data.get('fechaSolicitudSuspensionBaja'),
            'canal_traslado': data.get('ctraslado'),
            'especificar_canal_1': data.get('especificarCanalTraslado'),
            'cdigo_de_pedido_1': data.get('cPedidoBaja'),
            'adjuntar_solicitud_suspensin': data.get('asT'),
            'vinculo_del_documento_1': data.get('adjuntarVinculoSolicitud'),
            'datos_de_los_recibos_cuestionados': data.get('datosRecibosCuestionadoBaja'),
            'numero_de_recibo_1': data.get('numeroReciboBaja'),
            'fecha_de_emisin_3': data.get('fechaEmisionBaja'),
            'fecha_de_vencimiento_3': data.get('fechaVencimientoBaja'),
            'monto_reclamado_3': data.get('montoReclamadoBaja'),

            # # # # Contratacion
            'detalle_adicional_no_solicitada': data.get('detalleServicioAdicional'),
            'detalle_paquete_desconoce': data.get('detallePaquete'),
            'datos_recibos_cuestionados': data.get('datosRecibomrContatacion'),
            'numero_de_recibo_no_solicitada': data.get('numeroReciboContratacion'),
            'fecha_de_emisin_5': data.get('fechaEmisionContratacion'),
            'fecha_de_vencimiento_5': data.get('fechaVencimientoContratacion'),
            'monto_reclamado_no_solicitud': data.get('montoReclamadoContratacion'),

            # # # # Migracion
            'fecha_de_solicitud_de_migracin_1': data.get('fechaSolicitudMigracionX'),
            'canal_solicitud_de_migracin': data.get('canalMigracion'),
            'especificar_canal_de_solicitud': data.get('especificarCanalMigracion'),
            'codigo_pedido_migracion': data.get('codigoPedidoMigracion'),
            'plan_tarifario_solicita_migrar': data.get('planTarifarioMigracion'),
            'motivo_de_la_negativa': data.get('motivoNegativaMigracion'),
            'verificacion': data.get('solicitudAdjunta'),
            'documento_de_migracin': data.get('documentoSolicitudMigracionOne'),
            'numero_recibo': data.get('numeroReciboMigracionII'),
            'fecha_de_emisin_2': data.get('fechaEmisionMigracionIII'),
            'fecha_de_movimiento': data.get('fechaMovimientoMigracion'),
            'monto_reclamado_1': data.get('montoReclamadoMigracionMigracion'),
            'numero_de_recibo_migracion': data.get('numeroReciboII'),
            'fecha_emisin': data.get('fechaEmisionII'),
            'fecha_de_vencimiento_2': data.get('fechaVencimientoMigracionII'),
            'numero_recibo_migracin': data.get('numeroReciboMigracion'),
            'fecha_de_emisin_migracin_1': data.get('fechaEmisionMigracion'),
            'fecha_de_vencimiento_migracin_1': data.get('fechaVencimientoMigracion'),
            'monto_reclamado_migracion': data.get('montoReclamadoMigracion'),

            # # otros
            'fecha_de_la_solicitud_de_contratacion': data.get('fechaSolicitudX'),
            'canal_solicitud_de_contratacion': data.get('ccontratacion'),
            'canal_solicitud_de_contratacion': data.get('especificarx'),
            'servicio_que_desea_contratar': data.get('servicioContratarX'),
            'plan_tarifario_que_desea_contratar': data.get('planTarifarioX'),
            'numero_de_recibo_x': data.get('numeroReciboX'),
            'fecha_de_emisin_4': data.get('fechaEmisionX'),
            'fecha_de_vencimiento_4': data.get('fechaVencimientoX'),
            'mes_recibo_pendiente_entrega_x': data.get('mesReciboPentregaX'),
            'direccin_para_notificacin_x': data.get('direccionFisicaX'),
            'fecha_solicitud_facturacin_x': data.get('fechaSolicitudFacturacionX'),
            'canal_presentacin_solicitud_facturacion': data.get('cpresentacion'),
            'especificar_canal_x': data.get('especificarCanalX'),
            'cdigo_de_pedido_x': data.get('codigoPedidoX'),
            'se_adjunta_la_solicitud_x': data.get('sasfll'),
            'documento_adjuntado_x': data.get('vinculoSolicitudSX'),
            'detalle_pedido_x': data.get('detallePedidoX'),

            # descargo del cliente
            'informacin_necesaria_reclamo': data.get('informacionNecesariaReclamo'),
            'descripcin_problema_solicitud_concreta_reclamo': data.get('descripcionProblemaSolicitudReclamo'),
        }

    elif tipoticket == '7':
        model = 'apelacionfp'  # Cambiar a un modelo diferente si es Apelación
        ticket_data = {
            #
            'state':"draft",
            #
            'tipo_de_usuario_ape':data.get('tipoUsuarioSeleccionado'),
            # datos personales
            # Validaciones de abonado
            'nombre_del_padre_abonado_ape': data.get('nombrePadre'),
            'nombre_de_la_madre_abonado_ape': data.get('nombreMadre'),
            'lugar_de_nacimiento_abonado_ape': data.get('lugarNacimiento'),
            'fecha_de_nacimiento_abonado_ape': data.get('fechaNacimiento'),
            'fecha_vencimiento_del_recibo_usuario_ape': data.get('fechaVencimiento'),
            'monto_de_tarifa_usuario_ape': data.get('montoTarifa'),
            'direccion_de_facturacion_usuario_ape': data.get('direccionFacturacion'),

            # Datos personales
            'nombre_cliente_ape': data.get('nombre'),
            'apellidos_ape': data.get('apellidos'),
            'relacion_familiar_ape': data.get('relacion'),
            'razon_social_ape': data.get('razonSocial'),
            'carta_de_poder_ape': data.get('cartaPoder'),
            'nro_contacto_ape': data.get('numeroContacto'),
            'tipo_doc_ape': data.get('tipoDoc'),
            'nro_documento_ape': data.get('numDoc'),
            'distrito_cliente_ape': data.get('distritos'),
            'direccion_cliente_ape': data.get('direccion'),
            'correo_electronico_ape': data.get('correo'),
            'notificacion_por_correo_electronico_ape': data.get('autoriza'),

            'empresa_operadora_ds':data['empresaOperadoraApelacion'],
            'servicio_materia_de_apelacin_ds':data['servicioMateriaApelacion'],
            'nmero_servicio_reclamado_ds':data['numeroServicioApelacion'],
            'cdigo_nmero_reclamo_ds':data['codigoNumeroApelacion'],
            'nmero_carta_resuelve_reclamo_ds':data['numeroCartaApelacion'],
            'fecha_emisin_carta_ds':data['fechaEmisionCartaApelacion'],
            #'fecha_apelacion':data['fechaEmisionCartaApelacion'],
            
            # apelaciones
            'apelacin':data['selectApelacion'],

            'detalle_pruebas_apelacion_uno':data['detallePruebaApelacionUno'],
            'detalle_falta_sustentacion_apelacion_dos':data['detallefsApelacionDos'],
            'materia_empresa_comunicarse':data['materiaEmpresaApelacionTres'],
            'respuesta_empresa_apelacion_cuatro':data['apelacionopcioncuatro'],
            'numero_recibo_apelacion_cinco':data['numeroReciboApelacionSiCuatro'],
            'fecha_de_emision': data['fechaEmisionApelacionSiCuatro'],
            'fecha_de_vencimiento': data['fechaVencimientoApelacionSiCuatro'],
            #'monto_reclamado_apelacion_cinco':data['montoReclamadoApelacionSiCuatro'],
            #'monto':data['montoReclamadoApelacionSiCuatro'],
            'pronunciamiento_empresa_ape_cuatro':data['detalleReclamoApelacionSiCuatro'],
            'falto_acoger_ape_cinco':data['apelacionOpcioncinco'],
            'nmero_recibo_apleacion_cinco':data['numeroReciboApelacionSiCinco'],
            'fecha_de_emisin_1': data['fechaEmisionApelacionSiCinco'],
            'monto_total_corresponde_cinco':data['montoTotalApelacionSiCinco'],
            'detalle_extremo_apelacion_cinco':data['detalleReclamoApelacionSiCinco'],
            'materia_cual_empresa_ape_seis':data['materiaEmpresaEmitirApelacionSeis'],

            # descargo del cliente
            'informacin_necesaria_apelacion': data['informacionNecesariaApelacion'],
            'sustento_de_apelacin': data['sustentoApelacion'],
        }
    elif tipoticket == '6':
        model = 'quejasfp'  # Cambiar a un modelo diferente si es Queja
        ticket_data = {
            'state':"draft",
            # queja
            # 'name':"queja",
            'tipo_de_usuario_qja':data.get('tipoUsuarioSeleccionado'),
            # datos personales
            # Validaciones de abonado
            'nombre_del_padre_abonado_qja': data.get('nombrePadre'),
            'nombre_de_la_madre_abonado_qja': data.get('nombreMadre'),
            'lugar_de_nacimiento_abonado_qja': data.get('lugarNacimiento'),
            'fecha_de_nacimiento_abonado_qja': data.get('fechaNacimiento'),
            'fecha_vencimiento_del_recibo_usuario_qja': data.get('fechaVencimiento'),
            'monto_de_tarifa_usuario_qja': data.get('montoTarifa'),
            'direccion_de_facturacion_usuario_qja': data.get('direccionFacturacion'),

            # Datos personales
            'nombre_cliente_qja': data.get('nombre'),
            'apellidos_qja': data.get('apellidos'),
            'relacion_familiar_qja': data.get('relacion'),
            'razon_social_qja': data.get('razonSocial'),
            'carta_de_poder_qja': data.get('cartaPoder'),
            'nro_contacto_qja': data.get('numeroContacto'),
            'tipo_doc_qja': data.get('tipoDoc'),
            'nro_documento_qja': data.get('numDoc'),
            'distrito_cliente_qja': data.get('distritos'),
            'direccion_cliente_qja': data.get('direccion'),
            'correo_electronico_qja': data.get('correo'),
            'notificacion_por_correo_electronico_qja': data.get('autoriza'),


            'empresa_operadora_ds1': data.get('empresaOperadoraQueja'),
            'servicio_objeto_queja_dsq': data.get('servicioObjetoQueja'),
            'nmero_servicio_reclamado_dsq': data.get('numServicioQueja'),
            'cdigo_nmero_reclamo_dsq': data.get('codigoNumeroQueja'),
            'fecha_presentacin_reclamo_queja_uno': data.get('fechaPresentacionQueja'),
            'negativa_relacionada_queja_dos': data.get('negativaQueja'),
            'char_field_2bo_1ibhijmmb': data.get('fechaNegativaQueja'),
            'canal_presentacin_reclamo_queja_dos': data.get('canalPresentacion'),
            'canal_especificado_queja_dos': data.get('especificarCanalQuejaDos'),
            'vinculo_del_documento': data.get('medioProbatorioNegativa'),
            'fecha_en_la_cual_se_habra_suspendido_el_servicio': data.get('fechaSuspendioServicioQueja'),
            'medio_de_cobranza_queja_cuatro': data.get('MediosCobranzasQuejas'),
            #'se_adjunta_documento_queja_cuatro': data.get('medioProbatoriopgQueja'),
            'documento_queja': data.get('constanciaPagoMedioCobranza'),
            'lugar_donde_permiti_pago_cinco': data.get('pagoCuentaQueja'),
            'especificar_quejas': data.get('espeficiarQueja'),
            #'adjunta_prueba_cinco': data.get('capturaQuejaCinco'),
            'medios_probatorios_1': data.get('medioProbatoriopgQueja'),
            #'adjunta_medios_probatorios_x_seis': data.get('dtramitacion'),
            #'medio_probatorios_queja_ultimo': data.get('medioProbatoriosTramitacion'),
            'medios_probatorios': data.get('medioProbatorioNegativa'),
            # descargo del cliente queja
            'informacion_necesaria_queja': data['informacionNecesariaQueja'],
            'descripcion_problema_queja': data['descripcionProblemaQueja'],
        }
    else:
        model = 'default_model'  # Modelo por defecto para casos no especificados


    # Obtener los archivos si están presentes
    file_base64 = data.get('cartaPoder', None)
    file_constancia_base64 = data.get('constancia', None)

    # Decodificar los archivos si están presentes
    if file_base64:
        try:
            file_content = corregir_base64(file_base64)  # Decodificar el archivo en base64
            if file_content is None:
                return jsonify({"error": "Error decoding cartaPoder file: Incorrect base64 padding"}), 400
        except Exception as e:
            return jsonify({"error": "Error decoding cartaPoder file: " + str(e)}), 400
    else:
        file_content = None  # Si no hay archivo, asignamos None

    if file_constancia_base64:
        try:
            file_constancia_content = corregir_base64(file_constancia_base64)  # Decodificar archivo constancia
            if file_constancia_content is None:
                return jsonify({"error": "Error decoding constancia file: Incorrect base64 padding"}), 400
        except Exception as e:
            return jsonify({"error": "Error decoding constancia file: " + str(e)}), 400
    else:
        file_constancia_content = None  # Si no hay archivo, asignamos None

    # Autenticación con Odoo
    uid = authenticate()
    if not uid:
        return jsonify({"error": "Authentication error"}), 400
    
    try:
        # Eliminar claves con valores None
        ticket_data = {key: value for key, value in ticket_data.items() if value is not None}

        # Crear el ticket en Odoo
        ticket_id = models.execute_kw(db, uid, password, model, 'create', [ticket_data])

        # Leer el campo 'name' del ticket recién creado
        ticket_name = models.execute_kw(db, uid, password, model, 'read', [ticket_id], {'fields': ['name']})

        return jsonify({'ticket_id': ticket_id, 'ticket_name': ticket_name[0]['name'], 'success': True})
    
    except Exception as e:
        return jsonify({"error": "Error creating ticket or attachment: " + str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
