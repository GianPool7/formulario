// Función para convertir un archivo a base64
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result.split(',')[1]);  // Devuelve solo la parte base64
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

// consumiendo api

// Consumir la API y llenar múltiples selects con tipos de documento
async function cargarTiposDeDocumento() {
    // Lista de IDs de todos los selects que deben ser llenados
    const selectIDs = ['tipodocumentoidentidad', 'tipoDoc'];

    try {
        const respuesta = await fetch('https://app-externos.fiberpro.com.pe/api/get_identification_type', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
    
        if (!respuesta.ok) {
            throw new Error(`Error al obtener datos: ${respuesta.status}`);
        }
    
        const tipos = await respuesta.json();
    
        // Llenar cada select por su ID
        selectIDs.forEach(id => {
            const select = document.getElementById(id);
            if (!select) return;
        
            // Limpiar opciones actuales
            select.innerHTML = '<option value="">Seleccione un tipo de documento</option>';
        
            // Agregar nuevas opciones
            tipos.forEach(tipo => {
                const opcion = document.createElement('option');
                opcion.value = tipo.id;         // Ajusta si el campo es diferente
                opcion.textContent = tipo.name; // Ajusta si el campo es diferente
                select.appendChild(opcion);
            });
        });
    
    } catch (error) {
        console.error('Error al cargar tipos de documento:', error);
    
        // Mostrar mensaje de error en cada select
        selectIDs.forEach(id => {
            const select = document.getElementById(id);
            if (!select) return;
            select.innerHTML = '<option value="">Error al cargar</option>';
        });
    }
}
// Ejecutar al cargar la página
cargarTiposDeDocumento();

// consumiendo la api de distritos
async function cargarDistritos() {
    const selects = [
        document.getElementById('distritos'),
        document.getElementById('distritoCalidad'), // Nuevo campo
        document.getElementById('distritofs') // Nuevo campo
    ];
    try {
        const respuesta = await fetch(`https://app-externos.fiberpro.com.pe/api/get_district/${128}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!respuesta.ok) {
            throw new Error(`Error al obtener distritos: ${respuesta.status}`);
        }
        const distritos = await respuesta.json();
        selects.forEach(select => {
            select.innerHTML = '<option value="">Seleccionar Opción</option>';
            distritos.forEach(distrito => {
                const opcion = document.createElement('option');
                opcion.value = distrito.value;
                opcion.textContent = distrito.label;
                select.appendChild(opcion);
            });
        });
    } catch (error) {
        console.error('Error al cargar distritos:', error);
        selects.innerHTML = '<option value="">Error al cargar distritos</option>';
    }
}
// cargar distritos
cargarDistritos()

// para buscar cliente
//consumiendo la api de dni

function buscarcliente() {
    const numeroIngresado = document.getElementById("numDoc").value.trim();
    if (!numeroIngresado) {
        document.getElementById('campo-numero-doc').style.display = "block";
        return;
    }
    const url = `https://app-externos.fiberpro.com.pe/api/get_contacts/${numeroIngresado}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Documento no encontrado");
            }
            return response.json();
        })
        .then(data => {
            if (!data.exists || !data.partner) {
                alert("No se encontró un contacto con ese número.");
                return;
            }
            const partner = data.partner;
            const order = data.orders[0] || {};
            const fullName = (partner.name || '').trim();
            const nameParts = fullName.split(/\s+/);
            const apellidos = nameParts.slice(0, 2).join(' ');
            const nombres = nameParts.slice(2).join(' ');
            document.getElementById("apellidos").value = apellidos;
            document.getElementById("name").value = nombres;
            document.getElementById("numeroContacto").value = partner.phone || '';
            document.getElementById("direccion").value = partner.street || '';
            document.getElementById("correo").value = partner.email || '';
        })
        .catch(error => {
            console.error("Error al consultar la API:", error);
            alert("Hubo un error al buscar el contacto.");
        });
}

// fin de api

// cambiando los tipos de datos a numericos

