// const opcionReclamo=document.getElementById("reclamo");
// const opcionQueja=document.getElementById("queja");
// const opcionApelacion=document.getElementById("apelacion");



//pantalla de carga
const loading=document.getElementById("validandoDatos");
loading.style.display="none"

// details de reclamo
const contenedorDetailsReclamo=document.getElementById("contenedorDatosPersonales");
const contenedorDetailsQueja=document.getElementById("quejaRespuestasSelecciones");
const contenedorDetailsApelacion=document.getElementById("apelacionRespuestasSelecciones");

//poniendo nombre a la caja de details de datos personales


const datosPersonalesDetailsContenedor=document.getElementById('contenedorDatosPersonalesDetails');
//

const cajaTotal=document.getElementById("cajaPadre")
// los inputs de los datos

// boton para enviar el todo formulario
const enviar=document.getElementById("btnEnviarFormulario");
enviar.style.display="none";
//
// inicio
// caja de selecion de reclamo - queja - apelacion
const contenedor=document.getElementById("contenedorOpcionesQRA");
// titulo de opcion escojida
const contenedorCajaTitulo=document.getElementById("tituloOpcionesQRA");
const tituloOpcion=document.getElementById("opcionEscojida");
//tituloOpcionEscojida.style.display="none"

// contenedor de usuario - abonado - representante
const contenedorAUR=document.getElementById("contenedorOpcionesAUR");
contenedorAUR.style.display="none";


// funcion ids - para la seleccion de RECLAMO - QUEJA - APELACION
const opcionSeleccionadaReclamos=document.getElementById("reclamo");
const opcionSeleccionadaQueja=document.getElementById("queja");
const opcionSeleccionadaApelacion=document.getElementById("apelacion");

//el valor actual del input
const inputTicket = document.getElementById('tipoticket');
const inputDiagnostico = document.getElementById('diagnostico');


// Evento
// Reclamos
opcionSeleccionadaReclamos.addEventListener("click",function () {
    // El número que deseas agregar, por ejemplo, 12345
    const numT = 3;
    const numD = 34;
        
    // Asignar ese número al valor del input
    inputTicket.value = numT;
    inputDiagnostico.value = numD;

    // desaparecer las cajas de opciones
    contenedor.style.display="none"
    contenedorCajaTitulo.style.display="flex"
    // Escribir la opcion escojida
    tituloOpcion.innerHTML="Reclamo";
    //Mostrar si es ABONADO - USUARIO - REPRESENTANTE
    contenedorAUR.style.display="flex";
    // RECLAMOS

})

//Quejas
opcionSeleccionadaQueja.addEventListener("click",function () {
    // El número que deseas agregar, por ejemplo, 12345
    const numT = 6;
    const numD = 82;
        
    // Asignar ese número al valor del input
    inputTicket.value = numT;
    inputDiagnostico.value = numD;

    // desaparecer las cajas de opciones
    contenedor.style.display="none"
    contenedorCajaTitulo.style.display="flex"
    // Escribir la opcion escojida
    tituloOpcion.innerHTML="Queja";
    //Mostrar si es ABONADO - USUARIO - REPRESENTANTE
    contenedorAUR.style.display="flex";
})

//Apelacion
opcionSeleccionadaApelacion.addEventListener("click",function () {
    // El número que deseas agregar, por ejemplo, 12345
    const numT = 7;
    const numD = 81;
        
    // Asignar ese número al valor del input
    inputTicket.value = numT;
    inputDiagnostico.value = numD;

    // desaparecer las cajas de opciones
    contenedor.style.display="none"
    contenedorCajaTitulo.style.display="flex"
    // Escribir la opcion escojida
    tituloOpcion.innerHTML="Apelación";
    //Mostrar si es ABONADO - USUARIO - REPRESENTANTE
    contenedorAUR.style.display="flex";
})




// funciona los que estan en la siguiente linea
// contenedor de datos personales
const contenedorDatosPersonales=document.getElementById("contenidoDatos")
contenedorDatosPersonales.style.display="none";


function volverRQA() {
    // para mostrar opciones de tipo de reclamo
    contenedor.style.display="flex"
    //para ocultar las cajas el titulo de opciones de reclamo 
    contenedorCajaTitulo.style.display="none"
    //para guardar el details
    datosPersonalesDetailsContenedor.open=false;
    //para ocultar opciones de tipo de personales
    contenedorDatosPersonales.style.display="none";
    //para ocultar el titulo de tipo de personales
    tituloAUR.style.display="none";
    // ocultar la opcion de tipo de personas
    contenedorAUR.style.display="none";
    //ocultar el details de validacion
    dValidacionAbonado.style.display="none"
    dValidacionUsuario.style.display="none"
    cDatosValidacionAbonado.open=false;
    cDatosValidacionUsuario.open=false;
    //oculta todo los datos del formulario
    // reclamo
    sReclamo.style.display="none";
    seleccionarMultipleReclamo.open=false;
    cReclamo.style.display="none"
    //queja
    sQueja.style.display="none";
    seleccionarQueja.open=false;
    cQueja.style.display="none"
    //apelacion
    sApelacion.style.display="none";
    seleccionarApelacion.open=false;
    cApelacion.style.display="none"
    // comentarios finales del reclamo
    extraReclamo.style.display="none";
    contenedorDetailsExtraReclamo.open=false;
    // comentarios finales del queja
    extraQueja.style.display="none";
    contenedorDetailsExtraQueja.open=false;
    // comentarios finales del apelacion
    extraApelacion.style.display="none";
    contenedorDetailsExtraApelacion.open=false;
    //btn de finalizar
    enviar.style.display="none";
    // datos
    // Limpiar todos los campos de tipo input y textarea
    const txtInputs = document.querySelectorAll('input[type="text"], select, textarea, input[type="date"]');
    txtInputs.forEach(function(input) {
        if (input.type === 'radio') {
            input.checked = false; // Para checkboxes y radios
        } else {
            input.value = ''; // Para otros tipos de inputs y select
        }
    });

}


//usuarios
// titulo de usuario
const tituloAUR=document.getElementById("tituloOpcionesAUR");
tituloAUR.style.display="none"
const txtTituloAUR=document.getElementById("tituloAUR");
// contenedores de tipos de usuarios
const tpAbonado=document.getElementById("abonado");
const tpUsuario=document.getElementById("usuario");
const tpRepresentante=document.getElementById("representante")
//datos extras del respresentantes
const dRepresentante=document.getElementById("extra_representante");
// datos extras del usuario
const dUsuarios=document.getElementById("extra_usuario")
//para datos de la validacion abonado
const dValidacionAbonado=document.getElementById("datosValidacionAbonado")
dValidacionAbonado.style.display="none"
const cDatosValidacionAbonado=document.getElementById("contenedorDatosValidacionAbonado")
cDatosValidacionAbonado.open=false;
//para datos de la validacion usuario
const dValidacionUsuario=document.getElementById("datosValidacionUsuario")
dValidacionUsuario.style.display="none"
const cDatosValidacionUsuario=document.getElementById("contenedorDatosValidacionUsuario")
cDatosValidacionUsuario.open=false;


// funcion para mostrar el formulario de los datos personales

tpAbonado.addEventListener("click",function () {
    // para extender el details
    datosPersonalesDetailsContenedor.open=true;
    // para mostrar los datos de validacion
    dValidacionAbonado.style.display="flex"
    cDatosValidacionAbonado.open=true;
    //contenedor de las opciones
    contenedorAUR.style.display="none";
    // el titulo del usuario
    tituloAUR.style.display="flex"
    txtTituloAUR.innerHTML="Abonado";
})

