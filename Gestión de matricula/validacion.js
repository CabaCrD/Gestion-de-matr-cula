// Author: CabaCrD
/****** LA CLASE QUE ALMACENARA A LOS ALUMNOS ******/

class Alumnos{
	/** EL CONSTRUCTOR QUE ALMACENARA A LOS ALUMNOS**/
	constructor (nombre, apellidos, dni, codTitulacion, fechaNacimiento, telefono, email, curso, familiaNumerosa, iban, precioCurso){		
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.dni = dni;
		this.codTitulacion = codTitulacion;
		this.fechaNacimiento = fechaNacimiento;
		this.telefono = telefono;
		this.email = email;
		this.curso = curso;
		this.familiaNumerosa = familiaNumerosa
		this.iban = iban
		this.precioCurso = precioCurso;	
	}
	
}

/****** LA PARTE ENCARGADA DE LA FUNCIONALIDAD DEL PROGRAMA ******/

  /** ARRAYS **/

  var alumnado = [];//ARRAY PARA ALMACENAR ALUMNOS
  var correccion = [];//ARRAY PARA ALMACENAR ERRORES
     
  /** VARIABLES QUE OBTENDREMOS DEL FORMULARIO **/  

  var enviar = document.getElementById("enviar"); //BOTON ENVIAR

  var correcciones = document.getElementById("correcciones");

  var nombre = document.getElementById("nombre");
   
  var apellidos = document.getElementById("apellidos");      
	 
  var dni = document.getElementById("dni");          
	  
  var codTitulacion = document.getElementById("codTitulacion");          
	 
  var fechaNacimiento = document.getElementById("fechaNacimiento");           
	  
  var telefono = document.getElementById("telefono");          	 
   
  var email = document.getElementById("email");            
    var confirmacionmail = document.getElementById("confirmacionmail");     
	
  var curso = document.getElementById("curso");	  
    var precioCurso = 600;

  var familiaNumerosa = document.getElementById("familiaNumerosa");        

  var letraIBAN = document.getElementById("LetraIban");//LETRA DEL IBAN
  var numeroIBAN = document.getElementById("NumeroIban");//NUMERO DEL IBAN  
	var ibanCompleto = letraIBAN.value.concat(numeroIBAN.value);//CONCATENA LA LETRA Y EL NUMERO ;      	 	  		  		     

  /*** EVENTO DE RATON ***/
	enviar.addEventListener("click", function (e) {

		e.preventDefault();
		validarForm();

	  });
    

  /****** ESTA ES LA PARTE DONDE PROGRAMARE LAS FUNCIONES******/

  /*** FUNCION PARA VALIDAR EL FORMULARIO***/
function validarForm(){

	/**  LIMPIAMOS EL ARRAY Y EL PANEL DE MENSAJES**/
    correccion = [];
	correcciones.innerHTML = "";

	/*** FUNCIONES VALIDADORAS ***/
	validarNombre(nombre);
	validarApellidos(apellidos);
	validarFechaNacimiento(fechaNacimiento);  		     		    		   		 
	validarDNI(dni);       	   	   		 
	validarTitulacion(codTitulacion);		   		   		 
	validarTelefono(telefono);  		 
	validarEmail(email, confirmacionmail);	 
	validarCurso(curso);	    	    	  
	validarFamiliaNumerosa(familiaNumerosa);
	validarIban(letraIBAN, numeroIBAN);  		     	          			     
					   
	   /*** SI ES FAMILIA NUMEROSA ***/
		if(familiaNumerosa.value === "S"){	

		  precioCurso = precioCurso - ((precioCurso * 30)/100);  

	   /*** SI ES MAYOR DE 18 Y MENOR DE 20 ***/
		}else if(validarFechaNacimiento(fechaNacimiento)[0] && validarFechaNacimiento(fechaNacimiento)[1] === 1){

		   precioCurso = precioCurso - ((precioCurso * 20)/100);

		}	
	    
		 /*** LA PARTE PARA REGISTRAR LA MATRÍCULA ***/
		 if (correccion.length == 0) {	

		   const alumno = new Alumnos(nombre.value, apellidos.value, dni.value, codTitulacion.value, fechaNacimiento.value, telefono.value, email.value, curso.value, familiaNumerosa.value, ibanCompleto, precioCurso);
		   alumnado.push(alumno);//ALMACENA MATRICULA	   	    
		   alert("Matriculada tramitada con éxito")//MANDA MENSAJE DE CONFIRMACIÓN
		   mostrarMatricula();//ABRE LA FUNCION QUE MUESTRA LA MATRICULA  	
	       return true;

		 }else{

			mostrarErrores();
			return
		 }

}