const montoTarifa = document.getElementById('montoTarifa')
montoTarifa.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// datos de servicio
document.addEventListener("DOMContentLoaded", () => {
const numero_servicio_apelacion = document.getElementById("numeroServicioApelacion");
    numero_servicio_apelacion.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

// fin de cambio de tipos de datos numericos

// enviando los ids
const tipo_ticket = document.getElementById("tipoticket")
const tipo_user = document.getElementById("tipo-user")

// sequence
const content_sequencia=document.getElementById("sequence-data")
content_sequencia.style.display="none"
const select_type_claim=document.getElementById("select-type-claim")
const title_type_select=document.getElementById("title_type_select")
const select_type_user=document.getElementById("select-type-user")
const title_type_user=document.getElementById("title_type_user")
const datos_personales_sequence=document.getElementById("datos-personales")
const materia_reclamo_sequence=document.getElementById("materia-reclamo")
const datos_servicio_sequence=document.getElementById("dato-servicio")
const preguntas_sequence=document.getElementById("preguntas")
const descargo_cliente_sequence=document.getElementById("descargo-cliente")
const content_finalizar=document.getElementById("finalizar")
select_type_claim.style.display="none"
select_type_user.style.display="none"
datos_personales_sequence.style.display="none"
materia_reclamo_sequence.style.display="none"
datos_servicio_sequence.style.display="none"
preguntas_sequence.style.display="none"
descargo_cliente_sequence.style.display="none"
content_finalizar.style.display="none"

// contenedor de las cajas Reclamo-Queja-Apelacion
const content_claim_complaint_appeal = document.getElementById("contenedorOpcionesQRA")
// contenedor de las cajas Abonado-Usuario-Representante
const content_suscriber_user_representative = document.getElementById("content-susbcriber-user-Representative")

// contenedor de validacion
const validation = document.getElementById('validation')
const susbcriber_date = document.getElementById("subscriber-date")
const susbcriber_content = document.getElementById("validation-subscriber")
const type_user = document.getElementById("type-user")
const txt_content_facturacion_abonado=document.getElementById("content-facturacion-abonado")


// caja de datos personales
const questions_datos_personales = document.getElementById("content-datos")
const cp_representative = document.getElementById("cp-representatives")
const rs_representative = document.getElementById("rs-representatives")
const data_user_datos_personales=document.getElementById("family-user")


// para seleccionar el tipo de reclamo - queja - apelacion
// titulo
const title_reclamo_queja_apelacion_elegida=document.getElementById("title-rqa-elegida")
const select_appeal = document.getElementById("select-apelacion")
const select_claim = document.getElementById("select-reclamo")
const select_complaint = document.getElementById("select-queja")
// contenedor de los select
const content_materia_selection=document.getElementById("content-materia-selection")

// caja de los botones despues de los select
const btnapelacionmateria=document.getElementById("materiaApelacionbtn")
const btnquejamateria=document.getElementById("materiaQuejabtn")
const btnreclamomateria=document.getElementById("materiaReclamobtn")
btnapelacionmateria.style.display="none"
btnquejamateria.style.display="none"
btnreclamomateria.style.display="none"

// APELACION
// contenedor de data_apelacion
const data_content_apelacion = document.getElementById('data-content-apelacion');
//
const appeal_options = document.getElementById("apelacionOpciones")
const data_appeal = document.getElementById("data-service-appeal")
// campos de datos de servicio
const data_service_appeal_complaint=document.getElementById("data-service-complaint-appeal")
// el id del tipo 
let idApelacion = null;
let idQueja = null;
// fin de apelacion

// contenedor de Datos de servicio
const materia_elegida_datos_servicio=document.getElementById("materia-elegido-datos-servicio")

// titulo para los datos de servicios
const data_title_servicie=document.getElementById("data-service-title")
const data_select_complaint=document.getElementById("select-claim-complaint")
const data_claim = document.getElementById("data-service-claim")
const data_servicie_complete=document.getElementById("data-service-complete")

// contenedor de los botones de datos de servicio
const btn_content_cargar=document.getElementById("content-btn-cargar")
btn_content_cargar.style.display="none"
// botones para continuar despues de datos de servicio
const btn_apelacion=document.getElementById("cargar-apelacion")
const btn_queja=document.getElementById("cargar-queja")
const btn_reclamo=document.getElementById("cargar-reclamo")

btn_apelacion.style.display="none"
btn_queja.style.display="none"
btn_reclamo.style.display="none"

// los botones para pasar a preguntas y respuestas
const next_apelacion=document.getElementById("seguir-apelacion")
const next_queja=document.getElementById("seguir-queja")
const next_reclamo=document.getElementById("seguir-reclamo")


// obteniendo el check de la barra de sequencia
const check_type_user=document.getElementById("check-type-user")
const check_datos_personales=document.getElementById("check-datos-personales")
const check_datos_servicio=document.getElementById("check-datos-servicio")
const check_materia=document.getElementById("check-materia")
const check_preguntas_respuestas=document.getElementById("check-preguntas")
const check_descargo_cliente=document.getElementById("check-descargo-cliente")
const check_finalizar=document.getElementById("check-finalizar")

// contenedor de descargo de cliente
const content_descargo_cliente=document.getElementById("contents-descargo-cliente")
content_descargo_cliente.style.display="none"
// poniendo el titulo de la 2da caja de descargo de cliente
const title_descargo_cliente=document.getElementById("title-descargo-cliente")


// QUEJA
// contenedor de las preguntas de queja
const data_content_queja = document.getElementById('data-content-queja');
// PALABRAS RESERVADAS PARA QUEJA
const complaint_options = document.getElementById("quejasOpciones")


// funcion para limpiar campos
function limpiarCampos(container) {
    const campos = container.querySelectorAll("input, select");
    campos.forEach(campo => {
        campo.value = "";
    });
}

//

//RECLAMO
//contenedor de las preguntas de reclamo
const data_content_reclamo=document.getElementById("data-content-reclamo")
//
const claim_options = document.getElementById("matter-claim")
// especificacion de reclamo elegido
const claim_one = document.getElementById("fc")
const claim_two = document.getElementById("cs")
const claim_three = document.getElementById("op")
const claim_four = document.getElementById("fs")
const claim_five = document.getElementById("ia")
const claim_six = document.getElementById("sus")
const claim_seven = document.getElementById("ct")
const claim_eigth = document.getElementById("mi")
const claim_x = document.getElementById("xma")
// opciones de claim
const claim_one_options = document.getElementById("facturados")
// el id de tipo de reclamo
let idReclamo = null;
let idReclamoEscogido = null;

// para sedes
// obteniendo el id de las sedes

const sedes_ica_lima=document.getElementById("sedes-ica-lima").value
const distritos_icas=document.getElementById("distritos-ica")
const distritos_lima=document.getElementById("distritos-lima")

// para la identificaciones
const identificacion_ica_lima=document.getElementById("identificacion-lima")
const identificacion_ica_ica=document.getElementById("identificacion-ica")

if (sedes_ica_lima==="1") {
    distritos_icas.style.display="none";
    distritos_lima.style.display="flex";
    identificacion_ica_lima.style.display="flex";
    identificacion_ica_ica.style.display="none";
}else if (sedes_ica_lima==="2") {
    distritos_lima.style.display="none";
    distritos_icas.style.display="flex";
    identificacion_ica_ica.style.display="flex";
    identificacion_ica_lima.style.display="none";
}

// longitud maxima del campo numero de documento de identidad
 
const numDocIcaInput = document.getElementById("numDoc-ica");
numDocIcaInput.disabled=true;

function tipoDocIca() {
    
    const tipoDoc = document.getElementById("tipoDoc-ica").value;

    numDocIcaInput.disabled=false;

    switch (tipoDoc) {
        case "DNI":
            numDocIcaInput.maxLength = 8;
            break;
        case "Pasaporte":
            numDocIcaInput.maxLength = 12;
            break;
        case "C.E.":
            numDocIcaInput.maxLength = 12;
            break;
        case "RUC":
            numDocIcaInput.maxLength = 11;
            break;

        default:
            numDocIcaInput.maxLength = 0;
            numDocIcaInput.disabled=true;
            break;
    }
}

// la longitud del numero telefonico


// para validar el correo electronico
const correoInput = document.getElementById("correo");
const msgCorreo = document.getElementById("campo-correo");

correoInput.addEventListener("input", function () {
    const correo = correoInput.value.trim();

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo)) {
        msgCorreo.style.display = "block";
        correoInput.classList.add("input-error");
    } else {
        msgCorreo.style.display = "none";
        correoInput.classList.remove("input-error");
    }
});