tpUsuario.addEventListener("click",function(){
    // para extender el details
    datosPersonalesDetailsContenedor.open=true;
    // para mostrar los datos de validacion
    dValidacionAbonado.style.display="none"
    dValidacionUsuario.style.display="flex"
    cDatosValidacionUsuario.open=true;
    //contenedor de las opciones
    contenedorAUR.style.display="none";
    // el titulo del usuario
    tituloAUR.style.display="flex"
    txtTituloAUR.innerHTML="Usuario";
})

tpRepresentante.addEventListener("click",function(){
    // para extender el details
    datosPersonalesDetailsContenedor.open=true;
    // datos para mostrar formulario de datos personales
    contenedorDatosPersonales.style.display="flex";
    dUsuarios.style.display="none";
    dRepresentante.style.display="flex";
    //contenedor de las opciones
    contenedorAUR.style.display="none";
    // el titulo del usuario
    tituloAUR.style.display="flex"
    txtTituloAUR.innerHTML="Representante";
    // ocultar datos
    dValidacionAbonado.style.display="none"
    dValidacionUsuario.style.display="none"
})

// para validar los datos del abonado
// Obtener el botón de validación
const vAbonado = document.getElementById("validarFormularioAbonado");

vAbonado.addEventListener("click", function () {
    // Obtener los campos de texto y fecha dentro del formulario de validación
    const txtValidarAbonado = cDatosValidacionAbonado.querySelectorAll("input[type='text'], input[type='date']");
    let validado = true; // Variable para comprobar si todos los campos están llenos

    // Limpiar cualquier mensaje de error previo
    txtValidarAbonado.forEach(txtDatos => {
        const errorMsg = txtDatos.parentElement.querySelector(".txtError");
        if (errorMsg) {
            errorMsg.remove(); // Eliminar el mensaje de error si ya existía
        }
    });

    // Validación de los campos
    txtValidarAbonado.forEach(txtDatos => {
        // Si el campo está vacío
        if (txtDatos.value.trim() === "") {
            const alerta = document.createElement("p");
            alerta.textContent = "Este campo es obligatorio";
            alerta.classList.add("txtError"); // Añadir una clase de estilo

            // Insertar el mensaje de error debajo del campo
            txtDatos.insertAdjacentElement("afterend", alerta);

            // Cambiar la variable de validación a false, ya que hay un campo vacío
            validado = false;
        }
    });

    // Si todos los campos están llenos (validado es true)
    if (validado) {
        // Mostrar el loading
        loading.style.display = "flex";

        // Esperar 3 segundos para simular un retraso y ocultar el loading
        setTimeout(function () {
            loading.style.display = "none"; // Ocultar el loading después de 3 segundos

            // Si los datos son válidos, mostrar el siguiente formulario
            contenedorDatosPersonales.style.display = "flex";
            dRepresentante.style.display = "none";
            dUsuarios.style.display = "none";

            // Ocultar el formulario de validación de abonado
            cDatosValidacionAbonado.open = false;
            dValidacionAbonado.style.display = "none";
        }, 3000); // 3000 ms = 3 segundos
    }
});


// para validar los datos del usuario

const vUsuario=document.getElementById("validarFormularioUsuario");

vUsuario.addEventListener("click",function () {

    const txtValidarUsuario=cDatosValidacionUsuario.querySelectorAll("input[type='text'], input[type='date'],email");
    let validadoUsuario = true; // Variable para comprobar si todos los campos están llenos

    // Limpiar cualquier mensaje de error previo
    txtValidarUsuario.forEach(txtDatosUsuario => {
        const errorMsg = txtDatosUsuario.parentElement.querySelector(".txtError");
        if (errorMsg) {
            errorMsg.remove(); // Eliminar el mensaje de error si ya existía
        }
    });

    // Validación de los campos
    txtValidarUsuario.forEach(txtDatosUsuario => {
        // Si el campo está vacío
        if (txtDatosUsuario.value.trim() === "") {
            const alertaUsuario = document.createElement("p");
            alertaUsuario.textContent = "Este campo es obligatorio";
            alertaUsuario.classList.add("txtError"); // Añadir una clase de estilo

            // Insertar el mensaje de error debajo del campo
            txtDatosUsuario.insertAdjacentElement("afterend", alertaUsuario);

            // Cambiar la variable de validación a false, ya que hay un campo vacío
            validadoUsuario = false;
        }
    });

    // Si todos los campos están llenos (validado es true)
    if (validadoUsuario) {
        // Mostrar el loading
        loading.style.display = "flex";

        // Esperar 3 segundos para simular un retraso y ocultar el loading
        setTimeout(function () {
            loading.style.display = "none"; // Ocultar el loading después de 3 segundos

            // Si necesitas hacer algo después del delay, como cambiar más elementos o mostrar algo
            // datos para mostrar formulario de datos personales
            contenedorDatosPersonales.style.display="flex";
            dUsuarios.style.display="block";
            dRepresentante.style.display="none";
            // ocultar datos de validacion de usuario
            cDatosValidacionUsuario.open=false;
            dValidacionUsuario.style.display="none"

        }, 3000); // 3000 ms = 3 segundos
    }


})

// funcion para volver cuando ya escojio al usuario

function volverUsuario() {
    //para ocultar el titulo de tipos de usuarios
    tituloAUR.style.display="none"
    // para mostrar las opciones de tipos de usuario
    contenedorAUR.style.display="flex";
    // para ocultar los details
    dValidacionAbonado.style.display="none"
    dValidacionUsuario.style.display="none"
    // para ocultar las opciones de representante
    contenedorDatosPersonales.style.display="none";
    //oculta todo los datos del formulario
    // reclamo
    sReclamo.style.display="none";
    seleccionarMultipleReclamo.open=false;
    cReclamo.style.display="none"
    //queja
    sQueja.style.display="none";
    seleccionarQueja.open=false;
    cQueja.style.display="none"
    //apelacion
    sApelacion.style.display="none";
    seleccionarApelacion.open=false;
    cApelacion.style.display="none"
    // comentarios finales del reclamo
    extraReclamo.style.display="none";
    contenedorDetailsExtraReclamo.open=false;
    // comentarios finales del queja
    extraQueja.style.display="none";
    contenedorDetailsExtraQueja.open=false;
    // comentarios finales del apelacion
    extraApelacion.style.display="none";
    contenedorDetailsExtraApelacion.open=false;
    //btn de finalizar
    enviar.style.display="none";

    // Limpiar todos los campos de tipo input y textarea
    const txtInputs = document.querySelectorAll('input[type="text"], select, textarea, input[type="date"],email');
    txtInputs.forEach(function(input) {
        if (input.type === 'radio') {
            input.checked = false; // Para checkboxes y radios
        } else {
            input.value = ''; // Para otros tipos de inputs y select
        }
    });

}

// Datos personales
const txtNum=document.getElementById("numDoc")
txtNum.setAttribute('maxlength', '0');

function tipoDocumento() {
    const option=document.getElementById("tipoDoc").value;

    switch (option) {
        case "DNI":
            txtNum.setAttribute('maxlength', '8');
            break;

        case "RUC":
            txtNum.setAttribute('maxlength', '11');
            break;

        case "Pasaporte":
            txtNum.setAttribute('maxlength', '20');
            break;

        case "CE":
            txtNum.setAttribute('maxlength', '20');
            break;

        case "Otro_Documento":
            txtNum.setAttribute('maxlength', '20');
            break;
    
        default:
            txtNum.setAttribute('maxlength', '0');
            break;
    }

}


// para continuar con el formulario


// Selecciona todas las cajas con la clase 'opcionesPrimero'


