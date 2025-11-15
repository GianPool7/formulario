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
const btnapelacion=document.getElementById("materiaApelacionbtn")
const btnquejamateria=document.getElementById("materiaQuejabtn")
const btnreclamomateria=document.getElementById("materiaReclamobtn")
btnapelacion.style.display="none"
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
    if (campo.id === "sedes-ica-lima") return;

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
    btnapelacion.style.display="none"
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



// APELACIONES
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

/* Quejas */

const data_select_appeal=document.getElementById("select-appeal")
const title_select_complaint_appeal=document.getElementById("title-select-complaint-appeal")

// funcion para mostrar y ocultar los campos y limpiar
function show_data_service_complaint() {
    data_appeal.style.display="none"
    data_claim.style.display="none"
    data_servicie_complete.style.display="block"
    data_select_appeal.style.display="none"
    // PARA PONER TITULO al select
    title_select_complaint_appeal.textContent="Servicio objeto de la queja"
    // contenedor de datos de servicio
    btn_content_cargar.style.display="flex"
    btn_queja.style.display="flex"
}

function hidden_data_service_complaint() {
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

function quejas() {

    switch (complaint_options.value) {
        case "quejaSeis":
            idQueja = 6
            break;
        case "quejaUno":
            idQueja = 1
            break;
        case "quejaDos":
            idQueja = 2
            break;
        case "quejaTres":
            idQueja = 3
            break;
        case "quejaCuatro":
            idQueja = 4
            break;
        case "quejaCinco":
            idQueja = 5
            break;
        case "ninguna":
            break;
        default:
            break;
    }

    //
    // componentes para la sequence
    content_materia_selection.style.display="none"
    materia_reclamo_sequence.style.display="flex"
    // para los checks
    check_materia.classList.add("fa-solid", "fa-circle-check");
    check_materia.classList.remove("fa-regular", "fa-circle");

    //

    if (appeal_options.value!="ninguna") {
        data_title_servicie.textContent="DATOS DE SERVICIO QUEJA"
        show_data_service_complaint();
    }else{
        data_title_servicie.textContent=""
        hidden_data_service_complaint()
    }

}

// el select de queja
const quejaUno=document.getElementById("quejaPreguntaUno")
const quejaDos=document.getElementById("quejaPreguntaDos")
const quejaTres=document.getElementById("quejaPreguntaTres")
const quejaCuatro=document.getElementById("quejaPreguntaCuatro")
const quejaCinco=document.getElementById("quejaPreguntaCinco")
const quejaSeis=document.getElementById("quejaPreguntaSeis")

function pestañaQueja() {
    // //
    quejaUno.style.display="none"
    quejaDos.style.display="none"
    quejaTres.style.display="none"
    quejaCuatro.style.display="none"
    quejaCinco.style.display="none"
    quejaSeis.style.display="none"

    // para mostrar todo el contenedor de las preguntas de queja
    data_content_queja.style.display="block"
    // para ocultar los datos de servicio - contenido
    data_servicie_complete.style.display="none"
    // para ocultar los botones  de siguiente
    btn_content_cargar.style.display="none"
    btn_queja.style.display="none"    
    // para mostrar en la secuencia
    datos_servicio_sequence.style.display="flex"
    //checks
    check_datos_servicio.classList.add("fa-solid", "fa-circle-check");
    check_datos_servicio.classList.remove("fa-regular", "fa-circle");
    
    switch (idQueja) {
        case 1:
            quejaUno.style.display="flex"
            break;
        case 2:
            quejaDos.style.display="flex"
            break;
        case 3:
            quejaTres.style.display="flex"
            break;
        case 4:
            quejaCuatro.style.display="flex"
            break;
        case 5:
            quejaCinco.style.display="flex"
            break;
        case 6:
            quejaSeis.style.display="flex"
            break;
        default:
            break;
    }
}

function continuaQueja() {
    // contenido de las cajas de descargo cliente
    content_descargo_cliente.style.display="flex"
    // contenido de la data de apelacion
    data_content_queja.style.display="none"
    // menu 
    preguntas_sequence.style.display="flex"
    // para darle check a la opcion
    check_preguntas_respuestas.classList.remove("fa-regular", "fa-circle");
    check_preguntas_respuestas.classList.add("fa-solid", "fa-circle-check");
    // poniendo el titulo a la 2da caja
    title_descargo_cliente.textContent="Descripción del problema"
}

// pregunta dos

// queja-- canal de presentacion
function canal() {
    const canal_presentacion=document.getElementById("canalPresentacion").value
    const canal_presentacion_especificacion=document.getElementById("canalQueja")
    if (canal_presentacion==6) {
        canal_presentacion_especificacion.style.display="flex"
    }else{
        canal_presentacion_especificacion.style.display="none"
    }
}

// queja - adjunta prueba
function adjuntaPruebaQueja() {
    const adjuntar_prueba=document.getElementById("adjuntaPrueba").value
    const adjuntar_prueba_documento=document.getElementById("pruebaQuejas")
    if (adjuntar_prueba==="True") {
        adjuntar_prueba_documento.style.display="flex"
    }else{
        adjuntar_prueba_documento.style.display="none"
    }
}

// pregunta cuatro
function constanciaPago() {
    const constancia_pago_queja=document.getElementById("constanciaPagoQueja").value
    const adjunto_constancia=document.getElementById("constanciaPago")
    if (constancia_pago_queja==="True") {
        adjunto_constancia.style.display="flex"
    }else{
        adjunto_constancia.style.display="none"
    }
}

// PREGUNTA CINCO
function dptramitacion() {
    const pago_cuenta=document.getElementById("pagoCuentaQueja").value
    const otro_pago_cuenta=document.getElementById("dpagocuenta")
    if (pago_cuenta==="otros") {
        otro_pago_cuenta.style.display="flex"    
    }else{
        otro_pago_cuenta.style.display="none"
    }
}

function capturaQueja() {
    const pantalla_prueba=document.getElementById("capturaQuejaCinco").value
    const adjunta_pantalla_prueba=document.getElementById("mpQueja")
    if (pantalla_prueba==="True") {
        adjunta_pantalla_prueba.style.display="flex"
    }else{
        adjunta_pantalla_prueba.style.display="none"
    }
}

// la pregunta seis de queja
function defectos() {
    const adjunta_prueba=document.getElementById("dtramitacion").value
    const adjunta_prueba_documento=document.getElementById("dptramitacion")
    if (adjunta_prueba==="True") {
        adjunta_prueba_documento.style.display="flex"
    }else{
        adjunta_prueba_documento.style.display="none"
    }
}

/* PARA RECLAMOS  */

function reclamo() {
    switch (claim_options.value) {
        case "calidad":
            alert("Has seleccionado Calidad de Servicio");
            break;
    
        default:
            break;
    }
}



// para enviar el formulario
const enviarformulariocompleto=document.getElementById("enviarFormulario").addEventListener("click",()=>{
    // para iconos
    check_finalizar.classList.remove("fa-regular", "fa-circle");
    check_finalizar.classList.add("fa-solid", "fa-circle-check");
})


// para enviar el formulario
document.getElementById("claimForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // tipo de ticket - reclamo - queja  - apelacion
    const tipo_ticket = document.getElementById('tipoticket').value.trim();
    // tipo de usuario - abonado - queja - representante
    const tipo_user = document.getElementById('tipo-user').value.trim();


    // VALIDACION
    // datos de validacion abonado
    const nombrePadre = document.getElementById('nombrePadre').value.trim();
    const nombreMadre = document.getElementById('nombreMadre').value.trim();
    const lugarNacimiento = document.getElementById('lugarNacimiento').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const numeroDocumentIdentidad = document.getElementById('numerodocumentoidentidad').value.trim();
    const fechaEmisionDocumentoIdentidad = document.getElementById('fechaEmisionDocumentoIdentidad').value;
    // datos de validacion usuario
    const fechaVencimiento = document.getElementById('fechaVencimiento').value;
    const montoTarifa = document.getElementById('montoTarifa').value.trim();
    const direccionFacturacion = document.getElementById('direccionFacturacion').value.trim();
    const tipoDocumentoIdentidad = document.getElementById('tipodocumentoidentidad').value.trim();
    // FIN DE VALIDACION

    // DATOS PERSONALES
    const nombres = document.getElementById('name').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const relacion = document.getElementById('relacion').value.trim();
    const razonSocial = document.getElementById('razonsocial').value.trim();
    const numeroContacto = document.getElementById('numeroContacto').value.trim();
    const tipoDoc = document.getElementById('tipoDoc').value.trim();
    const numDoc = document.getElementById('numDoc').value.trim();
    const distritos = document.getElementById('distritos').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const correo = document.getElementById('correo').value.trim();

    const fileInput = document.getElementById('cartaPoder');
    const file = fileInput.files[0];  // Archivo de carta de poder
    let fileBase64 = "";
    // Solo convertimos a base64 si se selecciona un archivo
    if (file) {
        try {
            fileBase64 = await convertFileToBase64(file);
        } catch (error) {
            console.error('Error al convertir archivo de carta de poder:', error);
        }
    }

    // EL INPUT de autorizacion
    const radios = document.getElementsByName("autorizacion");
    // Loop through radios to find the selected one
    radios.forEach(radio => {
        if (radio.checked) {
            valorSeleccionado = radio.value;
            console.log("Valor seleccionado:", valorSeleccionado); // Access the value directly within the event
        }
    });

    const radioValue = document.querySelector('input[name="autorizacion"]:checked').value;
    let booleanValue = (radioValue === 'True');

    // Datos de facturación y cobro
    const numeroReciboFC = document.getElementById('numeroReciboFCone').value.trim();
    const numeroDocumentoCobroFC = document.getElementById('numeroDocumentoCobroFCone').value.trim();
    const fechaEmisionFC = document.getElementById('fechaEmisionFCone').value.trim();
    const fechaVencimientoFC = document.getElementById('fechavencimientoFCone').value.trim();
    const montoReclamadoFC = document.getElementById('montoReclamadoFCone').value.trim();
    const conceptoFacturadoFC = document.getElementById('conceptoFacturadoFCone').value.trim();
    const tarifaUsuarioFC = document.getElementById('tarifaUsuarioFCone').value.trim();
    const fechaEstimadaPagoFC = document.getElementById('fechaEstimadaPagoFCone').value.trim();
    const modalidadPagoFC = document.getElementById('mPago').value;
    const especificarModalidadPagoFC = document.getElementById('especificarModalidadPago').value.trim();
    const adjuntarHojaPagoFC = document.getElementById('hpfacturado').value.trim();

    const hojaDocumentoAdjuntada = document.getElementById('hojaPagoReclamo');
    const hojaDocumentadaFile = hojaDocumentoAdjuntada.files[0]; 

    let fileConstacia = "";
    if (hojaDocumentadaFile) {
        try {
            fileConstacia = await convertFileToBase64(hojaDocumentadaFile);
        } catch (error) {
            console.error('Error al convertir archivo de hoja de pago:', error);
        }
    }

    // // calidad
    const fechaInicioCalidadI = document.getElementById('fechaInicioCalidadI').value.trim();
    const direccionCalidadI = document.getElementById('direccionCalidadI').value.trim();
    const departamentoCalidadI = document.getElementById('departamentoCalidadI').value.trim();
    const provinciaCalidadI = document.getElementById('provinciaCalidadI').value.trim();
    const distritoCalidad = document.getElementById('distritoCalidad').value.trim();
    const calleJrAvCalidad = document.getElementById('CalleJrAvCalidad').value.trim();
    const codigoReportePrevioCalidad = document.getElementById('codigoReportePrevioCalidad').value.trim();
    // // incumplimiento
    const detalleCondicionIncumplimiento = document.getElementById('detalleCondicionIncumplimiento').value.trim();
    const fechaIncumplimientos = document.getElementById('fechaIncumplimiento').value;
    const detalleOfertaIncumplimiento = document.getElementById('detalleOfertaIncumplimiento').value.trim();
    const oportunidadBrindoOfertaIncumplimiento = document.getElementById('oportunidadBrindoOfertaIncumplimiento').value.trim();
    const fechAproximadaIncumplimiento = document.getElementById('fechAproximadaIncumplimiento').value;
    const cbpromocionfs = document.getElementById('cbpromocionfs').value.trim();
    const especificarIncumplimiento = document.getElementById('especificarIncumplimiento').value.trim();
    const codigOtorgamientoIncumplimiento = document.getElementById('codigOtorgamientoIncumplimiento').value.trim();
    const fechaCualPincumplimiento = document.getElementById('fechaCualPincumplimiento').value;
    const detalleAtributosIncumplimiento = document.getElementById('detalleAtributosIncumplimiento').value.trim();
    const reciboCorrespondienteIncumplimiento = document.getElementById('reciboCorrespondienteIncumplimiento').value.trim();
    const fechaEmisionIncumplimineto = document.getElementById('fechaEmisionIncumplimineto').value;
    const numeroRecivoIncumplimiento = document.getElementById('numeroRecivoIncumplimiento').value.trim();
    const fechavencimientoIncumplimineto = document.getElementById('fechavencimientoIncumplimineto').value;
    const oportunidadBrindoInfoOmitida = document.getElementById('oportunidadBrindoInfoOmitida').value;
    const fechaAproxInfoOmitida = document.getElementById('fechaAproxInfoOmitida').value;
    const detalleInfoOmitida=document.getElementById("detalleInfoOmitida").value
    const cnPromocionCuatro=document.getElementById("cnPromocionCuatro").value
    const especificarInfoOmitida=document.getElementById("especificarInfoOmitida").value
    
    // falta de servicio
    const fechaInicioProblemafs = document.getElementById('fechaInicioProblemafs').value;
    const direccionProblemafs = document.getElementById('direccionProblemafs').value;
    const direccionServicio = document.getElementById('direccionServicio').value;
    const departamentofs = document.getElementById('departamentofs').value;
    const provinciafs = document.getElementById('provinciafs').value;
    const distritofs = document.getElementById('distritofs').value;
    const calleJrAvfs = document.getElementById('calleJrAvfs').value;
    const numerofs = document.getElementById('numerofs').value;
    // // Recibo de servicios
    const adrecibos = document.getElementById('adrecibos').value;
    // // Fecha de reactivación del servicio
    const fechaReactivarServicio = document.getElementById('fechaReactivarServicio').value;
    // // Fecha de pago pendiente
    const fechaPagoPendiente = document.getElementById('fechaPagoPendiente').value;
    // // Lugar o medio del pago pendiente
    const mpagos = document.getElementById('mpagos').value;
    const especificarMedioPago = document.getElementById('especificarMedioPago').value;
    // // Recibo de pago pendiente
    const adrecibosPendiente = document.getElementById('adrecibosPendiente').value;
    // // Fecha del cambio de SIM Card
    const fechaSIMCARD = document.getElementById('fechaSIMCARD').value;
    const adjuntarVinculo = document.getElementById('adjuntarVinculo'); // Archivo adjunto
    const vinculoAdjuntarSolicitud = document.getElementById('vinculoAdjuntarSolicitud'); // Archivo adjunto

    const documentoAdjuntadofsOne=adjuntarVinculo.files[0];
    const documentoAdjuntadofsTwo=vinculoAdjuntarSolicitud.files[0];

    let documentoAdjuntadosFSI="";
    let documentoAdjuntadosFSII=""; 
    if (documentoAdjuntadofsOne) {
        try {
            documentoAdjuntadosFSI = await convertFileToBase64(documentoAdjuntadofsOne);
        } catch (error) {
            console.error('Error al convertir archivo de carta de poder:', error);
        }
    }

    if (documentoAdjuntadofsTwo) {
        try {
            documentoAdjuntadosFSII = await convertFileToBase64(documentoAdjuntadofsTwo);
        } catch (error) {
            console.error('Error al convertir archivo de hoja de pago:', error);
        }
    }

    // INSTALACIONES
    const fechaContratacionServicioInstalacion = document.getElementById('fechaContratacionServicioInstalacion').value;
    const fechaSolicitudTrasladoInstalacion = document.getElementById('fechaSolicitudTrasladoInstalacion').value;
    const strasladoe = document.getElementById('strasladoe').value;
    const especificarCanalSinstalacion = document.getElementById('especificarCanalSinstalacion').value;
    const codigoPedidoII = document.getElementById('codigoPedidoII').value;
    const adsOpcionTraslado = document.getElementById('adsOpcionTraslado').value;
    const fechaContratacionSInstalacion = document.getElementById('fechaContratacionSInstalacion').value;
    const ctopcionCinco = document.getElementById('ctopcionCinco').value;
    const especificarInstalacion = document.getElementById('especificarInstalacion').value;
    const codigoPedidoInstalacion = document.getElementById('codigoPedidoInstalacion').value;
    const opcionCuatroTraslado = document.getElementById('opcionCuatroTraslado').value;
    const montoPendienteInstalacion = document.getElementById('montoPendienteInstalacion').value;
    // ARCHIVOS DE INSTALACIONES
    const vinculoSolicitudReclamo = document.getElementById('vinculoSolicitudReclamo');
    const adjuntarSolicitudReclamoCuatro = document.getElementById('adjuntarSolicitudReclamoCuatro');
    const documentoSolicitudReclamo=vinculoSolicitudReclamo.files[0];
    const documentoSolicitudReclamoCuatro=adjuntarSolicitudReclamoCuatro.files[0];
    let documentoSRI="";
    let documentoSRII=""; 
    if (documentoSolicitudReclamo) {
        try {
            documentoSRI = await convertFileToBase64(documentoSolicitudReclamo);
        } catch (error) {
            console.error('Error al convertir archivo de carta de poder:', error);
        }
    }

    if (documentoSolicitudReclamoCuatro) {
        try {
            documentoSRII = await convertFileToBase64(documentoSolicitudReclamoCuatro);
        } catch (error) {
            console.error('Error al convertir archivo de hoja de pago:', error);
        }
    }

    //baja
    const fechaSolicitudBaja = document.getElementById('fechaSolicitudBaja').value;
    const cbaja = document.getElementById('cbaja').value;
    const especificarCanalBaja = document.getElementById('especificarCanalBaja').value;
    const codigoPedidoBaja = document.getElementById('codigoPedidoBaja').value;
    const asb = document.getElementById('asb').value;
    const fechaSolicitudSuspensionBaja = document.getElementById('fechaSolicitudSuspensionBaja').value;
    const ctraslado = document.getElementById('ctraslado').value;
    const especificarCanalTraslado = document.getElementById('especificarCanalTraslado').value;
    const cPedidoBaja = document.getElementById('cPedidoBaja').value;
    const asT = document.getElementById('asT').value;
    const datosRecibosCuestionadoBaja = document.getElementById('datosRecibosCuestionadoBaja').value;
    const numeroReciboBaja = document.getElementById('numeroReciboBaja').value;
    const fechaEmisionBaja = document.getElementById('fechaEmisionBaja').value;
    const fechaVencimientoBaja = document.getElementById('fechaVencimientoBaja').value;
    const montoReclamadoBaja = document.getElementById('montoReclamadoBaja').value;
    // archivos de baja
    const solicitudBajaReclamo = document.getElementById('solicitudBajaReclamo');
    const adjuntarVinculoSolicitud = document.getElementById('adjuntarVinculoSolicitud');

    const documentoBajaReclamo=solicitudBajaReclamo.files[0];
    const documentoBajaSolicitud=adjuntarVinculoSolicitud.files[0];
    let documentoBajaI="";
    let documentoBajaII="";
    if (documentoBajaReclamo) {
        try {
            documentoBajaI = await convertFileToBase64(documentoBajaReclamo);
        } catch (error) {
            console.error('Error al convertir archivo de carta de poder:', error);
        }
    }

    if (documentoBajaSolicitud) {
        try {
            documentoBajaII = await convertFileToBase64(documentoBajaSolicitud);
        } catch (error) {
            console.error('Error al convertir archivo de hoja de pago:', error);
        }
    }

    // contratacion
    const detalleServicioAdicional = document.getElementById('detalleServicioAdicional').value;
    const detallePaquete = document.getElementById('detallePaquete').value;
    const datosRecibomrContatacion = document.getElementById('datosRecibomrContatacion').value;
    const numeroReciboContratacion = document.getElementById('numeroReciboContratacion').value;
    const fechaEmisionContratacion = document.getElementById('fechaEmisionContratacion').value;
    const fechaVencimientoContratacion = document.getElementById('fechaVencimientoContratacion').value;
    const montoReclamadoContratacion = document.getElementById('montoReclamadoContratacion').value;

    // migracion
    const fechaSolicitudMigracionX = document.getElementById("fechaSolicitudMigracionX").value;
    const canalMigracion = document.getElementById("cmigracion").value;
    const especificarCanalMigracion = document.getElementById("especificarCanalMigracion").value;
    const codigoPedidoMigracion = document.getElementById("codigoPedidoMigracion").value;
    const planTarifarioMigracion = document.getElementById("planTarifarioMigracion").value;
    const motivoNegativaMigracion = document.getElementById("motivoNegativaMigracion").value;
    const solicitudAdjunta = document.getElementById("asm").value;
    const numeroReciboMigracionII = document.getElementById("numeroReciboMigracionII").value;
    const fechaEmisionMigracionIII = document.getElementById("fechaEmisionMigracionIII").value;
    const fechaMovimientoMigracion = document.getElementById("fechaMovimientoMigracion").value;
    const montoReclamadoMigracionMigracion = document.getElementById("montoReclamadoMigracionMigracion").value;
    const numeroReciboII = document.getElementById("numeroReciboII").value;
    const fechaEmisionII = document.getElementById("fechaEmisionII").value;
    const fechaVencimientoMigracionII = document.getElementById("fechaVencimientoMigracionII").value;
    const numeroReciboMigracion = document.getElementById("numeroReciboMigracion").value;
    const fechaEmisionMigracion = document.getElementById("fechaEmisionMigracion").value;
    const fechaVencimientoMigracion = document.getElementById("fechaVencimientoMigracion").value;
    const montoReclamadoMigracion = document.getElementById("montoReclamadoMigracion").value;
    // archivo de migracion
    const documentoSolicitudMigracionOne = document.getElementById("documentoSolicitudMigracionOne");
    const documentoMigracion=documentoSolicitudMigracionOne.files[0];
    let documentoMigracionI="";
    if (documentoMigracion) {
        try {
            documentoMigracionI = await convertFileToBase64(documentoMigracion);
        } catch (error) {
            console.error('Error al convertir archivo de hoja de pago:', error);
        }
    }

    // otros
    const fechaSolicitudX = document.getElementById('fechaSolicitudX').value;
    const ccontratacion = document.getElementById('ccontratacion').value;
    //const especificarx = document.getElementById('especificarx').value;
    const servicioContratarX = document.getElementById('servicioContratarX').value;
    const planTarifarioX = document.getElementById('planTarifarioX').value;
    const numeroReciboX = document.getElementById('numeroReciboX').value;
    const fechaEmisionX = document.getElementById('fechaEmisionX').value;
    const fechaVencimientoX = document.getElementById('fechaVencimientoX').value;
    const mesReciboPentregaX = document.getElementById('mesReciboPentregaX').value;
    const direccionFisicaX = document.getElementById('direccionFisicaX').value;
    const fechaSolicitudFacturacionX = document.getElementById('fechaSolicitudFacturacionX').value;
    const cpresentacion = document.getElementById('cpresentacion').value;
    const especificarCanalX = document.getElementById('especificarCanalX').value;
    const codigoPedidoX = document.getElementById('codigoPedidoX').value;
    const sasfll = document.getElementById('sasfll').value;
    const detallePedidoX = document.getElementById('detallePedidoX').value;
    // archivo 
    const vinculoSolicitudSX = document.getElementById('vinculoSolicitudSX');
    const documentoSolicitudX=vinculoSolicitudSX.files[0];
    let documentoX="";
    if (documentoSolicitudX) {
        try {
            documentoX = await convertFileToBase64(documentoSolicitudX);
        } catch (error) {
            console.error('Error al convertir archivo de hoja de pago:', error);
        }
    }


    // quejas
    // preguntas especificas
    const fechaPresentacionQueja = document.getElementById("fechaPresentacionQueja").value;
    const negativaQueja = document.getElementById("negativaQueja").value;
    const fechaNegativaQueja = document.getElementById("fechaNegativaQueja").value;
    const canalPresentacion = document.getElementById("canalPresentacion").value;
    const especificarCanalQuejaDos = document.getElementById("especificarCanalQuejaDos").value;
    const adjuntaPrueba = document.getElementById("adjuntaPrueba").value;
    const fechaSuspendioServicioQueja = document.getElementById("fechaSuspendioServicioQueja").value;
    const MediosCobranzasQuejas = document.getElementById("MediosCobranzasQuejas").value;
    //const constanciaPagoQueja = document.getElementById("constanciaPagoQueja").value;
    const pagoCuentaQueja = document.getElementById("pagoCuentaQueja").value;
    const espeficiarQueja = document.getElementById("espeficiarQueja").value;
    const dtramitacion = document.getElementById("dtramitacion").value;
    const capturaQuejaCinco=document.getElementById("capturaQuejaCinco").value;

    // booleanos
    let adjuntaPruebaBool = (adjuntaPrueba === 'True');
    //let constanciaPagoBool = (constanciaPagoQueja === 'True');
    let capturaQuejaBool = (capturaQuejaCinco === 'True');
    let tramitacionBool = (dtramitacion === 'True');
    

    // archivos de queja
    // Variables para los archivos de queja
    const medioProbatorioNegativa = document.getElementById("medioProbatorioNegativa");
    const constanciaPagoMedioCobranza = document.getElementById("constanciaPagoMedioCobranza");
    const medioProbatoriopgQueja = document.getElementById("medioProbatoriopgQueja");
    const medioProbatoriosTramitacion = document.getElementById("medioProbatoriosTramitacion");

    // Variables para los archivos de queja
    const mdprobatoriosQueja = medioProbatorioNegativa.files[0];
    const cstMedioCobranza = constanciaPagoMedioCobranza.files[0];
    const mdProbatorioQueja = medioProbatoriopgQueja.files[0];
    const mdProbatorioTramitacion = medioProbatoriosTramitacion.files[0];

    let mdQuejaUno = "";
    let mdQuejaDos = "";
    let mdQuejaTres = "";
    let mdQuejaCuatro = "";

    if (mdprobatoriosQueja) {
        try {
            mdQuejaUno = await convertFileToBase64(mdprobatoriosQueja);
        } catch (error) {
            console.error('Error al convertir archivo de carta de poder:', error);
        }
    }

    if (cstMedioCobranza) {
        try {
            mdQuejaDos = await convertFileToBase64(cstMedioCobranza);
        } catch (error) {
            console.error('Error al convertir archivo de carta de poder:', error);
        }
    }

    if (mdProbatorioQueja) {
        try {
            mdQuejaTres = await convertFileToBase64(mdProbatorioQueja);
        } catch (error) {
            console.error('Error al convertir archivo de carta de poder:', error);
        }
    }

    if (mdProbatorioTramitacion) {
        try {
            mdQuejaCuatro = await convertFileToBase64(mdProbatorioTramitacion);
        } catch (error) {
            console.error('Error al convertir archivo de carta de poder:', error);
        }
    }

    // fin de quejas

    // apelacion

    // datos del servicio
    const empresaOperadoraApelacion = document.getElementById("empresaOperadorReclamo").value;
    const servicioContratado=document.getElementById("servicioContratadoReclamo").value;
    const servicioMateriaApelacion = document.getElementById("servicioMateriaApelacion").value;
    
    const servicioMateriaReclamo = document.getElementById("servicioMateriaReclamo").value;
    const numeroServicioContratadoReclamo = document.getElementById("numeroServicioContratadoReclamo").value;

    const numeroServicioApelacion = document.getElementById("numeroServicioApelacion").value;
    const codigoNumeroApelacion = document.getElementById("codigoNumeroQueja").value;
    const numeroCartaApelacion = document.getElementById("numeroCartaApelacion").value;
    const fechaEmisionCartaApelacion = document.getElementById("fechaEmisionCartaApelacion").value;
    // enviar datos
    const detalle_apelacion_uno = document.getElementById("detalle_apelacion_uno").value;
    const detallefsApelacionDos = document.getElementById("detallefsApelacionDos").value;
    const materiaEmpresaApelacionTres = document.getElementById("materiaEmpresaApelacionTres").value;
    const apelacionopcioncuatro = document.getElementById("apelacionopcioncuatro").value;
    const numeroReciboApelacionSiCuatro = document.getElementById("numeroReciboApelacionSiCuatro").value;
    const fechaEmisionApelacionSiCuatro = document.getElementById("fechaEmisionApelacionSiCuatro").value;
    const fechaVencimientoApelacionSiCuatro = document.getElementById("fechaVencimientoApelacionSiCuatro").value;
    const montoReclamadoApelacionSiCuatro=document.getElementById("montoReclamadoApelacionSiCuatro").value
    const detalleReclamoApelacionSiCuatro = document.getElementById("detalleReclamoApelacionSiCuatro").value;
    const apelacionOpcioncinco = document.getElementById("apelacionOpcioncinco").value;
    const numeroReciboApelacionSiCinco = document.getElementById("numeroReciboApelacionSiCinco").value;
    const fechaEmisionApelacionSiCinco = document.getElementById("fechaEmisionApelacionSiCinco").value;
    const montoTotalApelacionSiCinco = document.getElementById("montoTotalApelacionSiCinco").value;
    const detalleReclamoApelacionSiCinco = document.getElementById("detalleReclamoApelacionSiCinco").value;
    const materiaEmpresaEmitirApelacionSeis = document.getElementById("materiaEmpresaEmitirApelacionSeis").value;
    
    // fin de apelacion

    // depurando
    console.log(detalle_apelacion_uno);
    console.log(detallefsApelacionDos);
    

    const data = {
        // tipo de ticket - reclamo - queja - apelacion
        tipo_ticket,
        // tipo de usuario
        tipo_user,
        // datos de validacion
        nombrePadre,
        nombreMadre,
        lugarNacimiento,
        fechaNacimiento,
        numeroDocumentIdentidad,
        fechaEmisionDocumentoIdentidad,
        //datos de validacion
        fechaVencimiento,
        montoTarifa,
        direccionFacturacion,
        tipoDocumentoIdentidad,

        cartaPoder: fileBase64,  // Será una cadena vacía si no se cargó un archivo
        nombre: nombres,
        apellidos,
        relacion,
        razonSocial,
        numeroContacto,
        tipoDoc,
        numDoc,
        distritos,
        direccion,
        correo,
        booleanValue,

        // reclamo
        idReclamo,
        idReclamoEscogido,
        // facturacion y cobro
        numeroReciboFC,
        numeroDocumentoCobroFC,
        fechaEmisionFC,
        fechaVencimientoFC,
        montoReclamadoFC,
        conceptoFacturadoFC,
        tarifaUsuarioFC,
        fechaEstimadaPagoFC,
        modalidadPagoFC,
        especificarModalidadPagoFC,
        adjuntarHojaPagoFC,
        hojaDocumentoAdjuntada:fileConstacia,
        // calidad
        fechaInicioCalidadI,
        direccionCalidadI,
        departamentoCalidadI,
        provinciaCalidadI,
        distritoCalidad,
        calleJrAvCalidad,
        codigoReportePrevioCalidad,
        //incumplimiento
        detalleCondicionIncumplimiento,
        fechaIncumplimientos,
        detalleOfertaIncumplimiento,
        oportunidadBrindoOfertaIncumplimiento,
        fechAproximadaIncumplimiento,
        cbpromocionfs,
        especificarIncumplimiento,
        codigOtorgamientoIncumplimiento,
        fechaCualPincumplimiento,
        detalleAtributosIncumplimiento,
        reciboCorrespondienteIncumplimiento,
        fechaEmisionIncumplimineto,
        numeroRecivoIncumplimiento,
        fechavencimientoIncumplimineto,
        oportunidadBrindoInfoOmitida,
        fechaAproxInfoOmitida,
        detalleInfoOmitida,
        cnPromocionCuatro,
        especificarInfoOmitida,
        // falta de servicio
        fechaInicioProblemafs,
        direccionProblemafs,
        direccionServicio,
        departamentofs,
        provinciafs,
        distritofs,
        calleJrAvfs,
        numerofs,
        adrecibos,
        fechaReactivarServicio,
        fechaPagoPendiente,
        mpagos,
        especificarMedioPago,
        adrecibosPendiente,
        fechaSIMCARD,
        adjuntarVinculo:documentoAdjuntadosFSI,
        vinculoAdjuntarSolicitud:documentoAdjuntadosFSII,
        // instalaciones
        fechaContratacionServicioInstalacion,
        fechaSolicitudTrasladoInstalacion,
        strasladoe,
        especificarCanalSinstalacion,
        codigoPedidoII,
        adsOpcionTraslado,
        fechaContratacionSInstalacion,
        ctopcionCinco,
        especificarInstalacion,
        codigoPedidoInstalacion,
        opcionCuatroTraslado,
        montoPendienteInstalacion,
        vinculoSolicitudReclamo:documentoSRI,
        adjuntarSolicitudReclamoCuatro:documentoSRII,
        //Baja
        fechaSolicitudBaja,
        cbaja,
        especificarCanalBaja,
        codigoPedidoBaja,
        asb,
        fechaSolicitudSuspensionBaja,
        ctraslado,
        especificarCanalTraslado,
        cPedidoBaja,
        asT,
        datosRecibosCuestionadoBaja,
        numeroReciboBaja,
        fechaEmisionBaja,
        fechaVencimientoBaja,
        montoReclamadoBaja,
        solicitudBajaReclamo:documentoBajaI,
        adjuntarVinculoSolicitud:documentoBajaII,
        // contratos
        detalleServicioAdicional,
        detallePaquete,
        datosRecibomrContatacion,
        numeroReciboContratacion,
        fechaEmisionContratacion,
        fechaVencimientoContratacion,
        montoReclamadoContratacion,
        // migracion
        fechaSolicitudMigracionX,
        canalMigracion,
        especificarCanalMigracion,
        codigoPedidoMigracion,
        planTarifarioMigracion,
        motivoNegativaMigracion,
        solicitudAdjunta,
        numeroReciboMigracionII,
        fechaEmisionMigracionIII,
        fechaMovimientoMigracion,
        montoReclamadoMigracionMigracion,
        numeroReciboII,
        fechaEmisionII,
        fechaVencimientoMigracionII,
        numeroReciboMigracion,
        fechaEmisionMigracion,
        fechaVencimientoMigracion,
        montoReclamadoMigracion,
        documentoSolicitudMigracionOne:documentoMigracionI,
        // x
        fechaSolicitudX,
        ccontratacion,
        servicioContratarX,
        planTarifarioX,
        numeroReciboX,
        fechaEmisionX,
        fechaVencimientoX,
        mesReciboPentregaX,
        direccionFisicaX,
        fechaSolicitudFacturacionX,
        cpresentacion,
        especificarCanalX,
        codigoPedidoX,
        sasfll,
        detallePedidoX,
        documentoSolicitudX:documentoX,




        //quejas
        idQueja,
        fechaPresentacionQueja,
        negativaQueja,
        fechaNegativaQueja,
        canalPresentacion,
        especificarCanalQuejaDos,
        medioProbatorioNegativa:mdQuejaUno,
        fechaSuspendioServicioQueja,
        MediosCobranzasQuejas,
        adjuntaPruebaBool,
        constanciaPagoMedioCobranza:mdQuejaDos,
        pagoCuentaQueja,
        espeficiarQueja,
        capturaQuejaBool,
        medioProbatoriopgQueja:mdQuejaTres,
        tramitacionBool,
        medioProbatoriosTramitacion:mdQuejaCuatro,



        // fin de quejas

        //apelacin,
        idApelacion,
        //datos extras
        empresaOperadoraApelacion,
        servicioContratado,
        servicioMateriaApelacion,
        servicioMateriaReclamo,
        numeroServicioContratadoReclamo,
        numeroServicioApelacion,
        codigoNumeroApelacion,
        numeroCartaApelacion,
        fechaEmisionCartaApelacion,
        // preguntas 
        detalle_apelacion_uno,
        detallefsApelacionDos,
        materiaEmpresaApelacionTres,
        apelacionopcioncuatro,
        numeroReciboApelacionSiCuatro,
        fechaEmisionApelacionSiCuatro,
        fechaVencimientoApelacionSiCuatro,
        montoReclamadoApelacionSiCuatro,
        detalleReclamoApelacionSiCuatro,
        apelacionOpcioncinco,
        numeroReciboApelacionSiCinco,
        fechaEmisionApelacionSiCinco,
        montoTotalApelacionSiCinco,
        detalleReclamoApelacionSiCinco,
        materiaEmpresaEmitirApelacionSeis

    };


    const url = "https://libro-reclamaciones-fiberpro-e2b1f36f0380.herokuapp.com/api/reclamos/reclamo";


    const botonEnviar = document.querySelector("#enviarFormulario");  // El botón de enviar
    const botonEditar = document.querySelector("#back");  // El botón de editar (si existe)
    const messageDiv = document.getElementById('message');

    // Deshabilitar los botones y cambiar el texto a "Enviando..."
    botonEnviar.disabled = true;
    if (botonEditar) {
        botonEditar.disabled = true;  // Si también quieres deshabilitar el botón de editar
    }
    botonEnviar.innerHTML = "Enviando...";


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.error) {
            messageDiv.innerHTML = `<span class="error">${responseData.error}</span>`;

            // Restaurar botones si hay error
            botonEnviar.disabled = false;
            botonEnviar.innerHTML = "Enviar";
            if (botonEditar) botonEditar.disabled = false;
        } else {

            // para ocultar todo
            caja_code.style.display="block"
            politicas.style.display="none"
            content_title_claim_complaint_appeal.style.display="none"
            title_suscriber_user_representative.style.display="none"
            //

            // ✅ Mostrar el código recibido
            const codigo = responseData.ticket_name || "Código no disponible";

            // Mostrar en el contenedor elegante si existe
            const cajaCodigo = document.getElementById("codigoGenerado");
            if (cajaCodigo) {
                cajaCodigo.textContent = codigo;
            }

            // ✅ Mostrar mensaje de éxito
            messageDiv.innerHTML = `<span class="success">Código generado correctamente: ${codigo}</span>`;

            // ✅ Ocultar botones antiguos
            if (botonEnviar) botonEnviar.style.display = "none";
            if (botonEditar) botonEditar.style.display = "none";

            const btns = document.getElementById("cajadeBtnsSuccess");
            if (btns) btns.style.display = "none";

            // ✅ Mostrar mensaje personalizado
            const msg = document.getElementById("gracias");
            if (msg) msg.innerHTML = "Gracias, su solicitud fue aceptada. En breve recibirá una confirmación.";

            // ✅ Mostrar botón de volver
            const btnVolver = document.getElementById("inicio");
            if (btnVolver) btnVolver.style.display = "block";

            // ✅ Mostrar caja del código si estaba oculta
            const cajaBox = document.querySelector(".codigo-box");
            if (cajaBox) cajaBox.style.display = "block";
            
            // ✅ Limpiar todas las cajas de entrada
            const inputs = document.querySelectorAll("input, textarea, select,date");
            inputs.forEach(input => {
                if (input.type === "checkbox" || input.type === "radio") {
                    input.checked = false;
                } else {
                    input.value = "";
                }
            });
        }
    } catch (error) {
        messageDiv.innerHTML = `<span class="error">Hubo un problema al enviar la solicitud: ${error.message}</span>`;
        
        // Restaurar botones si hubo error en el fetch
        botonEnviar.disabled = false;
        botonEnviar.innerHTML = "Enviar";
        if (botonEditar) botonEditar.disabled = false;
    }

});

