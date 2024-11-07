const opcionReclamo=document.getElementById("reclamo");
const opcionQueja=document.getElementById("queja");
const opcionApelacion=document.getElementById("apelacion");
// los inputs de los datos

//
// boton para enviar el todo formulario
const enviar=document.getElementById("btnEnviarFormulario");
enviar.style.display="none";

// funcion ids

function reclamos() {
    // Obtener el valor actual del input
    const inputTicket = document.getElementById('tipoticket');
    const inputDiagnostico = document.getElementById('diagnostico');
    
    // El número que deseas agregar, por ejemplo, 12345
    const numT = 3;
    const numD = 34;
        
    // Asignar ese número al valor del input
    inputTicket.value = numT;
    inputDiagnostico.value = numD;
}

function quejass() {
    // Obtener el valor actual del input
    const inputTicket = document.getElementById('tipoticket');
    const inputDiagnostico = document.getElementById('diagnostico');
    
    // El número que deseas agregar, por ejemplo, 12345
    const numT = 6;
    const numD = 82;
        
    // Asignar ese número al valor del input
    inputTicket.value = numT;
    inputDiagnostico.value = numD;
}

function apelacionesS() {
    // Obtener el valor actual del input
    const inputTicket = document.getElementById('tipoticket');
    const inputDiagnostico = document.getElementById('diagnostico');
    
    // El número que deseas agregar, por ejemplo, 12345
    const numT = 7;
    const numD = 81;
        
    // Asignar ese número al valor del input
    inputTicket.value = numT;
    inputDiagnostico.value = numD;
}

// funciona los que estan en la siguiente linea
const opcionEscojidaQRA=document.getElementById("tituloOpcionesQRA");
const tituloQRA=document.getElementById("opcionEscojida");
const contenedor=document.getElementById("contenedorOpcionesQRA");
// abonado usuario representante
const glosariosAUR=document.getElementById("glosarioQRA");
const contenedorAUR=document.getElementById("contenedorOpcionesAUR");
const tituloAUR=document.getElementById("tituloOpcionesAUR");
// propiedades
contenedorAUR.style.display="none";
tituloAUR.style.display="none";
// contenedor de datos personales
const contenedorDatosPersonales=document.getElementById("contenidoDatos")
contenedorDatosPersonales.style.display="none";


function manejarSeleccion() {
    const seleccion = document.querySelector('input[name="opcionesPrimero"]:checked');
    if (seleccion) {
        //console.log(`Seleccionaste: ${seleccion.id}`);
        //tituloQRA.innerHTML=`${seleccion.id}`;
        tituloQRA.innerHTML = `${seleccion.id.charAt(0).toUpperCase()}${seleccion.id.slice(1)}`;
        opcionEscojidaQRA.style.display="flex";
        contenedor.style.display="none";
        glosariosAUR.style.display="flex";
        contenedorAUR.style.display="flex";
        tituloAUR.style.display="flex";
    }
}

// Agregar el evento de clic a los radio buttons
document.querySelectorAll('input[name="opcionesPrimero"]').forEach((input) => {
    input.addEventListener('click', manejarSeleccion);
});

function volverRQA() {
    contenedor.style.display="flex";
    opcionEscojidaQRA.style.display="none";
    glosariosAUR.style.display="none";
    contenedorAUR.style.display="none";
    tituloAUR.style.display="none";
    contenedorDatosPersonales.style.display="none";
    apelacion.style.display="none";
    queja.style.display="none";
    reclamo.style.display="none";
    //
    enviar.style.display="none";
    //
    cApelacion.style.display="none"
    cQueja.style.display="none"
    cReclamo.style.display="none"
}


//  ABONADO - USUARIO - REPRESENTANTE
const textUsuario=document.getElementById("tituloAUR")

function manejarSelecciones() {
    const seleccion = document.querySelector('input[name="tipoUsuario"]:checked');
    if (seleccion) {
        //console.log(`Seleccionaste: ${seleccion.id}`);
        //textUsuario.innerHTML=`${seleccion.id}`;
        textUsuario.innerHTML = `${seleccion.id.charAt(0).toUpperCase()}${seleccion.id.slice(1)}`;
        tituloAUR.style.display="flex"
        glosariosAUR.style.display="none";
        contenedorAUR.style.display="none";
        contenedorDatosPersonales.style.display="flex"
    }
}

document.querySelectorAll('input[name="tipoUsuario"]').forEach((input) => {
    input.addEventListener('click', manejarSelecciones);
});

function volverUsuario() {
    tituloAUR.style.display="none"
    contenedorAUR.style.display="flex"
    contenedorDatosPersonales.style.display="none";
    apelacion.style.display="none";
    queja.style.display="none";
    reclamo.style.display="none";
    //
    glosariosAUR.style.display="flex"
    //
    cApelacion.style.display="none"
    cQueja.style.display="none"
    cReclamo.style.display="none"
    //
    enviar.style.display="none";
}