const sApelacion=document.getElementById("seleccionarApelacion");
const sQueja=document.getElementById("seleccionarQueja");
const sReclamo=document.getElementById("seleccionarReclamo");

sApelacion.style.display="none";
sQueja.style.display="none";
sReclamo.style.display="none";

// Variable global donde se guardará el valor de 'data-value' del contenedor seleccionado
let valorSeleccionado = null;

// Seleccionamos todos los contenedores de las cajas con el nombre 'cajasValores'
const cajas = document.querySelectorAll('[name="cajasValores"]');

// Iteramos sobre cada uno de los elementos de las cajas
cajas.forEach(function(caja) {
    // Agregamos el evento de clic a cada caja
    caja.addEventListener('click', function() {
        // Obtenemos el valor de 'data-value' del contenedor que se ha clickeado
        valorSeleccionado = caja.getAttribute('data-value');

        // Mostramos el valor obtenido en la consola (solo como ejemplo)
        console.log('Valor seleccionado:', valorSeleccionado);

        // También puedes hacer algo con ese valor, como abrir un formulario o cambiar contenido
    });
});

console.log(valorSeleccionado);

const seleccionarMultipleReclamo=document.getElementById("seleccionMultipleReclamo");
const seleccionarQueja=document.getElementById("seleccionUnicoQueja");
const seleccionarApelacion=document.getElementById("seleccionUnicaApelacion");




const validadFormularioDatosPersonales=document.getElementById("validarFormularioContinuar");
validadFormularioDatosPersonales.addEventListener("click",function () {

    // Seleccionar todos los radio buttons con el nombre 'autorizacion'
    const radios = document.querySelectorAll("input[name='autorizacion']");
    const txtCorreo = document.getElementById("escojerCorreo");

    // Usar 'forEach' para recorrer todos los radio buttons
    let seleccionado = false;

    radios.forEach(function (radio) {
        if (radio.checked) {
            seleccionado = true;  // Si un radio button está seleccionado, actualizar la variable
        }
    });

    // Verificar si ya existe el mensaje de alerta
    let alertaRadio = document.querySelector(".alert");

    // Si no existe el mensaje de alerta, crearlo
    if (!alertaRadio) {
        alertaRadio = document.createElement("p");
        alertaRadio.textContent = "Marcar una opción";
        alertaRadio.classList.add("alert");
        alertaRadio.style.textAlign = "center";
        txtCorreo.insertAdjacentElement("afterend", alertaRadio);
    }

    // Si ninguno está seleccionado, mostrar el mensaje de alerta
    if (!seleccionado) {
        return false;  // Detener el envío del formulario
    }

    // Si ya hay una selección, eliminamos el mensaje de alerta
    if (alertaRadio) {
        alertaRadio.remove();
    }

    switch (valorSeleccionado) {
        case "3":
            datosPersonalesDetailsContenedor.open=false;
            sReclamo.style.display="flex";
            seleccionarMultipleReclamo.open=true;
            break;
        case "6":
            datosPersonalesDetailsContenedor.open=false;
            sQueja.style.display="flex";
            seleccionarQueja.open=true;
            break;
        case "7":
            datosPersonalesDetailsContenedor.open=false;
            sApelacion.style.display="flex";
            seleccionarApelacion.open=true;
            break;
        default:
            break;
    }
    
})


//
/*
*/



    

/*
*/

const cApelacion=document.getElementById("datosApelacion");
const cQueja=document.getElementById("datosQueja");
const cReclamo=document.getElementById("datosReclamos");

cApelacion.style.display="none"
cQueja.style.display="none"
cReclamo.style.display="none"

/* Facturacion */