// realizando funciones

// funcion para que se limpie todo los inputs
function limpiarFormulario() {
  const campos = document.querySelectorAll('input, select, textarea');

  campos.forEach(campo => {
    switch (campo.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
      case 'date':         // ✅ Aquí se limpia type="date"
      case 'textarea':
        campo.value = '';
        break;
      case 'checkbox':
      case 'radio':
        campo.checked = false;
        break;
      case 'select-one':
      case 'select-multiple':
        campo.selectedIndex = 0; // Primer option
        break;
    }
  });
}


// sequence
// funcion para desactivar el check


function togglePaso(id, activar = false) {
  const icon = document.getElementById(id);
  if (!icon) return;

  if (activar) {
    icon.classList.remove("fa-regular", "fa-circle");
    icon.classList.add("fa-solid", "fa-circle-check");
  } else {
    icon.classList.remove("fa-solid", "fa-circle-check");
    icon.classList.add("fa-regular", "fa-circle");
  }
}

// Seleccionar todos los elementos con la clase contenedor-caja-sequencia
const cajas = document.querySelectorAll('.contenedor-caja-sequencia');

cajas.forEach((caja)=>{
    caja.addEventListener("click",()=>{
        const paso = parseInt(caja.dataset.index);
        
        // Si el paso no tiene el check verde, no permitir
        if (!caja.querySelector('i').classList.contains('fa-circle-check') && paso > currentStep) {
            return; 
        }

        switch (caja.dataset.index) {
        case "1":
            content_claim_complaint_appeal.style.display="flex"
            content_suscriber_user_representative.style.display="none"
            content_sequencia.style.display="none"
            // los datos de validacion
            validation.style.display="none"
            // los datos personales
            questions_datos_personales.style.display="none"
            // configuracion del type user
            // para quitar el nombre en el tipo de usuario
            // para el nombre que aparece en la sequence de type-user
            title_type_user.textContent="Escojer"
            // check de type_user
            // check_type_user.classList.remove("fa-solid", "fa-circle-check");
            // check_type_user.classList.add("fa-regular", "fa-circle");
            // materia elegida y datos de servicio
            materia_elegida_datos_servicio.style.display="none"
            // boton de continuar con la apelacion-queja-reclamo
            btn_apelacion.style.display="none"
            btn_queja.style.display="none"
            btn_reclamo.style.display="none"
            // para ocultar las politicas y privacidad
            politicas.style.display="none"
            // funcion para limpiar todos los datos
            limpiarFormulario();
            break;
        case "2":
            content_suscriber_user_representative.style.display="flex"
            // para los checks
            togglePaso("check-type-user", false);
            togglePaso("check-datos-personales", false);
            togglePaso("check-materia", false);
            togglePaso("check-datos-servicio", false);
            togglePaso("check-preguntas", false);
            togglePaso("check-descargo-cliente", false);
            togglePaso("check-finalizar", false);
            // los datos de validacion
            validation.style.display="none"
            // los datos personales
            questions_datos_personales.style.display="none"
            // para el nombre que aparece en la sequence de type-user
            title_type_user.textContent="Escojer"
            // materia elegida y datos de servicio
            materia_elegida_datos_servicio.style.display="none"
            // // datos personales 
            // check_datos_personales.classList.remove("fa-solid", "fa-circle-check");
            // check_datos_personales.classList.add("fa-regular", "fa-circle");
            // boton de continuar con la apelacion-queja-reclamo
            btn_apelacion.style.display="none"
            btn_queja.style.display="none"
            btn_reclamo.style.display="none"
            // para ocultar las politicas y privacidad
            politicas.style.display="none"
            // funcion para limpiar todos los datos
            limpiarFormulario();
            break;
        case "3":
            // para los checks
            togglePaso("check-materia", false);
            togglePaso("check-datos-servicio", false);
            togglePaso("check-preguntas", false);
            togglePaso("check-descargo-cliente", false);
            togglePaso("check-finalizar", false);
            // para mostrar los datos personales
            questions_datos_personales.style.display="block"
            // materia elegida y datos de servicio
            // ocultar los datos de servicio y la materia elegida
            materia_elegida_datos_servicio.style.display="none"
            //
            data_servicie_complete.style.display="none"
            // boton de continuar con la apelacion-queja-reclamo
            btn_apelacion.style.display="none"
            btn_queja.style.display="none"
            btn_reclamo.style.display="none"
            // para ocultar el descargo del cliente
            content_descargo_cliente.style.display="none"
            // para ocultar las politicas y privacidad
            politicas.style.display="none"
            // para ocultar las preguntas despues de escojer la opcion
            data_content_queja.style.display="none"
            // para ocultar las rpegutnas de reclamo
            data_content_reclamo.style.display="none"
            break;
        case "4":

            // funcion para desactivar el check 
            togglePaso("check-datos-servicio", false);
            togglePaso("check-preguntas", false);
            togglePaso("check-descargo-cliente", false);
            togglePaso("check-finalizar", false);
            // materia elegida y datos de servicio
            // ocultar los datos de servicio y la materia elegida
            content_materia_selection.style.display="block"
            // ocultar los datos de servicio
            data_servicie_complete.style.display="none"
            // ocultando los datos de apelacion
            data_content_apelacion.style.display="none"
            //
            btn_content_cargar.style.display="none"
            // para ocultar el descargo del cliente
            content_descargo_cliente.style.display="none"
            // para ocultar las politicas y privacidad
            politicas.style.display="none"
            // para ocultar las preguntas despues de escojer la opcion
            data_content_queja.style.display="none"
            //
            materia_elegida_datos_servicio.style.display="block"
            // para ocultar las rpegutnas de reclamo
            data_content_reclamo.style.display="none"
            break;
        case "5":
    
            // para los checks
            togglePaso("check-preguntas", false);
            togglePaso("check-descargo-cliente", false);
            togglePaso("check-finalizar", false);
            //
            console.log(typeof(tipo_ticket.value));
            // para seleccionar
            content_materia_selection.style.display="none"
            // para mostrar los datos de servicio
            data_servicie_complete.style.display="block"
            // para mostrar todo , lo de datos y servicio
            materia_elegida_datos_servicio.style.display="block"
            // ocultando los datos de apelacion
            data_content_apelacion.style.display="none"
            // boton de continuar con la apelacion-queja-reclamo

            if (tipo_ticket.value==1) {
                btn_reclamo.style.display="block"
            }if(tipo_ticket.value==2){
                btn_queja.style.display="block"
            }if (tipo_ticket.value==3) {
                btn_apelacion.style.display="block"
            } else {
                
            }

            // para ocultar el descargo del cliente
            content_descargo_cliente.style.display="none"
            // para ocultar las politicas y privacidad
            politicas.style.display="none"
            //
            btn_content_cargar.style.display="flex"
            //
            data_content_queja.style.display="none"
            // para ocultar las rpegutnas de reclamo
            data_content_reclamo.style.display="none"
            break;
        case "6":
            // para los checks
            togglePaso("check-descargo-cliente", false);
            togglePaso("check-finalizar", false);
            //
            if (tipo_ticket.value==1) {
                // materia elegida y datos de servicio
                // ocultar los datos de servicio y la materia elegida
                materia_elegida_datos_servicio.style.display="none"
            }if (tipo_ticket.value==2){
                // para mostrar todo el contenedor de las preguntas de queja
                data_content_queja.style.display="block"
            }if (tipo_ticket.value==3){
                // para mostrar los contenedor de las preguntas  apelacion
                data_content_apelacion.style.display="block"
                next_apelacion.style.display="block"
            }

            // boton de continuar con la apelacion-queja-reclamo
            btn_apelacion.style.display="none"
            btn_queja.style.display="none"
            btn_reclamo.style.display="none"
            // para ocultar el descargo del cliente
            content_descargo_cliente.style.display="none"
            // para ocultar las politicas y privacidad
            politicas.style.display="none"
            // para ocultar el descargo del cliente
            content_descargo_cliente.style.display="none"
            // para ocultar el boton de continuar
            btn_content_cargar.style.display="none"
            // para ocultar las rpegutnas de reclamo
            data_content_reclamo.style.display="none"
            break;
        case "7":
            // para los checks
            togglePaso("check-finalizar", false);
            // para mostrar el descargo del cliente
            content_descargo_cliente.style.display="flex"
            // materia elegida y datos de servicio
            // ocultar los datos de servicio y la materia elegida
            materia_elegida_datos_servicio.style.display="none"
            // boton de continuar con la apelacion-queja-reclamo
            btn_apelacion.style.display="none"
            btn_queja.style.display="none"
            btn_reclamo.style.display="none"
            // para ocultar las politicas y privacidad
            politicas.style.display="none"
            // para ocultar las preguntas cuando estan en descargo del cliente
            data_content_apelacion.style.display="none"
            // para ocultar las rpegutnas de reclamo
            data_content_reclamo.style.display="none"
            break;
        case "8":
            
            break;
        default:
            break;
        }
    })
})




