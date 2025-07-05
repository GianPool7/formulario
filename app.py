from flask import Flask, request, jsonify
from flask_cors import CORS
import xmlrpc.client
import os
import base64
from datetime import datetime

# Crear la aplicación Flask
app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir solicitudes desde el frontend

# # Conexión con Odoo

# para la conexion a la base de dato real
# Conexión XML-RPC con Odoo
# url = 'https://fiberpro.odoo.com'
# url = 'https://fiberpro-13-12-24-17085945.dev.odoo.com/'
# db = 'fiberpro-13-12-24-17085945' 
# username = 'z.barreto@fiberpro.com.pe'
# password = 'SystemFiberPRO**13'

url = 'https://fiberpro.odoo.com'
db = 'samemotion-fiberpro-main-9486468' 
username = 'z.barreto@fiberpro.com.pe'
password = 'ae6cd458ff84c2774a628a3fb3bd3c14edd310a1'

# Conexión a Odoo usando XML-RPC
common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

# Autenticación para obtener el uid
uid = common.authenticate(db, username, password, {})  # Obtener el UID dinámicamente

# Función para validar las fechas (en formato YYYY-MM-DD)
def validate_date(date_str):
    if not date_str:  # Si la fecha está vacía o no se proporciona
        return False  # Usa False para indicar que la fecha es nula
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        return date_obj.strftime('%Y-%m-%d')
    except ValueError:
        return False  # Si la fecha no es válida, devuelve False