function selecion() {

    //
    //
    cReclamo.style.display="block";
    //
    const materiaR=document.getElementById("materias");
    const materiasFacturacion=document.getElementById("fc");
    const materiasCalidad=document.getElementById("cs");
    const materiasOfertas=document.getElementById("op");
    const materiasFaltaServicio=document.getElementById("fs");
    const materiasInstalacion=document.getElementById("ia");
    const materiasBaja=document.getElementById("sus");
    const materiasContratacion=document.getElementById("ct");
    const materiasMigracion=document.getElementById("mi");
    const materiasXmaterias=document.getElementById("xma");
    //Opcion

    // facturacion
    const contenidoFacturacion=document.getElementById("contenidoBase");
    contenidoFacturacion.style.display="none";
    //

    //calidad
    const contenidoci=document.getElementById("contenidocaliad");
    contenidoci.style.display="none"
    //

    //incumplimiento
    const incumplimientoO=document.getElementById("contenidoincumplimientoone");
    const incumplimientoT=document.getElementById("contenidoincumplimientotwo");
    const incumplimientoTr=document.getElementById("contenidoincumplimientothree");
    const incumplimientoF=document.getElementById("contenidoincumplimientofour");
    incumplimientoO.style.display="none";
    incumplimientoT.style.display="none";
    incumplimientoTr.style.display="none";
    incumplimientoF.style.display="none";
    //

    //servicio
    const cfsOne=document.getElementById("contenidofservicioone");
    //const cfsTwo=document.getElementById("contenidofserviciotwo");
    const cfsThree=document.getElementById("contenidofsthree");
    const cfsFour=document.getElementById("contenidofsfour");
    cfsOne.style.display="none";
    //cfsTwo.style.display="none";
    cfsThree.style.display="none";
    cfsFour.style.display="none";
    //

    //activacion
    const instalacionUnoDos=document.getElementById("contenidoinstalacionuno")
    const intalacionTresCuatro=document.getElementById("contenidoinstalaciontres")
    const instalacionCinco=document.getElementById("contenidoinstalacioncinco")
    instalacionUnoDos.style.display="none";
    intalacionTresCuatro.style.display="none";
    instalacionCinco.style.display="none";
    //

    //baja
    const bajaOne=document.getElementById("respuestabajauno");
    const bajaDos=document.getElementById("respuestabajados");
    const bajaTres=document.getElementById("respuestastrescuatro");
    bajaOne.style.display="none";
    bajaDos.style.display="none";
    bajaTres.style.display="none";
    //

    // contratacion
    const contratosUno=document.getElementById("respuestascontratosbase");
    const contratoDos=document.getElementById("respuestascontratosdos");
    const contratosTres=document.getElementById("respuestascontratostres");
    const contratoCuatro=document.getElementById("respuestascontratoscuatros");
    contratosUno.style.display="none";
    contratoDos.style.display="none";
    contratosTres.style.display="none";
    contratoCuatro.style.display="none";
    //

    //migracion
    const migracionUno=document.getElementById("respuestasMigracionBase");
    // const migracionDos=document.getElementById("respuestasMigracionDos");
    // const migracionTres=document.getElementById("respuestaMigracionTres");
    // const migracionCuatro=document.getElementById("respuestaMigracionesCuatro");
    // const datoExtraUno=document.getElementById("respuestaMigracionUno");
    migracionUno.style.display="none";
    // migracionDos.style.display="none";
    // migracionTres.style.display="none";
    // migracionCuatro.style.display="none";
    // datoExtraUno.style.display="none";
    //

    // otros
    const xReclamablesUno=document.getElementById("xmateriasOne");
    const xReclamablesDos=document.getElementById("xmateriasTwo");
    const xReclamablesTres=document.getElementById("xmateriasThree");
    xReclamablesUno.style.display="none";
    xReclamablesDos.style.display="none";
    xReclamablesTres.style.display="none";
    //

    //details
    document.getElementById('seleccionMultipleReclamo').open = true;

    switch (materiaR.value) {

        case "fcs":
            
            materiasFacturacion.style.display = 'block';
            materiasCalidad.style.display = 'none';
            materiasOfertas.style.display = 'none';
            materiasFaltaServicio.style.display = 'none';
            materiasInstalacion.style.display = 'none';
            materiasBaja.style.display = 'none';
            materiasContratacion.style.display = 'none';
            materiasMigracion.style.display = 'none';
            materiasXmaterias.style.display = 'none';
            break;

        case "calidad":

            materiasFacturacion.style.display = 'none';
            materiasCalidad.style.display = 'block';
            materiasOfertas.style.display = 'none';
            materiasFaltaServicio.style.display = 'none';
            materiasInstalacion.style.display = 'none';
            materiasBaja.style.display = 'none';
            materiasContratacion.style.display = 'none';
            materiasMigracion.style.display = 'none';
            materiasXmaterias.style.display = 'none';
            break;

        case "oferta":

            materiasFacturacion.style.display = 'none';
            materiasCalidad.style.display = 'none';
            materiasOfertas.style.display = 'block';
            materiasFaltaServicio.style.display = 'none';
            materiasInstalacion.style.display = 'none';
            materiasBaja.style.display = 'none';
            materiasContratacion.style.display = 'none';
            materiasMigracion.style.display = 'none';
            materiasXmaterias.style.display = 'none';
            break;
            
        case "falta":
        
            materiasFacturacion.style.display = 'none';
            materiasCalidad.style.display = 'none';
            materiasOfertas.style.display = 'none';
            materiasFaltaServicio.style.display = 'block';
            materiasInstalacion.style.display = 'none';
            materiasBaja.style.display = 'none';
            materiasContratacion.style.display = 'none';
            materiasMigracion.style.display = 'none';
            materiasXmaterias.style.display = 'none';

            break;

        case "instalacion":

            materiasFacturacion.style.display = 'none';
            materiasCalidad.style.display = 'none';
            materiasOfertas.style.display = 'none';
            materiasFaltaServicio.style.display = 'none';
            materiasInstalacion.style.display = 'block';
            materiasBaja.style.display = 'none';
            materiasContratacion.style.display = 'none';
            materiasMigracion.style.display = 'none';
            materiasXmaterias.style.display = 'none';

            break;
            
        case "baja":
            
            materiasFacturacion.style.display = 'none';
            materiasCalidad.style.display = 'none';
            materiasOfertas.style.display = 'none';
            materiasFaltaServicio.style.display = 'none';
            materiasInstalacion.style.display = 'none';
            materiasBaja.style.display = 'block';
            materiasContratacion.style.display = 'none';
            materiasMigracion.style.display = 'none';
            materiasXmaterias.style.display = 'none';

            break;

        case "contratacion":
            
            materiasFacturacion.style.display = 'none';
            materiasCalidad.style.display = 'none';
            materiasOfertas.style.display = 'none';
            materiasFaltaServicio.style.display = 'none';
            materiasInstalacion.style.display = 'none';
            materiasBaja.style.display = 'none';
            materiasContratacion.style.display = 'block';
            materiasMigracion.style.display = 'none';
            materiasXmaterias.style.display = 'none';

            break;

        case "migracion":

            materiasFacturacion.style.display = 'none';
            materiasCalidad.style.display = 'none';
            materiasOfertas.style.display = 'none';
            materiasFaltaServicio.style.display = 'none';
            materiasInstalacion.style.display = 'none';
            materiasBaja.style.display = 'none';
            materiasContratacion.style.display = 'none';
            materiasMigracion.style.display = 'block';
            materiasXmaterias.style.display = 'none';

            break;
            
        case "xmaterias":
            
            materiasFacturacion.style.display = 'none';
            materiasCalidad.style.display = 'none';
            materiasOfertas.style.display = 'none';
            materiasFaltaServicio.style.display = 'none';
            materiasInstalacion.style.display = 'none';
            materiasBaja.style.display = 'none';
            materiasContratacion.style.display = 'none';
            materiasMigracion.style.display="none";
            materiasXmaterias.style.display = 'block';
            //cCalidad.style.display="none"

            break;
    
        default:
            materiasFacturacion.style.display = 'none';
            materiasCalidad.style.display = 'none';
            materiasOfertas.style.display = 'none';
            materiasFaltaServicio.style.display = 'none';
            materiasInstalacion.style.display = 'none';
            materiasBaja.style.display = 'none';
            materiasContratacion.style.display = 'none';
            materiasMigracion.style.display="none";
            materiasXmaterias.style.display = 'none';
            //
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }


}



/* facturacion */

function facturado() {  

    const oFacturado=document.getElementById("facturados").value;
    const nRecibo=document.getElementById("nReciboBase");
    const contenidoFacturacion=document.getElementById("contenidoBase");
    const conceptoFacturado=document.getElementById("cfCondicion");
    const tarifaUsuario=document.getElementById("cfCondicionDos");
    const medioPagoFacturacion=document.getElementById("cfCondicionCinco");
    const adHojaPagoFacturacion=document.getElementById("cfCondicionSeis");
    const numDocCobro=document.getElementById("numDocCobroSeis");
    //
    //const selectElement = document.getElementById('facturados');
    //
    nRecibo.style.display="none";
    contenidoFacturacion.style.display="none";
    tarifaUsuario.style.display="none";
    conceptoFacturado.style.display="none";
    medioPagoFacturacion.style.display="none";
    adHojaPagoFacturacion.style.display="none";
    numDocCobro.style.display="none";
    //
    //selectElement.value = ""; 
    //
    document.getElementById('detailsReclamoDs').open = true;
    document.getElementById('seleccionMultipleReclamo').open = false;

    switch (oFacturado) {

        case "calculo":
            nRecibo.style.display="block";
            contenidoFacturacion.style.display="flex";
            conceptoFacturado.style.display="block";
            break;
        
        case "tarifa":
            nRecibo.style.display="block";
            contenidoFacturacion.style.display="flex";
            tarifaUsuario.style.display="block"
            conceptoFacturado.style.display="block";
            break;

        case "reconexion":
            nRecibo.style.display="block";
            contenidoFacturacion.style.display="flex";
            conceptoFacturado.style.display="none";
            break;

        case "dmonto":
            nRecibo.style.display="block";
            contenidoFacturacion.style.display="flex";
            conceptoFacturado.style.display="block";
            break;
        
        case "noprocesado":
            nRecibo.style.display="block";
            contenidoFacturacion.style.display="flex";
            medioPagoFacturacion.style.display="flex";
            break;

        case "nfacturados":
            numDocCobro.style.display="block"
            contenidoFacturacion.style.display="flex";
            adHojaPagoFacturacion.style.display="flex";
            break;

        case "cequipos":
            nRecibo.style.display="block";
            contenidoFacturacion.style.display="flex";
            break;
        
        case "incremento":
            nRecibo.style.display="block";
            contenidoFacturacion.style.display="flex";
            break;
    
        default:
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }



    //
    //console.log(selectFacturado);
    

    //guardarSeleccion();


    // el objeto selecionado;
    //const selectFacturado = document.getElementById("facturados").options[document.getElementById("facturados").selectedIndex].text;
    //console.log(selectFacturado);
}

function hojaFacturado(){
    const hoja=document.getElementById("hpfacturado").value;
    const fileFacturacion=document.getElementById("fhpf");
    fileFacturacion.style.display="none";
    
    switch (hoja) {
        case "si":
            fileFacturacion.style.display="block"
            break;
    
        default:
            fileFacturacion.style.display="none";
            break;
    }

}