/*** FUNCION QUE MUESTRA UN LISTADO CON LOS ERRORES DEL FORMULARIO ***/
function mostrarErrores(){	

	if (correccion.length >= 1) { //SI ESTA VACIO NO MOSTRAREMOS NADA, SI TIENE AL MENOS UN ELEMENTO
		
		/*** MOSTRAMOS LOS ERRORES EN UN ELEMTO HTML ***/  
		
		var div_errores = document.createElement("div"); 
		
		div_errores.innerHTML = "<fieldset>" +
								 "<legend>Mensajes de validación</legend>" +
							   "</fieldset>"; 
  
		for (var i = 0; i < correccion.length; i++) { //RECORREMOS EL ARRAY
	  
		  var error = document.createElement("p");//CADA OBJETO DEL ARRAY SERA UN ELEMENTO HTML 
		  error.innerHTML = correccion[i];
		  div_errores.firstChild.appendChild(error); //AGREGAMOS AL DIV
		
		}
  
		document.getElementById("correcciones").appendChild(div_errores);
								   
	 }else{

		return false

	 }
	
}
  
 
/*** FUNCION PARA MOSTRAR LA MATRICULA ***/       
function mostrarMatricula(){
		  
	   alert("Se abrirá una ventana con los datos de la matrícula")
	   
	   var nuevaVentana = window.open("", "Matrícula ", "width=1366,height=768");//ABRIREMOS UNA NUEVA VENTANA   
	   
	   if(alumnado.length === 0){//SI EL ARRAY SE ENCUENTRA VACIO   

		   nuevaVentana.document.write("<h1> 404 ERROR: NOT FOUND</h1>");  	 

	   }else{   

			for (var i = 0; i < alumnado.length; i++) {//RECORREMOS EL ARRAY DE ALUMNOS
				var alumno = alumnado[i]; 
				
				nuevaVentana.document.write("<fieldset>");
				  /*** DATOS EXTRAIDOS DEL ARRAY***/
				  nuevaVentana.document.write("<p>Nombre:                  "   +   alumno.nombre          + "</p>");
				  nuevaVentana.document.write("<p>Apellidos:               "   +   alumno.apellidos       + "</p>");
				  nuevaVentana.document.write("<p>DNI:                     "   +   alumno.dni             + "</p>");
				  nuevaVentana.document.write("<p>Código de la titulación: "   +   alumno.codTitulacion   + "</p>");
				  nuevaVentana.document.write("<p>Fecha de nacimiento:     "   +   alumno.fechaNacimiento + "</p>"); 
				  nuevaVentana.document.write("<p>Teléfono:                "   +   alumno.telefono        + "</p>");
				  nuevaVentana.document.write("<p>Email:                   "   +   alumno.email           + "</p>");
				  nuevaVentana.document.write("<p>Curso:                   "   +   alumno.curso           + "</p>");
				  nuevaVentana.document.write("<p>Familia Numerosa:        "   +   alumno.familiaNumerosa + "</p>");
				  nuevaVentana.document.write("<p>IBAN:                    "   +   alumno.iban            + "</p>");
				  nuevaVentana.document.write("<p>Coste total del curso:   "   +   alumno.precioCurso)    + "€</p>";
				  /******/		    	    		    	  
				nuevaVentana.document.write("</fieldset>");
				
			}
			  }
}

/****************************************************************************************************************************/
/****************************************                                            ****************************************/				
/****************************************  AHORA EMPIEZAN LAS FUNCIONES VALIDADORAS  ****************************************/
/****************************************                                            ****************************************/ 
/****************************************************************************************************************************/	   

