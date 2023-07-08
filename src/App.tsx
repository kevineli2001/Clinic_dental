import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('registro');
  const [pacientes, setPacientes] = useState([]);
  const [dentistas, setDentistas] = useState([]);
  const [nuevoPaciente, setNuevoPaciente] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idDentista, setIdDentista] = useState('');
  const [fecha, setFecha] = useState('');
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    fetchPacientes();
    fetchDentistas();
    fetchCitas();
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pacientes');
      setPacientes(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de pacientes:', error);
    }
  };
  

  const fetchDentistas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/dentistas');
      setDentistas(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de dentistas:', error);
    }
  };

  const fetchCitas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/citas');
      console.log("CITAS ", citas)
      setCitas(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de citas:', error);
    }
  };

  const handleNuevoPacienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoPaciente(e.target.value);
  };

  const handlePacienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdPaciente(e.target.value);
  };

  const handleDentistaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdDentista(e.target.value);
  };

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
  };

  const handleRegistroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/pacientes', { nombre: nuevoPaciente });
      alert('Nuevo paciente registrado correctamente');
      setNuevoPaciente('');
      fetchPacientes();
    } catch (error) {
      console.error('Error al registrar el nuevo paciente:', error);
      alert('Error al registrar el nuevo paciente');
    }
  };

  const handleCitaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/citas', { idPaciente, idDentista, fecha });
      alert('Nueva cita programada correctamente');
      setIdPaciente('');
      setIdDentista('');
      setFecha('');
      fetchCitas();
    } catch (error) {
      console.error('Error al programar la nueva cita:', error);
      alert('Error al programar la nueva cita');
    }
  };

  const handleCancelarCita = async (idCita: string) => {
    try {
      await axios.delete(`http://localhost:3001/citas/${idCita}`);
      alert('Cita cancelada correctamente');
      fetchCitas();
    } catch (error) {
      console.error('Error al cancelar la cita:', error);
      alert('Error al cancelar la cita');
    }
  };

  const renderRegistro = () => (
    <div  id="registro">
      <h2 className="mb-4">Registro de Nuevo Paciente</h2>
      <form onSubmit={handleRegistroSubmit}>
        <div className="mb-3">
          <label htmlFor="nombrePaciente" className="form-label">Nombre del paciente</label>
          <input type="text" className="form-control" id="nombrePaciente" value={nuevoPaciente} onChange={handleNuevoPacienteChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );

  const renderProgramarCita = () => (
    <div  id="programar-cita">
      <h2>Programar Nueva Cita</h2>
      <form onSubmit={handleCitaSubmit}>
        <select value={idPaciente} onChange={handlePacienteChange} className='form-control mb-3' required>
          <option value="">Seleccionar Paciente</option>
          {pacientes.map((paciente: any) => (
            <option key={paciente.ID_Paciente} value={paciente.ID_Paciente}>
              {paciente.Nombre}
            </option>
          ))}
        </select>

        <select value={idDentista} onChange={handleDentistaChange} className='form-control mb-3' required>
          <option value="">Seleccionar Dentista</option>
          {dentistas.map((dentista: any) => (
            <option key={dentista.ID_Dentista} value={dentista.ID_Dentista}>
              {dentista.Nombre}
            </option>
          ))}
        </select>
        <input type="date" value={fecha} onChange={handleFechaChange} className='form-control mb-3' required />
        <button type="submit" className='btn btn-secondary'>Programar Cita</button>
      </form>
    </div>
  );

  const renderCitasProgramadas = () => (
    <div  id="citas-programadas">
    <div>
      <h2>Citas Programadas</h2>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Dentista</th>
            {/* <th>Acciones</th> */}
          </tr>
        </thead>
        <tbody>
        {citas.map((cita:any, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{cita.Fecha}</td>
            <td>{cita.NombreDentista}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
    </div>
  );

  const renderListarPacientes = () => (
    <div  id="listar-pacientes">
    <div>
      <h2>Listado de Pacientes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID Paciente</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente:any) => (
            <tr key={paciente.ID_Paciente}>
              <td>{paciente.ID_Paciente}</td>
              <td>{paciente.Nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );

  return (
    <div className="container">
      <h1>Clínica Dental</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'registro' ? 'active' : ''}`} href="#registro" onClick={() => setActiveTab('registro')}>
            Registro Paciente
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'programar-cita' ? 'active' : ''}`} href="#programar-cita" onClick={() => setActiveTab('programar-cita')}>
            Programar Cita
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'citas-programadas' ? 'active' : ''}`} href="#citas-programadas" onClick={() => setActiveTab('citas-programadas')}>
            Citas Programadas
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === 'listar-pacientes' ? 'active' : ''}`} href="#listar-pacientes" onClick={() => setActiveTab('listar-pacientes')}>
            Listar Pacientes
          </a>
        </li>
        
      </ul>
      <div className="tab-content container">
        {activeTab === 'registro' && renderRegistro()}
        {activeTab === 'programar-cita' && renderProgramarCita()}
        {activeTab === 'citas-programadas' && renderCitasProgramadas()}
        {activeTab === 'listar-pacientes' && renderListarPacientes()}
      </div>
    </div>
  );
};

export default App;
