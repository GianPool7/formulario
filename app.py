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
uid = 213
models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

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
        return None  # Si no es una fecha válida, devolvemos Non
    

@app.route('/api/reclamos', methods=['POST'])
def crear_reclamo():
    data = request.json

    # Lista de campos de fecha que necesitan validación
    fecha_fields = [
        # datos personales
        'fechaNacimiento','fechaVencimiento',

        # quejas fechas
        'fechaPresentacionQueja', 'fechaNegativaQueja', 'fechaSuspendioServicioQueja',
        'fechaOtroCampoFecha1', 'fechaOtroCampoFecha2',  # Añadir más campos de fecha
        # Puedes seguir agregando más campos aquí

        # apelaciones
        'fechaEmisionCartaApelacion',

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
        'selectApelacion',

        'empresaOperadoraApelacion',
        'servicioMateriaApelacion',
        'numeroServicioApelacion',
        'codigoNumeroApelacion',
        'numeroCartaApelacion',


    ]

    # Verificar que todos los campos requeridos estén presentes
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Determinar el tipo de ticket basado en 'tipoticket'
    tipoticket = data.get('tipoticket')

    # Cambiar el modelo según el valor de 'tipoticket'
    if tipoticket == '6':
        model = 'apelacionfp'  # Cambiar a un modelo diferente si es Queja
        ticket_data = {
#
            'state':"draft",
            #
            'tipo_de_usuario_ape':data.get('tipoUsuarioSeleccionado'),
            # datos personales
            # Validaciones de abonado
            # prueba
            'empresa_operadora_ds':data['empresaOperadoraApelacion'],
            'servicio_materia_de_apelacin_ds':data['servicioMateriaApelacion'],
            'nmero_servicio_reclamado_ds':data['numeroServicioApelacion'],
            'cdigo_nmero_reclamo_ds':data['codigoNumeroApelacion'],
            'nmero_carta_resuelve_reclamo_ds':data['numeroCartaApelacion'],

        }
    else:
        model = 'default_model'  # Modelo por defecto para casos no especificados

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