function mdPagoFacturacion() {
    
    const xMedioPago=document.getElementById("mPago").value;
    const especificarMedioPagoFacturacion=document.getElementById("especificarMPfacturacion");

    especificarMedioPagoFacturacion.style.display="none";

    switch (xMedioPago) {
        case "otro":
            especificarMedioPagoFacturacion.style.display="block";
            break;
    
        default:
            break;
    }

}

/* Fin de facturacion */

/* calidad */

function calidad() {

    const oCalidad=document.getElementById("calidadidoneidad");
    const contenidoci=document.getElementById("contenidocaliad");
    document.getElementById('detailsReclamoDs').open = true;
    //calidad
    contenidoci.style.display="none";
    document.getElementById('detailsReclamoDs').open = true;
    document.getElementById('seleccionMultipleReclamo').open = false;

    switch (oCalidad.value) {

        case "calidaduno":
            contenidoci.style.display="flex"
            break;
    
        default:
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }

    // el objeto selecionado;
    //const selectCalidad = document.getElementById("calidadidoneidad").options[document.getElementById("calidadidoneidad").selectedIndex].text;
    //console.log(selectCalidad);
}

/* Fin de calidad */

/* incumplimiento */

function incumpliento() {
    
    const oincumplimiento=document.getElementById("ofertas");
    const incumplimientoO=document.getElementById("contenidoincumplimientoone");
    const incumplimientoT=document.getElementById("contenidoincumplimientotwo");
    const incumplimientoTr=document.getElementById("contenidoincumplimientothree");
    const incumplimientoF=document.getElementById("contenidoincumplimientofour");
    incumplimientoO.style.display="none";
    incumplimientoT.style.display="none";
    incumplimientoTr.style.display="none";
    incumplimientoF.style.display="none";
    //
    document.getElementById('detailsReclamoDs').open = true;
    document.getElementById('seleccionMultipleReclamo').open = false;

    switch (oincumplimiento.value) {

        case "incumplimientoUNO":
            incumplimientoO.style.display="block"
            break;
    
        case "incumplimientoDOS":
            incumplimientoT.style.display="block"
            //
            break;

        case "incumplimientoTRES":
            incumplimientoTr.style.display="block"
            //
            break;
    
        case "incumplimientoCUATRO":
            incumplimientoF.style.display="block"
            //
            break;
        
        default:
            //
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }


}

function canalPromocion() {
    const canalPromocion=document.getElementById("cbpromocion").value;
    const txtPromocion=document.getElementById("txtcpromocion");

    switch (canalPromocion) {
        case "otro":
            txtPromocion.style.display="block";
            break;
    
        default:
            txtPromocion.style.display="none";
            break;
    }

}

function canalPromocionCuatro() {
    const cPromocionC=document.getElementById("cnPromocionCuatro").value;
    const txtPromocionC=document.getElementById("txtcpromocioC");


    switch (cPromocionC) {
        case "otro":
            txtPromocionC.style.display="block";
            break;
    
        default:
            txtPromocionC.style.display="none";
            break;
    }
}

/* Fin de incumplimiento */


/* falta de servicio */

function faltaServicios() {

    const fServicio=document.getElementById("fservicio")
    const cfsOne=document.getElementById("contenidofservicioone");
    const cfsThree=document.getElementById("contenidofsthree");
    const cfsFour=document.getElementById("contenidofsfour");
    //
    const fsOneOpcion=document.getElementById("fsOne");
    const fsTwoOpcion=document.getElementById("fsTwo");
    const fsF=document.getElementById("fsFile");
    //
    fsOneOpcion.style.display="none";
    fsTwoOpcion.style.display="none";
    fsF.style.display="none";
    //
    cfsOne.style.display="none";
    //cfsTwo.style.display="none";
    cfsThree.style.display="none";
    cfsFour.style.display="none";
    //
    document.getElementById('detailsReclamoDs').open = true;
    document.getElementById('seleccionMultipleReclamo').open = false;
    
    switch (fServicio.value) {

        case "servicioone":
            cfsOne.style.display="block";
            fsTwoOpcion.style.display="none";
            fsOneOpcion.style.display="block";
            break;

        case "serviciotwo":
            fsOneOpcion.style.display="none";
            cfsOne.style.display="block";
            fsTwoOpcion.style.display="block";
            fsF.style.display="block";
            break;

        case "serviciothree":
            cfsThree.style.display="block";
            break;

        case "serviciofour":
            cfsFour.style.display="block";
            break;
    
        default:
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }
}

function fsrecibo(){
    const adjuntaRecibo=document.getElementById("adrecibos").value;
    const adjuntarElRecibo=document.getElementById("adRecibofs");
    //

    switch (adjuntaRecibo) {
        case "si":
            adjuntarElRecibo.style.display="block";
            break;
    
        default:
            adjuntarElRecibo.style.display="none";
            break;
    }

}

function mpagosfs() {
    const mediosPagos=document.getElementById("mpagos").value;
    const medioPagoEspecifique=document.getElementById("txtmpagos");

    switch (mediosPagos) {
        case "otros": 
            medioPagoEspecifique.style.display="block";
            break;
    
        default:
            medioPagoEspecifique.style.display="none";
            break;
    }
}

function fsreciboPendiente() {
    const recibosPendientes=document.getElementById("adrecibosPendiente").value;
    const fileRPendiente=document.getElementById("adReciboPendientefs");


    switch (recibosPendientes) {
        case "si":
            fileRPendiente.style.display="block";
            break;
    
        default:
            fileRPendiente.style.display="none";
            break;
    }
}

/* fin de falta de servicio */

/* activaciones */

function instalaciones() {
    const instalacionOpcion=document.getElementById("instalacion")
    const instalacionUnoDos=document.getElementById("contenidoinstalacionuno")
    const intalacionTresCuatro=document.getElementById("contenidoinstalaciontres")
    const instalacionCinco=document.getElementById("contenidoinstalacioncinco")
    instalacionUnoDos.style.display="none";
    intalacionTresCuatro.style.display="none";
    instalacionCinco.style.display="none";
    //
    document.getElementById('detailsReclamoDs').open = true;
    document.getElementById('seleccionMultipleReclamo').open = false;

    switch (instalacionOpcion.value) {
        case "instalacionesUno":
            instalacionUnoDos.style.display="block";
            break;

        case "instalacionesDos":
            instalacionUnoDos.style.display="block";
            break;

        case "instalacionesTres":
            intalacionTresCuatro.style.display="block";
            break;
            
        case "instalacionesCuatro":
            intalacionTresCuatro.style.display="block";
            break;
    
        case "instalacionesCinco":
            instalacionCinco.style.display="block";
            break;

        default:
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }
}

function soltrasladoe() {
    const opTraslado=document.getElementById("strasladoe").value;
    const espTraslado=document.getElementById("estraslado");

    switch (opTraslado) {
        case "otros":
            espTraslado.style.display="block"
            break;
    
        default:
            espTraslado.style.display="none";
            break;
    }
}

function adsTraslado() {
    const adsopcion=document.getElementById("adsOpcionTraslado").value;
    const adjuntarSolicitud=document.getElementById("adsot");

    switch (adsopcion) {
        case "si":
            adjuntarSolicitud.style.display="block";
            break;
    
        default:
            adjuntarSolicitud.style.display="none";
            break;
    }

}

function canalTrasladoCinco() {
    const opcionCtraslado=document.getElementById("ctopcionCinco").value;
    const textoTraslado=document.getElementById("txtCincoTraslado");

    switch (opcionCtraslado) {
        case "otros":
            textoTraslado.style.display="block";
            break;
    
        default:
            textoTraslado.style.display="none"
            break;
    }

}

