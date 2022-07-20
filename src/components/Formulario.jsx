import { useState, useEffect } from 'react';
import { MensajeError } from './MensajeError';


export const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

    const [ nombre, setNombre ] = useState('');
    const [ propietario, setPropietario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ sintomas, setSintomas ] = useState('');
    
    const [ error, setError ] = useState( false );

    //! Se manda a llamar solo cuando se oprime el botón de Editar
    useEffect(() => {

        //* comprobando si el arreglo está vacío
        if( Object.keys( paciente ).length > 0 ){
            setNombre( paciente.nombre ); // * modifica el state asignando el nombre del paciente seleccionado para editar
            setPropietario( paciente.propietario );
            setEmail( paciente.email );
            setFecha( paciente.fecha );
            setSintomas( paciente.sintomas );
        } 

    }, [paciente]); //* depende del cambio de paciente, cuando tenga datos para editar
    

    const generarId = () => {

        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);

        return random + fecha;

    }


    const handleSubmit = (e) => {
        e.preventDefault();

        //! Validación del formulario
        if([ nombre, propietario, email, fecha, sintomas ].includes('')){
            // console.log('Se deben llenar todos los campos');
            setError( true );
            return;
        }

        setError( false );

        //! construyendo el objeto de paciente que se pasará al arreglo 
        const objPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }

        
        //! Validación para identificar si se edita o se agrega un nuevo paciente
        if( paciente.id ){
            //* Editando el registro
            // Obj paciente son los datos nuevos, y paciente son los datos anteriores que se van a editar
            objPaciente.id = paciente.id; //* se asigna el id del registro previo del que se va a editar, para no agregar uno nuevo

            //* identificando el registro que se está editando, si el id (en el formulario) se encuentra el arreglo de pacientes entonces le pasa los valores editados, sino se mantiene igual y retorna el del state
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objPaciente : pacienteState )
            setPacientes( pacientesActualizados );

        } else {
            //* Nuevo registro

            objPaciente.id = generarId();

            //* tomando una copia del arreglo original con el spread y generando un nuevo arreglo para asignarlo al set
            setPacientes([ ...pacientes, objPaciente ]);

            //* Limpiando el objeto del paciente anterior
            setPaciente({});

        }


        //! Seteando los inputs del formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');

    }



  return (
    //   aplicado a pantallas chicas y pantallas medianas
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text center"> Seguimiento Pacientes </h2>
        <p className="text-lg mt-5 text-center mb-10"> Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administrelos</span>
        </p>

        <form
            onSubmit={ handleSubmit } 
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        >

         { error && (
             <MensajeError> 
                 <p> Todos los campos son obligatorios </p> 
             </MensajeError>
         ) }

            <div className="mb-5">
                {/* htmlFor deja la funcionalidad que al seleccionarlo el input se active */}
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold"> 
                    Nombre mascota: 
                </label>

                <input 
                    id="mascota"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={ nombre }
                    onChange={ (e) => setNombre( e.target.value ) } // leyendo el evento de donde escribe (target) y obteniendo el valor (value) y asignandolo al set del state
                />
            </div>

            <div className="mb-5">
                <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold"> 
                    Nombre Propietario: 
                </label>

                <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={ propietario }
                    onChange={ (e) => setPropietario( e.target.value ) }
                />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold"> 
                    Email: 
                </label>

                <input 
                    id="email"
                    type="email"
                    placeholder="Email del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={ email }
                    onChange={ (e) => setEmail( e.target.value ) }
                />
            </div>

            <div className="mb-5">
                <label htmlFor="alta" className="block text-gray-700 uppercase font-bold"> 
                    Alta: 
                </label>

                <input 
                    id="alta"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={ fecha }
                    onChange={ (e) => setFecha( e.target.value ) }
                />
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold"> 
                    Sintomas: 
                </label>

                <textarea 
                    id="sintomas"
                    className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los síntomas"
                    value={ sintomas }
                    onChange={ (e) => setSintomas( e.target.value ) }
                />
            
            </div>

            <input 
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
                 hover:bg-indigo-700 cursor-pointer transition-all"
                value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
            />

        </form>

    </div>
  )
}