/**** VALIDAR EL FORMATO DEL NOMBRE ****/	
function validarNombre(pide_nombre){		
	
var contadorVocales = 0;//CONTADOR DE VOCALES
var vocales =['a', 'e', 'i', 'o', 'u','A','E', 'I', 'O', 'U'];	

for (let char of pide_nombre.value){//BUCLE PARA RECORRER EL NOMBRE			
				
	if(vocales.includes(char)){		
					  
		contadorVocales++;		
						
	  }	    
	 }

if(pide_nombre.value.length === 0 || pide_nombre.value == "" || pide_nombre.value == null){//HACEMOS OBLIGATORIO ESTE CAMPO	
	
	correccion.push("<p>Campo 'Nombre' obligatorio</p>"); 
	return false;							 
}	  
				 
else if(contadorVocales <= 0){//SI NO POOSE VOCALES	
	  
	correccion.push("<p>El nombre debe contener alguna vocal</p>");
	 return false	
										 
}	 	 
 
else if(pide_nombre.value.length < 2 || pide_nombre.value.length > 20 ){//TAMAÑO DEL NOMBRE	
		 
	correccion.push("<p>El nombre debe contener un tamaño entre 2-20 carácteres</p>");
	 return false		
										 
}else{

}	 

}		

/**** VALIDAR EL FORMATO DE LOS APELLIDOS ****/	 
function validarApellidos(pide_apellidos){
  
var vocales =['a', 'e', 'i', 'o', 'u','A','E', 'I', 'O', 'U'];
var espacio = [' '];
var contadorVocales = 0;//CONTADOR DE VOCALES  
var contadorEspacio = 0;//CONTADOR DE ESPACIO

for (let char of pide_apellidos.value){//RECORRER EL CAMPO EN BUSCA DE VOCALES		
			  
	if(vocales.includes(char)){	
								
	  contadorVocales++;
								  
	  }
	}

for (let char of pide_apellidos.value){//RECORRER EL CAMPO EN BUSCA DE APELLIDOS			 	
	if(espacio.includes(char)){	

		contadorEspacio++;		

		}

	}

segundoApellido = pide_apellidos.value.substring(pide_apellidos.value.lastIndexOf(" ") + 1).toLowerCase();

var vocal = false;

for (let char of segundoApellido){//RECORRER EL CAMPO EN BUSCA DE VOCALES DEL SEGUNDO APELLIDO
	if (vocales.includes(char)){
		vocal = true;
	}
} 

if(pide_apellidos.value.length === 0 || pide_apellidos.value === "" || pide_apellidos.value === null){//HACEMOS OBLIGATORIO ESTE CAMPO	
				
  correccion.push("<p>Campo 'Apellidos' obligatorio</p>")
  return false;
  
  }			 			  	
	 	    
               
else if(contadorVocales < 0 || !vocal){//VOCALES OBLIGATORIAS		  
  
	correccion.push("<p>El primer apellido y el segundo apellido deben contener alguna vocal</p>")
  
  return false;	    
  
}	 	  

else if(contadorEspacio < 1 ){//SE DEBEN INTRODUCIR DOS APELLIDOS		
		  
	correccion.push("<p>Debes introducir DOS apellidos</p>")
  return false;	  
	
}	    

else if(pide_apellidos.value.length < 2 || pide_apellidos.value.length > 40){//TAMAÑO DEL CAMPO			
		
	correccion.push("<p>El nombre debe contener un tamaño entre 2-40 carácteres</p>")
  return false;	    
  
}
			  
}
	       	  