function opcionTrasladoCuatro() {
    const opcionS=document.getElementById("opcionCuatroTraslado").value;
    const fileCuatro=document.getElementById("asbaja")

    switch (opcionS) {
        case "si":
            fileCuatro.style.display="block";
            break;
    
        default:
            fileCuatro.style.display="none";
            break;
    }

}


/* fin de activaciones */

/* baja */

function baja() {
    const opcionBaja=document.getElementById("sb");
    const bajaOne=document.getElementById("respuestabajauno");
    const bajaDos=document.getElementById("respuestabajados");
    const bajaTres=document.getElementById("respuestastrescuatro");
    bajaOne.style.display="none";
    bajaDos.style.display="none";
    bajaTres.style.display="none";

    document.getElementById('detailsReclamoDs').open = true;
    document.getElementById('seleccionMultipleReclamo').open = false;

    switch (opcionBaja.value) {
        case "bajaUno":
            bajaOne.style.display="block";
            break;

        case "bajaDos":
            bajaDos.style.display="block";
            break;

        case "bajaTres":
            bajaOne.style.display="block";
            bajaTres.style.display="block";   
            break;

        case "bajaCuatro":
                
            bajaDos.style.display="block";
            bajaTres.style.display="block";   
            break;
    
        default:  
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }
}

function canaldBaja() {
    const canalBaja=document.getElementById("cbaja").value;
    const especificarBaja=document.getElementById("txtcanalbaja")

    switch (canalBaja) {
        case "otros":
            especificarBaja.style.display="block";
            break;
    
        default:
            especificarBaja.style.display="none";
            break;
    }
}

function adjuntarBaja() {
    const opcionBaja=document.getElementById("asb").value;
    const adjuntoBaja=document.getElementById("asbaja")


    switch (opcionBaja) {
        case "si":
            adjuntoBaja.style.display="block";
            break;
    
        default:
            adjuntoBaja.style.display="none";
            break;
    }

}

function canalTraslado() {
    const sTraslado=document.getElementById("ctraslado").value;
    const txtTraslado=document.getElementById("txtcanalTraslado");

    switch (sTraslado) {
        case "otros":
            txtTraslado.style.display="block";
            break;
    
        default:
            txtTraslado.style.display="none";
            break;
    }
}

function adjuntarTraslado() {
    const asTraslado=document.getElementById("asT").value;
    const fileTraslado=document.getElementById("asTraslado");

    switch (asTraslado) {
        case "si":
            fileTraslado.style.display="block";
            break;
    
        default:
            fileTraslado.style.display="none";
            break;
    }

}

/* fin de baja */

/* contratacion */

function contratos() {

    const contratoOpcion=document.getElementById("con");
    const contratosUno=document.getElementById("respuestascontratosbase");
    const contratoDos=document.getElementById("respuestascontratosdos");
    const contratosTres=document.getElementById("respuestascontratostres");
    const contratoCuatro=document.getElementById("respuestascontratoscuatros");
    contratosUno.style.display="none";
    contratoDos.style.display="none";
    contratosTres.style.display="none";
    contratoCuatro.style.display="none";
    ///
    document.getElementById('detailsReclamoDs').open = true;
    document.getElementById('seleccionMultipleReclamo').open = false;

    switch (contratoOpcion.value) {
        case "conuno":
            contratosUno.style.display="block";
            
            break;
        
        case "condos":
            contratosUno.style.display="block";
            contratoDos.style.display="block";
            break;

        case "contres":
            contratosUno.style.display="block";
            contratosTres.style.display="block";
            break;
        
        case "concuatro":
            contratosUno.style.display="block";
            break;
    
        default:
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }


}

/* fin de contratacion */

/* Migracion */

function migracionReclamable() {

    const opcionMigracion=document.getElementById("mig").value;
    const migracionUno=document.getElementById("respuestasMigracionBase");
    const migracionDos=document.getElementById("respuestasMigracionDos");
    const migracionTres=document.getElementById("montoReclamadoStres");
    const migracionCuatro=document.getElementById("respuestaMigracionesCuatro");
    const datoExtraUno=document.getElementById("respuestaMigracionUno");
    //
    migracionUno.style.display="none";
    migracionDos.style.display="none";
    // migracionTres.style.display="none";
    migracionCuatro.style.display="none";
    // datoExtraUno.style.display="none";
    // const aDatos=document.getElementById("adsdos");
    // aDatos.style.display="none"

    document.getElementById('detailsReclamoDs').open = true;
    document.getElementById('seleccionMultipleReclamo').open = false;
    
    switch (opcionMigracion) {
        case "migracionOne":
            migracionUno.style.display="block";
            break;

        case "migracionTwo":
            migracionUno.style.display="block";
            migracionDos.style.display="block";
            break;

        case "migracionThree":
            migracionUno.style.display="block";
            break;

        case "migracionFour":
            migracionCuatro.style.display="block";
            break;
    
        default:
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }

}

function canalMigracion() {
    const canalMigracion=document.getElementById("cmigracion").value;
    const eMigracion=document.getElementById("canaldmigracion");

    switch (canalMigracion) {
        case "otros":
            eMigracion.style.display="block";
            break;
    
        default:
            eMigracion.style.display="none";
            break;
    }
}

function asolicitud() {
    const docM=document.getElementById("asm").value;
    const docF=document.getElementById("asmf");

    switch (docM) {
        case "si":
            docF.style.display="block";        
            break;
    
        default:
            docF.style.display="none";       
            break;
    }
}

/* fin de migraciones */

/* OTROS */

function xMaterias() {

    const xMateriasReclamables=document.getElementById("x");
    const xReclamablesUno=document.getElementById("xmateriasOne");
    const xReclamablesDos=document.getElementById("xmateriasTwo");
    const xReclamablesTres=document.getElementById("xmateriasThree");
    xReclamablesUno.style.display="none";
    xReclamablesDos.style.display="none";
    xReclamablesTres.style.display="none";

    document.getElementById('detailsReclamoDs').open = true;
    document.getElementById('seleccionMultipleReclamo').open = false;

    
    switch (xMateriasReclamables.value) {

        case "xMateriasROne":
            xReclamablesUno.style.display="block";
            break;

        case "xMateriasRTwo":
            xReclamablesDos.style.display="block";
            break;

        case "xMateriasRThree":
            xReclamablesTres.style.display="block";
            break;
    
        default:
            document.getElementById('detailsReclamoDs').open = false;
            break;
    }


}

function canalContratacion() {
    const contratacion=document.getElementById("ccontratacion").value;
    const especificar=document.getElementById("txtcontratacion");

    switch (contratacion) {
        case "otros":
            especificar.style.display="block";
            break;
    
        default:
            especificar.style.display="none";
            break;
    }

}

function cPresentacionFLL() {
    const cpfll=document.getElementById("cpresentacion").value;
    const presentacionfll=document.getElementById("cpresentacionf");

    switch (cpfll) {
        case "otros":
            presentacionfll.style.display="block";
            break;
    
        default:
            presentacionfll.style.display="none";
            break;
    }

}

function solicitudfll() {
    const solicitdu=document.getElementById("sasfll").value;
    const dfll=document.getElementById("asfll");

    switch (solicitdu) {
        case "si":
            dfll.style.display="block";
            break;
    
        default:
            dfll.style.display="none";
            break;
    }

}

function pestañaReclamo() {
    document.getElementById('detailsReclamoDs').open=false;
    contenedorDetailsReclamo.open = true;
}

/* FIN DE OTROS */
/* FIN DE RECLAMOS */


/* EMPIEZA LAS QUEJAS */

