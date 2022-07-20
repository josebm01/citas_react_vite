import { useState, useEffect } from 'react';
import { Formulario }  from './components/Formulario';
import { Header } from './components/Header';
import { ListadoPacientes } from './components/ListadoPacientes';

function App() {

  //* Si no hay nada en el localStorage, se agrega un arreglo vacío y se parsea como un Objeto cuando haya datos
  const [ pacientes, setPacientes ] = useState( JSON.parse(localStorage.getItem('pacientes')) ?? []); //* Arreglo que se llenará con la información de todos los pacientes
  const [ paciente, setPaciente ] = useState({}); //* Información de un solo paciente (para editar)
  

  //* Guardando los pacientes en LocalStorage para mantenerlos en memoria 
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes )); //* Se guarda como string en localStorage
  }, [pacientes]);
  

  const eliminarPaciente = ( id ) => {

    //* filtrando para mostrar todos los registros excepto el que se se de clic para eliminar
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );
    setPacientes( pacientesActualizados );

  }


  return (
    <div className="container mt-10">
      <Header />
      <div className='mt-12 flex mx-10'>
        
        <Formulario 
          pacientes={ pacientes  }
          setPacientes={ setPacientes }
          paciente={ paciente }
          setPaciente={ setPaciente }
        />

        <ListadoPacientes 
          pacientes={ pacientes }
          setPaciente={ setPaciente }
          eliminarPaciente={ eliminarPaciente }
        />
      
      </div>
    </div>
  )
}

export default App
