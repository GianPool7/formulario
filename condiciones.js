// para los primeros botones

const formularioPersonal=document.getElementById('formulario_personal');
const formularioUsuario=document.getElementById('extra_usuario');
const formularioRepresentante=document.getElementById('representanteDatos');

function personales() {
    formularioPersonal.style.display="block";
    formularioUsuario.style.display="none";
    formularioRepresentante.style.display="none";
}

function usuario() {
    formularioPersonal.style.display="block";
    formularioUsuario.style.display="block";
    formularioRepresentante.style.display="none";
}

function representante() {
    formularioPersonal.style.display="block";
    formularioUsuario.style.display="none";
    formularioRepresentante.style.display="flex";
}

// Tipo de documento

/* aasdasdasd*/




/* aasdasdasd*/

// materias reclamables


function selecion() {

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
    const nada=document.get



    
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
            //

            
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

function facturado() {

    const oFacturado=document.getElementById("facturados");
    const contenidoTarifario=document.getElementById("contenidoBase");
    const contenidoNoProcesados=document.getElementById("contenidoNoProcesado");
    const contenidoNoFacturados=document.getElementById("contenidoNoFacturado");
    //opciones
    //const cajaReclamoenFacturacion=document.getElementById("datosReclamos");
    // const cajaQuejaenFacturacion=document.getElementById("datosQueja");
    // const cajaApelacionenFacturacion=document.getElementById("datosApelacion");
    //para la condicion
    const limpiarPrimeraOpcion=document.getElementById("contenedorFacturacionCobro");
    const limpiarSegundaOpcion=document.getElementById("calidadReclamableOpcion");
    const limpiarTerceraOpcion=document.getElementById("incumplimentoReclamble");
    const limpiarCuartaOpcion=document.getElementById("servicioReclamable");
    const limpiarQuintaOpcion=document.getElementById("instalacionReclamable");
    const limpiarSextaOpcion=document.getElementById("bajaReclamables");
    const limpiarSeptimaOpcion=document.getElementById("contratosReclamable");
    const limpiarOctavaOpcion=document.getElementById("migracionReclamable");
    const limpiarNovenaOpcion=document.getElementById("xmaterias");



    switch (oFacturado.value) {

        case "calculo":
            contenidoTarifario.style.display="block";
            contenidoNoFacturados.style.display="none";
            contenidoNoProcesados.style.display="none";
            //contenidoci.style.display="none";
            //
            limpiarSegundaOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;
        
        case "tarifa":
            contenidoTarifario.style.display="block";
            contenidoNoFacturados.style.display="none";
            contenidoNoProcesados.style.display="none";
            contenidoci.style.display="none";
            //
            limpiarSegundaOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;

        case "reconexion":
            contenidoTarifario.style.display="block";
            contenidoNoFacturados.style.display="none";
            contenidoNoProcesados.style.display="none";
            contenidoci.style.display="none";
            //
            limpiarSegundaOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;

        case "dmonto":
            contenidoTarifario.style.display="block";
            contenidoNoFacturados.style.display="none";
            contenidoNoProcesados.style.display="none";
            contenidoci.style.display="none";
            //
            limpiarSegundaOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;
        
        case "noprocesado":
            contenidoTarifario.style.display="block";
            contenidoNoProcesados.style.display="block";
            contenidoNoFacturados.style.display="none";
            contenidoci.style.display="none";
            //
            limpiarSegundaOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;

        case "nfacturados":
            contenidoNoProcesados.style.display="none";
            contenidoTarifario.style.display="block";
            contenidoNoFacturados.style.display="block";
            contenidoci.style.display="none";
            //
            limpiarSegundaOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;

        case "cequipos":
            contenidoTarifario.style.display="block";
            contenidoNoFacturados.style.display="none";
            contenidoNoProcesados.style.display="none";
            contenidoci.style.display="none";
            //
            limpiarSegundaOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;
        
        case "incremento":
            contenidoTarifario.style.display="block";
            contenidoNoFacturados.style.display="none";
            contenidoNoProcesados.style.display="none";
            contenidoci.style.display="none";
            //
            limpiarSegundaOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;
    
        default:
            contenidoTarifario.style.display="none";
            contenidoNoFacturados.style.display="none";
            contenidoNoProcesados.style.display="none";
            //
            limpiarPrimeraOpcion.style.display="none"
            limpiarSegundaOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;
    }

}

function calidad() {

    const oCalidad=document.getElementById("calidadidoneidad");
    const contenidoci=document.getElementById("contenidocaliad");
    const contenidoTarifario=document.getElementById("contenidoBase");
    //calidad

    switch (oCalidad.value) {

        case "calidaduno":
            contenidoTarifario.style.display="none";
            contenidoci.style.display="block"
            //
            limpiarPrimeraOpcion.style.display="none"
            limpiarTerceraOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;
    
        default:
            contenidoTarifario.style.display="none";
            contenidoci.style.display="none"
            //
            break;
    }

}

function incumpliento() {
    
    const oincumplimiento=document.getElementById("ofertas");
    const incumplimientoO=document.getElementById("contenidoincumplimientoone");
    const incumplimientoT=document.getElementById("contenidoincumplimientotwo");
    const incumplimientoTr=document.getElementById("contenidoincumplimientothree");
    const incumplimientoF=document.getElementById("contenidoincumplimientofour");
    // incumplimiento    
    //para la condicion
    const limpiarPrimeraOpcion=document.getElementById("contenedorFacturacionCobro");
    const limpiarSegundaOpcion=document.getElementById("calidadReclamableOpcion");
    const limpiarCuartaOpcion=document.getElementById("servicioReclamable");
    const limpiarQuintaOpcion=document.getElementById("instalacionReclamable");
    const limpiarSextaOpcion=document.getElementById("bajaReclamables");
    const limpiarSeptimaOpcion=document.getElementById("contratosReclamable");
    const limpiarOctavaOpcion=document.getElementById("migracionReclamable");
    const limpiarNovenaOpcion=document.getElementById("xmaterias");


    switch (oincumplimiento.value) {

        case "incumplimientoUNO":
            incumplimientoO.style.display="block"
            incumplimientoT.style.display="none"
            incumplimientoTr.style.display="none"
            incumplimientoF.style.display="none"
            //
            limpiarPrimeraOpcion.style.display="none"
            limpiarSegundaOpcion.style.display="none"
            limpiarCuartaOpcion.style.display="none"
            limpiarQuintaOpcion.style.display="none"
            limpiarSextaOpcion.style.display="none"
            limpiarSeptimaOpcion.style.display="none"
            limpiarOctavaOpcion.style.display="none"
            limpiarNovenaOpcion.style.display="none"
            break;
    
        case "incumplimientoDOS":
            incumplimientoT.style.display="block"
            incumplimientoO.style.display="none"
            incumplimientoTr.style.display="none"
            incumplimientoF.style.display="none"
            //
            break;

        case "incumplimientoTRES":
            incumplimientoTr.style.display="block"
            incumplimientoO.style.display="none"
            incumplimientoT.style.display="none"
            incumplimientoF.style.display="none"
            //
            break;
    
        case "incumplimientoCUATRO":
            incumplimientoF.style.display="block"
            incumplimientoO.style.display="none"
            incumplimientoT.style.display="none"
            incumplimientoTr.style.display="none"
            //
            break;
        


        default:
            incumplimientoF.style.display="none"
            incumplimientoO.style.display="none"
            incumplimientoT.style.display="none"
            incumplimientoTr.style.display="none"
            //
            break;
    }


}

function faltaServicios() {

    const fServicio=document.getElementById("fservicio")
    const cfsOne=document.getElementById("contenidofservicioone");
    const cfsTwo=document.getElementById("contenidofserviciotwo");
    const cfsThree=document.getElementById("contenidofsthree");
    const cfsFour=document.getElementById("contenidofsfour");
    
    switch (fServicio.value) {

        case "servicioone":
            cfsOne.style.display="block";
            cfsTwo.style.display="none";
            cfsThree.style.display="none";
            cfsFour.style.display="none";
            break;

        case "serviciotwo":
            cfsTwo.style.display="block";
            cfsOne.style.display="none";
            cfsThree.style.display="none";
            cfsFour.style.display="none";
            break;

        case "serviciothree":
            cfsThree.style.display="block";
            cfsTwo.style.display="none";
            cfsOne.style.display="none";
            cfsFour.style.display="none";
            break;

        case "serviciofour":
            cfsFour.style.display="block";
            cfsTwo.style.display="none";
            cfsOne.style.display="none";
            cfsThree.style.display="none";
            break;
    
        default:
            cfsOne.style.display="none";
            cfsTwo.style.display="none";
            cfsThree.style.display="none";
            cfsFour.style.display="none";
            break;
    }
}

function instalaciones() {
    const instalacionOpcion=document.getElementById("instalacion")
    const instalacionUnoDos=document.getElementById("contenidoinstalacionuno")
    const intalacionTresCuatro=document.getElementById("contenidoinstalaciontres")
    const instalacionCinco=document.getElementById("contenidoinstalacioncinco")

    switch (instalacionOpcion.value) {
        case "instalacionesUno":
            instalacionUnoDos.style.display="block";
            intalacionTresCuatro.style.display="none"
            instalacionCinco.style.display="none"
            break;

        case "instalacionesDos":
            instalacionUnoDos.style.display="block";
            intalacionTresCuatro.style.display="none"
            instalacionCinco.style.display="none"
            break;

        case "instalacionesTres":
            intalacionTresCuatro.style.display="block";
            instalacionUnoDos.style.display="none"
            instalacionCinco.style.display="none"
            break;
            
        case "instalacionesCuatro":
            intalacionTresCuatro.style.display="block";
            instalacionUnoDos.style.display="none"
            instalacionCinco.style.display="none"
            break;
    
        case "instalacionesCinco":
            instalacionCinco.style.display="block";
            intalacionTresCuatro.style.display="none";
            instalacionUnoDos.style.display="none"
            break;

        default:
            instalacionCinco.style.display="none";
            intalacionTresCuatro.style.display="none";
            instalacionUnoDos.style.display="none"
            instalacionCinco.style.display="none"
            break;
    }
}

function baja() {
    const opcionBaja=document.getElementById("sb");
    const bajaOne=document.getElementById("respuestabajauno");
    const bajaDos=document.getElementById("respuestabajados");
    const bajaTres=document.getElementById("respuestastrescuatro");

    switch (opcionBaja.value) {
        case "bajaUno":
            bajaOne.style.display="block";
            bajaDos.style.display="none";
            bajaTres.style.display="none";
            break;

        case "bajaDos":
            bajaOne.style.display="none";
            bajaDos.style.display="block";
            bajaTres.style.display="none";
            break;

        case "bajaTres":
            bajaOne.style.display="block";
            bajaDos.style.display="none";
            bajaTres.style.display="block";   
            break;

        case "bajaCuatro":
                
            bajaOne.style.display="none";
            bajaDos.style.display="block";
            bajaTres.style.display="block";   
            break;
    
        default:
            bajaOne.style.display="none";
            bajaDos.style.display="none";
            bajaTres.style.display="none";   
            break;
    }
}

function contratos() {

    const contratoOpcion=document.getElementById("con");
    const contratosUno=document.getElementById("respuestascontratosbase");
    const contratoDos=document.getElementById("respuestascontratosdos");
    const contratosTres=document.getElementById("respuestascontratostres");
    const contratoCuatro=document.getElementById("respuestascontratoscuatros");


    switch (contratoOpcion.value) {
        case "conuno":
            contratosUno.style.display="block";
            contratoDos.style.display="none";
            contratosTres.style.display="none";
            contratoCuatro.style.display="none";
            
            break;
        
        case "condos":
            contratosUno.style.display="block";
            contratoDos.style.display="block";
            contratosTres.style.display="none";
            contratoCuatro.style.display="none";
            break;

        case "contres":
            contratosUno.style.display="block";
            contratoDos.style.display="none";
            contratosTres.style.display="block";
            contratoCuatro.style.display="none";
            break;
        
        case "concuatro":
            contratosUno.style.display="block";
            contratoDos.style.display="none";
            contratosTres.style.display="none";
            contratoCuatro.style.display="none";
            break;
    
        default:
            contratosUno.style.display="none";
            contratoDos.style.display="none";
            contratosTres.style.display="none";
            contratoCuatro.style.display="none";
            break;
    }


}

function migracionReclamable() {

    const opcionMigracion=document.getElementById("mig");
    const migracionUno=document.getElementById("respuestasMigracionBase");
    const migracionDos=document.getElementById("respuestasMigracionDos");
    const migracionTres=document.getElementById("respuestaMigracionTres");
    const migracionCuatro=document.getElementById("respuestaMigracionesCuatro");
    const datoExtraUno=document.getElementById("respuestaMigracionUno");
    
    switch (opcionMigracion.value) {
        case "migracionOne":
            migracionUno.style.display="block";
            datoExtraUno.style.display="block";
            migracionDos.style.display="none";
            migracionTres.style.display="none";
            migracionCuatro.style.display="none";
            break;

        case "migracionTwo":
            migracionUno.style.display="block";
            migracionDos.style.display="block";
            migracionTres.style.display="none";
            migracionCuatro.style.display="none";
            datoExtraUno.style.display="none"
            break;

        case "migracionThree":
            migracionUno.style.display="block";
            migracionDos.style.display="none";
            migracionTres.style.display="block";
            migracionCuatro.style.display="none";
            datoExtraUno.style.display="none"
            break;

        case "migracionFour":
            migracionUno.style.display="none";
            migracionDos.style.display="none";
            migracionTres.style.display="none";
            migracionCuatro.style.display="block";
            datoExtraUno.style.display="none"
            break;
    
        default:
            migracionUno.style.display="none";
            migracionDos.style.display="none";
            migracionTres.style.display="none";
            migracionCuatro.style.display="none";
            datoExtraUno.style.display="none"
            break;
    }

}

function xMaterias() {

    const xMateriasReclamables=document.getElementById("x");
    const xReclamablesUno=document.getElementById("xmateriasOne");
    const xReclamablesDos=document.getElementById("xmateriasTwo");
    const xReclamablesTres=document.getElementById("xmateriasThree");
    //opcion
    //const cFacturacion=document.getElementById("contenedorFacturacionCobro");
    const cCalidad=document.getElementById("contenidocaliad");
    const cIncumplimiento=document.getElementById("incumplimentoReclamble");
    const cServicio=document.getElementById("servicioReclamable");
    const cInstalaciones=document.getElementById("instalacionReclamable");
    const cBaja=document.getElementById("bajaReclamables");
    const cContratos=document.getElementById("contratosReclamable");
    const cMigracion=document.getElementById("migracionReclamable");

    
    switch (xMateriasReclamables.value) {

        case "xMateriasROne":
            xReclamablesUno.style.display="block";
            xReclamablesDos.style.display="none";
            xReclamablesTres.style.display="none";
            //
            cCalidad.style.display="none";
            cIncumplimiento.style.display="none";
            //cFacturacion.style.display="none";
            cServicio.style.display="none";
            cInstalaciones.style.display="none";
            cBaja.style.display="none";
            cContratos.style.display="none";
            cMigracion.style.display="none";

            break;

        case "xMateriasRTwo":
            xReclamablesUno.style.display="none";
            xReclamablesDos.style.display="block";
            xReclamablesTres.style.display="none";
            //
            cCalidad.style.display="none";
            cIncumplimiento.style.display="none";
            //cFacturacion.style.display="none";
            cServicio.style.display="none";
            cInstalaciones.style.display="none";
            cBaja.style.display="none";
            cContratos.style.display="none";
            cMigracion.style.display="none";

            break;

        case "xMateriasRThree":
            xReclamablesUno.style.display="none";
            xReclamablesDos.style.display="none";
            xReclamablesTres.style.display="block";
            //
            cCalidad.style.display="none";
            cIncumplimiento.style.display="none";
            //cFacturacion.style.display="none";
            cServicio.style.display="none";
            cInstalaciones.style.display="none";
            cBaja.style.display="none";
            cContratos.style.display="none";
            cMigracion.style.display="none";

            break;
    
        default:
            xReclamablesUno.style.display="none";
            xReclamablesDos.style.display="none";
            xReclamablesTres.style.display="none";
            //
            cCalidad.style.display="none";
            cIncumplimiento.style.display="none";
            //cFacturacion.style.display="none";
            cServicio.style.display="none";
            cInstalaciones.style.display="none";
            cBaja.style.display="none";
            cContratos.style.display="none";
            cMigracion.style.display="none";

            break;
    }


}

/* queja */

function queja() {

    const opcionQueja=document.getElementById("quejasOpciones");
    const quejaRespuestaUno=document.getElementById("quejaPreguntaUno");
    const quejaRespuestaDos=document.getElementById("quejaPreguntaDos");
    const quejaRespuestaTres=document.getElementById("quejaPreguntaTres");
    const quejaRespuestaCuatro=document.getElementById("quejaPreguntaCuatro");
    const quejaRespuestaCinco=document.getElementById("quejaPreguntaCinco");
    const quejaRespuestaSeis=document.getElementById("quejaPreguntaSeis");
    //la condicion
    const cajaReclamoenQueja=document.getElementById("datosReclamos");
    //const cajaQuejaenQueja=document.getElementById("datosQueja");
    const cajaApelacionenQueja=document.getElementById("datosApelacion");


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
            quejaRespuestaDos.style.display="block";
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


/* Apelacion */

function apelaciones() {

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
            cajaQuejaenApelacion.style.display="none";
            cajaReclamoenApelacion.style.display="none";
            break;
        case "apelacionFive":
            apelacionoOne.style.display="none"
            apelacionoTwo.style.display="none"
            apelacionoThree.style.display="none"
            apelacionoFour.style.display="none"
            apelacionoFive.style.display="block"
            apelacionoSix.style.display="none"
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

/* caja de contenido con las opciones */

function cajaContenedor(opcion){

    const formularioApelacion=document.getElementById("seleccionarApelacion")
    const formularioQueja=document.getElementById("seleccionarQueja")
    const formularioReclamo=document.getElementById("seleccionarReclamo")

    formularioApelacion.style.display="none";
    formularioQueja.style.display="none";
    formularioReclamo.style.display="none";

    //

    const contenedorCajaApelacion=document.getElementById("datosApelacion");
    const contenedorCajaQueja=document.getElementById("datosQueja");
    const contenedorCajaReclamo=document.getElementById("datosReclamos");

    contenedorCajaApelacion.style.display="none";
    contenedorCajaQueja.style.display="none";
    contenedorCajaReclamo.style.display="none";

    
    switch (opcion) {
        case "reclamo":
            formularioReclamo.style.display="flex"
            //contenedor
            contenedorCajaApelacion.style.display="none";
            contenedorCajaQueja.style.display="none";
            contenedorCajaReclamo.style.display="block";
            break;
        case "queja":
            formularioQueja.style.display="block"
            //contenedor
            contenedorCajaApelacion.style.display="none";
            contenedorCajaQueja.style.display="block";
            contenedorCajaReclamo.style.display="none";
            break;
        case "apelacion":
            formularioApelacion.style.display="block"
            //contenedor
            contenedorCajaApelacion.style.display="block";
            contenedorCajaQueja.style.display="none";
            contenedorCajaReclamo.style.display="none";
            break;
        default:
            break;

    }

}



/* funcion para mostrar la tarjeta */



