/**** VALIDAR EL FORMATO DEL DNI ****/	
function validarDNI(pide_dni){

DniCompleto = pide_dni.value;
var numero
var letr
var letra

if(DniCompleto.length === 0 || DniCompleto.value === null || DniCompleto.value === ""){//HACEMOS OBLIGATORIO ESTE CAMPO	
   
	correccion.push("<p>campo 'DNI' obligatorio</p>")
   return false		 
}	 	

if(/^\d{8}[a-zA-Z]$/.test (DniCompleto) == true){//SI CUNPLIMOS CON LA EXPRESION REGULAR	
  
numero = DniCompleto.substr(0,DniCompleto.length-1);//SEPARAMOS EL NUMERO  
letr = DniCompleto.substr(DniCompleto.length-1,1);//SEPARAMOS LA LETRA    
numero = numero % 23;//AL HACER LA CUENTA, NOS MOSTRARA EL INDICE DE NUESTRA LETRA    
letra='TRWAGMYFPDXBNJZSQVHLCKET'//LETRAS VALIDAS     
letra=letra.substring(numero,numero+1);  
  
if (letra!=letr.toUpperCase()) {//SI LA LETRA NO ES VALIDA	
  
 correccion.push('<p>Letra de DNI no válida</p>');
 return false                	 
 
}else{//SI LA LETRA ES VALIDA

 return true;  
		  
}  
	   
}else{//SI EL FORMATO ESTA MAL		
	  
correccion.push('<p>Dni erroneo, formato no válido</p>');  

return false; 
	  
 }    
}    

/**** VALIDAR LA TITULACION ****/	
function validarTitulacion(pide_cod){
  
  if(pide_cod.value.length === 0 || pide_cod.value === "" || pide_cod.value === null){	
							
	correccion.push("<p>Campo 'Código de la titulación' obligatorio</p>");
	   return false;
	   
	   }		
	   
   if(/^[AaCcEeVvXxZz]{2}\d{3}[GgMmFf]{1}$/.test(pide_cod.value) === false){	
							 
	correccion.push("<p>formato de código de titulacion introducido inválido</p>");
	return false;		
																								   
   }else{		
	   
	   return true		
					 
  }
}

/**** VALIDAR LA FECHA DE NACIMIENTO****/	
function validarFechaNacimiento(pide_fecha){
  
var partesFecha = pide_fecha.value.split("/");//ELIMINAMOS LA BARRA
var dia = parseInt(partesFecha[0]);//PASAMOS EL DIA A INT
var mes = parseInt(partesFecha[1]) - 1;//PASAMOS EL MES A INT Y LE RESTAMOS -1 POR EL FORMATO DE FECHAS DE JAVASCRIPT
var anio = parseInt(partesFecha[2]);//PASAMOS EL AÑO A INT
var fechaCompleta = new Date(anio, mes, dia);//LA FECHA COMPLETA

/************/

var hoy = new Date();
var milPorAnio = 1000 * 60 * 60 * 24 * 365.25; //CONTAMOS CON LOS AÑOS BISIESTOS Y LO TRANSFORMAMOS A MILISEGUNDOS
var aniosTotal = Math.floor((hoy - fechaCompleta) / milPorAnio);//CON FLOOR REDONDEAMOS Y CON LAS SIGUIENTE CUENTA MATEMATICA

if (pide_fecha.value.length === 0 || pide_fecha.value ==="" || pide_fecha.value === null){//HAREMOS ESTE CAMPO OBLIGATORIO

	correccion.push("<p>campo 'Fecha de nacimiento'obligatorio</p>");
 	return false;
}       		

else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(pide_fecha.value)) {//PARA COMPROBAR QUE EL FORMATO ES EL CORRECTO

	correccion.push("<p>Formato de fecha incorrecto</p>");

	return false;  
		  
}    
 
else if (fechaCompleta.getDate() !== dia && fechaCompleta.getMonth() !== mes && fechaCompleta.getFullYear() !== anio) {//SI LA FECHA ES VALIDA...

	correccion.push("<p>La fecha no es válida</p>")

	return false; 
		  
}    

else if(aniosTotal < 18){//SI ES MENOR DE EDAD...

	correccion.push("<p>No puede matricularse, tiene menos de 18 años</p>");

	return false; 

}

else if(aniosTotal >= 18 && aniosTotal <= 20 ){//SI TIENE ENTRE 18 Y 20 AÑOS
	
	return [true, 1];

}else {

	return [false, 0];
	
 }

}

/**** VALIDAR EL FORMATO DEL TELEFONO ****/	
function validarTelefono(pide_numero){	
  
if (pide_numero.value.length === 0 || pide_numero.value === null || pide_numero.value === "") {//HAREMOS ESTE CAMPO OBLIGATORIO		 

	correccion.push("<p>Campo 'telefono' obligatorio</p>");
  return false;      
		  
}	

else if (!/^[679]\/\d{8}$/.test(pide_numero.value) === false) {//COMPROBAREMOS QUE EL FORMATO ES EL CORRECTO	
	  
	correccion.push("<p>Formato de número de teléfono incorrecto</p>");
  return false; 
				 
}

}

