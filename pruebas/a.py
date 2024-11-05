@app.route('/api/reclamos', methods=['POST'])
def add_claim():
    claim = request.json

    fields = models.execute_kw(db, uid, password, 'helpdesk.ticket', 'fields_get', [],
                               {'attributes': ['string', 'type']})
    body = {
        'name': claim['client_name'],  #
        'x_studio_nombre_cliente': claim['client_name'],  #
        'x_studio_nro_documento': claim['doc_num'],  #
        'x_studio_canal_id': 48,
        'ticket_type_id': getDiagnosticoAACC(claim['ticket_type']),  # n o hay
        'x_studio_diagnostico_aacc_id': claim['ticket_type'], #valor de la pregunta
        'x_studio_observacion_aacc': claim['observation'],
        'x_studio_direccion': claim['address'],
        'x_studio_departamento': claim['department'],
        'x_studio_provincia': claim['province'],
        'x_studio_distrito': claim['district'],
        'x_studio_tipo_reclamo': condicion(claim['claimer_type']),
        'x_studio_nro_contacto': claim['contactNumber'],
        'x_studio_correo': claim['email'],
        'x_studio_servicio_adquirido': claim['serviceAcquired'],
        'x_studio_tipo_doc': claim['doc_type'],
        'x_studio_tipo_referencia': claim['referenceType'],
        'x_studio_nro_doc_represen': claim['represent_doc_num'],
        'x_studio_tipo_doc_represen': claim['represent_doc_type'],
        'x_studio_nombre_represen': claim['represent_name'],
        'x_studio_tipo_de_problema': claim['reclamMaterie'],  # no esta
        'x_studio_num_servicio': claim['service_num'],
        'x_studio_materia_reclamable': claim['materie'],
        'x_studio_nombre_social': claim['social_name']
    }
    new_claim = models.execute_kw(db, uid, password, 'helpdesk.ticket', 'create', [body])
    print("Nuevo ID de reclamo creado:", new_claim)
    get_code = models.execute_kw(db, uid, password, 'helpdesk.ticket', 'read', [new_claim],
                                       {'fields': ['x_studio_nro_ticket_reclamo',
                                                   'x_studio_cdigo_de_queja',
                                                   'x_studio_codigo_de_apelacin']})

    claim_code = get_code[0]['x_studio_nro_ticket_reclamo'] if get_code else None
    complaint_code = get_code[0]['x_studio_cdigo_de_queja'] if get_code else None
    appeal_code = get_code[0]['x_studio_codigo_de_apelacin'] if get_code else None

    get_subject = ''
    request_code = ''

    if claim_code:
        get_subject = f"Código de reclamo: {claim_code}"
        request_code = claim_code
    elif complaint_code:
        get_subject = f"Código de queja: {complaint_code}"
        request_code = complaint_code
    elif appeal_code:
        get_subject = f"Código de apelación: {appeal_code}"
        request_code = appeal_code
    return jsonify({'message': "Reclamo agregado correctamente", 'id': new_claim,
                    'Código de Solicitud': request_code}), 201