/* para mostrar el ticket de reclamos , con el codigo */

// CAJA PARA MOSTRAR EL CODIGO
const caja_code=document.getElementById("code")
caja_code.style.display="none"

/* fin del ticker */

// contenedor de cajas
// reclamos
const claim = document.getElementById("reclamo").addEventListener('click', () => {
    // title_calim_complaint_appeal.textContent = "Reclamo"
    // content_title_claim_complaint_appeal.style.display = "flex"
    // //
    // content_suscriber_user_representative.style.display = "flex"
    // tipo de ticket reclamo - queja - apelacion
    tipo_ticket.value = 1
    // contenedor de secuencia
    // titulo para la secuencia
    select_type_claim.style.display="flex"
    content_sequencia.style.display="flex"
    title_type_select.textContent="Reclamo"
    // contenedor de las cajas reclamos - queja -apelacion
    content_claim_complaint_appeal.style.display = "none"
    // contenedor de abonado - usuario - representante
    content_suscriber_user_representative.style.display = "flex"
    // para mostrar el boton de reclamos, despues del select
    btnreclamomateria.style.display="block"
})

// queja
const complaint = document.getElementById("queja").addEventListener('click', () => {
    // content_claim_complaint_appeal.style.display = "none"
    // title_calim_complaint_appeal.textContent = "Queja"
    // content_title_claim_complaint_appeal.style.display = "flex"
    // //
    // //
    // content_suscriber_user_representative.style.display = "flex"
    // tipo de ticket reclamo - queja - apelacion
    tipo_ticket.value = 2
    // contenedor de secuencia
    // titulo para la secuencia
    select_type_claim.style.display="flex"
    content_sequencia.style.display="flex"
    title_type_select.textContent="Queja"
    // contenedor de las cajas reclamos - queja -apelacion
    content_claim_complaint_appeal.style.display = "none"
    // contenedor de abonado - usuario - representante
    content_suscriber_user_representative.style.display = "flex"
    // para mostrar el boton de quejas, despues del select
    btnquejamateria.style.display="block"
})

