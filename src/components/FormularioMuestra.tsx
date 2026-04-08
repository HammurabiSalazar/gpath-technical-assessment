import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useMuestras }     from '../hooks/useMuestras';
import { type TipoEstudio } from '../types/muestra';
import './FormularioMuestra.css';

export const FormularioMuestra = () => {
  const { agregarMuestra } = useMuestras();
  const [pacienteId, setPacienteId] = useState('');
  const [tipo, setTipo] = useState<TipoEstudio>('Biopsia');
  const [descripcion, setDescripcion] = useState('');

  // 2. Función configurada con la identidad GPath
  const lanzarAlerta = (icono: 'success' | 'error' | 'warning', titulo: string, texto: string) => {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: icono,
      confirmButtonColor: '#03045E', // Tu color Crepúsculo Profundo
      iconColor: '#00B4D8', // Tu color Turquesa Surf
      background: '#ffffff',
      color: '#03045E',
      customClass: {
        popup: 'sweet-font', // Clase para aplicar Alphazet
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pacienteId.trim() || !descripcion.trim()) {
      lanzarAlerta('warning', 'Campos incompletos', 'Por favor, rellena toda la información técnica.');
      return;
    }

    agregarMuestra({
      id: crypto.randomUUID(),
      pacienteId,
      tipoEstudio: tipo,
      descripcion,
      fechaRegistro: new Date().toLocaleString()
    });

    // Éxito
    lanzarAlerta('success', '¡Registro Exitoso!', 'La muestra ha sido almacenada correctamente.');

    setPacienteId('');
    setDescripcion('');
    setTipo('Biopsia');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registro de Muestra</h2>
      
      <form onSubmit={handleSubmit}>
        
        {/* Campo ID Paciente */}
        <div className="group">
          <input 
            required
            type="text" 
            className="input" 
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>ID del Paciente</label>
        </div>

        {/* Campo Tipo de Estudio (Dropdown adaptado) */}
        <div className="group">
          <select 
            required
            className="input"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoEstudio)}
          >
            <option value="Biopsia">Biopsia</option>
            <option value="Citología">Citología</option>
            <option value="Inmunohistoquímica">Inmunohistoquímica</option>
          </select>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Tipo de Estudio</label>
        </div>

        {/* Campo Descripción */}
        <div className="group">
          <textarea 
            required
            className="input" 
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Descripción Médica</label>
        </div>

        <button type="submit" className="form-button">
          Registrar Muestra
        </button>
      </form>
    </div>
  );
};