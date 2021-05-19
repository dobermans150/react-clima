import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Error from "./components/Error";
import Clima from "./components/Clima";

function App() {
  /* state principal */
  /* ciuadad = state, guardarCiudad = this.setState() */
  const [ciudad, guardarCiudad] = useState("");
  const [pais, guardarPais] = useState("");
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    /* prevenir la ejecucion */

    if (ciudad === "") return;

    const consultarApi = async () => {
      const appID = "c0435005d3b4239c6f2adc8f72e5f898";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

      /* Consultar la url */

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado);

      console.log(resultado);
    };

    consultarApi();
  }, [ciudad, pais]);

  const datosConsulta = datos => {
    console.log(datos);

    /* Validad que ambos campos esten */
    if (datos.ciudad === "" || datos.pais === "") {
      /* un error */

      guardarError(true);
      return;
    }

    /* Ciudad y pais existen, agregarlos al state */
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  };

  //cargar un componente condicionalmente
  let componente;
  /* Si hay un error lo guarda en el compoennete */
  if (error) {
    //hay un error mostrarlos
    componente = <Error mensaje="Ambos campos son obligatorios" />;
  } else if (resultado.cod === "404") {
    componente = <Error mensaje="La ciudad no existe en nuestro registro" />;
  } else {
    /* si no me muestras el clima */
    //mostrar el Clima

    componente = <Clima resultado={resultado} />;
  }

  return (
    <div className="App">
      <Header titulo="React Clima App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row ">
            <div className="input-field col s12 m6">
              <Formulario datosConsulta={datosConsulta} />
            </div>

            {/* Componente que mostrara los datos del Clima */}
            <div className="col s12 m6">{componente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