// apelacion
const appeal = document.getElementById("apelacion").addEventListener('click', () => {
    // content_claim_complaint_appeal.style.display = "none"
    // title_calim_complaint_appeal.textContent = "Apelación"
    // content_title_claim_complaint_appeal.style.display = "flex"
    // //
    // content_suscriber_user_representative.style.display = "flex"
    // tipo de ticket reclamo - queja - apelacion
    tipo_ticket.value = 3
    // contenedor de secuencia
    // titulo para la secuencia
    select_type_claim.style.display="flex"
    content_sequencia.style.display="flex"
    title_type_select.textContent="Apelacion"
    // contenedor de las cajas reclamos - queja -apelacion
    content_claim_complaint_appeal.style.display = "none"
    // contenedor de abonado - usuario - representante
    content_suscriber_user_representative.style.display = "flex"
    // para mostrar el boton de apelacion
    btnapelacionmateria.style.display="block"
})

// contenedor de cajas de abonado - usuario - representante

// para las cajas de validacion
// abonado = susbcriber
const susbcriberquestion = document.getElementById("abonado").addEventListener("click", () => {
    // // alert("hola mundo")
    // validation.style.display = "block"
    // user_content.style.display = "none"
    // susbcriber_content.style.display = "block"
    // susbcriber_date.style.display = "flex"
    // type_user.style.display = "none"
    // // para el titulo de la parte legal
    // title_type_user.textContent = "ABONADO"
    // // para el campo de familiar
    // // el titulo del tipo de usuario esta oculto pero despues de escojer se muestra
    // title_suscriber_user_representative.style.display = "flex"
    // // despues de escojer una opcion se oculta el contenedor de usuario-abonado-representante
    // content_suscriber_user_representative.style.display = "none"
    // // titulo escogido
    // title_user.textContent = "Abonado"
    // id que se manda al back
    tipo_user.value = 1
    // para ocultar las cajas de abaonado - usuario - apelacion
    content_suscriber_user_representative.style.display = "none"
    // contenedor de sequence
    // titulo de la sequencia
    content_sequencia.style.display="flex"
    select_type_user.style.display="flex"
    title_type_user.textContent="Abonado"
    // contenedor de validacion
    validation.style.display="block"
    susbcriber_content.style.display = "block"
    susbcriber_date.style.display = "flex"
    type_user.style.display="none"
    txt_content_facturacion_abonado.style.display="none"
    // datos personales - primero tiene que validar y de ahi mostrar lo otro
    questions_datos_personales.style.display="none"
    data_user_datos_personales.style.display="none"
    // para ponerle check a la caja pero para tipo de usuario
    check_type_user.classList.add("fa-solid", "fa-circle-check");
    check_type_user.classList.remove("fa-regular", "fa-circle");

})