@app.route('/api/reclamos/reclamo', methods=['POST'])
def crear_reclamos():
    data = request.json
    file_base64 = data.get('cartaPoder')
    hoja_fc=data.get("hojaDocumentoAdjuntada")
    hoja_fs_uno=data.get("adjuntarVinculo")
    hoja_fs_dos=data.get("vinculoAdjuntarSolicitud")
    hoja_instalaciones_uno=data.get("vinculoSolicitudReclamo")
    hoja_instalaciones_dos=data.get("adjuntarSolicitudReclamoCuatro")
    hoja_baja_uno=data.get("solicitudBajaReclamo")
    hoja_baja_dos=data.get("adjuntarVinculoSolicitud")
    hoja_migracion=data.get("documentoSolicitudMigracionOne")
    hoja_x=data.get("vinculoSolicitudSX")
    

    # Validar las fechas
    fecha_fields = [
        #'fechaPresentacionQueja',
        #'fechaNegativaQueja',
        #'fechaSuspendioServicioQueja',
        'fechaNacimiento', 'fechaVencimiento',
        # facturacion y cobro fechas
        'fechaEmisionFC','fechaVencimientoFC','fechaEstimadaPagoFC',
        # calidad
        'fechaInicioCalidadI',
        # incumplimiento
        'fechaIncumplimientos',
        'fechAproximadaIncumplimiento',
        'fechaCualPincumplimiento',
        'fechaEmisionIncumplimineto',
        'fechavencimientoIncumplimineto',
        'fechaAproxInfoOmitida',
        # falta servicio
        'fechaInicioProblemafs',
        'fechaReactivarServicio',
        'fechaPagoPendiente',
        'fechaSIMCARD',
        # instalaciones
        'fechaContratacionServicioInstalacion',
        'fechaSolicitudTrasladoInstalacion',
        'fechaContratacionSInstalacion',
        # baja
        'fechaSolicitudBaja',
        'fechaSolicitudSuspensionBaja',
        'fechaEmisionBaja',
        'fechaVencimientoBaja',
        # contratacion
        'fechaEmisionContratacion',
        'fechaVencimientoContratacion',
        # migracion
        'fechaSolicitudMigracionX',
        'fechaEmisionMigracionIII',
        'fechaMovimientoMigracion',
        'fechaEmisionII',
        'fechaVencimientoMigracionII',
        'fechaEmisionMigracion',
        'fechaVencimientoMigracion',
        # otros
        'fechaSolicitudX',
        'fechaEmisionX',
        'fechaVencimientoX',
        'fechaSolicitudFacturacionX',
    ]
    for field in fecha_fields:
        if field in data:
            data[field] = validate_date(data[field])

    # Validación de campos requeridos
    required_fields = [
        # TIPO USUARIO
        'tipoUsuario',
        # DATOS PERSONALES
        'nombre', 'apellidos', 'relacion', 'razonSocial', 'numeroContacto', 
        'tipoDoc', 'numDoc', 'distritos', 'direccion', 'correo', 'booleanValue',
        # seleccionar reclamos
        'idReclamo','idReclamoEscogido','empresaOperadora','servicioContratado','servicioMateriaReclamo','numeroServicioContratado',
        # facturacion y cobro 
        'numeroReciboFC',
        'numeroDocumentoCobroFC',
        'montoReclamadoFC',
        'conceptoFacturadoFC',
        'tarifaUsuarioFC',
        'fechaEstimadaPagoFC',
        'modalidadPagoFC',
        'especificarModalidadPagoFC',
        'adjuntarHojaPagoFC',
        # CALIDAD
        'direccionCalidadI',
        'departamentoCalidadI',
        'provinciaCalidadI',
        'distritoCalidad',
        'calleJrAvCalidad',
        'codigoReportePrevioCalidad',
        #INCUMPLIMIENTO 
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
        #FALTA DE SERVICIO
        'direccionProblemafs',
        'direccionServicio',
        'departamentofs',
        'provinciafs',
        'distritofs',
        'calleJrAvfs',
        'numerofs',
        'adrecibos',
        'fechaPagoPendiente',
        'mpagos',
        'especificarMedioPago',
        'adrecibosPendiente',
        # instalaciones
        'strasladoe',
        'especificarCanalSinstalacion',
        'codigoPedidoII',
        'adsOpcionTraslado',
        'ctopcionCinco',
        'especificarInstalacion',
        'codigoPedidoInstalacion',
        'opcionCuatroTraslado',
        'montoPendienteInstalacion',
        # baja
        'cbaja',
        'especificarCanalBaja',
        'codigoPedidoBaja',
        'asb',
        'ctraslado',
        'especificarCanalTraslado',
        'cPedidoBaja',
        'asT',
        'datosRecibosCuestionadoBaja',
        'numeroReciboBaja',
        'montoReclamadoBaja',
        'solicitudBajaReclamo',
        'adjuntarVinculoSolicitud',
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
        'numeroReciboMigracionII',
        'montoReclamadoMigracionMigracion',
        'numeroReciboII',
        'numeroReciboMigracion',
        'montoReclamadoMigracion',
        # otros
        'ccontratacion',
        'servicioContratarX',
        'planTarifarioX',
        'numeroReciboX',
        'mesReciboPentregaX',
        'direccionFisicaX',
        'fechaSolicitudFacturacionX',
        'cpresentacion',
        'especificarCanalX',
        'codigoPedidoX',
        'sasfll',
        'detallePedidoX',
        # descargo de cliente
        'informacionNecesariaReclamo',
        'descripcionProblemaSolicitudReclamo',

    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Incluir los datos personales en los datos de la apelación
    ticket_data = {
        'state': "draft",
        'tipo_de_usuario': data.get('tipoUsuario'),
        # DATOS DE VALIDACION ABONADO
        'nombre_del_padre_abonado': data.get('nombrePadre'),
        'nombre_de_la_madre_abonado': data.get('nombreMadre'),
        'lugar_de_nacimiento_abonado': data.get('lugarNacimiento'),
        'fecha_de_nacimiento_abonado': data.get('fechaNacimiento'),
        #DATOS DE VALIDACION USUARIO
        'fecha_vencimiento_del_recibo_usuario': data.get('fechaVencimiento'),
        'monto_de_tarifa_usuario': data.get('montoTarifa'),
        'direccion_de_facturacion_usuario': data.get('direccionFacturacion'),
        # datos personales
        'nombre_cliente': data.get('nombre'),
        'apellidos': data.get('apellidos'),
        'relacion_familiar': data.get('relacion'),
        'razon_social': data.get('razonSocial'),
        'carta_de_poder': file_base64,
        'nro_contacto': data.get('numeroContacto'),
        'tipo_doc': data.get('tipoDoc'),
        'nro_documento': data.get('numDoc'),
        'distrito_cliente': data.get('distritos'),
        'direccion_cliente': data.get('direccion'),
        'correo_electronico': data.get('correo'),
        'notificacion_por_correo_electronico': data.get('booleanValue'),
        # datos de servicio
        'materia_reclamable' :data.get('idReclamo'),
        'problema_espec' :data.get('idReclamoEscogido'),
        #'trata_reclamo' :data.get('servicioContratado'),
        'empresa_operadora_dsr' :data.get('empresaOperadora'),
        'servicio_contratado_dsr':data.get('servicioContratado'),
        'nmero_cdigo_servicio_contrato_dsr' :data.get('numeroServicioContratado'),
        'servicio_materia_de_reclamo' :data.get('servicioMateriaReclamo'),
    
        # DATOS DE FACTURACION
        'numero_de_recibo':data.get('numeroReciboFC'),
        'documento_cobro':data.get('numeroDocumentoCobroFC'),
        'fecha_de_emisin':data.get('fechaEmisionFC'),
        'fecha_de_vencimiento_1':data.get('fechaVencimientoFC'),
        'monto_reclamado':data.get('montoReclamadoFC'),
        'concepto_facturado':data.get('conceptoFacturadoFC'),
        'tarifa_debio_aplicarse':data.get('tarifaUsuarioFC'),
        'fecha_efectu_el_pago':data.get('fechaEstimadaPagoFC'),
        'modalidad_de_pago':data.get('modalidadPagoFC'),
        'especificar_modalidad_pago':data.get('especificarModalidadPagoFC'),
        'adjunta_recibo_pendiente2':data.get('adjuntarHojaPagoFC'),
        'adjunta_doc_cobro':hoja_fc,
        # calidad
        'fecha_de_inicio_del_problema_1': data.get('fechaInicioCalidadI'),
        'direccin_presenta_problema': data.get('direccionCalidadI'),
        'departamento': data.get('departamentoCalidadI'),
        'provincia': data.get('provinciaCalidadI'),
        'distrito_calidad': data.get('distritoCalidad'),
        'calle_jr_av': data.get('calleJrAvCalidad'),
        'codigo': data.get('codigoReportePrevioCalidad'),
        # incumplimiento
        'detalle_condicin':data.get("detalleCondicionIncumplimiento") ,
        'fecha_de_incumplimiento_1':data.get("fechaIncumplimientos") ,
        'detalle_oferta_promocin_brindada':data.get("detalleOfertaIncumplimiento"),
        'oportunidad_en_el_cual_se_brindo_la_oferta_o_promocin':data.get("oportunidadBrindoOfertaIncumplimiento"),
        'fecha_aproximada_1':data.get("fechAproximadaIncumplimiento") ,
        'canal_oferta_promocion':data.get("cbpromocionfs") ,
        'especificar_canal':data.get("especificarIncumplimiento") ,
        'cdigo_de_oferta_o_promocin':data.get("codigOtorgamientoIncumplimiento") ,
        'fecha_se_presento_incumplimiento':data.get("fechaCualPincumplimiento") ,
        'detalles_atributos_descontando':data.get("detalleAtributosIncumplimiento"),
        'recibo_correspondiente_al_periodo':data.get("reciboCorrespondienteIncumplimiento") ,
        'fecha_de_emisin_del_recibo':data.get("fechaEmisionIncumplimineto"),
        'numero_de_recibo_tres':data.get("numeroRecivoIncumplimiento") ,
        'fecha_de_vencimiento_6':data.get("fechavencimientoIncumplimineto"),
        'oportunidad_brindo_informacin_inexacta':data.get("oportunidadBrindoInfoOmitida") ,
        'fecha_aproximada_2':data.get("fechaAproxInfoOmitida") ,
        # FALTA DE SERVICIO
        'fecha_de_inicio_del_problema':data.get('fechaInicioProblemafs'),
        'direccion_1':data.get('direccionProblemafs'),
        'direccin_problema':data.get('direccionServicio'),
        'departamento_fs':data.get('departamentofs'),
        'provincia_fs':data.get('provinciafs'),
        'distrito_fs':data.get('distritofs'),
        'calle_jr_av_fs':data.get('calleJrAvfs'),
        'numero_de_servicio':data.get('numerofs'),
        'constancias_de_lugar_de_trabajo':data.get('adrecibos'),
        'documento':hoja_fs_uno,
        'fecha_que_corresponda_reactivar_el_servicio':data.get('fechaReactivarServicio'),
        'fecha_de_pago_pendiente':data.get('fechaPagoPendiente'),
        'lugar_medio_de_pago':data.get('mpagos'),
        'especificar_medio_pago':data.get('especificarMedioPago'),
        'adjunta_recibo_pendiente':data.get('adrecibosPendiente'),
        'documento_1':hoja_fs_dos,
        'fecha_que_se_ejecuto_el_cambio_sim_card':data.get('fechaSIMCARD'),
        #DATOS DE INSTALACION
        'fecha_de_contratacin_de_servicio':data.get("fechaContratacionServicioInstalacion"),
        'fecha_de_la_solicitud_de_traslado':data.get("fechaSolicitudTrasladoInstalacion"),
        'canal_solicitud_traslado':data.get("strasladoe"),
        'especificar_canal_2':data.get("especificarCanalSinstalacion"),
        'codigo_de_pedido':data.get("codigoPedidoII"),
        'se_adjunta_solicitud':data.get("adsOpcionTraslado"),
        'vinculo_de_documento_adjuntado':hoja_instalaciones_uno,
        'fecha_de_la_contratacin_o_solicitud_de_trabajo':data.get("fechaContratacionSInstalacion"),
        'canal_de_presentacin':data.get("ctopcionCinco"),
        'especificar_canal_3':data.get("especificarInstalacion"),
        'cdigo_de_pedido_2':data.get("codigoPedidoInstalacion"),
        'adjuntar_solicitud_1':data.get("opcionCuatroTraslado"),
        'vinculo_del_documento_adjuntando':hoja_instalaciones_dos,
        'monto_pendiente':data.get("montoPendienteInstalacion"),
        # baja
        'fecha_de_la_solicitud_de_baja':data.get("fechaSolicitudBaja"),
        'canal_presentacin_baja':data.get("cbaja"),
        'especificar_canal_baja':data.get("especificarCanalBaja"),
        'cdigo_de_pedido':data.get("codigoPedidoBaja"),
        'adjuntar_solicitud':data.get("asb"),
        'vinculo_del_documento_2':hoja_baja_uno,
        'fecha_de_solicitud_de_suspensin_1':data.get("fechaSolicitudSuspensionBaja"),
        'canal_traslado':data.get("ctraslado"),
        'especificar_canal_1':data.get("especificarCanalTraslado"),
        'cdigo_de_pedido_1':data.get("cPedidoBaja"),
        'adjuntar_solicitud_suspensin':data.get("asT"),
        'vinculo_del_documento_1':hoja_baja_dos,
        'datos_de_los_recibos_cuestionados':data.get("datosRecibosCuestionadoBaja"),
        'numero_de_recibo_1':data.get("numeroReciboBaja"),
        'fecha_de_emisin_3':data.get("fechaEmisionBaja"),
        'fecha_de_vencimiento_3':data.get("fechaVencimientoBaja"),
        'monto_reclamado_3':data.get("montoReclamadoBaja"),

        #DATOS DE CONTRATACION
        'detalle_adicional_no_solicitada':data.get("detalleServicioAdicional"),
        'detalle_paquete_desconoce':data.get("detallePaquete"),
        'datos_recibos_cuestionados':data.get("datosRecibomrContatacion"),
        'numero_de_recibo_no_solicitada':data.get("numeroReciboContratacion"),
        'fecha_de_emisin_5':data.get("fechaEmisionContratacion"),
        'fecha_de_vencimiento_5':data.get("fechaVencimientoContratacion"),
        'monto_reclamado_no_solicitud':data.get("montoReclamadoContratacion"),

        # migracion
        'fecha_de_solicitud_de_migracin_1':data.get("fechaSolicitudMigracionX"),
        'canal_solicitud_de_migracin':data.get("canalMigracion"),
        'especificar_canal_de_solicitud':data.get("especificarCanalMigracion"),
        'codigo_pedido_migracion':data.get("codigoPedidoMigracion"),
        'plan_tarifario_solicita_migrar':data.get("planTarifarioMigracion"),
        'motivo_de_la_negativa':data.get("motivoNegativaMigracion"),
        'verificacion':data.get("solicitudAdjunta"),
        'documento_de_migracin':hoja_migracion,
        'numero_recibo':data.get("numeroReciboMigracionII"),
        'fecha_de_emisin_2':data.get("fechaEmisionMigracionIII"),
        'fecha_de_movimiento':data.get("fechaMovimientoMigracion"),
        'monto_reclamado_1':data.get("montoReclamadoMigracionMigracion"),
        'numero_de_recibo_migracion':data.get("numeroReciboII"),
        'fecha_emisin':data.get("fechaEmisionII"),
        'fecha_de_vencimiento_2':data.get("fechaVencimientoMigracionII"),
        'numero_recibo_migracin':data.get("numeroReciboMigracion"),
        'fecha_de_emisin_migracin_1':data.get("fechaEmisionMigracion"),
        'fecha_de_vencimiento_migracin_1':data.get("fechaVencimientoMigracion"),
        'monto_reclamado_migracion':data.get("montoReclamadoMigracion"),

        # otros
        'fecha_de_la_solicitud_de_contratacion':data.get("fechaSolicitudX"),
        'canal_solicitud_de_contratacion':data.get("ccontratacion"),
        'servicio_que_desea_contratar':data.get("servicioContratarX"),
        'plan_tarifario_que_desea_contratar':data.get("planTarifarioX"),
        'numero_de_recibo_x':data.get("numeroReciboX"),
        'fecha_de_emisin_4':data.get("fechaEmisionX"),
        'fecha_de_vencimiento_4':data.get("fechaVencimientoX"),
        'mes_recibo_pendiente_entrega_x':data.get("mesReciboPentregaX"),
        'direccin_para_notificacin_x':data.get("direccionFisicaX"),
        'fecha_solicitud_facturacin_x':data.get("fechaSolicitudFacturacionX"),
        'canal_presentacin_solicitud_facturacion':data.get("cpresentacion"),
        'especificar_canal_x':data.get("especificarCanalX"),
        'cdigo_de_pedido_x':data.get("codigoPedidoX"),
        'se_adjunta_la_solicitud_x':data.get("sasfll"),
        'documento_adjuntado_x':hoja_x,
        'detalle_pedido_x':data.get("detallePedidoX"),

        # medio por donde se registro el reclamo
        'medio_reclamo':"WEB",

        # descargo de cliente
        'informacin_necesaria_reclamo':data.get("informacionNecesariaReclamo"),
        'descripcin_problema_solicitud_concreta_reclamo':data.get("descripcionProblemaSolicitudReclamo"),
    }

    # Eliminar claves con valores None
    ticket_data = {key: value for key, value in ticket_data.items() if value is not None}

    try:
        # Crear el ticket en Odoo para la apelación
        ticket_id_re = models.execute_kw(db, uid, password, 'reclamosfp', 'create', [ticket_data])
        ticket_name_re = models.execute_kw(db, uid, password, 'reclamosfp', 'read', [ticket_id_re], {'fields': ['name']})

        return jsonify({'ticket_id': ticket_id_re, 'ticket_name': ticket_name_re[0]['name'], 'success': True})
    except Exception as e:
        return jsonify({"error": "Error creating ticket: " + str(e)}), 400

@app.route('/api/reclamos/queja', methods=['POST'])
def crear_queja():
    data = request.json
    file_base64 = data.get('cartaPoder')
    documento_negativa = data.get('medioProbatorioNegativa')
    documento_constancia = data.get('constanciaPagoMedioCobranza')
    documento_mpqueja = data.get('medioProbatoriopgQueja')
    documento_tramitacion = data.get('medioProbatoriosTramitacion')

    # Validar las fechas
    fecha_fields = [
        'fechaPresentacionQueja',
        'fechaNegativaQueja',
        'fechaSuspendioServicioQueja',
        'fechaNacimiento', 'fechaVencimiento',
    ]
    for field in fecha_fields:
        if field in data:
            data[field] = validate_date(data[field])

    # Validación de campos requeridos
    required_fields = [
        # TIPO USUARIO
        'tipoUsuario',
        #
        'nombre', 'apellidos', 'relacion', 'razonSocial', 'numeroContacto', 
        'tipoDoc', 'numDoc', 'distritos', 'direccion', 'correo', 'booleanValue',
        'idQueja',
        'empresaOperadoraQueja',
        'servicioObjetoQueja',
        'numServicioQueja',
        'codigoNumeroQueja',
        'negativaQueja',
        #'canalPresentacion',
        'especificarCanalQuejaDos',
        'adjuntaPrueba',
        'MediosCobranzasQuejas',
        #'constanciaPagoQueja',
        'pagoCuentaQueja',
        'espeficiarQueja',
        'dtramitacion',
        'informacionNecesariaQueja',
        'descripcionProblemaQueja',
        'capturaQuejaCinco',
        #
        
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Incluir los datos personales en los datos de la apelación
    ticket_data = {
        'state': "draft",
        'tipo_de_usuario_qja': data.get('tipoUsuario'),
        'nombre_del_padre_abonado_qja': data.get('nombrePadre'),
        'nombre_de_la_madre_abonado_qja': data.get('nombreMadre'),
        'lugar_de_nacimiento_abonado_qja': data.get('lugarNacimiento'),
        'fecha_de_nacimiento_abonado_qja': data.get('fechaNacimiento'),
        'fecha_vencimiento_del_recibo_usuario_qja': data.get('fechaVencimiento'),
        'monto_de_tarifa_usuario_qja': data.get('montoTarifa'),
        'direccion_de_facturacion_usuario_qja': data.get('direccionFacturacion'),
        'nombre_cliente_qja': data.get('nombre'),
        'apellidos_qja': data.get('apellidos'),
        'relacion_familiar_qja': data.get('relacion'),
        'razon_social_qja': data.get('razonSocial'),
        'carta_de_poder_qja': file_base64,
        'nro_contacto_qja': data.get('numeroContacto'),
        'tipo_doc_qja': data.get('tipoDoc'),
        'nro_documento_qja': data.get('numDoc'),
        'distrito_cliente_qja': data.get('distritos'),
        'direccion_cliente_qja': data.get('direccion'),
        'correo_electronico_qja': data.get('correo'),
        'notificacion_por_correo_electronico_qja': data.get('booleanValue'),
        #
        'tipo_queja': data.get('idQueja'),
        # datos del servicio
        'empresa_operadora_ds1': data.get('empresaOperadoraQueja'),
        'servicio_objeto_queja_dsq': data.get('servicioObjetoQueja'),
        'nmero_servicio_reclamado_dsq': data.get('numServicioQueja'),
        'cdigo_nmero_reclamo_dsq': data.get('codigoNumeroQueja'),
        # preguntas
        'fecha_presentacin_reclamo_queja_uno': data.get('fechaPresentacionQueja'),
        'negativa_relacionada_queja_dos': data.get('negativaQueja'),
        'char_field_2bo_1ibhijmmb': data.get('fechaNegativaQueja'),
        'canal_presentacin_reclamo_queja_dos': data.get('canalPresentacion'),
        'canal_especificado_queja_dos': data.get('especificarCanalQuejaDos'),

        'vinculo_del_documento': documento_constancia,
        'fecha_en_la_cual_se_habra_suspendido_el_servicio': data.get('fechaSuspendioServicioQueja'),
        'medio_de_cobranza_queja_cuatro': data.get('MediosCobranzasQuejas'),
        'se_adjunta_documento_queja_cuatro':data.get('adjuntaPrueba'),

        #'documento_queja': data.get('constanciaPagoQueja'), falta ponerlo a binario 
        'lugar_donde_permiti_pago_cinco': data.get('pagoCuentaQueja'),
        'especificar_quejas': data.get('espeficiarQueja'),
        'adjunta_medios_probatorios_x_seis': data.get('dtramitacion'),
        # agregado
        'medio_probatorios_queja_ultimo':documento_mpqueja,
        'medios_probatorios': documento_tramitacion,
        # agregado dos
        'adjunta_prueba_cinco': data.get('capturaQuejaCinco'),
        'medios_probatorios_1': documento_negativa,
        # descargo de la apelacion
        'informacion_necesaria_queja': data['informacionNecesariaQueja'],
        'descripcion_problema_queja': data['descripcionProblemaQueja'],

        # medio por donde se registro el reclamo
        'medio_reclamo':"WEB",
    }

    # Eliminar claves con valores None
    ticket_data = {key: value for key, value in ticket_data.items() if value is not None}

    try:
        # Crear el ticket en Odoo para la apelación
        ticket_id_qj = models.execute_kw(db, uid, password, 'quejasfp', 'create', [ticket_data])
        ticket_name_qj = models.execute_kw(db, uid, password, 'quejasfp', 'read', [ticket_id_qj], {'fields': ['name']})

        return jsonify({'ticket_id': ticket_id_qj, 'ticket_name': ticket_name_qj[0]['name'], 'success': True})
    except Exception as e:
        return jsonify({"error": "Error creating ticket: " + str(e)}), 400 

@app.route('/api/reclamos/apelaciones', methods=['POST'])
def crear_apelacion():
    data = request.json
    file_base64 = data.get('cartaPoder')

    # Validar las fechas
    fecha_fields = [
        'fechaNacimiento', 'fechaVencimiento',
        'fechaNegativaQueja', 'fechaSuspendioServicioQueja',
        'fechaEmisionCartaApelacion', 'fechaEmisionApelacionSiCuatro',
        'fechaVencimientoApelacionSiCuatro', 'fechaEmisionApelacionSiCinco',
    ]
    for field in fecha_fields:
        if field in data:
            data[field] = validate_date(data[field])

    # Validación de campos requeridos
    required_fields = [
        #datos de validacion
        'nombrePadre','nombreMadre','lugarNacimiento','fechaNacimiento','fechaVencimiento','montoTarifa','direccionFacturacion',
        #datos personales
        'nombre', 'apellidos', 'relacion', 'razonSocial', 'numeroContacto', 
        'tipoDoc', 'numDoc', 'distritos', 'direccion', 'correo', 'booleanValue','tipoUsuario',
        # escoger apelacion
        'idApelacion',
        # datos del extra
        'empresaOperadoraApelacion',
        'servicioMateriaApelacion',
        'numeroServicioApelacion',
        'codigoNumeroApelacion',
        'numeroCartaApelacion',
        'fechaEmisionCartaApelacion',
        # preguntas

        #'detallePruebaApelacionUno',
        #'detallefsApelacionDos',
        #'materiaEmpresaApelacionTres',

        'apelacionopcioncuatro',
        'numeroReciboApelacionSiCuatro',
        'fechaEmisionApelacionSiCuatro',
        'fechaVencimientoApelacionSiCuatro',
        #'detalleReclamoApelacionSiCuatro',
        'apelacionOpcioncinco',
        'numeroReciboApelacionSiCinco',
        'fechaEmisionApelacionSiCinco',
        'montoTotalApelacionSiCinco',
        #'detalleReclamoApelacionSiCinco',
        #'materiaEmpresaEmitirApelacionSeis',

        # descargo de cliente        
        'informacionNecesariaApelacion',
        'sustentoApelacion',
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Incluir los datos personales en los datos de la apelación
    ticket_data = {
        'state': "draft",
        'tipo_de_usuario_ape': data.get('tipoUsuario'),
        #datos de validacion abonado
        'nombre_del_padre_abonado_ape': data.get('nombrePadre'),
        'nombre_de_la_madre_abonado_ape': data.get('nombreMadre'),
        'lugar_de_nacimiento_abonado_ape': data.get('lugarNacimiento'),
        'fecha_de_nacimiento_abonado_ape': data.get('fechaNacimiento'),
        #datos de validacion de usuario
        'fecha_vencimiento_del_recibo_usuario_ape': data.get('fechaVencimiento'),
        'monto_de_tarifa_usuario_ape': data.get('montoTarifa'),
        'direccion_de_facturacion_usuario_ape': data.get('direccionFacturacion'),
        #datos personales
        'nombre_cliente_ape': data.get('nombre'),
        'apellidos_ape': data.get('apellidos'),
        'relacion_familiar_ape': data.get('relacion'),
        'razon_social_ape': data.get('razonSocial'),
        'carta_de_poder_ape': file_base64,
        'nro_contacto_ape': data.get('numeroContacto'),
        'tipo_doc_ape': data.get('tipoDoc'),
        'nro_documento_ape': data.get('numDoc'),
        'distrito_cliente_ape': data.get('distritos'),
        'direccion_cliente_ape': data.get('direccion'),
        'correo_electronico_ape': data.get('correo'),
        'notificacion_por_correo_electronico_ape': data.get('booleanValue'),
        # escoger la apelacion
        'tipo_apelacion': data.get('idApelacion'),
        # DATOS DE SERVICIO
        'empresa_operadora_ds': data.get('empresaOperadoraApelacion'),
        'servicio_materia_de_apelacin_ds': data.get('servicioMateriaApelacion'),
        'nmero_servicio_reclamado_ds': data.get('numeroServicioApelacion'),
        'cdigo_nmero_reclamo_ds': data.get('codigoNumeroApelacion'),
        'nmero_carta_resuelve_reclamo_ds': data.get('numeroCartaApelacion'),
        'fecha_emisin_carta_ds': data.get('fechaEmisionCartaApelacion'),
        
        # preguntas de apelacion

        # 'detalle_pruebas_apelacion_uno': data.get('detallePruebaApelacionUno'),
        # 'detalle_falta_sustentacion_apelacion_dos': data.get('detallefsApelacionDos'),
        # 'materia_empresa_comunicarse': data.get('materiaEmpresaApelacionTres'),
        'respuesta_empresa_apelacion_cuatro': data.get('apelacionopcioncuatro'),
        'numero_recibo_apelacion_cinco': data.get('numeroReciboApelacionSiCuatro'),
        'fecha_de_emision': data.get('fechaEmisionApelacionSiCuatro'),
        'fecha_de_vencimiento': data.get('fechaVencimientoApelacionSiCuatro'),
        # 'pronunciamiento_empresa_ape_cuatro': data.get('detalleReclamoApelacionSiCuatro'),
        'falto_acoger_ape_cinco': data.get('apelacionOpcioncinco'),
        'nmero_recibo_apleacion_cinco': data.get('numeroReciboApelacionSiCinco'),
        'fecha_de_emisin_1': data.get('fechaEmisionApelacionSiCinco'),
        'monto_total_corresponde_cinco': data.get('montoTotalApelacionSiCinco'),

        # 'detalle_extremo_apelacion_cinco': data.get('detalleReclamoApelacionSiCinco'),
        # 'materia_cual_empresa_ape_seis': data.get('materiaEmpresaEmitirApelacionSeis'),

        # descargo del cliente
        'informacin_necesaria_apelacion': data.get('informacionNecesariaApelacion'),
        'sustento_de_apelacin': data.get('sustentoApelacion'),

        # medio por donde se registro el reclamo
        'medio_reclamo':"WEB",

    }

    # Eliminar claves con valores None
    ticket_data = {key: value for key, value in ticket_data.items() if value is not None}

    try:
        # Crear el ticket en Odoo para la apelación
        ticket_id_ape = models.execute_kw(db, uid, password, 'apelacionfp', 'create', [ticket_data])
        ticket_name_ape = models.execute_kw(db, uid, password, 'apelacionfp', 'read', [ticket_id_ape], {'fields': ['name']})

        return jsonify({'ticket_id': ticket_id_ape, 'ticket_name': ticket_name_ape[0]['name'], 'success': True})
    except Exception as e:
        return jsonify({"error": "Error creating ticket: " + str(e)}), 400

# Este bloque solo se ejecuta cuando corras la app localmente
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))  # Usa el puerto dinámico de Heroku
