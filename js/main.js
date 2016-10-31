//Obtenemos mediante el Id el objeto boton 
var boton = document.getElementById('new');
//si boton tiene n click llama a la funcion crear formulario
boton.onclick = function() {
	crearFormulario();
	// se esconde el boton de añadir lista
	boton.setAttribute("class","hide");
}
// funcion crea un div para pedir el nombre de la lista
function crearFormulario() {
	// se crea un elemnto div, se le colocan clases, y se agrega antes del boton de Añaidr Lista
	//este elemento es de color azul y tiene un input y un boton
	var formulario = document.createElement('div');
	formulario.setAttribute("class","forma arriba");
	boton.parentNode.insertBefore(formulario, boton);
	//se crea un input para escribir el nombre de la nueva lista y se agrega como hijo del div que se creo arriba, tiene focus para poder esccribir directamente en el 
	var nombre = document.createElement('input');
	nombre.setAttribute("type","text");
	nombre.setAttribute("placeholder","Nombre de la lista");
	formulario.appendChild(nombre);
	nombre.focus();

	var agregar = document.createElement('button');
	agregar.innerHTML = "Aceptar";
	agregar.setAttribute("class","amarillo blanco");
	agregar.setAttribute("type","submit");	
	formulario.appendChild(agregar);

	crearCierre(formulario);
	crearLista(nombre,formulario);
	cerrarCuadro(formulario,boton);
}

function crearCierre(papa){
	var x = document.createElement('span');
	x.innerHTML = 'X';
	x.setAttribute('class','close');
	papa.appendChild(x);
}

function cerrarCuadro(form,btn) {
	var cc = document.getElementsByClassName('close')
	for (var k = 0; k < cc.length; k++) {
		cc[k].onclick = function(){
			form.setAttribute('class','hide');
			btn.classList.remove('hide');
		}
	}
}

function crearLista(titulo,elemento){
	var guardar = document.getElementsByClassName('amarillo')
	for (var i = 0; i < guardar.length; i++) {
		guardar[i].onclick = function(){
			if (titulo.value == 0){
				alert('Escriba un nombre de la lista');
			} else {
				boton.removeAttribute("class","hide");
				var contenedor = document.createElement('div');
				contenedor.setAttribute("class","arriba contenedor text-center");
				contenedor.innerHTML = titulo.value.toUpperCase();
				boton.parentNode.insertBefore(contenedor,boton);
				var btnTarjeta = document.createElement('button');
				btnTarjeta.innerHTML="Añadir una tarjeta";
				btnTarjeta.setAttribute("class","botonTarjeta blanco");
				contenedor.appendChild(btnTarjeta);
				contenedor.setAttribute("ondrop","drop(event)");
				contenedor.setAttribute("ondragover","allowDrop(event)");
				contenedor.setAttribute("ondragleave","dragLeave(event)");
				contenedor.setAttribute("ondragend","dragEnd(event)");
			
				titulo.value="";
				boton.parentNode.removeChild(elemento);

				crearTarjeta(btnTarjeta);
			}
		}
	}
}

function crearTarjeta(btntjt) {
	btntjt.addEventListener('click',function(evento) {
		var contenedorTarjeta = document.createElement('div');
		var nombreTarjeta = document.createElement('textarea');
		contenedorTarjeta.appendChild(nombreTarjeta);
		this.parentNode.insertBefore(contenedorTarjeta, btntjt);

		var guardar = document.createElement('button');
		guardar.setAttribute("class","botonGuardar blanco");
		guardar.innerHTML = 'Guadar';
		contenedorTarjeta.appendChild(guardar);
		btntjt.classList.add('hide');
		
		cambiarElemento(guardar,nombreTarjeta,btntjt,contenedorTarjeta);
		crearCierre(contenedorTarjeta);
		cerrarCuadro(contenedorTarjeta,btntjt);

		nombreTarjeta.focus();
	},false);
}

function cambiarElemento(btnew,title,apa,cnt) {
	btnew.addEventListener('click',function(evento) {
		if (title.value == 0){
				alert('Escriba una tarjeta');
			} else {
				var nuevo = document.createElement('label');
				nuevo.setAttribute('class','etiquetas amarillo blanco');
				nuevo.innerHTML=title.value;
				cnt.parentNode.insertBefore(nuevo,apa);
				apa.classList.remove('class','hide');
				cnt.parentNode.removeChild(cnt);

				nuevo.id = "" + (new Date()).getTime();
				nuevo.setAttribute("draggable","true");
				nuevo.setAttribute("ondragstart","drag(event)");
				nuevo.setAttribute("ondragenter","dragChange(event)");
			}
	},false);
}

function drag(ev) {
	//console.log(ev);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var z = document.getElementById(data);
    //console.log(ev.target.tagName);
    if(ev.target.tagName === 'DIV'){
    	ev.target.insertBefore(z,ev.target.lastChild);
    }
    
}

function allowDrop(ev) {
    ev.preventDefault();
    if ( event.target.className == "arriba contenedor text-center" ) {
    	ev.target.style.border = "4px solid #fad400";
    }
}

function dragChange(ev){
	ev.target.style.background ="rgba(44,169,199,0.3)";
}

function dragLeave(ev) {
    if ( ev.target.className == "arriba contenedor text-center" ) {
        ev.target.style.border = "";
    }
}

function dragEnd(ev) {
    ev.target.classList.add('cambio');
}