// usuario = user
const userquestion = document.getElementById("usuario").addEventListener("click", () => {
    // type_user.style.display = "flex"
    // validation.style.display = "block"
    // susbcriber_date.style.display = "none"
    // susbcriber_content.style.display = "none"
    // user_content.style.display = "block"
    // title.textContent = "USUARIO"
    // // para el campo de familiar
    // data_user_datos_personales.style.display="flex"
    // // el titulo del tipo de usuario esta oculto pero despues de escojer se muestra
    // //
    // title_suscriber_user_representative.style.display = "flex"
    // // despues de escojer una opcion se oculta el contenedor de usuario-abonado-representante
    // content_suscriber_user_representative.style.display = "none"
    // // titulo de la opcion elegida
    // title_user.textContent = "Usuario"
    // id que se manda al back
    tipo_user.value = 2
    // para ocultar las cajas de abaonado - usuario - apelacion
    content_suscriber_user_representative.style.display = "none"
    // contenedor de sequence
    // titulo de la sequencia
    content_sequencia.style.display="flex"
    select_type_user.style.display="flex"
    title_type_user.textContent="Usuario"
    // contenedor de datos de validacion
    validation.style.display = "block"
    susbcriber_date.style.display = "none"
    susbcriber_content.style.display = "none"
    type_user.style.display="flex"
    txt_content_facturacion_abonado.style.display="flex"
    // datos personales - primero tiene que validar y de ahi mostrar lo otro
    questions_datos_personales.style.display="none"
    data_user_datos_personales.style.display="flex"
    // datos personales
    questions_datos_personales.style.display="none"
    cp_representative.style.display="none"
    rs_representative.style.display="none"
    // para ponerle check a la caja pero para tipo de usuario
    check_type_user.classList.add("fa-solid", "fa-circle-check");
    check_type_user.classList.remove("fa-regular", "fa-circle");
})

// cuando es representante
const representante = document.getElementById("representante").addEventListener("click", () => {
    // validation.style.display = "none"
    // questions_datos_personales.style.display = "block"
    // cp_representative.style.display = "block"
    // rs_representative.style.display = "block"
    // // despues de escojer una opcion se oculta el contenedor de usuario-abonado-representante
    // content_suscriber_user_representative.style.display = "none"
    // // el titulo del tipo de usuario esta oculto pero despues de escojer se muestra
    // title_suscriber_user_representative.style.display = "flex"
    // // titulo de la opcion elegida
    // title_user.textContent = "Representante"
    // id que se manda al back
    tipo_user.value = 3
    // para ocultar las cajas de abaonado - usuario - apelacion
    content_suscriber_user_representative.style.display = "none"
    // contenedor de sequence
    // titulo de la sequencia
    content_sequencia.style.display="flex"
    select_type_user.style.display="flex"
    title_type_user.textContent="Representante"
    // validacion no es necesario cuando es representante
    validation.style.display = "none"
    // datos personales
    questions_datos_personales.style.display="block"
    data_user_datos_personales.style.display="none"
    cp_representative.style.display="block"
    rs_representative.style.display="block"
    // para ponerle check a la caja pero para tipo de usuario
    check_type_user.classList.add("fa-solid", "fa-circle-check");
    check_type_user.classList.remove("fa-regular", "fa-circle");
})

// validar los usuario 
function validarDatosPersonales() {
    let isValidData = true;
    // Obtener valores actualizados dentro de la función
    const tipodocumentoidentidadvalida = document.getElementById("tipodocumentoidentidad").value.trim();
    const numDocIdentidad = document.getElementById("numerodocumentoidentidad").value.trim();
    const montoTarifa = document.getElementById("montoTarifa").value.trim();
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const direccionFacturacion = document.getElementById("direccionFacturacion").value.trim();
    // Campos del bloque "validation-subscriber" para tipo 1
    const fechaemisionva = document.getElementById("fechaEmisionDocumentoIdentidad").value.trim();
    const nombrePadre = document.getElementById("nombrePadre").value.trim();
    const nombreMadre = document.getElementById("nombreMadre").value.trim();
    const lugarNacimiento = document.getElementById("lugarNacimiento").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;

    // Ocultar todos los mensajes de error antes de validar
    const errores = document.querySelectorAll(".msg-error");
    errores.forEach(error => error.style.display = "none");

    // Validación para tipo 2 (puedes cambiar según necesites)
    if (tipo_user.value === "2") {
        if (tipodocumentoidentidadvalida === "") {
            document.getElementById("error-tipo-doc-identidad").style.display = "block";
            isValidData = false;
        }
        if (numDocIdentidad === "") {
            document.getElementById("error-num-doc").style.display = "block";
            isValidData = false;
        }
        if (montoTarifa === "") {
            document.getElementById("error-monto").style.display = "block";
            isValidData = false;
        }
        if (fechaVencimiento === "") {
            document.getElementById("error-fecha-vencimiento").style.display = "block";
            isValidData = false;
        }
        if (direccionFacturacion === "") {
            document.getElementById("error-direccion-facturacion").style.display = "block";
            isValidData = false;
        }
    }

    if (tipo_user.value === "1") {
        if (fechaemisionva === "") {
            document.getElementById("error-fecha-emision").style.display = "block";
            isValidData = false;
        }
        if (numDocIdentidad === "") {
            document.getElementById("error-num-doc").style.display = "block";
            isValidData = false;
        }
        if (nombrePadre === "") {
            document.getElementById("error-nombre-padre").style.display = "block";
            isValidData = false;
        }
        if (nombreMadre === "") {
            document.getElementById("error-tipo-doc-madre").style.display = "block";
            isValidData = false;
        }
        if (lugarNacimiento === "") {
            document.getElementById("error-lugar-nacimiento").style.display = "block";
            isValidData = false;
        }
        if (fechaNacimiento === "") {
            document.getElementById("error-fecha-nacimiento").style.display = "block";
            isValidData = false;
        }
    }

    // Avanzar solo si todo está OK
    if (isValidData) {
        // Suponiendo que estas variables existen y están bien definidas en tu código
        validation.style.display = "none";
        questions_datos_personales.style.display = "block";
    }
}
// fin validar usuarios

