// Función para obtener los parámetros de la URL
function obtenerParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    return data;
}

// Función para decodificar y analizar el JSON
function analizarDatosJSON(data) {
    if (data) {
        try {
            const decodedData = decodeURIComponent(data);
            const jsonData = JSON.parse(decodedData);
            return jsonData;
        } catch (error) {
            console.error('Error al analizar los datos JSON:', error);
        }
    }
    return null;
}

// Declarar una variable global para almacenar los datos
let datosAnalizadosGlobal = null;

// Función para redirigir a la página de inicio de sesión si no hay datos
function redirigirSiNoHayDatos() {
    const data = obtenerParametrosURL();
    const datosAnalizados = analizarDatosJSON(data);
    if (!datosAnalizados) {
        window.location.href = 'login.html';
    } else {
        // Analizar Token 
        const usuario = document.getElementById("user-name");
        const nombreCompleto = datosAnalizados.name;
        const palabras = nombreCompleto.split(" ");
        const primerNombre = palabras[0];

        usuario.innerHTML = primerNombre;

        // Almacenar los datos en la variable global
        datosAnalizadosGlobal = datosAnalizados;
        rellenarTabla();
        // Eliminar los parámetros de la URL
        if (history.replaceState) {
            const nuevaURL = window.location.pathname; // Obtener la ruta de la página actual
            history.replaceState({}, document.title, nuevaURL);
        }
    }
}
function turnar() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `busqueda-turnar.html?data=${encodedData}`;
}
function asesoria() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `asesoria.html?data=${encodedData}`;
}