function quejas() {

    cQueja.style.display="block"
    //
    const opcionQueja=document.getElementById("quejasOpciones");
    const quejaRespuestaUno=document.getElementById("quejaPreguntaUno");
    const quejaRespuestaDos=document.getElementById("quejaPreguntaDos");
    const quejaRespuestaTres=document.getElementById("quejaPreguntaTres");
    const quejaRespuestaCuatro=document.getElementById("quejaPreguntaCuatro");
    const quejaRespuestaCinco=document.getElementById("quejaPreguntaCinco");
    const quejaRespuestaSeis=document.getElementById("quejaPreguntaSeis");
    //la condicion
    const cajaReclamoenQueja=document.getElementById("datosReclamos");
    const cajaApelacionenQueja=document.getElementById("datosApelacion");
    // los details
    document.getElementById('detailsQuejaDs').open = true;
    document.getElementById('seleccionUnicoQueja').open=false;


    switch (opcionQueja.value) {
        case "quejaUno":
            quejaRespuestaUno.style.display="block";
            quejaRespuestaDos.style.display="none";
            quejaRespuestaTres.style.display="none";
            quejaRespuestaCuatro.style.display="none";
            quejaRespuestaCinco.style.display="none";
            quejaRespuestaSeis.style.display="none";
            //condicion
            cajaReclamoenQueja.style.display="none"
            cajaApelacionenQueja.style.display="none"
            break;

        case "quejaDos":
            quejaRespuestaUno.style.display="none";
            quejaRespuestaDos.style.display="flex";
            quejaRespuestaTres.style.display="none";
            quejaRespuestaCuatro.style.display="none";
            quejaRespuestaCinco.style.display="none";
            quejaRespuestaSeis.style.display="none";
            //condicion
            cajaReclamoenQueja.style.display="none"
            cajaApelacionenQueja.style.display="none"
            break;

        case "quejaTres":
            quejaRespuestaUno.style.display="none";
            quejaRespuestaDos.style.display="none";
            quejaRespuestaTres.style.display="block";
            quejaRespuestaCuatro.style.display="none";
            quejaRespuestaCinco.style.display="none";
            quejaRespuestaSeis.style.display="none";
            //condicion
            cajaReclamoenQueja.style.display="none"
            cajaApelacionenQueja.style.display="none"
            break;
            
        case "quejaCuatro":
            quejaRespuestaUno.style.display="none";
            quejaRespuestaDos.style.display="none";
            quejaRespuestaTres.style.display="none";
            quejaRespuestaCuatro.style.display="block";
            quejaRespuestaCinco.style.display="none";
            quejaRespuestaSeis.style.display="none";
            //condicion
            cajaReclamoenQueja.style.display="none"
            cajaApelacionenQueja.style.display="none"
            break;

        case "quejaCinco":
            quejaRespuestaUno.style.display="none";
            quejaRespuestaDos.style.display="none";
            quejaRespuestaTres.style.display="none";
            quejaRespuestaCuatro.style.display="none";
            quejaRespuestaCinco.style.display="block";
            quejaRespuestaSeis.style.display="none";
            //condicion
            cajaReclamoenQueja.style.display="none"
            cajaApelacionenQueja.style.display="none"
            break;

        case "quejaSeis":
            quejaRespuestaUno.style.display="none";
            quejaRespuestaDos.style.display="none";
            quejaRespuestaTres.style.display="none";
            quejaRespuestaCuatro.style.display="none";
            quejaRespuestaCinco.style.display="none";
            quejaRespuestaSeis.style.display="block";
            //condicion
            cajaReclamoenQueja.style.display="none"
            cajaApelacionenQueja.style.display="none"
            break;
            
    
        default:
            quejaRespuestaUno.style.display="none";
            quejaRespuestaDos.style.display="none";
            quejaRespuestaTres.style.display="none";
            quejaRespuestaCuatro.style.display="none";
            quejaRespuestaCinco.style.display="none";
            quejaRespuestaSeis.style.display="none";
            cajaReclamoenQueja.style.display="none"
            //cajaQuejaenQueja.style.display="none"
            cajaApelacionenQueja.style.display="none"
            //
            document.getElementById('detailsQuejaDs').open=false;
            break;
    }


}

function canal() {
    const cPresentacion=document.getElementById("canalPresentacion").value;
    const cQueja = document.getElementById("canalQueja");


    switch (cPresentacion) {
        case "otro":
            cQueja.style.display="block"
            break;
    
        default:
            cQueja.style.display="none"
            break;
    }

}

function adjuntaPruebaQueja() {
    const aPrueba=document.getElementById("adjuntaPrueba").value;
    const pQueja=document.getElementById("pruebaQuejas")

    switch (aPrueba) {
        case "si":
            pQueja.style.display="block"
            break;
    
        default:
            pQueja.style.display="none"
            break;
    }

}

function constanciaPago() {
    const cPagoQueja=document.getElementById("constanciaPagoQueja").value;
    const cpago=document.getElementById("constanciaPago");

    switch (cPagoQueja) {
        case "si":
            cpago.style.display="block";
            break;
    
        default:
            cpago.style.display="none";
            break;
    }
}

function pagoCuenta() {
    
    const pcQueja=document.getElementById("pagoCuentaQueja").value;
    const dpQueja=document.getElementById("dpagocuenta");

    switch (pcQueja) {
        case "otros":
            dpQueja.style.display="block"
            break;
    
        default:
            dpQueja.style.display="none"
            break;
    }

}

function capturaQueja() {
    const cQueja=document.getElementById("capturaQuejaCinco").value;
    const mprobatorio=document.getElementById("mpQueja");

    switch (cQueja) {
        case "si":
            mprobatorio.style.display="block";
            break;
    
        default:
            mprobatorio.style.display="none";
            break;
    }
}

function defectos() {
    const dPruebaTramitacion=document.getElementById("dtramitacion").value;
    const dptramitacion=document.getElementById("dptramitacion")

    switch (dPruebaTramitacion) {
        case "si":
            dptramitacion.style.display="block"
            break;
    
        default:
            dptramitacion.style.display="none"
            break;
    }
}

function pestañaQueja() {
    document.getElementById('detailsQuejaDs').open=false;
    contenedorDetailsQueja.open=true
}

/* Fin de queja */

/* Apelacion */

