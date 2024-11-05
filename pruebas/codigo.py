@app.route('/api/reclamos', methods=['POST'])
def add_claim():
    #claim = request.form
    claim = request.json

    # Validación básica de datos
    required_fields = ['nombres', 'apellidos', 'numeroContacto', 'numDoc', 'tipoticket']
    for field in required_fields:
        if field not in claim:
            return jsonify({'error': f'El campo {field} es obligatorio.'}), 400

    # Mapeo de números a títulos
    def obtener_titulo(tipoticket):
        titulos = {
            '3': 'Reclamo',
            '6': 'Queja',
            '7': 'Apelación'
        }
        return titulos.get(tipoticket, 'Reclamo sin asunto')  # Valor por defecto

    # Obtener el título según el tipoticket
    title = obtener_titulo(claim['tipoticket'])

    body = {
        # Datos personales
        #'name': claim.get('tipoticket', 'Reclamo sin asunto'), 
        'name':title,
        'ticket_type_id':claim['tipoticket'],
        'x_studio_diagnostico_aacc_id':claim['diagnostico'],
        'x_studio_nombre_cliente': claim['nombres'],
        'x_studio_apellidos': claim['apellidos'],
        'x_studio_relacin_familiar': claim.get('relacion', ''),
        'x_studio_nro_contacto': claim['numeroContacto'],
        'x_studio_tipo_doc': claim['tipoDoc'],
        'x_studio_nro_documento': claim['numDoc'],
        'x_studio_razon_social': claim.get('razonSocial', ''),
        'x_studio_vinculo_de_la_carta_de_poder': claim.get('link', ''),
        'x_studio_distrito_cliente': claim.get('distritos', ''),
        'x_studio_direccin_cliente': claim.get('direccion', ''),
        'x_studio_correo_electrnico': claim.get('correo', ''),
        'x_studio_notificacin_por_correo_electronico': claim.get('autoriza', False),
        'x_studio_canal_id': 48,

        #Reclamo

        # 'ticket_type_id': claim.get('tipoTicket', 3),  # Default a 3 si no se especifica
        
        #'x_studio_materia_del_reclamo': claim.get('materias', ''),
        #'x_studio_detalle_del_reclamo': claim.get('materias', ''),
        #'x_studio_materia_reclamable': claim.get('materiaReclamable', ''),
        #'x_studio_problema_especifico': claim.get('problemaEspecifico', ''),
        # 'x_studio_numero_de_recibo': claim.get('numeroReciboFCone', ''),
        # 'x_studio_documento_cobro': claim.get('numeroDocumentoCobroFCone', ''),
        # 'x_studio_fecha_de_emisin':  claim.get('fechaEmisionFCone', ''),
        # 'x_studio_fecha_de_vencimiento_1': claim.get('fechavencimientoFCone', ''),
        # 'x_studio_monto_reclamado': claim.get('montoReclamadoFCone', 0),
        # 'x_studio_concepto_facturado': claim.get('conceptoFacturadoFCone', ''),
        # 'x_studio_tarifa_debio_aplicarse': claim.get('tarifaUsuarioFCone', ''),
        # 'x_studio_fecha_efectu_el_pago': claim.get('fechaEstimadaPagoFCone', ''),
        # 'x_studio_modalidad_de_pago': claim.get('mPago', ''),
        # 'x_studio_especificar_modalidad_pago': claim.get('especificarModalidadPago', ''),
        # 'x_studio_adjunta_doc_cobro': claim.get('hpfacturado', ''),
        # 'x_studio_documento_de_cobro': claim.get('linkHojaPagoFC', ''),
        #opcion2
        # 'x_studio_fecha_de_inicio_del_problema_1': claim.get('fechaInicioCalidadI', ''),
        # 'x_studio_direccin_presenta_problema': claim.get('direccionCalidadI', ''),
        # 'x_studio_departamento': claim.get('departamentoCalidadI', ''),
        # 'x_studio_provincia': claim.get('provinciaCalidadI', ''),
        # 'x_studio_distrito_calidad': claim.get('distritoCalidad', ''),
        # 'x_studio_calle_jr_av': claim.get('CalleJrAvCalidad', ''),
        # #'x_studio_numero_contacto': claim.get('numerocalidad', ''),
        # 'x_studio_codigo': claim.get('codigoReportePrevioCalidad', ''),
        #opcion 3
        # 'x_studio_detalle_condicin_': claim.get('detalleCondicionIncumplimiento', ''),
        # 'x_studio_fecha_de_incumplimiento_1': claim.get('fechaIncumplimiento', ''),
        # 'x_studio_detalle_oferta_promocin_brindada': claim.get('detalleOfertaIncumplimiento', ''),
        # 'x_studio_oportunidad_en_el_cual_se_brindo_la_oferta_o_promocin': claim.get('oportunidadBrindoOfertaIncumplimiento', ''),
        # 'x_studio_fecha_aproximada_1': claim.get('fechAproximadaIncumplimiento', ''),
        # 'x_studio_detalle_condicin_': claim.get('detalleCondicionIncumplimiento', ''),
        # #'x_studio_canal_oferta_promocion': claim.get('cbpromocion', ''),
        # 'x_studio_especificar_canal': claim.get('especificarIncumplimiento', ''),
        # 'x_studio_cdigo_de_oferta_o_promocin': claim.get('codigOtorgamientoIncumplimiento', ''),
        # 'x_studio_fecha_se_presento_incumplimiento': claim.get('fechaCualPincumplimiento', ''),
        # 'x_studio_detalles_atributos_descontando': claim.get('detalleOfertaIncumplimiento', ''),
        # 'x_studio_oportunidad_brindo_informacin_inexacta': claim.get('oportunidadBrindoOfertaIncumplimiento', ''),
        # #'x_studio_fecha_presento_incumplimiento': claim.get('fechAproximadaIncumplimiento', ''),
        # 'x_studio_canal_oferta_promocion': claim.get('cbpromocionfs', ''),
        # #'x_studio_fecha_presento_incumplimiento': claim.get('fechaCualPincumplimiento', ''),
        # 'x_studio_detalles_atributos_descontando': claim.get('detalleAtributosIncumplimiento', ''),
        # 'x_studio_recibo_correspondiente_al_periodo': claim.get('reciboCorrespondienteIncumplimiento', ''),
        # 'x_studio_fecha_de_emisin_del_recibo': claim.get('fechaEmisionIncumplimineto', ''),
        # 'x_studio_numero_de_recibo_tres': claim.get('numeroRecivoIncumplimiento', ''),
        # 'x_studio_fecha_de_vencimiento_6': claim.get('fechavencimientoIncumplimineto', ''),
        
        # #Servicio
        # #'x_studio_detalle_condicin_': claim.get('detalleCondicionIncumplimiento', ''),
        # #'x_studio_detalle_condicin_': claim.get('detalleCondicionIncumplimiento', ''),
        # 'x_studio_fecha_de_inicio_del_problema': claim.get('fechaServicio', ''),
        # 'x_studio_direccin_problema': claim.get('direccionServicio', ''),
        # 'x_studio_departamento_fs': claim.get('departamentoServicio', ''),
        # 'x_studio_provincia_fs': claim.get('provinciaServicio', ''),
        # 'x_studio_distrito_fs': claim.get('distritoServicio', ''),
        # 'x_studio_calle_jr_av_fs': claim.get('calleJrAvServicio', ''),
        # 'x_studio_numero_de_servicio': claim.get('numeroServicio', ''),
        # 'x_studio_constancias_de_lugar_de_trabajo': claim.get('adrecibos', ''),
        # 'x_studio_adjuntar_documento': claim.get('adjuntarVinculo', ''),
        # 'x_studio_fecha_que_corresponda_reactivar_el_servicio': claim.get('fechaReactivarServicio', ''),
        # 'x_studio_fecha_de_pago_pendiente': claim.get('fechaPagoPendiente', ''),
        # 'x_studio_lugar_medio_de_pago': claim.get('mpagos', ''),
        # 'x_studio_especificar_medio_pago': claim.get('especificarMedioPago', ''),
        # 'x_studio_adjunta_recibo_pendiente': claim.get('adrecibosPendiente', ''),
        # 'x_studio_vinculo_de_documento_adjuntado_1': claim.get('vinculoAdjuntarSolicitud', ''),
        # 'x_studio_fecha_que_se_ejecuto_el_cambio_sim_card': claim.get('fechaSIMCARD', ''),


        # # Instalacion
        # 'x_studio_fecha_de_contratacin_de_servicio': claim.get('fechaContratacionServicioInstalacion', ''),
        # 'x_studio_fecha_de_la_solicitud_de_traslado': claim.get('fechaSolicitudTrasladoInstalacion', ''),
        # 'x_studio_canal_solicitud_traslado': claim.get('strasladoe', ''),
        # 'x_studio_especificar_canal_2': claim.get('especificarCanalSinstalacion', ''),
        # 'x_studio_codigo_de_pedido': claim.get('codigoPedidoII', ''),
        # 'x_studio_se_adjunta_solicitud': claim.get('adsOpcionTraslado', ''),
        # 'x_studio_vinculo_de_documento_adjuntado': claim.get('avsInstalacionII', ''),
        # 'x_studio_fecha_de_la_contratacin_o_solicitud_de_trabajo': claim.get('fechaContratacionSInstalacion', ''),
        # 'x_studio_canal_de_presentacin': claim.get('ctopcionCinco', ''),
        # 'x_studio_especificar_canal_3': claim.get('especificarInstalacion', ''),
        # 'x_studio_cdigo_de_pedido_2': claim.get('codigoPedidoInstalacion', ''),
        # 'x_studio_adjuntar_solicitud_1': claim.get('opcionCuatroTraslado', ''),
        # 'x_studio_vinculo_del_documento_adjuntando': claim.get('adjuntarSolicitudInstalacion', ''),
        # 'x_studio_monto_pendiente': claim.get('montoPendienteInstalacion', ''),

        # # Baja
        # 'x_studio_fecha_de_la_solicitud_de_baja': claim.get('fechaSolicitudBaja', ''),
        # 'x_studio_canal_presentacin_baja': claim.get('cbaja', ''),
        # 'x_studio_especificar_canal_baja': claim.get('especificarCanalBaja', ''),
        # 'x_studio_cdigo_de_pedido': claim.get('codigoPedidoBaja', ''),
        # 'x_studio_adjuntar_solicitud': claim.get('asb', ''),
        # 'x_studio_vinculo_del_documento_2': claim.get('adjuntarVinculoSolicitudBaja', ''),
        # 'x_studio_fecha_de_solicitud_de_suspensin_1': claim.get('fechaSolicitudSuspensionBaja', ''),
        # 'x_studio_canal_traslado': claim.get('ctraslado', ''),
        # 'x_studio_especificar_canal_1': claim.get('especificarCanalTraslado', ''),
        # 'x_studio_cdigo_de_pedido_1': claim.get('cPedidoBaja', ''),
        # 'x_studio_adjuntar_solicitud_suspensin': claim.get('asT', ''),
        # 'x_studio_vinculo_del_documento_1': claim.get('vinculoHojaSolicitud', ''),
        # 'x_studio_datos_de_los_recibos_cuestionados': claim.get('datosRecibosCuestionadoBaja', ''),
        # 'x_studio_numero_de_recibo_1': claim.get('numeroReciboBaja', ''),
        # 'x_studio_fecha_de_emisin_3': claim.get('fechaEmisionBaja', ''),
        # 'x_studio_fecha_de_vencimiento_3': claim.get('fechaVencimientoBaja', ''),
        # 'x_studio_monto_reclamado_3': claim.get('montoReclamadoBaja', ''),
        # # Contratacion
        # 'x_studio_detalle_adicional_no_solicitada': claim.get('detalleServicioAdicional', ''),
        # 'x_studio_detalle_paquete_desconoce': claim.get('detallePaquete', ''),
        # 'x_studio_datos_recibos_cuestionados': claim.get('datosRecibomrContatacion', ''),
        # 'x_studio_numero_de_recibo_no_solicitada': claim.get('numeroReciboContratacion', ''),
        # 'x_studio_fecha_de_emisin_5': claim.get('fechaEmisionContratacion', ''),
        # 'x_studio_fecha_de_vencimiento_5': claim.get('fechaVencimientoContratacion', ''),
        # 'x_studio_monto_reclamado_no_solicitud': claim.get('montoReclamadoContratacion', ''),
        # # Migracion
        # 'x_studio_fecha_de_solicitud_de_migracin_1': claim.get('fechaSolicitudMigracionX', ''),
        # 'x_studio_canal_solicitud_de_migracin': claim.get('cmigracion', ''),
        # 'x_studio_especificar_canal_de_solicitud': claim.get('especificarCanalMigracion', ''),
        # 'x_studio_codigo_pedido_migracion': claim.get('codigoPedidoMigracion', ''),
        # 'x_studio_plan_tarifario_solicita_migrar': claim.get('planTarifarioMigracion', ''),
        # 'x_studio_motivo_de_la_negativa': claim.get('motivoNegativaMigracion', ''),
        # 'x_studio_adjunta_solicitud_de_migracins': claim.get('asm', ''),
        # 'x_studio_vinculo_de_la_solicitud_de_migracin': claim.get('vinculoSolicitudMigracion', ''),
        # 'x_studio_numero_recibo': claim.get('numeroReciboMigracionII', ''),
        # 'x_studio_fecha_de_emisin_2': claim.get('fechaEmisionMigracionIII', ''),
        # 'x_studio_fecha_de_movimiento': claim.get('fechaMovimientoMigracion', ''),
        # 'x_studio_monto_reclamado_1': claim.get('montoReclamadoMigracion', ''),
        # 'x_studio_numero_de_recibo_migracion': claim.get('numeroReciboII', ''),
        # 'x_studio_fecha_emisin': claim.get('fechaEmisionII', ''),
        # 'x_studio_fecha_de_vencimiento_2': claim.get('fechaVencimientoMigracionII', ''),
        # 'x_studio_numero_de_recibo_migracion': claim.get('numeroReciboMigracion', ''),
        # 'x_studio_fecha_de_vencimiento_migracin_1': claim.get('fechaEmisionMigracion', ''),
        # 'x_studio_fecha_de_vencimiento_migracin': claim.get('fechaVencimientoMigracion', ''),
        # 'x_studio_monto_reclamado_migracion': claim.get('montoReclamadoMigracion', ''),
        # # Otros
        # 'x_studio_fecha_de_la_solicitud_de_contratacion': claim.get('fechaSolicitudX', ''),
        # 'x_studio_canal_solicitud_de_contratacion': claim.get('especificarx', ''),
        # 'x_studio_servicio_que_desea_contratar': claim.get('servicioContratarX', ''),
        # 'x_studio_plan_tarifario_que_desea_contratar': claim.get('planTarifarioX', ''),
        # 'x_studio_numero_de_recibo_x': claim.get('numeroReciboX', ''),
        # 'x_studio_fecha_de_emisin_4': claim.get('fechaEmisionX', ''),
        # 'x_studio_fecha_de_vencimiento_4': claim.get('fechaVencimientoX', ''),
        # 'x_studio_mes_recibo_pendiente_entrega_x': claim.get('mesReciboPentregaX', ''),
        # 'x_studio_direccin_para_notificacin_x': claim.get('direccionFisicaX', ''),
        # 'x_studio_fecha_solicitud_facturacin_x': claim.get('fechaSolicitudFacturacionX', ''),
        # 'x_studio_canal_presentacin_solicitud_facturacion': claim.get('cpresentacion', ''),
        # 'x_studio_especificar_canal_x': claim.get('especificarCanalX', ''),
        # 'x_studio_cdigo_de_pedido_x': claim.get('codigoPedidoX', ''),
        # 'x_studio_se_adjunta_la_solicitud_x': claim.get('sasfll', ''),
        # #'x_studio_vinculo_de_documento_adjuntados': claim.get('vinculoSolicitudX', ''),
        # 'x_studio_detalle_condicin_': claim.get('vinculoSolicitudSX', ''),
        # 'x_studio_detalle_pedido_x': claim.get('detallePedidoX', ''),


        #Apelacion
        'x_studio_detalle_de_la_apelacin':claim.get('apelacionOpciones',''),
        'x_studio_detalle_pruebas_apelacion_uno':claim.get('detallePruebaApelacionUno',''),
        'x_studio_detalle_falta_sustentacion_apelacion_dos':claim.get('detallefsApelacionDos',''),
        'x_studio_materia_empresa_comunicarse':claim.get('materiaEmpresaApelacionTres',''),
        'x_studio_respuesta_empresa_apelacion_cuatro':claim.get('apelacionopcioncuatro',''),
        'x_studio_numero_recibo_apelacion_cinco':claim.get('numeroReciboApelacionSiCuatro',''),
        'x_studio_fecha_de_emision':recibir_fecha(claim.get('fechaEmisionApelacionSiCuatro','')),
        'x_studio_fecha_de_vencimiento':recibir_fecha(claim.get('fechaVencimientoApelacionSiCuatro','')),
        'x_studio_monto_reclamado_apelacion_cinco':claim.get('montoReclamadoApelacionSiCuatro',''),
        'x_studio_pronunciamiento_empresa_ape_cuatro':claim.get('detalleReclamoApelacionSiCuatro',''),
        'x_studio_falto_acoger_ape_cinco':claim.get('apelacionOpcioncinco',''),
        'x_studio_nmero_recibo_apleacion_cinco':claim.get('numeroReciboApelacionSiCinco',''),
        'x_studio_fecha_de_emisin_1':recibir_fecha(claim.get('fechaEmisionApelacionSiCinco','')),
        'x_studio_monto_total_corresponde_cinco':claim.get('montoTotalApelacionSiCinco',''),
        'x_studio_detalle_extremo_apelacion_cinco':claim.get('detalleReclamoApelacionSiCinco',''),
        'x_studio_materia_cual_empresa_ape_seis':claim.get('materiaEmpresaEmitirApelacionSeis',''),

        # #Queja
        # 'x_studio_detalle_de_la_queja':claim.get('quejasOpciones',''),
        # 'x_studio_fecha_presentacin_reclamo_queja_uno':format_date(claim.get('fechaPresentacionQueja','')),
        # 'x_studio_negativa_relacionada_queja_dos':claim.get('negativaQueja',''),
        # 'x_studio_char_field_2bo_1ibhijmmb':format_date(claim.get('fechaNegativaQueja','')),
        # 'x_studio_canal_presentacin_reclamo_queja_dos':claim.get('canalPresentacion',''),
        # 'x_studio_canal_especificado_queja_dos':claim.get('canalQueja',''),
        # 'x_studio_medios_probatorios':claim.get('adjuntaPrueba',''),
        # 'x_studio_vinculo_del_documento':claim.get('mediosProbatoriosQuejas',''),
        # 'x_studio_fecha_suspendido_servicio_queja_tres':format_date(claim.get('fechaSuspendioServicioQueja','')),
        # 'x_studio_medio_de_cobranza_queja_cuatro':claim.get('MediosCobranzasQuejas',''),
        # 'x_studio_se_adjunta_documento_queja_cuatro':claim.get('constanciaPagoQueja',''),
        # 'x_studio_vinculo_de_documento':claim.get('constanciaPagoFile',''),
        # 'x_studio_lugar_donde_permiti_pago_cinco':claim.get('pagoCuentaQueja',''),
        # 'x_studio_especificar_quejas':claim.get('espeficiarQueja',''),
        # 'x_studio_adjunta_prueba_cinco':claim.get('capturaQuejaCinco',''),
        # 'x_studio_medios_probatorios_1':claim.get('mediosProbatoriosQuejas',''),
        # 'x_studio_adjunta_medios_probatorios_x_seis':claim.get('dtramitacion',''),
        # 'x_studio_vinculo_de_medios_probatorios':claim.get('mediosProbatiosQuejaSeis',''),

    }

    try:
        new_claim = models.execute_kw(db, uid, password, 'helpdesk.ticket', 'create', [body])
        
        # Intenta obtener el código del nuevo reclamo
        get_code = models.execute_kw(db, uid, password, 'helpdesk.ticket', 'read', [new_claim],
                                      {'fields': ['x_studio_nro_ticket_reclamo']})

        claim_code = get_code[0].get('x_studio_nro_ticket_reclamo')
        get_subject = f"Código de reclamo: {claim_code}" if claim_code else "Reclamo creado sin código."

        return jsonify({'subject': get_subject, 'request_code': claim_code}), 201
    
    except Exception as e:
        print(f"Error al crear el reclamo: {str(e)}")  # Ayuda a depurar
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)