// Llamar a la función de redirección al cargar la página
window.addEventListener('load', redirigirSiNoHayDatos);
/*
function rellenarTabla() {
    // Fetch data from the API
    const apiUrl = 'http://localhost:3000/asesorias';
    const opciones = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
        }
    };

    // Fetch data and populate the table
    fetch(apiUrl, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const asesorias_s = JSON.stringify(data);
            const asesorias = JSON.parse(asesorias_s);
            const tableBody = document.getElementById('asesorias-table-body');

            for (let i = 0; i < asesorias.length; i++) {
                const asesoria = asesorias[i];
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${asesoria.datos_asesoria.id_asesoria}</td>
                    <td>${asesoria.persona.nombre} ${asesoria.persona.apellido_paterno} ${asesoria.persona.apellido_materno}</td>
                    <td>${asesoria.turno.fecha_turno}</td>
                    <td>${asesoria.tipos_juicio.tipo_juicio}</td>
                    <td>${asesoria.datos_asesoria.resumen_asesoria}</td>
                    <td>${asesoria.datos_asesoria.usuario}</td>
                    <td><button class="btn btn-primary" value="${asesoria.datos_asesoria.id_asesoria}" onclick="consultarAsesoria(this.value)">Consultar</button></td>
                `;
            
                tableBody.table.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });


}
*/
function rellenarTabla() {
    // Fetch data from the API
    const apiUrl = 'http://localhost:3000/asesorias';
    const opciones = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
        }
    };

    // Fetch data and populate the table
    fetch(apiUrl, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const asesorias = data.asesorias; // Access the 'asesorias' array

            const tableBody = document.getElementById('asesorias-table-body');

            for (let i = 0; i < asesorias.length; i++) {
                const asesoria = asesorias[i];
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${asesoria.datos_asesoria.id_asesoria}</td>
                    <td>${asesoria.persona.nombre} ${asesoria.persona.apellido_paterno} ${asesoria.persona.apellido_materno}</td>
                    <td>${asesoria.tipos_juicio.tipo_juicio}</td>
                    <td>${asesoria.datos_asesoria.resumen_asesoria}</td>
                    <td>${asesoria.datos_asesoria.usuario}</td>
                    <td><button class="btn btn-primary" value="${asesoria.datos_asesoria.id_asesoria}" onclick="consultarAsesoria(this.value)">Consultar</button></td>
                `;
            
                tableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

function consultarAsesoria(asesoriaId) {
 
}
function menu() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `menu.html?data=${encodedData}`;
}
function turnar() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `busqueda-turnar.html?data=${encodedData}`;
}
function salir(){
    window.location.href = `login.html?`;
}
function consultar() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `consulta.html?data=${encodedData}`;
}
function asesoria() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `asesoria.html?data=${encodedData}`;
}

function cerrar() {
    const miAlerta = document.getElementById("miAlerta");
    miAlerta.style.display = "none";
}
/*
    <div class="tabs mt-3">
        <div class="tab-container">
            <!--id="tab1"-->
            <div id="tab1" class="tab registroTab" style="display: none;">
                <a href="#tab1 " id="tab1T" class="w-25">Verificar Datos</a>

                <div class="tab-content " style="background-color: white;">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-column col-6">
                            <h5 style="background-color: #99260E;
                        margin-left: 3%;
                        margin-bottom: -5px; width: 25%;
                        text-align: center;">Asesoría</h5>
                            <div class="domicilio  container rounded" style="background-color: #F0F0F0;">

                                <div class="asesor">
                                    <label>Nombre del asesor:</label><label id="nombreAsesorIT3"
                                        name="nombreAsesorNT3"></label>
                                    <br>
                                </div>
                                <br>
                                <div class="tipoJuicioAplica">
                                    <label>Tipo de juicio al que aplica:</label><label id="tipoJuicioIT3"
                                        name="tipoJuicioNT3"></label>
                                    <br>
                                </div>
                                <br>
                                <div class="resumen">
                                    <label>Resumen de los hechos:</label><label id="resumenHechosIT3"
                                        name="resumenHechosNT3"></label>
                                    <br>
                                </div>
                                <br>
                                <div class="conclusion">
                                    <label>Conclusión:</label><label id="conclusionIT3" name="conclusionNT3"></label>
                                </div>
                                <br>
                                <div class="recibio">
                                    <label>El asesorado recibió:</label><label id="recibioIT3"
                                        name="recibioIT3"></label>
                                    <br>
                                </div>
                                <br>
                                <div class="cumple">
                                    <label>El usuario cumple con los requisitos para recibir el servicio en esta
                                        institución:</label><label id="cumpleIT3" name="cumpleIT3"></label>
                                    <br>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-column col-12">
                            <h5 style="background-color: #99260E;
                        margin-left: 3%;
                        margin-bottom: -5px; width: 25%;
                        text-align: center;">Asesorado</h5>
                            <div class="tab-content   rounded col-6" style="background-color: #f2f2f2;">

                                <div class="  container " style="background-color: #f2f2f2;">
                                    <label>Nombre:</label> </label><label id="nombreAsesoradoIT3"
                                        name="nombreAsesoradoNT3"></label>
                                    <br>
                                    <label>Edad:</label><label id="edadIT3" name="edadNT3"></label>
                                    <br>
                                    <label>Sexo:</label><label id="sexoIT3" name="sexoNT3"></label>
                                    <br>
                                    <label>Telefono:</label><label id="telefonoIT3" name="telefonoNT3"></label>
                                    <br>
                                    <label>Trabaja:</label><label id="trabajaIT3" name="trabajaNT3"></label>
                                    <br>
                                    <label>Estado civil:</label><label id="estadoCivilIT3"
                                        name="estadoCivilNT3"></label>
                                    <br>
                                    <label>Numero de hijos:</label><label id="numHijosIT3" name="numHijosNT3"></label>
                                    <br>

                                </div>
                                <br>
                                <h5 style="background-color: #99260E;
                            margin-left: 3%;
                            margin-bottom: -5px; width: 25%;
                            text-align: center;">Domicilio</h5>
                                <div class="domicilio  rounded" style="background-color: #f2f2f2;">
                                    <label>Calle:</label><label id="calleIT3" name="calleNT3"></label>
                                    <br>
                                    <label>Numero exterior:</label><label id="numExteriorIT3"
                                        name="numExteriorNT3"></label>
                                    <br>
                                    <label>Numero interior:</label><label id="numInteriorIT3"
                                        name="numInteriorNT3"></label>
                                    <br>
                                    <label>Codigo postal:</label><label id="codigoPostalIT3"
                                        name="codigoPostalNT3"></label>
                                    <br>
                                    <label>Estado:</label><label id="estadoIT3" name="estadoNT3"></label>
                                    <br>
                                    <label>Municipio:</label><label id="municipioIT3" name="municipioNT3"></label>
                                    <br>
                                    <label>Ciudad:</label><label id="ciudadIT3" name="ciudadNT3"></label>
                                    <br>
                                    <label>Colonia:</label><label id="coloniaIT3" name="coloniaNT3"></label>
                                    <br>
                                </div>


                            </div>
                        </div>

                    </div>
                    <div class="container m-3 p-3">
                        <button onclick="registarAsesoria()" class="btn btn-danger float-right"
                            style="margin-bottom: 20px;">Registrar Asesoria</button>
                        <br>
                    </div>
                </div>

            </div>

            <!--id="tab2"-->
            <div class="tab asesoradoTab" id="tab2" style="display: none;">
                <a href="#tab2 " id="tab2T" onclick="desaparecerRegistro()">Asesorado</a>
                <div class="tab-content">
                    <div class="container">
                        <label>Nombre</label><label style="color:red;">*</label>
                        <br>
                        <input type="text" placeholder="Ingrese nombre"
                            class="border border-danger btn btn-light border col-md-6" id="nombreAsesoradoIT2"
                            name="nombreAsesoradoNT2">
                        <br>
                        <br>
                        <div class="form-row">
                            <div class="col-md-3 mb-3">
                                <label>Apellido paterno</label><label style="color:red;">*</label>
                                <br>
                                <input type="text" placeholder="Ingrese apellido paterno"
                                    class="border border-danger btn btn-light border col-md-12"
                                    id="apellidoPaternoAsesoradoIT2" name="apellidoPaternoAsesoradoNT2">
                            </div>
                            <div class="col-md-3">
                                <label>Apellido materno</label><label style="color:red;">*</label>
                                <input type="text" placeholder="Ingrese apellido materno"
                                    class="border border-danger btn btn-light border col-md-12"
                                    id="apellidoMaternoAsesoradoIT2" name="apellidoMaternoAsesoradoNT2">

                            </div>
                        </div>
                        <label>Edad</label><label style="color:red;">*</label>
                        <br>
                        <input id="edadIT2" class="border border-danger btn btn-light border" type="number"
                            name="edadNT2" value="18" min="18" max="120" />
                        <br>
                        <br>
                        <label>Genero</label><label style="color:red;">*</label>
                        <br>

                        <form class="form-inline">
                            <select name="sexoNT2"
                                class="btn btn-light border border-danger form-check mb-3 mr-sm-4 col-md-3"
                                id="sexoIT2">
                            </select>
                        </form>
                        <br>
                        <label>Telefono</label>
                        <br>
                        <input type="text" placeholder="Ingrese telefono" maxlength="10"
                            class="border border-danger btn btn-light border col-md-3" id="telefonoAsesoradoIT2"
                            name="telefonoAsesoradoNT2">
                        <br>
                        <br>
                        <label>Trabaja?</label><label style="color:red;">*</label>
                        <br>

                        <div id="trabaja">
                            <form>
                                <input type="radio" id="trabajaSiIT2" name="opcionTrabajaT2"
                                    onclick="mostrarElemento('ingreso'); ocultarElemento('motivo')" />
                                <label for="contactChoice1">Sí</label>
                                <input type="radio" id="trabajaNoIT2" name="opcionTrabajaT2"
                                    onclick="mostrarElemento('motivo'); ocultarElemento('ingreso')" />
                                <label for="contactChoice2">No</label>
                            </form>
                            <br>
                        </div>

                        <br>
                        <div id="trabajaForm">
                            <div id="ingreso" style="display: none">
                                <label>Ingreso mensual</label><label style="color:red;">*</label>
                                <br>
                                <form>
                                    <input type="radio" id="menorOptionIT2" name="ingresoT2" value="menorIgual" />
                                    <label for="contactChoice1">Menor o igual a $10,000</label> <br>
                                    <input type="radio" id="mayorOptionIT2" name="ingresoT2" value="mayor" />
                                    <label for="contactChoice2">Mayor a $10,000</label>
                                </form>

                                <br>
                            </div>
                            <div id="motivo" style="display: none">
                                <div class="form-row">
                                    <!--
                                          <div class="col-md-3 mb-3">
                                    -->
                                    <div class="col-md-12 mb-12 ">
                                        <!--   
                                        <label>Motivo</label>
                                        <label style="color:red;">*</label>
                                        <br>
                                        <select name="motivoNoTrabajo " class="btn btn-light border
                                             border-danger form-check mb-3 mr-sm-4" id="cbMotivo">
                                        
                                                   <option disabled selected>SELECCIONAR OPCION</option>
                                            <option value="otro">Otro...</option>
                                      

                                        </select>
                                          -->
                                        <br>
                                        <label>Motivo</label><label style="color:red;">*</label>
                                        <br>
                                        <form class="form-inline">
                                            <select name="motivoNT2"
                                                class="btn btn-light border border-danger form-check mb-3 mr-sm-4 col-md-3"
                                                id="motivoIT2">
                                            </select>
                                        </form>
                                    </div>

                                    <!-- 
                                    <div class="col-md-3">
                                        <label style="color: #f2f2f2">.</label>
                                        <br>
                                        <input type="text" placeholder="Ingrese el motivo"
                                            class="form-control border-danger btn btn-light border" id="txtMotivo"
                                            style="visibility: hidden; margin-left: 50px;">
                                    </div>
                                        -->
                                </div>
                            </div>

                            <br>
                        </div>
                        <label>Estado civil</label><label style="color:red;">*</label>
                        <br>
                        <form class="form-inline">
                            <select name="estadoCivilNT2"
                                class="btn btn-light border border-danger form-check mb-3 mr-sm-4 col-md-3"
                                id="estadoCivilIT2">
                            </select>
                        </form>
                        <br>
                        <label>Numero de hijos</label><label style="color:red;">*</label>
                        <br>
                        <input id="numHijosIT2" class="border border-danger btn btn-light border" type="number"
                            name="numHijosNT2" value="0" min="0" max="20" />
                        <br>
                    </div>
                    <br>
                    <br>
                    <h4 style="background-color: #99260E;
                    margin-left: 3%;
                    margin-bottom: -5px; width: 15%;
                    text-align: center;">Domicilio</h4>
                    <div class="domicilio" style="background-color: #f2f2f2;
                   ">
                        <div class="container">
                            <label>Calle</label>
                            <br>
                            <input type="text" placeholder="Ingrese calle del domicilio"
                                class="border border-danger btn btn-light border col-md-6" id="calleIT2"
                                name="calleNT2">
                            <br>
                            <br>
                            <div class="form-row">
                                <div class="col-md-3 mb-3">
                                    <label>Numero exterior</label>
                                    <br>
                                    <input type="text" placeholder="Ingrese numero exterior"
                                        class="form-control border border-danger btn btn-light border"
                                        id="numExteriorIT2" name="numExteriorNT2">
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label>Numero interior</label>
                                    <input type="text" placeholder="Ingrese numero interior"
                                        class="form-control border border-danger btn btn-light border"
                                        id="numInteriorIT2" name="numInteriorNT2">
                                </div>
                            </div>

                        </div>
                        <div class="container">
                            <div class="form-row d-flex justify-content-start">
                                <div class="col-md-4 mb-3">
                                    <div>
                                        <label>Ingrese el codigo postal</label>
                                        <br>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <input type="text" placeholder="Ingrese codigo postal" maxlength="5"
                                                class="codigoPostal" id="codigoPostalIT2" name="codigoPostalIT2"
                                                style="height: 31px">

                                        </div>

                                        <div>
                                            <button id="buscadorIT2" name="buscadorNT2" class="buscador"
                                                style="margin-bottom: 20px;"><img src="img/lupa.png"
                                                    onclick="validarCodigoPostal()" style="width: 22px" /></button>
                                        </div>

                                    </div>


                                </div>

                            </div>
                        </div>

                        <div class="container">

                            <div class="form-row">
                                <div class="col-md-3 mb-3">
                                    <label id="palabra1">Estado </label>
                                    <br>
                                    <input id="txtEstadoIT2" name="txtEstadoNT2" type="text" readonly
                                        class="form-control border border-danger btn btn-light border">
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label id="palabra2">Municipio </label>
                                    <input id="txtMunicipioIT2" neme="txtMunicipioNT2" type="text" readonly
                                        class="form-control border border-danger btn btn-light border">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-3 mb-3">
                                    <label id="palabra3">Ciudad </label>
                                    <br>
                                    <input id="txtCiudadIT2" name="txtCiudadNT2" type="text" readonly readonly
                                        class="form-control border border-danger btn btn-light border">
                                </div>
                            </div>

                        </div>
                        <div class="container">
                            <div class="form-row">
                                <div class="col-md-9 mb-7">
                                    <label for="opciones" id="palabra4">Colonia</label>
                                    <br>
                                    <select name="cbColoniaNT2" id="cbColoniaIT2"
                                        style="text-align: left; width: 500px;" class="btn btn-light border border-danger 
                                        form-check mb-12 mr-sm-10 col-md-8  " style="height: 90px">
                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <button onclick="valiarAsesorado()" id="registarAsesoriaIT3" name="registarAsesoriaNT3"
                            class="btn btn-danger float-right" style="margin-bottom: 20px;">Siguiente</button>
                        <br>
                    </div>
                    <br>
                </div>

            </div>

            <div id="tab3" class="tab ">
                <a href="#tab3" id="tab3T" onclick="desaparecerAsesoradoRegistro()">Asesoria</a>
                <div class="tab-content">
                    <div class="container">
                        <div class="asesor">
                            <label>Nombre del asesor</label><label style="color:red;">*</label>
                            <br>
                            <select name="nombreAsesorNT1" class="btn btn-light border border-danger col-md-5"
                                id="nombreAsesorIT1">
                            </select>
                        </div>
                        <br>
                        <div class="tipoJuicioAplica">
                            <label>Tipo de juicio al que aplica</label><label style="color:red;">*</label>
                            <br>
                            <select name="tipoJuicioNT1" class="btn btn-light border border-danger col-md-5"
                                id="tipoJuicioIT1">
                            </select>
                        </div>
                        <br>
                        <div class="resumen">
                            <label>Resumen de los hechos</label><label style="color:red;">*</label>
                            <br>
                            <textarea class="border border-danger btn btn-light border col-md-12 "
                                style="height: 100px;" id="resumenHechoIT1" name="resumenHechoNT1">    </textarea>
                        </div>
                        <br>

                        <div class="conclusion">
                            <label>Conclusión</label><label style="color:red;">*</label>
                            <textarea style="height: 100px;" class="border border-danger btn btn-light border col-md-12"
                                id="conclusionIT1" name="conclusionNT1">
                                </textarea>
                        </div>
                        <br>
                        <div class="recibio">
                            <label>El asesorado recibió:</label>
                            <!--Cambiar a manera de utilizar el servicio de catalogo-->
                            <br>
                            <input type="checkbox" id="recibio1IT1" name="recibio1NT1" value="">
                            <label for="recibio1"> Requisitos</label><br>
                            <input type="checkbox" id="recibio2IT1" name="recibio2NT1" value="">
                            <label for="recibio2"> Carta compromiso</label><br>
                            <input type="checkbox" id="recibio3IT1" name="recibio3NT1" value="">
                            <label for="recibio3"> Citatorio</label><br>

                        </div>
                        <br>
                        <div class="cumple">
                            <label>¿El usuario cumple con los requisitos para recibir el servicio en esta
                                institución?</label><label style="color:red;">*</label>
                            <br>
                            <div id="confirmacionCumple">
                                <form>
                                    <input type="radio" id="confirmacionCumpleIT1" name="confirmacionCumpleNT1"
                                        value="True" />
                                    <label for="confirmacion">Sí</label>
                                    <input type="radio" id="negacionCumpleIT1" name="confirmacionCumpleNT1"
                                        value="False" />
                                    <label for="negacion">No</label>
                                    <br>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br>
                    <br>
                    <div class="container">
                        <button onclick="validacionAsesoria()" class="btn btn-danger float-right"
                            style="margin-bottom: 20px;">Siguiente</button>
                        <br>
                    </div>
                    <br>
                </div>

            </div>

        </div>

    </div>
*/