// datos personales
const drepresentante=document.getElementById("extra_representante");
drepresentante.style.display="none"
const dusuario=document.getElementById("extra_usuario");
dusuario.style.display="none"


// Función para manejar la selección del radio button
function manejarSeleccionAUR() {
    const seleccion = document.querySelector('input[name="tipoUsuario"]:checked');

    switch (seleccion && seleccion.id) {
        case "abonado":
            drepresentante.style.display="none";
            dusuario.style.display="none";
            document.getElementById('contenedorDatosPersonalesDetails').open = true;
            break;
        case "usuario":
            drepresentante.style.display="none";
            dusuario.style.display="BLOCK";
            document.getElementById('contenedorDatosPersonalesDetails').open = true;
            break;

        case "representante":
            drepresentante.style.display="flex";
            dusuario.style.display="none";
            document.getElementById('contenedorDatosPersonalesDetails').open = true;
            break;
    
        default:
            break;
    }


}

// Agregar el evento de clic a los radio buttons
document.querySelectorAll('input[name="tipoUsuario"]').forEach((input) => {
    input.addEventListener('click', manejarSeleccionAUR);
});

// continuar con el formulario

const apelacion=document.getElementById("seleccionarApelacion");
const queja=document.getElementById("seleccionarQueja");
const reclamo=document.getElementById("seleccionarReclamo");

apelacion.style.display="none";
queja.style.display="none";
reclamo.style.display="none";

// Selecciona todos los campos de entrada con la clase .campo-reclamo
//const inputs = document.querySelectorAll('.datosPersonales');
//

function continuar() {

    const seleccion = document.querySelector('input[name="opcionesPrimero"]:checked');
    apelacion.style.display="none";
    queja.style.display="none";
    reclamo.style.display="none";
    enviar.style.display="flex";
    contenedorDatosPersonales.style.display="none";

    switch (seleccion && seleccion.id) {
        case "reclamo":
            apelacion.style.display="none";
            queja.style.display="none";
            reclamo.style.display="flex";
            break;
        case "queja":
            apelacion.style.display="none";
            queja.style.display="flex";
            reclamo.style.display="none";
            break;

        case "apelacion":
            apelacion.style.display="flex";
            queja.style.display="none";
            reclamo.style.display="none";
            break;
    
        default:
            break;
    }

}

//

function tipoDocumento() {
    const option=document.getElementById("tipoDoc").value;

    // entrada de numero de dni
    const txtNum=document.getElementById("numDoc")

    switch (option) {

        case "dni":
            txtNum.setAttribute('maxlength', '8');
            break;

        case "ruc":
            txtNum.setAttribute('maxlength', '11');
            break;

        case "pas":
            txtNum.setAttribute('maxlength', '20');
            break;

        case "ce":
            txtNum.setAttribute('maxlength', '20');
            break;

        case "xdoc":
            txtNum.setAttribute('maxlength', '20');
            break;
    
        default:
            txtNum.setAttribute('maxlength', '0');
            break;
    }

}



// Función para manejar la selección del radio button
// 
// las preguntas  de responder

const cApelacion=document.getElementById("datosApelacion");
const cQueja=document.getElementById("datosQueja");
const cReclamo=document.getElementById("datosReclamos");

cApelacion.style.display="none"
cQueja.style.display="none"
cReclamo.style.display="none"

/* Facturacion */


function selecion() {

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
    const cfsTwo=document.getElementById("contenidofserviciotwo");
    const cfsThree=document.getElementById("contenidofsthree");
    const cfsFour=document.getElementById("contenidofsfour");
    cfsOne.style.display="none";
    cfsTwo.style.display="none";
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
            cCalidad.style.display="none"

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
    const selectElement = document.getElementById('facturados');
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
            break;
    }


    //limpiarInputs();

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
    //calidad
    contenidoci.style.display="none";

    switch (oCalidad.value) {

        case "calidaduno":
            contenidoci.style.display="flex"
            break;
    
        default:
            break;
    }


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
    const cfsTwo=document.getElementById("contenidofserviciotwo");
    const cfsThree=document.getElementById("contenidofsthree");
    const cfsFour=document.getElementById("contenidofsfour");
    cfsOne.style.display="none";
    cfsTwo.style.display="none";
    cfsThree.style.display="none";
    cfsFour.style.display="none";
    
    switch (fServicio.value) {

        case "servicioone":
            cfsOne.style.display="block";
            break;

        case "serviciotwo":
            cfsTwo.style.display="block";
            break;

        case "serviciothree":
            cfsThree.style.display="block";
            break;

        case "serviciofour":
            cfsFour.style.display="block";
            break;
    
        default:
            break;
    }
}

function fsrecibo(){
    const adjuntaRecibo=document.getElementById("adrecibos").value;
    const adjuntarElRecibo=document.getElementById("adRecibofs");

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

/* FIN DE OTROS */

/* EMPIEZA LAS QUEJAS */

function quejas() {

    cQueja.style.display="block"
    
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
    //
    document.getElementById('detailsQuejaDs').open = true;


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
            //
            //limpiarInputs();
            //
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