/**** VALIDAR EL FORMATO DEL EMAIL ****/	
function validarEmail(pide_Email, confirmacion){
  
if (pide_Email.value.length === 0 || pide_Email.value === null || pide_Email.value === "" ) {//HACEMOS OBLIGATORIO ESTE CAMPO      	 
   
	correccion.push("<p>Campo 'email' obligatorio</p>");
  	return false;  
	
}    

else if (confirmacion.value.length === 0 || confirmacion.value === null || confirmacion.value === "" ) {//HACEMOS OBLIGATORIO ESTE CAMPO
		 
	correccion.push("<p>Campo 'confirmacion email' obligatorio</p>");
		
  return false;  
	
}		
		
else if (!/^[\w!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/g.test(pide_Email.value)){//SI EL FORMATO DE AMBOS CAMPOS ES INCORRECTO  
			  
	correccion.push("<p>Formato de correo electrónico incorrecto</p>");    
  return false;        
		
}    

else if(!/^[\w!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/g.test(confirmacion.value)){//SI EL FORMATO DE AMBOS CAMPOS ES INCORRECTO

	correccion.push("<p>Formato de correo electrónico incorrecto</p>"); 
  return false; 
		   
}else if (pide_Email.value != confirmacion.value){ //SI NO COINCIDEN

  correccion.push("<p>Las direcciones de correo electrónico no coinciden</p>");
  return false;            
	  
}

}

/**** VALIDAR EL FORMATO DEL CURSO ****/	
function validarCurso(pide_curso){
  
  var codigo = ["IA1", "IA2", "BD1", "BD2"];

  console.log(pide_curso.value);
  if (pide_curso.value.length === 0 || pide_curso.value === null || pide_curso.value === "") {//HACEMOS OBLIGATORIO ESTE CAMPO		
   
	correccion.push("<p>Campo 'codigo' obligatorio</p>");
	  return false; 
				 
  }
  
  else if (!codigo.includes(pide_curso.value)){//SI EL CODIGO ES INVALIDO	
		  
	correccion.push("<p>Código de curso inválido</p>")
	  return false	
	  
  }
  
}	

/**** VALIDAR EL CODIGO DE FAMILIA NUMEROSA ****/	
function validarFamiliaNumerosa(validar_Familia){
  
 if (validar_Familia.value.length === 0 || validar_Familia.value === null || validar_Familia.value === "") {//HACEMOS OBLIGATORIO ESTE CAMPO
		  
	correccion.push("<p>Campo 'Familia numerosa' obligatorio</p>");
   return false;  
				   
 }	
 
 else if(/^[SN]$/.test (validar_Familia.value) === false){//SI EL VALOR DE FAMILIA NUMEROSA NO ES "S" O "N"	
		
	correccion.push("<p>Código de familia numerosa inválido</p>");
   return false;
   
 }
 
 else if(validar_Familia.value === "S"){
	 
   return 1; 
	  
 }
 
}	

/**** VALIDAR EL FORMATO DEL IBAN ****/	
function validarIban(pideLetraIBAN, PideNumeroIban){
  
if (pideLetraIBAN.value.length === 0 || pideLetraIBAN.value === "" || pideLetraIBAN.value === null) {//HACEMOS OBLIGATORIO ESTE CAMPO
		 
  correccion.push("<p>Campo 'IBAN' obligatorio</p>");       
  return false;
   
}          

else if (/^[ES]{2}\d{2}$/.test(pideLetraIBAN.value) === false ) {//SI EL FORMATO NO ES CORRECTO

	correccion.push("<p>Letra y/o números inválido, solo se pueden registrar entidades españolas, seguido de los dos dígitos de control</p>");
  return false;
  
}

else if (/^\d{20}$/.test(PideNumeroIban.value) === false) {//SI EL FORMATO NO ES EL CORRECTO

	correccion.push("<p>Número inválido, Deben introducirse un total de 20 dígitos</p>");
  return false;
  
}
		 
}