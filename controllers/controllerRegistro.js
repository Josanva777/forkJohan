import { registros } from "../models/modelRegistro.js";

const formulario = document.querySelector('#formularioRegistro');

const btnGuardar = document.querySelector('#btnGuardar');

btnGuardar.addEventListener('click', validacionDeCampos); 

function validacionDeCampos(e) {
  e.preventDefault();
  
  const tipoDocumento = document.querySelector('#tipoDocumento').value.toLowerCase();
  const documento = document.querySelector('#Documento').value.toLowerCase();
  const nombre = document.querySelector('#Nombre').value.toLowerCase();
  const radioSexo = document.querySelector('input[name=sexo]:checked');
  const apellido = document.querySelector('#Apellido').value.toLowerCase();
  const telefono = document.querySelector('#Telefono').value.toLowerCase();
  const correo = document.querySelector('#Correo').value.toLowerCase();
  const roll = document.querySelector('#Rol') !== null ? document.querySelector('#Rol').value : 'usuario' ;
  const user = document.querySelector('#Usuario').value;
  const password = document.querySelector('#Contrasena').value;
  const confirmar = document.querySelector('#Confirmar').value;
  
  if(tipoDocumento !== '' && documento !== '' && nombre !== '' && radioSexo !== null && apellido !== '' && telefono !== '' && correo !== '' && roll !== '' && user !== '' && password !== '' && confirmar !== '') {
    if( password === confirmar ) {
      validacionDuplicados( tipoDocumento, documento, nombre, radioSexo.value, apellido, telefono, correo, roll, user, password);  
    } else {
      Swal.fire({
        title: "Error!",
        text: "Las contraseñas deben de ser iguales",
        icon: "error"
      });
    }
  } else {
    Swal.fire({
      title: "Error!",
      text: "Complete todos los campos",
      icon: "error"
    });
  }
}

function validacionDuplicados(tipoDocumento, documento, nombre, radioSexo, apellido, telefono, correo, roll, user, password) {
  const encontradoDocumento = registros.some( usuario => usuario.documento === documento );
  const encontradoUser = registros.some( usuario => usuario.user === user );
  const encontradoEmail = registros.some( usuario => usuario.correo === correo );

  if( encontradoDocumento ) {
    Swal.fire({
      title: "Error!",
      text: "Documento de identidad ya existe",
      icon: "error"
    });
    return;
  }
  if( encontradoUser ) {
    Swal.fire({
      title: "Error!",
      text: "Usuario ya existe",
      icon: "error"
    });
    return;
  }
  if( encontradoEmail ) {
    Swal.fire({
      title: "Error!",
      text: "Email ya existe",
      icon: "error"
    });
    return;
  }

  const usuarioObj = {
    tipoDocumento,
    documento,
    nombre,
    radioSexo, 
    apellido,
    telefono,
    correo,
    roll,
    user,
    password
  }

  agregarUsuario(usuarioObj);
}

function agregarUsuario(usuarioObj) {
  registros.push(usuarioObj);
  formulario.reset();
  Swal.fire({
    title: "Éxito!",
    text: "El elemento fue guardado exitosamente!",
    icon: "success"
  });
  
  sincronizarLocalStorage();
}

function sincronizarLocalStorage() {
  localStorage.setItem( 'registros', JSON.stringify(registros) );
}