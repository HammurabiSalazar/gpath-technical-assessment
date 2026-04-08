import React, { useState } from 'react';
import { useMuestras }     from '../hooks/useMuestras';
import { type TipoEstudio } from '../types/muestra';
import './FormularioMuestra.css';

export const FormularioMuestra = () => {
  // 1. Conectamos con nuestro "cerebro" de datos
  const { agregarMuestra } = useMuestras();

  // 2. Estados locales para capturar la escritura del técnico
  const [pacienteId, setPacienteId]   = useState('');
  const [tipo, setTipo]               = useState<TipoEstudio>('Biopsia');
  const [descripcion, setDescripcion] = useState('');

  // 3. Manejador del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica: que no haya campos vacíos
    if (!pacienteId.trim() || !descripcion.trim()) {
      alert("Por favor, complete todos los campos antes de registrar.");
      return;
    }

    // Creamos el objeto de la muestra con identidad GPath
    const nuevaMuestra = {
      id: crypto.randomUUID(), // Generamos ID único e irrepetible
      pacienteId,
      tipoEstudio: tipo,
      descripcion,
      fechaRegistro: new Date().toLocaleString() // Estampa de tiempo local
    };

    // Guardamos en la "memoria" y en el LocalStorage
    agregarMuestra(nuevaMuestra);

    // Limpiamos los campos para el siguiente registro
    setPacienteId('');
    setDescripcion('');
    setTipo('Biopsia');
    
    alert("Muestra registrada exitosamente en el sistema.");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Registro de Muestra</h2>

        {/* Campo: ID Paciente */}
        <div className="form-group">
          <label className="form-label">ID del Paciente</label>
          <input 
            className="form-input"
            type="text"
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
            placeholder="Ingrese ID (Ej: P-2024)"
          />
        </div>

        {/* Campo: Tipo de Estudio */}
        <div className="form-group">
          <label className="form-label">Tipo de Estudio</label>
          <select 
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoEstudio)}
          >
            <option value="Biopsia">Biopsia</option>
            <option value="Citología">Citología</option>
            <option value="Inmunohistoquímica">Inmunohistoquímica</option>
          </select>
        </div>

        {/* Campo: Descripción */}
        <div className="form-group">
          <label className="form-label">Descripción Médica</label>
          <textarea 
            className="form-textarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Detalles técnicos de la muestra..."
          />
        </div>

        {/* Botón de Acción */}
        <button type="submit" className="form-button">
          Registrar Muestra
        </button>
      </form>
    </div>
  );
};