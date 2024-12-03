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
        }

    elif tipoticket == '7':
        model = 'apelacionfp'  # Cambiar a un modelo diferente si es Apelación
        ticket_data = {
            #
            'state':"draft",
            #
            'tipo_de_usuario_ape':data.get('tipoUsuarioSeleccionado'),
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