// validando si son de abonado, usuario , representante
function validarCamposGenerales() {
    const esLima = sedes_ica_lima === "1";
    const campos = esLima 
        ? ['tipoDoc', 'numDoc', 'name', 'apellidos', 'numeroContacto', 'distritos', 'direccion', 'correo']
        : ['tipoDoc-ica', 'numDoc-ica', 'name', 'apellidos', 'numeroContacto', 'direccion', 'correo'];

    let esValido = true;

    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (!campo) {
            console.warn(`No se encontró el campo con id: ${id}`);
            esValido = false;
            return; // salta al siguiente
        }

        const error = campo.parentElement.querySelector('.msg-error');
        const valor = campo.value?.trim() ?? '';

        if (!valor) {
            esValido = false;
            if (error) error.style.display = 'block';
        } else {
            if (error) error.style.display = 'none';
        }
    });

    return esValido;
}

function validarCamposAutorizacion() {
    const si = document.getElementById("autoriza_si");
    const no = document.getElementById("autoriza_no");
    const error = document.getElementById("campo-autorizacion");
    if (!si.checked && !no.checked) {
        error.style.display = "block";
        return false;
    }
    error.style.display = "none";
    return true;
}

function validarCamposTipoUsuario() {
    if (type_user !== 9) return true;
    let esValido = true;
    const razon = document.getElementById('razonsocial');
    const errorRazon = document.getElementById('campo-razon-social');
    if (!razon.value.trim()) {
        errorRazon.style.display = 'block';
        esValido = false;
    } else {
        errorRazon.style.display = 'none';
    }
    return esValido;
}

/* para mostrar segunt el tipo de ticket */
function mostrarSeccionPorTipoTicket() {
    materia_elegida_datos_servicio.style.display="block"
    btn_content_cargar.style.display="flex"
    switch (tipo_ticket.value) {
        case "1":
            select_claim.style.display = 'flex';
            title_reclamo_queja_apelacion_elegida.textContent="Materia Reclamable"
            break;
        case "2":
            select_complaint.style.display = 'flex';
            title_reclamo_queja_apelacion_elegida.textContent="Objecto de la Queja"
            break;
        case "3":
            select_appeal.style.display = 'flex';
            title_reclamo_queja_apelacion_elegida.textContent="Apelacion Especifica"
            break;
    }
}

document.getElementById("validarFormularioContinuar").addEventListener("click", () => {
    const isValid = validarCamposGenerales() && validarCamposAutorizacion() && validarCamposTipoUsuario();
    if (isValid) {
        questions_datos_personales.style.display="none"
        datos_personales_sequence.style.display="flex"
        mostrarSeccionPorTipoTicket()
        // el check de los datos de personales
        check_datos_personales.classList.remove("fa-regular", "fa-circle");
        check_datos_personales.classList.add("fa-solid", "fa-circle-check");
        // content de los select
        content_materia_selection.style.display="flex"
    }
});


//apelacion

