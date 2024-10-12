// para los primeros botones

const formularioPersonal=document.getElementById('formulario_personal');
const formularioUsuario=document.getElementById('formulario_usuario');
const formularioRepresentante=document.getElementById('formulario_representante');

function personales() {
    formularioPersonal.style.display="block";
    formularioUsuario.style.display="none";
    formularioRepresentante.style.display="none";
}

function usuario() {
    formularioPersonal.style.display="none";
    formularioUsuario.style.display="block";
    formularioRepresentante.style.display="none";
}

function representante() {
    formularioPersonal.style.display="none";
    formularioUsuario.style.display="none";
    formularioRepresentante.style.display="block";
}

// Tipo de documento


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

            break;
    
        default:

            break;
    }


}


function facturado() {

    const oFacturado=document.getElementById("facturados");
    const prueba=document.getElementById("contenido")

    switch (oFacturado.value) {
        case "calculo":
            prueba.style.display="block";
            break;
    
        default:
            break;
    }


    


}