function apelaciones() {
    cApelacion.style.display="block"

    const apelacion=document.getElementById("apelacionOpciones")
    const apelacionoOne=document.getElementById("apelacionUno")
    const apelacionoTwo=document.getElementById("apelacionDos")
    const apelacionoThree=document.getElementById("apelacionTres")
    const apelacionoFour=document.getElementById("apelacionCuatro")
    const apelacionoFive=document.getElementById("apelacionCinco")
    const apelacionoSix=document.getElementById("apelacionSeis")
    //condiciones
    const cajaReclamoenApelacion=document.getElementById("datosReclamos");
    const cajaQuejaenApelacion=document.getElementById("datosQueja");
    //const cajaApelacionenApelacion=document.getElementById("datosApelacion");
    //limpiarInputsApelacion();
    //limpiarInputs();
    //

    document.getElementById('detailsApelacionDs').open = true;
    document.getElementById('seleccionUnicaApelacion').open=false;

    switch (apelacion.value) {

        case "apelacionOne":
            apelacionoOne.style.display="block"
            apelacionoTwo.style.display="none"
            apelacionoThree.style.display="none"
            apelacionoFour.style.display="none"
            apelacionoFive.style.display="none"
            apelacionoSix.style.display="none"
            //
            cajaQuejaenApelacion.style.display="none";
            cajaReclamoenApelacion.style.display="none";

            break;

        case "apelacionTwo":
            apelacionoOne.style.display="none"
            apelacionoTwo.style.display="block"
            apelacionoThree.style.display="none"
            apelacionoFour.style.display="none"
            apelacionoFive.style.display="none"
            apelacionoSix.style.display="none"
            //
            cajaQuejaenApelacion.style.display="none";
            cajaReclamoenApelacion.style.display="none";
            break;

        case "apelacionThree":
            apelacionoOne.style.display="none"
            apelacionoTwo.style.display="none"
            apelacionoThree.style.display="block"
            apelacionoFour.style.display="none"
            apelacionoFive.style.display="none"
            apelacionoSix.style.display="none"
            //
            cajaQuejaenApelacion.style.display="none";
            cajaReclamoenApelacion.style.display="none";
            break;

        case "apelacionFour":
            apelacionoOne.style.display="none"
            apelacionoTwo.style.display="none"
            apelacionoThree.style.display="none"
            apelacionoFour.style.display="block"
            apelacionoFive.style.display="none"
            apelacionoSix.style.display="none"
            //
            //resetSelect();
            //
            cajaQuejaenApelacion.style.display="none";
            cajaReclamoenApelacion.style.display="none";
            //
            break;
        case "apelacionFive":
            apelacionoOne.style.display="none"
            apelacionoTwo.style.display="none"
            apelacionoThree.style.display="none"
            apelacionoFour.style.display="none"
            apelacionoFive.style.display="block"
            apelacionoSix.style.display="none"
            //
            //resetSelect();
            //
            cajaQuejaenApelacion.style.display="none";
            cajaReclamoenApelacion.style.display="none";
            break;

        case "apelacionSix":
            apelacionoOne.style.display="none"
            apelacionoTwo.style.display="none"
            apelacionoThree.style.display="none"
            apelacionoFour.style.display="none"
            apelacionoFive.style.display="none"
            apelacionoSix.style.display="block"
            //
            cajaQuejaenApelacion.style.display="none";
            cajaReclamoenApelacion.style.display="none";
            break;
    
        default:
            apelacionoOne.style.display="none"
            apelacionoTwo.style.display="none"
            apelacionoThree.style.display="none"
            apelacionoFour.style.display="none"
            apelacionoFive.style.display="none"
            apelacionoSix.style.display="none"
            //
            cajaQuejaenApelacion.style.display="none";
            cajaReclamoenApelacion.style.display="none";
            //
            document.getElementById('detailsApelacionDs').open = false;
            break;
    }


}

function apelacionCuatro() {
    const aCuatro=document.getElementById("apelacionopcioncuatro").value;
    const cCuatro=document.getElementById("apelacionCuatroSi");

    cCuatro.style.display="none";

    switch (aCuatro) {
        case "si":
            cCuatro.style.display="block"
            break;
    
        default:
            break;
    }

}

function apelacionCinco() {
    const aCinco=document.getElementById("apelacionOpcioncinco").value;
    const cCinco=document.getElementById("apelacionCincoSi");

    cCinco.style.display="none";

    switch (aCinco) {
        case "si":
            cCinco.style.display="block"
            break;
    
        default:
            break;
    }

}

function pestañaApelacion() {
    document.getElementById('detailsApelacionDs').open=false;
    contenedorDetailsApelacion.open=true
}

/* el descargo del cliente */

const extraReclamo=document.getElementById("informacionExtraReclamo");
const extraQueja=document.getElementById("informacionExtraQueja");
const extraApelacion=document.getElementById("informacionExtraApelacion");


extraReclamo.style.display="none";
extraQueja.style.display="none";
extraApelacion.style.display="none";

// detail de la informacion extra
const contenedorDetailsExtraReclamo=document.getElementById("detailsIExtraReclamo");
const contenedorDetailsExtraQueja=document.getElementById("detailIExtraQueja");
const contenedorDetailsExtraApelacion=document.getElementById("detailsIExtraApelacion");

contenedorDetailsExtraReclamo.open=false;
contenedorDetailsExtraQueja.open=false;
contenedorDetailsExtraApelacion.open=false;


/* despues de formulario  reclamo*/

const validarFormularioReclamo=document.getElementById("continuarFormulario");

validarFormularioReclamo.addEventListener("click",function () {
    extraReclamo.style.display="block";
    contenedorDetailsExtraReclamo.open=true;
    contenedorDetailsReclamo.open = false;
    enviar.style.display="flex";

    //


})

/* Despues de formulario queja */

const validarFormularioQueja=document.getElementById("continuarFormularioQueja");

validarFormularioQueja.addEventListener("click",function () {
    extraQueja.style.display="block"
    contenedorDetailsExtraQueja.open=true;
    contenedorDetailsQueja.open=false
    enviar.style.display="flex";
})

const validarFormularioApelacion=document.getElementById("continuarFormularioApelacion");

validarFormularioApelacion.addEventListener("click",function () {
    extraApelacion.style.display="block"
    contenedorDetailsExtraApelacion.open=true;
    contenedorDetailsApelacion.open=false
    enviar.style.display="flex";
})


/* */

const ticketLegal=document.getElementById("cajaContenedorTicket");
ticketLegal.style.display="none"


/* mostrando el detalle */

const botonMostrarDatos = document.getElementById('mostrarDatos');
//botonMostrarDatos.style.display="flex";

// Evento para cuando el usuario haga click en el botón
botonMostrarDatos.addEventListener('click', function() {
    ticketLegal.style.display="block";
    cajaTotal.style.display="none";

    // Seleccionamos todos los inputs de tipo texto dentro del formulario
    const inputs = document.querySelectorAll('#DatosTicketMostrarTicket input[type="text"],#DatosTicketMostrarTicket  input[type="date"],#DatosTicketMostrarTicket  input[type="email"],#DatosTicketMostrarTicket textarea,#DatosTicketMostrarTicket select');

    // Creamos una variable para almacenar los resultados
    let datosRellenados = '';

    // mostrar titulo en el ticket
    const titulo=document.getElementById("tituloTicketFinal")

    switch (valorSeleccionado) {
        case "3":
            titulo.innerHTML="Reclamo";
            break;
        case "6":
            titulo.innerHTML="Queja";
            break;
        case "7":
            titulo.innerHTML="Apelación";
            break;
    
        default:
            break;
    }


    // Recorremos todos los inputs de tipo texto
    inputs.forEach(input => {
        const valor = input.value.trim(); // Obtenemos el valor del campo
        
        // Si el campo tiene valor (no está vacío)
        if (valor) {
            // Intentamos encontrar el label asociado
            const label = document.querySelector(`label[for="${input.id}"]`);
            
            // Verificamos si encontramos el label
            if (label) {
                // Extraemos el texto del label
                const labelText = label.innerText || label.textContent;
                // Convertimos saltos de línea a <br> para mostrarlos en HTML
                const valorConSaltos = valor.replace(/\n/g, '<br>');

                // Agregamos el nombre del campo y su valor
                datosRellenados += `<p><strong>${labelText}:</strong> <span>${valor}</span> </p>`;
            }
        }
    });

    // Mostrar los resultados
    const resultados = document.getElementById('resultados');
    if (datosRellenados) {
        // Si hay datos, los mostramos
        resultados.innerHTML = datosRellenados;
    } else {
        // Si no hay datos, mostramos un mensaje
        resultados.innerHTML = '<p>No se han rellenado datos.</p>';
    }
});

function editarDatos() {
    ticketLegal.style.display="none"
    cajaTotal.style.display="block";
}

const btnClick=document.getElementById("click");
btnClick.addEventListener('click', function() {

    const btnBack=document.getElementById("back");
    const enviarClick=document.getElementById("click");

    btnBack.style.display="none";
    enviarClick.style.display="none"

    // inicio
    const btnInicio=document.getElementById("inicio");
    btnInicio.style.display="block"

})