// funcion para mostrar y ocultar los campos y limpiar
function show_data_service_appeal() {
    // para configurar datos de servicio
    data_select_complaint.style.display="none"
    data_claim.style.display="none"
    data_servicie_complete.style.display="block"
    // contenedor de datos de servicio
    btn_content_cargar.style.display="flex"
    btn_apelacion.style.display="flex"
    //
    console.log(tipo_ticket.value);
    //
 
}
function hidden_data_service() {
    data_servicie_complete.style.display="none"
    // Limpiar todos los campos dentro de la sección
    const campos = data_servicie_complete.querySelectorAll("input, select,date");
    campos.forEach(campo => {
        if (campo.type === "radio" || campo.type === "checkbox") {
            campo.checked = false;
        } else if (campo.tagName === "SELECT") {
            campo.selectedIndex = 0;
        } else {
            campo.value = "";
        }
    });
}
// funciones para las materias de apelaciones
function apelacion() {
    switch (appeal_options.value) {
        case "apelacionOne":
            idApelacion = 6;
            break;
        case "apelacionTwo":
            idApelacion = 1;
            break;
        case "apelacionThree":
            idApelacion = 2;
            break;
        case "apelacionFour":
            idApelacion = 3;
            break;
        case "apelacionFive":
            idApelacion = 4;
            // para el boton de seguir de apelacion
            next_apelacion.style.display="none"
            break;
        case "apelacionSix":
            idApelacion = 5;
            // para el boton de seguir de apelacion
            next_apelacion.style.display="none"
            break;
        case "ninguno":
            content_materia_selection.style.display="block"
            break;
        default:
            break;
    }
    // componentes para la sequence
    content_materia_selection.style.display="none"
    materia_reclamo_sequence.style.display="flex"
    // para los checks
    check_materia.classList.add("fa-solid", "fa-circle-check");
    check_materia.classList.remove("fa-regular", "fa-circle");
    //
    if (appeal_options.value!="ninguno") {
        data_title_servicie.textContent="DATOS DE SERVICIO APELACIÓN"
        show_data_service_appeal();
    }else{
        data_title_servicie.textContent=""
        hidden_data_service()
        content_materia_selection.style.display="block"
    }
}
// el select de apelacion
const apelacionoOne=document.getElementById("apelacionUno")
const apelacionoTwo=document.getElementById("apelacionDos")
const apelacionoThree=document.getElementById("apelacionTres")
const apelacionoFour=document.getElementById("apelacionCuatro")
const apelacionoFive=document.getElementById("apelacionCinco")
const apelacionoSix=document.getElementById("apelacionSeis")
function pestañaApelacion() {
    apelacionoOne.style.display="none"
    apelacionoTwo.style.display="none"
    apelacionoThree.style.display="none"
    apelacionoFour.style.display="none"
    apelacionoFive.style.display="none"
    apelacionoSix.style.display="none"
    // para quitar el display none
    data_content_apelacion.style.display = 'block'; // o 'flex', según cómo quieras mostrarlo
    // para mostrar en la secuencia
    datos_servicio_sequence.style.display="flex"
    // ocultando los datos de servicio
    data_servicie_complete.style.display="none"
    //
    // para los checks
    check_datos_servicio.classList.add("fa-solid", "fa-circle-check");
    check_datos_servicio.classList.remove("fa-regular", "fa-circle");
    //
    btn_content_cargar.style.display="none"
    switch (idApelacion) {
        case 1:
            apelacionoOne.style.display="block"
            limpiarCampos(apelacionoOne);
            break;
        case 2:
            apelacionoTwo.style.display="block"
            limpiarCampos(apelacionoTwo);
            break;
        case 3:
            apelacionoThree.style.display="block"
            limpiarCampos(apelacionoThree);
            break;
        case 4:
            apelacionoFour.style.display="block"
            limpiarCampos(apelacionoFour);
            break;
        case 5:
            apelacionoFive.style.display="block"
            limpiarCampos(apelacionoFive);
            break;
        case 6:
            apelacionoSix.style.display="block"
            limpiarCampos(apelacionoSix);
            break;
        default:
            break;
    }
}
function continuarApelacion() {
    // contenido de las cajas de descargo cliente
    content_descargo_cliente.style.display="flex"
    // contenido de la data de apelacion
    data_content_apelacion.style.display="none"
    // menu 
    preguntas_sequence.style.display="flex"
    // para darle check a la opcion
    check_preguntas_respuestas.classList.remove("fa-regular", "fa-circle");
    check_preguntas_respuestas.classList.add("fa-solid", "fa-circle-check");
    // poniendo el titulo a la 2da caja
    title_descargo_cliente.textContent="Sustento de apelación"
}
const politicas=document.getElementById("politicas-privacidad")
politicas.style.display="none"
function apelacionCuatro() {
    const apelacionCuatroSiNo=document.getElementById("apelacionopcioncuatro").value
    //
    const apelacionCuatroSi=document.getElementById("apelacionCuatroSi")
    switch (apelacionCuatroSiNo) {
        case "si":
            apelacionCuatroSi.style.display="block"
            next_apelacion.style.display="block"
            break;
        case "no": 
            apelacionCuatroSi.style.display="none"
            next_apelacion.style.display="block"
            break;
        default:
            apelacionCuatroSi.style.display="none"
            next_apelacion.style.display="none"
            break;
    }
}
function apelacionCinco() {
    const apelacionCincoSiNo=document.getElementById("apelacionOpcioncinco").value
    //
    const apelacionCincoSi=document.getElementById("apelacionCincoSi")
    switch (apelacionCincoSiNo) {
        case "si":
            apelacionCincoSi.style.display="block"
            next_apelacion.style.display="block"
            break;
        case "no": 
            apelacionCincoSi.style.display="none"
            next_apelacion.style.display="block"
            break;
        case "":
            apelacionCincoSi.style.display="none"
            next_apelacion.style.display="none"
            break;
        default:
            break;
    }
}
function continuarpoliticas() {
    // mostrar descargo del cliente en la sequencia
    descargo_cliente_sequence.style.display="flex"
    // mostrart las policitcas
    politicas.style.display="block"
    content_descargo_cliente.style.display="none"
    // para iconos
    check_descargo_cliente.classList.remove("fa-regular", "fa-circle");
    check_descargo_cliente.classList.add("fa-solid", "fa-circle-check");
}
