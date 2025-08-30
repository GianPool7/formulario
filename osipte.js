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

// enviando los ids
    const tipo_ticket = document.getElementById("tipoticket")

    const tipo_user = document.getElementById("tipo-user")
    // datos de validacion
    const numDocIdentidad = document.getElementById("numerodocumentoidentidad").value.trim();
    const fechaEmision = document.getElementById("fechaEmisionDocumentoIdentidad").value;
    const nombrePadre = document.getElementById("nombrePadre").value.trim();
    const nombreMadre = document.getElementById("nombreMadre").value.trim();
    const lugarNacimiento = document.getElementById("lugarNacimiento").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const tipoDocIdentidad = document.getElementById("tipodocumentoidentidad").value.trim();
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const direccionFacturacion = document.getElementById("direccionFacturacion").value.trim();
    // cambiando de text a int
    const montoTarifa = document.getElementById('montoTarifa')
    montoTarifa.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    // fin de datos de validacion
    // datos personales
    const tipoDoc = document.getElementById("tipoDoc").value;
    const numDoc = document.getElementById("numDoc").value.trim();
    const name = document.getElementById("name").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const relacion = document.getElementById("relacion").value.trim();
    const razonSocial = document.getElementById("razonsocial").value.trim();
    const numeroContacto = document.getElementById("numeroContacto").value.trim();
    const distritos = document.getElementById("distritos").value;
    const direccion = document.getElementById("direccion").value.trim();
    const correo = document.getElementById("correo").value.trim();
    // fin de datos personales
    // titulo de reclamo queja apelacion
    const content_title_claim_complaint_appeal = document.getElementById("queja-reclamo-apelacion")
    const title_calim_complaint_appeal = document.getElementById("opcion")
    const content_claim_complaint_appeal = document.getElementById("contenedorOpcionesQRA")
    // caja de validacion
    const title_suscriber_user_representative = document.getElementById("title-susbcriber-user-Representative")
    const content_suscriber_user_representative = document.getElementById("content-susbcriber-user-Representative")
    const validation = document.getElementById('validation')
    const susbcriber_date = document.getElementById("subscriber-date")
    const susbcriber_content = document.getElementById("validation-subscriber")
    const user_content = document.getElementById("usuario-content")
    const type_user = document.getElementById("type-user")
    const title = document.getElementById("type-user-abonado-usuario-representante")
    const title_user = document.getElementById("title-user")
    // para abrir los selections de reclamos - queja - apelacion
    const select_appeal = document.getElementById("select-apelacion")
    const select_claim = document.getElementById("select-reclamo")
    const select_complaint = document.getElementById("select-queja")

    // APELACION
    const appeal_options = document.getElementById("apelacionOpciones")
    const data_appeal = document.getElementById("data-service-appeal")
    // el id del tipo
    let idApelacion = null;
    // fin de apelacion


    // QUEJA
    const complaint_options = document.getElementById("quejasOpciones")
    const data_complaint = document.getElementById("data-service-complaint")
    // el id de queja
    let idQueja = null;
    // fin de queja

    //RECLAMO
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
    // fin de reclamo
    // guardando los ids de datos de servicios
    const data_title_servicie=document.getElementById("data-service-title")
    const data_servicie_claim_complaint_appeal=document.getElementById("select-claim-complaint-appeal")
    const data_select_appeal=document.getElementById("select-appeal")
    const data_select_complaint=document.getElementById("select-claim-complaint")
    const data_service_select=document.getElementById("data-service-select")
    const data_servicie_complaint_appeal=document.getElementById("data-service-complaint-appeal")
    const data_claim = document.getElementById("data-service-claim")
    const data_servicie_appeal=document.getElementById("data-service-appeal")
    const data_servicie_complete=document.getElementById("data-service-complete")
    // para continuar con los botons
    const btn_apelacion=document.getElementById("cargar-apelacion")
    const btn_queja=document.getElementById("cargar-queja")
    const btn_reclamo=document.getElementById("cargar-reclamo")
    btn_apelacion.style.display="none"
    btn_queja.style.display="none"
    btn_reclamo.style.display="none"
    // content de botones
    const btn_content_cargar=document.getElementById("content-btn-cargar")
    // para seguir con lo demas
    const next_apelacion=document.getElementById("seguir-apelacion")
    const next_queja=document.getElementById("seguir-queja")
    const next_reclamo=document.getElementById("seguir-reclamo")
    next_apelacion.style.display="none"
    next_queja.style.display="none"
    next_reclamo.style.display="none"
    // descaargo de cliente
    const mostrar_pp=document.getElementById("continuar-pp")
    mostrar_pp.style.display="none"
    // CAJA PARA MOSTRAR EL CODIGO
    const caja_code=document.getElementById("code")
    caja_code.style.display="none"

    // para mostrar las cajas de cada
    const content_data_personales_back=document.getElementById("content-datos-personales-atras")
    const content_data_servicio_back=document.getElementById("content-datos-servicio-atras")
    const content_preguntas_respuestas_back=document.getElementById("content-preguntas-respuestas")
    const content_descargo_cliente_back=document.getElementById("content-descargo-cliente")

    //
    const claim = document.getElementById("reclamo").addEventListener('click', () => {
        content_claim_complaint_appeal.style.display = "none"
        title_calim_complaint_appeal.textContent = "Reclamo"
        content_title_claim_complaint_appeal.style.display = "flex"
        //
        content_suscriber_user_representative.style.display = "flex"
        // tipo de ticket reclamo - queja - apelacion
        tipo_ticket.value = 1
    })

    const complaint = document.getElementById("queja").addEventListener('click', () => {
        content_claim_complaint_appeal.style.display = "none"
        title_calim_complaint_appeal.textContent = "Queja"
        content_title_claim_complaint_appeal.style.display = "flex"
        //

        //
        content_suscriber_user_representative.style.display = "flex"
        // tipo de ticket reclamo - queja - apelacion
        tipo_ticket.value = 2
    })

    const appeal = document.getElementById("apelacion").addEventListener('click', () => {
        content_claim_complaint_appeal.style.display = "none"
        title_calim_complaint_appeal.textContent = "Apelación"
        content_title_claim_complaint_appeal.style.display = "flex"
        //
        content_suscriber_user_representative.style.display = "flex"
        // tipo de ticket reclamo - queja - apelacion
        tipo_ticket.value = 3

    })


    function volverRQA() {
        content_claim_complaint_appeal.style.display = "flex"
        content_title_claim_complaint_appeal.style.display = "none"
        content_suscriber_user_representative.style.display = "none"
        // para que el id del tipo ticket este vacio
        tipo_ticket.value = ""
        // para que el id del tipo usuario este vacio
        tipo_user.value = ""
        // para que se oculte todo este div de las preguntas personales
        questions_datos_personales.style.display = "none"
        // para cambiar el titulo de abonado - usuario - representante
        title_suscriber_user_representative.style.display = "none"
        // para ocultar el campo de validacion
        validation.style.display = "none"
        // Limpiar campos
        const camposAResetear = [
            // Validación
            "numerodocumentoidentidad",
            "fechaEmisionDocumentoIdentidad",
            "nombrePadre",
            "nombreMadre",
            "lugarNacimiento",
            "fechaNacimiento",
            "tipodocumentoidentidad",
            "fechaVencimiento",
            "direccionFacturacion",
            "montoTarifa",

            // Datos personales
            "tipoDoc",
            "numDoc",
            "name",
            "apellidos",
            "relacion",
            "razonsocial",
            "numeroContacto",
            "distritos",
            "direccion",
            "correo"
        ];

        camposAResetear.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                if (input.tagName === "SELECT") {
                    input.selectedIndex = 0; // Resetear select
                } else {
                    input.value = ""; // Resetear input
                }
            }
        });

        // Limpiar input de archivo
        const cartaPoder = document.getElementById("cartaPoder");
        if (cartaPoder) cartaPoder.value = "";

        // Desmarcar radios
        const radios = document.getElementsByName("autorizacion");
        radios.forEach(radio => radio.checked = false);

        // Ocultar errores
        document.querySelectorAll(".msg-error").forEach(el => el.style.display = "none");

        // (Opcional) Llevar el scroll al top
        window.scrollTo({ top: 0, behavior: "smooth" });
        // ocultar los selections
        select_appeal.style.display = "none"
        select_claim.style.display = "none"
        select_complaint.style.display = "none"
        // para volver apelacion
        appeal_options.value = "ninguno";
        apelaciones(); // Esto asegura que también se oculte
        // para volver queja
        complaint_options.value = "ninguna";
        quejas(); // Esto asegura que también se oculte
        claim_options.value = "ningun";
        reclamo(); // Esto asegura que también se oculte
        // sequencia     
        // btones de ccargar
        btn_apelacion.style.display="none"
        btn_queja.style.display="none"
        btn_reclamo.style.display="none"
    }

    //
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

    // para las cajas de validacion
    // abonado = susbcriber
    const susbcriberquestion = document.getElementById("abonado").addEventListener("click", () => {
        // alert("hola mundo")
        validation.style.display = "block"
        user_content.style.display = "none"
        susbcriber_content.style.display = "block"
        susbcriber_date.style.display = "flex"
        type_user.style.display = "none"
        // para el titulo de la parte legal
        title.textContent = "ABONADO"
        // para el campo de familiar
        data_user_datos_personales.style.display="none"
        // el titulo del tipo de usuario esta oculto pero despues de escojer se muestra
        title_suscriber_user_representative.style.display = "flex"
        // despues de escojer una opcion se oculta el contenedor de usuario-abonado-representante
        content_suscriber_user_representative.style.display = "none"
        // titulo escogido
        title_user.textContent = "Abonado"
        // id que se manda al back
        tipo_user.value = 1
    })
    // usuario = user
    const data_user_datos_personales=document.getElementById("family-user")
    const userquestion = document.getElementById("usuario").addEventListener("click", () => {
        type_user.style.display = "flex"
        validation.style.display = "block"
        susbcriber_date.style.display = "none"
        susbcriber_content.style.display = "none"
        user_content.style.display = "block"
        title.textContent = "USUARIO"
        // para el campo de familiar
        data_user_datos_personales.style.display="flex"
        // el titulo del tipo de usuario esta oculto pero despues de escojer se muestra
        //
        title_suscriber_user_representative.style.display = "flex"
        // despues de escojer una opcion se oculta el contenedor de usuario-abonado-representante
        content_suscriber_user_representative.style.display = "none"
        // titulo de la opcion elegida
        title_user.textContent = "Usuario"
        // id que se manda al back
        tipo_user.value = 2
    })
    // validacion de datos

    function validarDatosvalidacion() {
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


        console.log(tipo_user.vallue);

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

        console.log("Validación tipo 2 resultado:", isValidData);

        // Avanzar solo si todo está OK
        if (isValidData) {
            // Suponiendo que estas variables existen y están bien definidas en tu código
            validation.style.display = "none";
            questions_datos_personales.style.display = "block";
        }
    }


    function volveruser() {
        content_suscriber_user_representative.style.display = "flex";
        title_suscriber_user_representative.style.display = "none";

        tipo_user.value = "";
        questions_datos_personales.style.display = "none";
        validation.style.display = "none";

        // IDs de todos los campos que quieres limpiar
        const camposAResetear = [
            // Validación
            "numerodocumentoidentidad",
            "fechaEmisionDocumentoIdentidad",
            "nombrePadre",
            "nombreMadre",
            "lugarNacimiento",
            "fechaNacimiento",
            "tipodocumentoidentidad",
            "fechaVencimiento",
            "direccionFacturacion",
            "montoTarifa",

            // Datos personales
            "tipoDoc",
            "numDoc",
            "name",
            "apellidos",
            "relacion",
            "razonsocial",
            "numeroContacto",
            "distritos",
            "direccion",
            "correo"
        ];

        camposAResetear.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                if (input.tagName === "SELECT") {
                    input.selectedIndex = 0; // Resetear select
                } else {
                    input.value = ""; // Resetear input
                }
            }
        });

        // Limpiar input de tipo file (carta poder)
        const cartaPoder = document.getElementById("cartaPoder");
        if (cartaPoder) cartaPoder.value = "";

        // Limpiar radios de autorización
        const radios = document.getElementsByName("autorizacion");
        radios.forEach(radio => radio.checked = false);

        // Ocultar errores si los hubiera
        document.querySelectorAll(".msg-error").forEach(el => el.style.display = "none");
        // ocultar los selections
        select_appeal.style.display = "none"
        select_claim.style.display = "none"
        select_complaint.style.display = "none"
        // para volver apelacion
        appeal_options.value = "ninguno";
        apelaciones(); // Esto asegura que también se oculte
        // para volver queja
        complaint_options.value = "ninguna";
        quejas(); // Esto asegura que también se oculte
        // para reclamos
        claim_options.value = "ningun";
        reclamo(); // Esto asegura que también se oculte
        // btones de ccargar
        
    }


    // caja de datos personales
    const questions_datos_personales = document.getElementById("content-datos")
    const cp_representative = document.getElementById("cp-representatives")
    const rs_representative = document.getElementById("rs-representatives")
    // cuando es representante
    const representante = document.getElementById("representante").addEventListener("click", () => {
        validation.style.display = "none"
        questions_datos_personales.style.display = "block"
        cp_representative.style.display = "block"
        rs_representative.style.display = "block"
        // despues de escojer una opcion se oculta el contenedor de usuario-abonado-representante
        content_suscriber_user_representative.style.display = "none"
        // el titulo del tipo de usuario esta oculto pero despues de escojer se muestra
        title_suscriber_user_representative.style.display = "flex"
        // titulo de la opcion elegida
        title_user.textContent = "Representante"
        // id que se manda al back
        tipo_user.value = 3
    })

    // fin de datos de personales

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
            select.innerHTML = '<option value="">Error al cargar distritos</option>';
        }
    }
    // cargar distritos
    cargarDistritos()

    // validando datos personales y el boton de continuar
    function validarCamposGenerales() {
        const campos = ['tipoDoc', 'numDoc', 'name', 'apellidos', 'numeroContacto', 'distritos', 'direccion', 'correo'];
        let esValido = true;

        campos.forEach(id => {
            const campo = document.getElementById(id);
            const error = document.querySelector(`#${id} ~ .msg-error`);

            if (!campo.value.trim()) {
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


    // para el titulo de reclamo, queja y apelacion elegida
    const title_reclamo_queja_apelacion_elegida=document.getElementById("title-rqa-elegida")

    // fin de funcion de validacion de datos personales

    function mostrarSeccionPorTipoTicket() {

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

    // boton de continuar, para mostrar los selection

    const title_datos_personales=document.getElementById("title-datos-personales")

    document.getElementById("validarFormularioContinuar").addEventListener("click", () => {
        const isValid = validarCamposGenerales() && validarCamposAutorizacion() && validarCamposTipoUsuario();
        if (isValid) {
            mostrarSeccionPorTipoTicket();
            questions_datos_personales.style.display="none"
            content_data_personales_back.style.display="flex"
            title_datos_personales.textContent="Datos Personales"
        }
    });

    // fin de datos personales su validacion

    // para los data-target

    // const pasos = document.querySelectorAll(".content-sequence");

    // pasos.forEach((step, indexClicked) => {
    //     step.addEventListener("click", function () {
    //         if (step.classList.contains("disabled")) return; // No hacer nada si está deshabilitado

    //         const targetId = step.getAttribute("data-target");
    //         if (!targetId) return;

    //         // Pintar solo los anteriores y el actual
    //         pasos.forEach((s, i) => {
    //             if (i <= indexClicked) {
    //                 s.classList.add("active");
    //                 s.classList.remove("disabled");
    //             } else {
    //                 s.classList.remove("active");
    //             }
    //         });

    //         // Ocultar todas las secciones
    //         document.querySelectorAll(".step-section").forEach(section => section.style.display = "none");

    //         // Mostrar la sección correspondiente
    //         const targetSection = document.getElementById(targetId);
    //         if (targetSection) {
    //             targetSection.style.display = "block";
    //         } else {
    //             console.warn("Sección no encontrada:", targetId);
    //         }

    //         // Mostrar/ocultar según paso
    //         if (targetId === "materia-elegido-datos-servicio") {
    //             btn_apelacion.style.display="flex"
    //             show_data_service_appeal()
    //         } else {
    //             btn_apelacion.style.display = "none";
    //             hidden_data_service()
    //         }

    //         // Mostrar/ocultar según paso
    //         if (targetId === "descargo-cliente") {
    //             data_appeal.style.display = "block";
    //         } else {
    //             data_appeal.style.display = "none";
    //         }
    //     });
    // });







    // fin de data-target

    // apelacion para validar

    document.addEventListener("DOMContentLoaded", () => {
    const numero_servicio_apelacion = document.getElementById("numeroServicioApelacion");
        numero_servicio_apelacion.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    // apelacion
    function show_data_service_appeal() {
        // para configurar datos de servicio
        data_select_complaint.style.display="none"
        data_claim.style.display="none"
        data_servicie_complete.style.display="block"
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

    //
    appeal_options.value = "ninguno"
    // funcion
    function apelaciones() {
        // msotart el boton
        btn_apelacion.style.display="flex"

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

                break;

            case "apelacionSix":
                idApelacion = 5;

                break;

            case "ninguno":
                break;

            default:
                break;
        }

        if (appeal_options.value!="ninguno") {
            data_title_servicie.textContent="DATOS DE SERVICIO APELACIÓN"
            show_data_service_appeal();
        }else{
            data_title_servicie.textContent=""
            hidden_data_service()
        }
    }

    
    // el select de apelacion
    const apelacionoOne=document.getElementById("apelacionUno")
    const apelacionoTwo=document.getElementById("apelacionDos")
    const apelacionoThree=document.getElementById("apelacionTres")
    const apelacionoFour=document.getElementById("apelacionCuatro")
    const apelacionoFive=document.getElementById("apelacionCinco")
    const apelacionoSix=document.getElementById("apelacionSeis")
    //
    const materia_elegida_datos_servicio=document.getElementById("materia-elegido-datos-servicio")
    //
    const title_content_datos_servicios=document.getElementById("title-datos-servicio")

    function pestañaApelacion() {

        apelacionoOne.style.display="none"
        apelacionoTwo.style.display="none"
        apelacionoThree.style.display="none"
        apelacionoFour.style.display="none"
        apelacionoFive.style.display="none"
        apelacionoSix.style.display="none"
        //
        materia_elegida_datos_servicio.style.display="none"
        // para ocultar el boton
        btn_apelacion.style.display="none"
        // para mostar el boton que te envia a descargo de cliente
        next_apelacion.style.display="flex"
        //
        content_data_servicio_back.style.display="flex"
        title_content_datos_servicios.textContent="Apelacion & Datos de Servicio"

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

    function limpiarCampos(container) {
        const campos = container.querySelectorAll("input, select");

        campos.forEach(campo => {
            campo.value = "";
        });
    }

    const cCuatro=document.getElementById("apelacionCuatroSi");

    document.addEventListener("DOMContentLoaded", () => {
    const montoReclamadoApelacionSiCuatro = document.getElementById("montoReclamadoApelacionSiCuatro");
        montoReclamadoApelacionSiCuatro.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
    const montoTotalApelacionSiCinco = document.getElementById("montoTotalApelacionSiCinco");
        montoTotalApelacionSiCinco.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    // apelacion numero 4
    function apelacionCuatro() {
        const aCuatro=document.getElementById("apelacionopcioncuatro").value;
        switch (aCuatro) {
            case "si":
                cCuatro.style.display="block"
                break;

            case "no":
                cCuatro.style.display="none"
                // Limpiar todos los inputs (tipo text, date, etc) dentro de cCuatro
                const inputs = cCuatro.querySelectorAll("input");
                inputs.forEach(input => input.value = '');
                break;

            default:
                cCuatro.style.display="none"
                break;
        }
    }

    document.getElementById("apelacionopcioncuatro").addEventListener("change", apelacionCuatro);

    // apelacion numero 5
    const cCinco=document.getElementById("apelacionCincoSi");

    function apelacionCinco() {
        const aCinco=document.getElementById("apelacionOpcioncinco").value;

        cCinco.style.display="none";

        switch (aCinco) {
            case "si":
                cCinco.style.display="block"
                break;
            case "no":
                cCinco.style.display="none"
                // Limpiar todos los inputs (tipo text, date, etc) dentro de cCuatro
                const inputs = cCinco.querySelectorAll("input");
                inputs.forEach(input => input.value = '');
                break;
        
            default:
                cCinco.style.display="none"
                break;
        }

    }

    document.getElementById("apelacionOpcioncinco").addEventListener("change", apelacionCinco);
    const descargo_cliente=document.getElementById("descargo-cliente")

    // todo el contenido data
    const data_content_apelacion_complete=document.getElementById("data-content-apelacion")
    //
    const title_preguntas_respuestas=document.getElementById("title-preguntas-respuestas")
    function continuarApelacion() {
        const title_descargo_cliente=document.getElementById("title-descargo-cliente")
        title_descargo_cliente.textContent="Sustento de apelación"
        descargo_cliente.style.display="flex"
        data_content_apelacion_complete.style.display="none"
        //
        mostrar_pp.style.display="flex"
        //
        content_preguntas_respuestas_back.style.display="flex"
        //
        title_preguntas_respuestas.textContent="Preguntas & respuestas"
    }
    
    const politicas=document.getElementById("politicas-privaciada")
    politicas.style.display="none"

    const title_content_descargo_cliente=document.getElementById("title-descargo-cliente")

    function continuarpoliticas() {
        politicas.style.display="block"
        mostrar_pp.style.display="flex"
        descargo_cliente.style.display="none"
        mostrar_pp.style.display="none"
        //
        content_descargo_cliente_back.style.display="flex"
        //
        title_content_descargo_cliente.textContent="Descargo de cliente"
    }

    // fin de apelacion

    // queja

    function show_data_service_complaint() {
        data_appeal.style.display="none"
        data_claim.style.display="none"
        data_servicie_complete.style.display="block"
        data_select_appeal.style.display="none"
    }

    complaint_options.value = "ninguna"
    function quejas() {

        // msotart el boton
        btn_queja.style.display="flex"
        // content
        content_data_servicio_back.style.display="flex"
        title_content_datos_servicios.textContent="Queja & Datos de Servicio"

        switch (complaint_options.value) {
            case "quejaUno":
                idQueja = 6
                break;
            case "quejaDos":
                idQueja = 1
                break;
            case "quejaTres":
                idQueja = 2
                break;
            case "quejaCuatro":
                idQueja = 3
                break;
            case "quejaCinco":
                idQueja = 4
                break;
            case "quejaSeis":
                idQueja = 5
                break;
            case "ninguna":
                break;

            default:
                break;
        }

        if (idQueja.value!="ninguno") {
            data_title_servicie.textContent="DATOS DE SERVICIO QUEJA"
            show_data_service_complaint();
        }else{
            data_title_servicie.textContent=""
            hidden_data_service()
        }
    }

    const quejaPreguntaUno   = document.getElementById("quejaPreguntaUno");
    const quejaPreguntaDos   = document.getElementById("quejaPreguntaDos");
    const quejaPreguntaTres  = document.getElementById("quejaPreguntaTres");
    const quejaPreguntaCuatro= document.getElementById("quejaPreguntaCuatro");
    const quejaPreguntaCinco = document.getElementById("quejaPreguntaCinco");
    const quejaPreguntaSeis  = document.getElementById("quejaPreguntaSeis");

    const data_queja_complete=document.getElementById("data-content-queja")

    function pestañaQueja() {
        quejaPreguntaUno.style.display="none"
        quejaPreguntaDos.style.display="none"
        quejaPreguntaTres.style.display="none"
        quejaPreguntaCuatro.style.display="none"
        quejaPreguntaCinco.style.display="none"
        quejaPreguntaSeis.style.display="none"
        //
        btn_queja.style.display="none"
        // para ocultar el contenido de queja completo
        materia_elegida_datos_servicio.style.display="none"
        //
        next_queja.style.display="flex"
        //

        switch (idQueja) {
            case 6:
                quejaPreguntaUno.style.display="block"
                break;
            case 1:
                quejaPreguntaDos.style.display="block"
                break;
            case 2:
                quejaPreguntaTres.style.display="block"
                break;
            case 3:
                quejaPreguntaCuatro.style.display="block"
                break;
            case 4:
                quejaPreguntaCinco.style.display="block"
                break;
            case 5:
                quejaPreguntaSeis.style.display="block"
                break;
        
            default:
                break;
        }
        
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

    // PREGUNTA SEIS
    function defectos() {
        const adjunta_prueba=document.getElementById("dtramitacion").value
        const adjunta_prueba_documento=document.getElementById("dptramitacion")

        if (adjunta_prueba==="True") {
            adjunta_prueba_documento.style.display="flex"
        }else{
            adjunta_prueba_documento.style.display="none"
        }
    }

    function continuaQueja() {
        const title_descargo_cliente=document.getElementById("title-descargo-cliente")
        title_descargo_cliente.textContent="Descripción del problema"
        descargo_cliente.style.display="flex"
        next_queja.style.display="flex"
        //
        data_queja_complete.style.display="none"
        //
        mostrar_pp.style.display="flex"
        content_preguntas_respuestas_back.style.display="flex"
        //
        title_preguntas_respuestas.textContent="Preguntas & respuestas"
    }


    // fin de reclamo

    // RECLAMO

    // datos de servicio

    function show_data_service_claim() {
        data_select_appeal.style.display="none"
        data_servicie_complaint_appeal.style.display="none"
        data_servicie_appeal.style.display="none"
        data_servicie_complete.style.display="block"
    }

    //
    claim_options.value = "ningun"
    function reclamo() {
        //
        if (claim_options.value!='ningun') {
            data_title_servicie.textContent="DATOS DEL SERVICIO RECLAMO"
            show_data_service_claim()
        }
        // Oculta todos los bloques antes de mostrar el nuevo
        const bloques = document.querySelectorAll(".fc");
        bloques.forEach(div => div.style.display = "none");
        // msotart el boton
        btn_reclamo.style.display="flex"

        switch (claim_options.value) {
            case "fcs":
                idReclamo = 1
                claim_one.style.display = "block"
                // para los datos de servicios
                break;

            case "calidad":
                idReclamo = 2
                claim_two.style.display = "block"
                // para los datos de servicios
                break;

            case "oferta":
                idReclamo = 3
                claim_three.style.display = "block"
                // para los datos de servicios
                break;

            case "falta":
                idReclamo = 4
                claim_four.style.display = "block"
                // para los datos de servicios
                break;

            case "instalacion":
                idReclamo = 5
                claim_five.style.display = "block"
                // para los datos de servicios
                break;

            case "baja":
                idReclamo = 6
                claim_six.style.display = "block"
                // para los datos de servicios
                break;

            case "contratacion":
                idReclamo = 7
                claim_seven.style.display = "block"
                // para los datos de servicios
                break;


            case "migracion":
                idReclamo = 8
                claim_eigth.style.display = "block"
                // para los datos de servicios
                break;


            case "xmaterias":
                idReclamo = 9
                claim_x.style.display = "block"
                // para los datos de servicios
                break;

            case "ningun":
                break;
            default:
                break;
        }
        console.log(idReclamo);
    }

    // facturacion y cobro
    // convirtiendo campos a numero
    document.addEventListener("DOMContentLoaded", () => {
        const tarifaUsuarioFCone = document.getElementById("tarifaUsuarioFCone");
        tarifaUsuarioFCone.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        const montoReclamadoFCone = document.getElementById("montoReclamadoFCone");
        montoReclamadoFCone.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
    // 1 ero
    const data_one_two_three_five_six_seven_eight=document.getElementById("fc-one-two-three-five-six-seven-eight")
    const data_one_two_four=document.getElementById("fc-one-two-four")
    const data_campo_one=document.getElementById("nReciboBase")
    // 2do
    const data_two=document.getElementById("fc-two")
    // 5ta
    const data_five=document.getElementById("fc-five")
    //6to
    const data_six=document.getElementById("fc-six")
    const data_six_campo=document.getElementById("numDocCobroSeis")

    function facturado() {
        const facturacion_selecionada=document.getElementById("facturados").value
        // para la primera opcion
        data_one_two_three_five_six_seven_eight.style.display="none"
        data_one_two_four.style.display="none"
        data_campo_one.style.display="none"
        // 2da
        data_two.style.display="none"
        //5ta
        data_five.style.display="none"
        //6ta 
        data_six.style.display="none"
        data_six_campo.style.display="none"

        switch (facturacion_selecionada) {
            case "calculo":
                data_one_two_three_five_six_seven_eight.style.display="block"
                data_campo_one.style.display="flex"
                data_one_two_four.style.display="flex"
                idReclamoEscogido=1
                break;
            case "tarifa":
                data_one_two_three_five_six_seven_eight.style.display="block"
                data_campo_one.style.display="flex"
                data_one_two_four.style.display="flex"
                data_two.style.display="flex"
                idReclamoEscogido=2
                break;
            case "reconexion":
                data_one_two_three_five_six_seven_eight.style.display="block"
                data_campo_one.style.display="flex"
                idReclamoEscogido=3
                break;
            case "dmonto":
                data_one_two_three_five_six_seven_eight.style.display="block"
                data_campo_one.style.display="flex"
                data_one_two_four.style.display="flex"
                idReclamoEscogido=4
                break;
            case "noprocesado":
                data_one_two_three_five_six_seven_eight.style.display="block"
                data_campo_one.style.display="flex"
                data_five.style.display="flex"
                idReclamoEscogido=5
                break;
            case "nfacturados":
                data_one_two_three_five_six_seven_eight.style.display="block"
                data_campo_one.style.display="none"
                data_six_campo.style.display="flex"
                data_six.style.display="flex"
                idReclamoEscogido=6
                break;
            case "cequipos":
                data_one_two_three_five_six_seven_eight.style.display="block"
                data_campo_one.style.display="flex"
                idReclamoEscogido=7
                break;
            case "incremento":
                data_one_two_three_five_six_seven_eight.style.display="block"
                data_campo_one.style.display="flex"
                idReclamoEscogido=8
                break;
        
            default:
                break;
        }
    }

    function mdPagoFacturacion() {
        const mPago_otros=document.getElementById("mPago").value
        const data_otros_mpago=document.getElementById("especificarMPfacturacion")
        if (mPago_otros==="otro") {
            data_otros_mpago.style.display="flex"
        }else{
            data_otros_mpago.style.display="none"
        }
    }

    function hojaFacturado() {
        const adjunta_hoja_pago=document.getElementById("hpfacturado").value
        const hoja_pago=document.getElementById("fhpf")
        if (adjunta_hoja_pago==="si") {
            hoja_pago.style.display="flex"
        }else{
            hoja_pago.style.display="none"
        }

    }

    // fin de facturado

    // calidad

    function calidad() {
        const calidad=document.getElementById("calidadidoneidad").value
        const data_calidad=document.getElementById("calidadReclamableOpcion")
        if (calidad==="calidaduno") {
            idReclamoEscogido=9
            data_calidad.style.display="block"
        }else{
            data_calidad.style.display="none"
        }
    }

    // fin de calidad

    // incumplimiento
    const data_incumplimiento_one=document.getElementById("contenidoincumplimientoone")
    const data_incumplimiento_two=document.getElementById("contenidoincumplimientotwo")
    const data_incumplimiento_three=document.getElementById("contenidoincumplimientothree")
    const data_incumplimiento_four=document.getElementById("contenidoincumplimientofour")

    function incumpliento() {
        const ofertas=document.getElementById("ofertas").value
        data_incumplimiento_one.style.display="none"
        data_incumplimiento_two.style.display="none"
        data_incumplimiento_three.style.display="none"
        data_incumplimiento_four.style.display="none"
        switch (ofertas) {
            case "incumplimientoUNO":
                idReclamoEscogido=10
                data_incumplimiento_one.style.display="flex"
                break;
            case "incumplimientoDOS":
                idReclamoEscogido=11
                data_incumplimiento_two.style.display="block"
                break;
            case "incumplimientoTRES":
                idReclamoEscogido=12
                data_incumplimiento_three.style.display="block"
                break;
            case "incumplimientoCUATRO":
                idReclamoEscogido=13
                data_incumplimiento_four.style.display="block"
                break;
        
            default:
                data_incumplimiento_one.style.display="none"
                data_incumplimiento_two.style.display="none"
                data_incumplimiento_three.style.display="none"
                data_incumplimiento_four.style.display="none"
                break;
        }
    }

    function canalPromocion() {
        const promocion=document.getElementById("cbpromocionfs").value
        const txt_promocion=document.getElementById("txtcpromocion")
        if (promocion==="otro") {
            txt_promocion.style.display="flex"
        }else{
            txt_promocion.style.display="none"
        }
    }

    function canalPromocionCuatro() {
        const canal_promocion_incumplimiento=document.getElementById("cnPromocionCuatro").value
        const txt_promocion=document.getElementById("txtcpromocioC")
        if (canal_promocion_incumplimiento==="otro") {
            txt_promocion.style.display="flex"
        }else{
            txt_promocion.style.display="none"
        }
    }
    // fin de incumplimiento

    // falta de servicio
    const data_falta_servicio_uno=document.getElementById("contenidofservicioone")
    const campo_falta_servicio_uno=document.getElementById("fsOne")
    const campo_falta_servicio_dos=document.getElementById("fsTwo")
    const campos_falta_serivicio_dos=document.getElementById("falta-servicio-questions-two")
    const data_falta_servicio_tres=document.getElementById("contenidofsthree")
    const data_falta_servicio_cuatro=document.getElementById("contenidofsfour")

    function faltaServicios() {
        const data_falta_servicio=document.getElementById("fservicio").value

        data_falta_servicio_uno.style.display="none"
        campo_falta_servicio_uno.style.display="none"
        campo_falta_servicio_dos.style.display="none"
        campos_falta_serivicio_dos.style.display="none"
        data_falta_servicio_tres.style.display="none"
        data_falta_servicio_cuatro.style.display="none"

        switch (data_falta_servicio) {
            case "servicioone":
                data_falta_servicio_uno.style.display="block"
                campo_falta_servicio_uno.style.display="flex"
                break;
            case "serviciotwo":
                data_falta_servicio_uno.style.display="block"
                campo_falta_servicio_uno.style.display="none"
                campo_falta_servicio_dos.style.display="flex"
                campos_falta_serivicio_dos.style.display="flex"
                break;
            case "serviciothree":
                data_falta_servicio_tres.style.display="block"
                break;
            case "serviciofour":
                data_falta_servicio_cuatro.style.display="block"
                break;
        
            default:
                break;
        }
    }

    function mpagosfs() {
        const medio_pagos_falta_servicio=document.getElementById("mpagos").value
        const campo_falta_servicio=document.getElementById("txtmpagos")
        if (medio_pagos_falta_servicio==="otros") {
            campo_falta_servicio.style.display="flex"
        }else{
            campo_falta_servicio.style.display="none"
        }
    }

    function fsreciboPendiente() {
        const adjunto_recibo_pendiente=document.getElementById("adrecibosPendiente").value
        const vinculo_adjuntar_pendiente=document.getElementById("adReciboPendientefs")
        if (adjunto_recibo_pendiente==="True") {
            vinculo_adjuntar_pendiente.style.display="flex"
        }else{
            vinculo_adjuntar_pendiente.style.display="none"
        }
    }

    function fsrecibo() {
        const adjunto_recibo=document.getElementById("adrecibos").value
        const recibo=document.getElementById("adRecibofs")
        if (adjunto_recibo==="True") {
            recibo.style.display="flex"
        }else{
            recibo.style.display="none"
        }
    }
    // fin de falta de servicio

    // activacion
    const data_instalacion_one=document.getElementById("contenidoinstalacionuno")
    const data_instalacion_tres=document.getElementById("contenidoinstalaciontres")
    const data_instalacion_cinco=document.getElementById("contenidoinstalacioncinco")

    document.addEventListener("DOMContentLoaded", () => {
        const montoPendienteInstalacion = document.getElementById("montoPendienteInstalacion");
        montoPendienteInstalacion.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    function instalaciones() {
        const instalacion_opcion=document.getElementById("instalacion").value
        data_instalacion_one.style.display="none"
        data_instalacion_tres.style.display="none"
        data_instalacion_cinco.style.display="none"

        switch (instalacion_opcion) {
            case "instalacionesUno":
                idReclamoEscogido=18
                data_instalacion_one.style.display="flex"
                break;
            case "instalacionesDos":
                idReclamoEscogido=19
                data_instalacion_one.style.display="flex"
                break;
            case "instalacionesTres":
                idReclamoEscogido=20
                data_instalacion_tres.style.display="block"
                break;
            case "instalacionesCuatro":
                idReclamoEscogido=21
                data_instalacion_tres.style.display="block"
                break;
            case "instalacionesCinco":
                idReclamoEscogido=22
                data_instalacion_cinco.style.display="block"
                break;
            default:
                break;
        }
    }

    function soltrasladoe() {
        const canal_solicitud_traslado=document.getElementById("strasladoe").value
        const campo_especificar_canal_traslado=document.getElementById("estraslado")
        if (canal_solicitud_traslado==="otros") {
            campo_especificar_canal_traslado.style.display="flex"
        }else{
            campo_especificar_canal_traslado.style.display="none"
        }
    }

    function adsTraslado() {
        const hoja_adjuntado_traslado=document.getElementById("adsOpcionTraslado").value
        const adjuntar_solicitud_traslado=document.getElementById("adsot")
        if (hoja_adjuntado_traslado==="True") {
            adjuntar_solicitud_traslado.style.display="flex"
        }else{
            adjuntar_solicitud_traslado.style.display="none"
        }
    }

    function canalTrasladoCinco() {
        const canal_presentacion_solicitud=document.getElementById("ctopcionCinco").value
        const especificar_canal_instalacion=document.getElementById("txtCincoTraslado")
        if (canal_presentacion_solicitud==="otros") {
            especificar_canal_instalacion.style.display="flex"
        }else{
            especificar_canal_instalacion.style.display="none"
        }
    }

    function opcionTrasladoCuatro() {
        const adjunta_solicitud=document.getElementById("opcionCuatroTraslado").value
        const hoja_baja=document.getElementById("asbaja")
        if (adjunta_solicitud==="True") {
            hoja_baja.style.display="flex"
        }else{
            hoja_baja.style.display="none"
        }
    }

    // fin de activacion

    // Baja

    const data_baja_uno=document.getElementById("respuestabajauno")
    const data_baja_dos=document.getElementById("respuestabajados")
    const data_baja_tres_cuatro=document.getElementById("respuestastrescuatro")

    // para que la caja sea numero
    document.addEventListener("DOMContentLoaded", () => {
        const montoReclamadoBaja = document.getElementById("montoReclamadoBaja");
        montoReclamadoBaja.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    function baja() {
        const opcion_baja=document.getElementById("sb").value
        data_baja_uno.style.display="none"
        data_baja_dos.style.display="none"
        data_baja_tres_cuatro.style.display="none"

        switch (opcion_baja) {
            case "bajaUno":
                data_baja_uno.style.display="block"
                idReclamoEscogido=23
                break;
            case "bajaDos":
                data_baja_dos.style.display="block"
                idReclamoEscogido=24
                break;
            case "bajaTres":
                data_baja_uno.style.display="block"
                data_baja_tres_cuatro.style.display="block"
                idReclamoEscogido=25
                break;
            case "bajaCuatro":
                data_baja_dos.style.display="block"
                data_baja_tres_cuatro.style.display="block"
                idReclamoEscogido=26
                break;
            default:
                break;
        }
    }

    function canaldBaja() {
        const canal_presentacion_solicitud=document.getElementById("cbaja").value
        const campo_canal_baja=document.getElementById("txtcanalbaja")
        if (canal_presentacion_solicitud==="otros") {
            campo_canal_baja.style.display="flex"
        }else{
            campo_canal_baja.style.display="none"
        }
    }

    function adjuntarBaja() {
        const adjuntar_hoja_baja=document.getElementById("asb").value
        const documento_hoja_baja=document.getElementById("documento-baja")
        if (adjuntar_hoja_baja==="True") {
            documento_hoja_baja.style.display="flex"
        }else{
            documento_hoja_baja.style.display="none"
        }
    }

    function canalTraslado() {
        const canal_traslado_baja=document.getElementById("ctraslado").value
        const campo_traslado_baja=document.getElementById("txtcanalTraslado")
        if (canal_traslado_baja==="otros") {
            campo_traslado_baja.style.display="flex"
        }else{
            campo_traslado_baja.style.display="none"
        }
    }

    function adjuntarTraslado() {
        const adjunta_hoja_traslado=document.getElementById("asT").value
        const hoja_traslado=document.getElementById("asTraslado")
        if (adjunta_hoja_traslado==="True") {
            hoja_traslado.style.display="flex"
        }else{
            hoja_traslado.style.display="none"
        }
    }
    // fin de Baja

    // contratos
    const data_contratos_base=document.getElementById("respuestascontratosbase")
    const data_contratos_dos=document.getElementById("respuestascontratosdos")
    const data_contratos_tres=document.getElementById("respuestascontratostres")
    const data_contratos_cuatro=document.getElementById("respuestascontratoscuatros")

    function contratos() {
        const contratos_opcion=document.getElementById("con").value

        data_contratos_base.style.display="none"
        data_contratos_dos.style.display="none"
        data_contratos_tres.style.display="none"
        data_contratos_cuatro.style.display="none"

        switch (contratos_opcion) {
            case "conuno":
                idReclamoEscogido=27
                data_contratos_base.style.display="block"
                break;
            case "condos":
                idReclamoEscogido=28
                data_contratos_base.style.display="block"
                data_contratos_dos.style.display="flex"
                break;
            case "contres":
                idReclamoEscogido=29
                data_contratos_base.style.display="block"
                data_contratos_tres.style.display="flex"
                break;
            case "concuatro":
                idReclamoEscogido=30
                data_contratos_base.style.display="block"
                data_contratos_cuatro.style.display="flex"
                break;
            default:
                break;
        }
    }
    // fin de contratos

    // migracion
    const data_migracion_base=document.getElementById("respuestasMigracionBase")
    const data_migracion_dos=document.getElementById("respuestasMigracionDos")
    const data_migracion_tres=document.getElementById("respuestaMigracionTres")
    const data_migracion_cuatro=document.getElementById("respuestaMigracionesCuatro")

    // cambiando el tipo de dato
    document.addEventListener("DOMContentLoaded", () => {
        const montoReclamadoMigracionMigracion = document.getElementById("montoReclamadoMigracionMigracion");
        montoReclamadoMigracionMigracion.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        const montoPendienteInstalacion_tres = document.getElementById("numeroRecibo-tres");
        montoPendienteInstalacion_tres.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    function migracionReclamable() {
        const opcion_migracion=document.getElementById("mig").value

        data_migracion_base.style.display="none"
        data_migracion_dos.style.display="none"
        data_migracion_tres.style.display="none"
        data_migracion_cuatro.style.display="none"

        switch (opcion_migracion) {
            case "migracionOne":
                idReclamoEscogido=31
                data_migracion_base.style.display="block"
                break;
            case "migracionTwo":
                idReclamoEscogido=32
                data_migracion_base.style.display="block"
                data_migracion_dos.style.display="block"
                break;
            case "migracionThree":
                idReclamoEscogido=33
                data_migracion_tres.style.display="block"
                break;
            case "migracionFour":
                idReclamoEscogido=34
                data_migracion_cuatro.style.display="block"
                break;
        
            default:
                break;
        }
    }

    function canalMigracion() {
        const canal_solicitud_migracion=document.getElementById("cmigracion").value
        const especificar_canal_solicitud=document.getElementById("canaldmigracion")
        if (canal_solicitud_migracion==="otros") {
            especificar_canal_solicitud.style.display="flex"
        }else{
            especificar_canal_solicitud.style.display="none"
        }
    }

    function asolicitud() {
        const adjunta_solicitud_migracion=document.getElementById("asm").value
        const hoja_adjuntad_migracion=document.getElementById("asmf")
        if (adjunta_solicitud_migracion==="True") {
            hoja_adjuntad_migracion.style.display="flex"
        }else{
            hoja_adjuntad_migracion.style.display="none"
        }
    }

    function canalMigracionTres() {
        const canal_solicitud_migracion_dos=document.getElementById("cmigraciondos").value
        const especificar_canal_solicitud_migracion_dos=document.getElementById("canaldmigraciondos")
        if (canal_solicitud_migracion_dos==="otros") {
            especificar_canal_solicitud_migracion_dos.style.display="flex"
        }else{
            especificar_canal_solicitud_migracion_dos.style.display="none"
        }
    }
    // fin de migracion

    // x materias
    const data_x_materia_one=document.getElementById("xmateriasOne")
    const data_x_materia_two=document.getElementById("xmateriasTwo")
    const data_x_materia_three=document.getElementById("xmateriasThree")

    function xMaterias() {
        const x_opcion=document.getElementById("x").value
        data_x_materia_one.style.display="none"
        data_x_materia_two.style.display="none"
        data_x_materia_three.style.display="none"

        switch (x_opcion) {
            case "xMateriasROne":
                idReclamoEscogido=35
                data_x_materia_one.style.display="block"
                break;
            case "xMateriasRTwo":
                idReclamoEscogido=36
                data_x_materia_two.style.display="block"
                break;
            case "xMateriasRThree":
                idReclamoEscogido=37
                data_x_materia_three.style.display="block"
                break;
            default:
                break;
        }
    }

    function canalContratacion() {
        const canal_contratacion_x=document.getElementById("ccontratacion").value
        const especificar_contratacion_x=document.getElementById("txtcontratacion")
        if (canal_contratacion_x==="otros") {
            especificar_contratacion_x.style.display="flex"
        }else{
            especificar_contratacion_x.style.display="none"
        }
    }

    function cPresentacionFLL() {
        const canal_presentacion_x=document.getElementById("cpresentacion").value
        const especificar_canal_presentacion_x=document.getElementById("cpresentacionf")
        if (canal_presentacion_x==="otros") {
            especificar_canal_presentacion_x.style.display="flex"
        }else{
            especificar_canal_presentacion_x.style.display="none"
        }
    }

    function solicitudfll() {
        const adjunta_solicitud_x=document.getElementById("sasfll").value
        const campo_adjunta_solicitud_x=document.getElementById("asfll")
        if (adjunta_solicitud_x==="True") {
            campo_adjunta_solicitud_x.style.display="flex"
        }else{
            campo_adjunta_solicitud_x.style.display="none"
        }
    }
    //  fin de x materias

    function pestañaReclamo() {
        const data_facturacion_cobro=document.getElementById("contenedorFacturacionCobro")
        const data_calidad=document.getElementById("calidadReclamableOpcion")
        const data_incumplimiento=document.getElementById("incumplimentoReclamble")
        const data_falta_servicio=document.getElementById("servicioReclamable")
        const data_instalacion=document.getElementById("instalacionReclamable")
        const data_baja=document.getElementById("bajaReclamables")
        const data_contratacion=document.getElementById("contenedorDatosPersonales")
        const data_migracion=document.getElementById("migracionReclamable")
        const data_x=document.getElementById("xmaterias")

        content_data_servicio_back.style.display="flex"
        title_content_datos_servicios.textContent="Reclamo & Datos de Servicio"
        //
        btn_reclamo.style.display="none"
        //
        materia_elegida_datos_servicio.style.display="none"
        //
        next_reclamo.style.display="flex"

        switch (idReclamo) {
            case 1:
                data_facturacion_cobro.style.display="flex"
                break;
            case 2:
                data_calidad.style.display="block"
                break;
            case 3:
                data_incumplimiento.style.display="block"
                break;
            case 4:
                data_falta_servicio.style.display="block"
                break;
            case 5:
                data_instalacion.style.display="block"
                break;
            case 6:
                data_baja.style.display="block"
                break;
            case 7:
                data_contratacion.style.display="block"
                break;
            case 8:
                data_migracion.style.display="block"
                break;
            case 9:
                data_x.style.display="block"
                break;
            default:
                break;
        }
    }

    const data_reclamo_complete=document.getElementById("data-content-reclamo")

    function continuarReclamo() {
        const title_descargo_cliente=document.getElementById("title-descargo-cliente")
        title_descargo_cliente.textContent="Descripción del problema y solicitud concreta"
        descargo_cliente.style.display="flex"
        //
        data_reclamo_complete.style.display="none"
        //
        mostrar_pp.style.display="flex"
    }

    // find e reclamo

    // para los botones de volver
    function volverDatosPersonales() {
        questions_datos_personales.style.display="block"
    }

    function volveropciondatosservicio() {
        materia_elegida_datos_servicio.style.display="block"
        mostrar_pp.style.display="flex"
        content_data_servicio_back.style.display="none"
    }

    function volverpreguntasyrespuestas() {
        if (tipo_ticket.value==="1") {
            data_reclamo_complete.style.display="block"
            next_reclamo.style.display="flex"
        }if (tipo_ticket.value==="2") {
            data_queja_complete.style.display="block"
            next_queja.style.display="flex"
        } if (tipo_ticket.value==="3") {
            data_content_apelacion_complete.style.display="block"
            next_apelacion.style.display="flex"
        } else {
            data_reclamo_complete.style.display="none"
            data_queja_complete.style.display="none"
            data_content_apelacion_complete.style.display="none"
        }
        content_preguntas_respuestas_back.style.display="none"
    }

    function volverdescargocliente() {
        content_descargo_cliente_back.style.display="block"
        descargo_cliente.style.display="flex"
        //
        content_descargo_cliente_back.style.display="none"
        //
        mostrar_pp.style.display="flex"
    }

    //

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


        const botonEnviar = document.querySelector("#enviar");  // El botón de enviar
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