from flask import Flask, request, jsonify
from flask_cors import CORS
import xmlrpc.client
import base64
from datetime import datetime


# Crear la aplicación Flask
app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir solicitudes desde el frontend

# Conexión con Odoo
url = 'http://localhost:8069'
db = 'fiberOdoo_17-24-09-24'
username = 'z.barreto@fiberpro.com.pe'
password = 'SystemFiberPRO**13'

# Conexión a Odoo usando XML-RPC
common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

# Función para autenticar al usuario en Odoo
def authenticate():
    uid = common.authenticate(db, username, password, {})
    return uid

@app.route('/api/reclamos', methods=['POST'])
def crear_reclamo():
    data = request.json

    # Validación de datos básicos
    required_fields = [

        'tipoticket',
        'diagnostico',
        'nombrePadre',
        'nombreMadre',
        'lugarNacimiento',
        'fechaNacimiento',
        'fechaVencimiento',
        'montoTarifa',
        'direccionFacturacion',
        'cartaPoder',  # será una cadena vacía si no se cargó un archivo
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

        # reclamos
        'selectReclamos',
        'problemaEspecificoValor',

        # datos de servicio
        'empresaOperadora',
        'servicioContratado',
        'servicioMateriaReclamo',
        'numeroServicioContratado',
        # factuacion
        'correoFC',
        'numeroReciboFC',
        'numeroDocumentoCobroFC',
        'fechaEmisionFC',
        'fechaVencimientoFC',
        'montoReclamadoFC',
        'conceptoFacturadoFC',
        'tarifaUsuarioFC',
        'fechaEstimadaPagoFC',
        'modalidadPagoFC',
        'especificarModalidadPagoFC',
        'adjuntarHojaPagoFC',
        
        # Calidad
        'fechaInicioCalidadI',
        'direccionCalidadI',
        'departamentoCalidadI',
        'provinciaCalidadI',
        'distritoCalidad',
        'calleJrAvCalidad',
        'codigoReportePrevioCalidad',
        
        # Incumplimiento
        'detalleCondicionIncumplimiento',
        'fechaIncumplimientos',
        'detalleOfertaIncumplimiento',
        'oportunidadBrindoOfertaIncumplimiento',
        'fechAproximadaIncumplimiento',
        'cbpromocionfs',
        'especificarIncumplimiento',
        'codigOtorgamientoIncumplimiento',
        'fechaCualPincumplimiento',
        'detalleAtributosIncumplimiento',
        'reciboCorrespondienteIncumplimiento',
        'fechaEmisionIncumplimineto',
        'numeroRecivoIncumplimiento',
        'fechavencimientoIncumplimineto',
        'oportunidadBrindoInfoOmitida',
        'fechaAproxInfoOmitida',



       # Servicio
        'fechaInicioProblemafs',
        'direccionProblemafs',
        'direccionServicio',
        'departamentofs',
        'provinciafs',
        'distritofs',
        'calleJrAvfs',
        'numerofs',
        'adrecibos',
        'adjuntarVinculo',
        'fechaReactivarServicio',
        'fechaPagoPendiente',
        'mpagos',
        'especificarMedioPago',
        'adrecibosPendiente',
        'vinculoAdjuntarSolicitud',
        'fechaSIMCARD',

        # activaciones
        'fechaContratacionServicioInstalacion',
        'fechaSolicitudTrasladoInstalacion',
        'strasladoe',
        'especificarCanalSinstalacion',
        'codigoPedidoII',
        'adsOpcionTraslado',
        'vinculoSolicitudReclamo',
        'fechaContratacionSInstalacion',
        'ctopcionCinco',
        'especificarInstalacion',
        'codigoPedidoInstalacion',
        'opcionCuatroTraslado',
        'adjuntarSolicitudReclamoCuatro',
        'montoPendienteInstalacion',

        #Baja
        'fechaSolicitudBaja',
        'cbaja',
        'especificarCanalBaja',
        'codigoPedidoBaja',
        'asb',
        'solicitudBajaReclamo',
        'fechaSolicitudSuspensionBaja',
        'ctraslado',
        'especificarCanalTraslado',
        'cPedidoBaja',
        'asT',
        'adjuntarVinculoSolicitud',
        'datosRecibosCuestionadoBaja',
        'numeroReciboBaja',
        'fechaEmisionBaja',
        'fechaVencimientoBaja',
        'montoReclamadoBaja',

        #contratacion
        'detalleServicioAdicional',
        'detallePaquete',
        'datosRecibomrContatacion',
        'numeroReciboContratacion',
        'fechaEmisionContratacion',
        'fechaVencimientoContratacion',
        'montoReclamadoContratacion',

        #migracion
        'fechaSolicitudMigracionX',
        'canalMigracion',
        'especificarCanalMigracion',
        'codigoPedidoMigracion',
        'planTarifarioMigracion',
        'motivoNegativaMigracion',
        'solicitudAdjunta',
        'documentoSolicitudMigracionOne',
        'numeroReciboMigracionII',
        'fechaEmisionMigracionIII',
        'fechaMovimientoMigracion',
        'montoReclamadoMigracionMigracion',
        'numeroReciboII',
        'fechaEmisionII',
        'fechaVencimientoMigracionII',
        'numeroReciboMigracion',
        'fechaEmisionMigracion',
        'fechaVencimientoMigracion',
        'montoReclamadoMigracion',

        # otros
        'tipoticket',
        'fechaSolicitudX',
        'ccontratacion',
        'especificarx',
        'servicioContratarX',
        'planTarifarioX',
        'numeroReciboX',
        'fechaEmisionX',
        'fechaVencimientoX',
        'mesReciboPentregaX',
        'direccionFisicaX',
        'fechaSolicitudFacturacionX',
        'cpresentacion',
        'especificarCanalX',
        'codigoPedidoX',
        'sasfll',
        'vinculoSolicitudSX',
        'detallePedidoX',

        # descargo del cliente
        'informacionNecesariaReclamo',
        'descripcionProblemaSolicitudReclamo',

        #queja
        'fechaPresentacionQueja',
        'negativaQueja',
        'fechaNegativaQueja',
        'canalPresentacion',
        'especificarCanalQuejaDos',
        'adjuntaPrueba',
        'fechaSuspendioServicioQueja',
        'MediosCobranzasQuejas',
        'constanciaPagoQueja',
        'pagoCuentaQueja',
        'espeficiarQueja',
        'capturaQuejaCinco',
        'dtramitacion',
        'medioProbatorioNegativa',
        'constanciaPagoMedioCobranza',
        'medioProbatoriopgQueja',
        'medioProbatoriosTramitacion',

        # descargo del cliente
        'informacionNecesariaQueja',
        'descripcionProblemaQueja',

        #apelaciones
        'detallePruebaApelacionUno',
        'detallefsApelacionDos',
        'materiaEmpresaApelacionTres',
        'apelacionopcioncuatro',
        'numeroReciboApelacionSiCuatro',
        'fechaEmisionApelacionSiCuatro',
        'fechaVencimientoApelacionSiCuatro',
        'montoReclamadoApelacionSiCuatro',
        'detalleReclamoApelacionSiCuatro',
        'apelacionOpcioncinco',
        'numeroReciboApelacionSiCinco',
        'fechaEmisionApelacionSiCinco',
        'montoTotalApelacionSiCinco',
        'detalleReclamoApelacionSiCinco',
        'materiaEmpresaEmitirApelacionSeis',

        # descargo del cliente
        'informacionNecesariaApelacion',
        'sustentoApelacion',

    ]

    def validate_date(date_str):
    # Si la fecha es vacía o None, devuelve None
        if not date_str:
            return None
        try:
            # Intenta convertir la cadena en un objeto datetime
            return datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            # Si no se puede convertir, retorna None
            return None



    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
        
    # Condicional para determinar el valor de una variable según el 'tipoticket'
    tipoticket = data.get('tipoticket')

    if tipoticket == '3':
        title = "Reclamo"
    elif tipoticket == '7':
        title = "Apelacion"
    elif tipoticket == '6':
        title = "Queja"
    else:
        title = "Tipo desconocido"  # Valor por defecto si no coincide con ningún caso



    if data.get('tipoticket') == '3':  # Si 'tipoticket' es igual a 3, imprime 'Reclamo'
        print("Reclamo")

    # Obtener los archivos si están presentes
    file_base64 = data.get('cartaPoder', None)
    file_constancia_base64 = data.get('constancia', None)

    if file_base64:
        try:
            # Asegurarse de que el archivo esté en formato base64
            file_content = base64.b64decode(file_base64)
        except Exception as e:
            return jsonify({"error": "Error decoding cartaPoder file: " + str(e)}), 400
    else:
        file_content = None  # Si no hay archivo, dejamos como None

    if file_constancia_base64:
        try:
            # Asegurarse de que el archivo esté en formato base64
            file_constancia_content = base64.b64decode(file_constancia_base64)
        except Exception as e:
            return jsonify({"error": "Error decoding constancia file: " + str(e)}), 400
    else:
        file_constancia_content = None  # Si no hay archivo, dejamos como None

    # Autenticación con Odoo
    uid = authenticate()
    if not uid:
        return jsonify({"error": "Authentication error"}), 400

    try:
        # Crear el ticket en Odoo
        ticket_data = {
            'name': title,  # Nombre del ticket
            # generar ticket
            'ticket_type_id':data['tipoticket'],
            'x_studio_diagnostico_aacc_id':data['diagnostico'],
            # Validaciones de abonado
            'x_studio_nombre_del_padre_abonado': data['nombrePadre'],
            'x_studio_nombre_de_la_madre_abonado': data['nombreMadre'],
            'x_studio_lugar_de_nacimiento_abonado': data['lugarNacimiento'],
            'x_studio_fecha_de_nacimiento_abonado': data['fechaNacimiento'],
            'x_studio_fecha_vencimiento_del_recibo_usuario': data['fechaVencimiento'],
            'x_studio_monto_de_tarifa_usuario': data['montoTarifa'],
            'x_studio_direccin_de_facturacin_usuario': data['direccionFacturacion'],

            # Datos personales
            'x_studio_nombre_cliente': data['nombre'],
            'x_studio_apellidos': data['apellidos'],
            'x_studio_relacin_familiar': data['relacion'],
            'x_studio_razon_social': data['razonSocial'],
            'x_studio_nro_contacto': data['numeroContacto'],
            'x_studio_tipo_doc': data['tipoDoc'],
            'x_studio_nro_documento': data['numDoc'],
            'x_studio_distrito_cliente': data['distritos'],
            'x_studio_direccin_cliente': data['direccion'],
            'x_studio_correo_electrnico': data['correo'],
            'x_studio_notificacin_por_correo_electronico': data['autoriza'],

            # Archivos opcionales - Solo agregar si están presentes
            'x_studio_carta_de_poder': file_base64 if file_base64 else None,
            'x_studio_documento_de_cobro': file_constancia_base64 if file_constancia_base64 else None,

            # reclamos
            'x_studio_reclamo_1': data['selectReclamos'],
            'x_studio_trata_reclamo': data['problemaEspecificoValor'],


            # Datos del servicio de reclamo
            'x_studio_empresa_operadora_dsr': data['empresaOperadora'],
            'x_studio_servicio_contratado_dsr': data['servicioContratado'],
            'x_studio_nmero_cdigo_servicio_contrato_dsr': data['servicioMateriaReclamo'],
            'x_studio_servicio_materia_de_reclamo': data['numeroServicioContratado'],

            # Facturación y cobro
            'x_studio_numero_de_recibo': data['numeroReciboFC'],
            'x_studio_documento_cobro': data['numeroDocumentoCobroFC'],
            'x_studio_fecha_de_emisin': data['fechaEmisionFC'],
            'x_studio_fecha_de_vencimiento_1': data['fechaVencimientoFC'],
            'x_studio_monto_reclamado': data['montoReclamadoFC'],
            'x_studio_concepto_facturado': data['conceptoFacturadoFC'],
            'x_studio_tarifa_debio_aplicarse': data['tarifaUsuarioFC'],
            'x_studio_fecha_efectu_el_pago': data['fechaEstimadaPagoFC'],
            'x_studio_modalidad_de_pago': data['modalidadPagoFC'],
            'x_studio_especificar_modalidad_pago': data['especificarModalidadPagoFC'],
            'x_studio_adjunta_doc_cobro': data['adjuntarHojaPagoFC'],

            # calidad
            'x_studio_fecha_de_inicio_del_problema_1': data['fechaInicioCalidadI'],
            'x_studio_direccin_presenta_problema': data['direccionCalidadI'],
            'x_studio_departamento': data['departamentoCalidadI'],
            'x_studio_provincia': data['provinciaCalidadI'],
            'x_studio_distrito_calidad': data['distritoCalidad'],
            'x_studio_calle_jr_av': data['calleJrAvCalidad'],
            #'x_studio_numero_contacto': data['numerocalidad'],
            'x_studio_codigo': data['codigoReportePrevioCalidad'],

            # # #opcion 3
            'x_studio_detalle_condicin_': data['detalleCondicionIncumplimiento'],
            'x_studio_fecha_de_incumplimiento_1': data['fechaIncumplimientos'],
            'x_studio_detalle_oferta_promocin_brindada': data['detalleOfertaIncumplimiento'],
            'x_studio_oportunidad_en_el_cual_se_brindo_la_oferta_o_promocin': data['oportunidadBrindoOfertaIncumplimiento'],
            'x_studio_fecha_aproximada_1': data['fechAproximadaIncumplimiento'],
            #'x_studio_canal_oferta_promocion': data['cbpromocion'],
            'x_studio_canal_oferta_promocion': data['cbpromocionfs'],
            'x_studio_especificar_canal': data['especificarIncumplimiento'],
            'x_studio_cdigo_de_oferta_o_promocin': data['codigOtorgamientoIncumplimiento'],
            'x_studio_fecha_se_presento_incumplimiento': data['fechaCualPincumplimiento'],
            'x_studio_detalles_atributos_descontando': data['detalleAtributosIncumplimiento'],
            'x_studio_recibo_correspondiente_al_periodo': data['reciboCorrespondienteIncumplimiento'],
            'x_studio_fecha_de_emisin_del_recibo': data['fechaEmisionIncumplimineto'],
            'x_studio_numero_de_recibo_tres': data['numeroRecivoIncumplimiento'],
            'x_studio_fecha_de_vencimiento_6': data['fechavencimientoIncumplimineto'],

            'x_studio_oportunidad_brindo_informacin_inexacta': data['oportunidadBrindoInfoOmitida'],
            'x_studio_fecha_aproximada_2': data['fechaAproxInfoOmitida'],
            #'x_studio_fecha_presento_incumplimiento': data['fechaCualPincumplimiento'],
            #'x_studio_detalles_atributos_descontando': data['detalleAtributosIncumplimiento'],

            #falta de servicio
            'x_studio_fecha_de_inicio_del_problema': data['fechaInicioProblemafs'],
            'x_studio_direccion_1': data['direccionProblemafs'],
            'x_studio_direccin_problema': data['direccionServicio'],
            'x_studio_departamento_fs': data['departamentofs'],
            'x_studio_provincia_fs': data['provinciafs'],
            'x_studio_distrito_fs': data['distritofs'],
            'x_studio_calle_jr_av_fs': data['calleJrAvfs'],
            'x_studio_numero_de_servicio': data['numerofs'],
            'x_studio_constancias_de_lugar_de_trabajo': data['adrecibos'],
            'x_studio_documento': data['adjuntarVinculo'],
            'x_studio_fecha_que_corresponda_reactivar_el_servicio': data['fechaReactivarServicio'],
            'x_studio_fecha_de_pago_pendiente': data['fechaPagoPendiente'],
            'x_studio_lugar_medio_de_pago': data['mpagos'],
            'x_studio_especificar_medio_pago': data['especificarMedioPago'],
            'x_studio_adjunta_recibo_pendiente': data['adrecibosPendiente'],
            'x_studio_documento_1': data['vinculoAdjuntarSolicitud'],
            'x_studio_fecha_que_se_ejecuto_el_cambio_sim_card': data['fechaSIMCARD'],

            # # instalcion
            'x_studio_fecha_de_contratacin_de_servicio': data['fechaContratacionServicioInstalacion'],
            'x_studio_fecha_de_la_solicitud_de_traslado': data['fechaSolicitudTrasladoInstalacion'],
            'x_studio_canal_solicitud_traslado': data['strasladoe'],
            'x_studio_especificar_canal_2': data['especificarCanalSinstalacion'],
            'x_studio_codigo_de_pedido': data['codigoPedidoII'],
            'x_studio_se_adjunta_solicitud': data['adsOpcionTraslado'],
            'x_studio_vinculo_de_documento_adjuntado': data['vinculoSolicitudReclamo'],
            'x_studio_fecha_de_la_contratacin_o_solicitud_de_trabajo': data['fechaContratacionSInstalacion'],
            'x_studio_canal_de_presentacin': data['ctopcionCinco'],
            'x_studio_especificar_canal_3': data['especificarInstalacion'],
            'x_studio_cdigo_de_pedido_2': data['codigoPedidoInstalacion'],
            'x_studio_adjuntar_solicitud_1': data['opcionCuatroTraslado'],
            'x_studio_vinculo_del_documento_adjuntando': data['adjuntarSolicitudReclamoCuatro'],
            'x_studio_monto_pendiente': data['montoPendienteInstalacion'],

            # # Baja
            'x_studio_fecha_de_la_solicitud_de_baja': data['fechaSolicitudBaja'],
            'x_studio_canal_presentacin_baja': data['cbaja'],
            'x_studio_especificar_canal_baja': data['especificarCanalBaja'],
            'x_studio_cdigo_de_pedido': data['codigoPedidoBaja'],
            'x_studio_adjuntar_solicitud': data['asb'],
            'x_studio_vinculo_del_documento_2': data['solicitudBajaReclamo'],
            'x_studio_fecha_de_solicitud_de_suspensin_1': data['fechaSolicitudSuspensionBaja'],
            'x_studio_canal_traslado': data['ctraslado'],
            'x_studio_especificar_canal_1': data['especificarCanalTraslado'],
            'x_studio_cdigo_de_pedido_1': data['cPedidoBaja'],
            'x_studio_adjuntar_solicitud_suspensin': data['asT'],
            'x_studio_vinculo_del_documento_1': data['adjuntarVinculoSolicitud'],
            'x_studio_datos_de_los_recibos_cuestionados': data['datosRecibosCuestionadoBaja'],
            'x_studio_numero_de_recibo_1': data['numeroReciboBaja'],
            'x_studio_fecha_de_emisin_3': data['fechaEmisionBaja'],
            'x_studio_fecha_de_vencimiento_3': data['fechaVencimientoBaja'],
            'x_studio_monto_reclamado_3': data['montoReclamadoBaja'],

            # # # Contratacion
            'x_studio_detalle_adicional_no_solicitada': data['detalleServicioAdicional'],
            'x_studio_detalle_paquete_desconoce': data['detallePaquete'],
            'x_studio_datos_recibos_cuestionados': data['datosRecibomrContatacion'],
            'x_studio_numero_de_recibo_no_solicitada': data['numeroReciboContratacion'],
            'x_studio_fecha_de_emisin_5': data['fechaEmisionContratacion'],
            'x_studio_fecha_de_vencimiento_5': data['fechaVencimientoContratacion'],
            'x_studio_monto_reclamado_no_solicitud': data['montoReclamadoContratacion'],

            # # # Migracion
            'x_studio_fecha_de_solicitud_de_migracin_1': data['fechaSolicitudMigracionX'],
            'x_studio_canal_solicitud_de_migracin': data['canalMigracion'],
            'x_studio_especificar_canal_de_solicitud': data['especificarCanalMigracion'],
            'x_studio_codigo_pedido_migracion': data['codigoPedidoMigracion'],
            'x_studio_plan_tarifario_solicita_migrar': data['planTarifarioMigracion'],
            'x_studio_motivo_de_la_negativa': data['motivoNegativaMigracion'],
            'x_studio_verificacion': data['solicitudAdjunta'],
            'x_studio_documento_de_migracin': data['documentoSolicitudMigracionOne'],
            'x_studio_numero_recibo': data['numeroReciboMigracionII'],
            'x_studio_fecha_de_emisin_2': data['fechaEmisionMigracionIII'],
            'x_studio_fecha_de_movimiento': data['fechaMovimientoMigracion'],
            'x_studio_monto_reclamado_1': data['montoReclamadoMigracionMigracion'],
            'x_studio_numero_de_recibo_migracion': data['numeroReciboII'],
            'x_studio_fecha_emisin': data['fechaEmisionII'],
            'x_studio_fecha_de_vencimiento_2': data['fechaVencimientoMigracionII'],
            'x_studio_numero_recibo_migracin': data['numeroReciboMigracion'],
            'x_studio_fecha_de_emisin_migracin_1': data['fechaEmisionMigracion'],
            'x_studio_fecha_de_vencimiento_migracin_1': data['fechaVencimientoMigracion'],
            'x_studio_monto_reclamado_migracion': data['montoReclamadoMigracion'],

            # otros
            'x_studio_fecha_de_la_solicitud_de_contratacion': data['fechaSolicitudX'],
            'x_studio_canal_solicitud_de_contratacion': data['ccontratacion'],
            'x_studio_canal_solicitud_de_contratacion': data['especificarx'],
            'x_studio_servicio_que_desea_contratar': data['servicioContratarX'],
            'x_studio_plan_tarifario_que_desea_contratar': data['planTarifarioX'],
            'x_studio_numero_de_recibo_x': data['numeroReciboX'],
            'x_studio_fecha_de_emisin_4': data['fechaEmisionX'],
            'x_studio_fecha_de_vencimiento_4': data['fechaVencimientoX'],
            'x_studio_mes_recibo_pendiente_entrega_x': data['mesReciboPentregaX'],
            'x_studio_direccin_para_notificacin_x': data['direccionFisicaX'],
            'x_studio_fecha_solicitud_facturacin_x': data['fechaSolicitudFacturacionX'],
            'x_studio_canal_presentacin_solicitud_facturacion': data['cpresentacion'],
            'x_studio_especificar_canal_x': data['especificarCanalX'],
            'x_studio_cdigo_de_pedido_x': data['codigoPedidoX'],
            'x_studio_se_adjunta_la_solicitud_x': data['sasfll'],
            'x_studio_documento_adjuntado_x': data['vinculoSolicitudSX'],
            'x_studio_detalle_pedido_x': data['detallePedidoX'],

            # descargo del cliente
            'x_studio_informacin_necesaria_reclamo': data['informacionNecesariaReclamo'],
            'x_studio_descripcin_problema_solicitud_concreta_reclamo': data['descripcionProblemaSolicitudReclamo'],
            

            #queja

            'x_studio_queja':data['selectQueja'],

            #quejas datos extras
            'x_studio_empresa_operadora_ds1':data['empresaOperadoraQueja'],
            'x_studio_servicio_objeto_queja_dsq':data['servicioObjetoQueja'],
            'x_studio_nmero_servicio_reclamado_dsq':data['numServicioQueja'],
            'x_studio_cdigo_nmero_reclamo_dsq':data['codigoNumeroQueja'],

            'x_studio_fecha_presentacin_reclamo_queja_uno':data['fechaPresentacionQueja'],
            'x_studio_negativa_relacionada_queja_dos':data['negativaQueja'],
            'x_studio_char_field_2bo_1ibhijmmb':data['fechaNegativaQueja'],
            'x_studio_canal_presentacin_reclamo_queja_dos':data['canalPresentacion'],
            'x_studio_canal_especificado_queja_dos':data['especificarCanalQuejaDos'],
            'x_studio_vinculo_del_documento':data['medioProbatorioNegativa'],
            'x_studio_fecha_en_la_cual_se_habra_suspendido_el_servicio':data['fechaSuspendioServicioQueja'],
            'x_studio_medio_de_cobranza_queja_cuatro':data['MediosCobranzasQuejas'],
            'x_studio_se_adjunta_documento_queja_cuatro':data['medioProbatoriopgQueja'],
            'x_studio_documento_queja':data['constanciaPagoMedioCobranza'],
            'x_studio_lugar_donde_permiti_pago_cinco':data['pagoCuentaQueja'],
            'x_studio_especificar_quejas':data['espeficiarQueja'],
            'x_studio_adjunta_prueba_cinco':data['capturaQuejaCinco'],
            'x_studio_medios_probatorios_1':data['medioProbatoriopgQueja'],

            'x_studio_adjunta_medios_probatorios_x_seis':data['dtramitacion'],
            'x_studio_medio_probatorios_queja_ultimo':data['medioProbatoriosTramitacion'],

            'x_studio_medios_probatorios':data['medioProbatorioNegativa'],

            # descargo del cliente
            'x_studio_informacin_necesaria_queja': data['informacionNecesariaQueja'],
            'x_studio_descripcin_problema_queja': data['descripcionProblemaQueja'],

            # apelaciones
            'x_studio_apelacin':data['selectApelacion'],

            'x_studio_empresa_operadora_ds':data['empresaOperadoraApelacion'],
            'x_studio_servicio_materia_de_apelacin_ds':data['servicioMateriaApelacion'],
            'x_studio_nmero_servicio_reclamado_ds':data['numeroServicioApelacion'],
            'x_studio_cdigo_nmero_reclamo_ds':data['codigoNumeroApelacion'],
            'x_studio_nmero_carta_resuelve_reclamo_ds':data['numeroCartaApelacion'],
            'x_studio_fecha_emisin_carta_ds':data['fechaEmisionCartaApelacion'],
            #'x_studio_fecha_apelacion':data['fechaEmisionCartaApelacion'],

            'x_studio_detalle_pruebas_apelacion_uno':data['detallePruebaApelacionUno'],
            'x_studio_detalle_falta_sustentacion_apelacion_dos':data['detallefsApelacionDos'],
            'x_studio_materia_empresa_comunicarse':data['materiaEmpresaApelacionTres'],
            'x_studio_respuesta_empresa_apelacion_cuatro':data['apelacionopcioncuatro'],
            'x_studio_numero_recibo_apelacion_cinco':data['numeroReciboApelacionSiCuatro'],
            'x_studio_fecha_de_emision': data['fechaEmisionApelacionSiCuatro'],
            'x_studio_fecha_de_vencimiento': data['fechaVencimientoApelacionSiCuatro'],
            'x_studio_monto_reclamado_apelacion_cinco':data['montoReclamadoApelacionSiCuatro'],
            'x_studio_pronunciamiento_empresa_ape_cuatro':data['detalleReclamoApelacionSiCuatro'],
            'x_studio_falto_acoger_ape_cinco':data['apelacionOpcioncinco'],
            'x_studio_nmero_recibo_apleacion_cinco':data['numeroReciboApelacionSiCinco'],
            'x_studio_fecha_de_emisin_1': data['fechaEmisionApelacionSiCinco'],
            'x_studio_monto_total_corresponde_cinco':data['montoTotalApelacionSiCinco'],
            'x_studio_detalle_extremo_apelacion_cinco':data['detalleReclamoApelacionSiCinco'],
            'x_studio_materia_cual_empresa_ape_seis':data['materiaEmpresaEmitirApelacionSeis'],

            # descargo del cliente
            'x_studio_informacin_necesaria_apelacion': data['informacionNecesariaApelacion'],
            'x_studio_sustento_de_apelacin': data['sustentoApelacion'],

        }

        # Solo eliminar las claves con valores None
        ticket_data = {key: value for key, value in ticket_data.items() if value is not None}

        ticket_id = models.execute_kw(
            db, uid, password, 'helpdesk.ticket', 'create', [ticket_data])

        return jsonify({'ticket_id': ticket_id}), 200

    except Exception as e:
        return jsonify({"error": "Error creating ticket or attachment: " + str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
