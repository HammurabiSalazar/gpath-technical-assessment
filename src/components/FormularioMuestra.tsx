import React, { useState } from 'react';
import { type TipoEstudio } from '../types/muestra';
import './FormularioMuestra.css';

interface Props {
  onAgregar: (datos: { pacienteId: string; tipoEstudio: TipoEstudio; descripcion: string }) => void;
}

export const FormularioMuestra: React.FC<Props> = ({ onAgregar }) => {
  const [pacienteId, setPacienteId] = useState('');
  const [tipo, setTipo] = useState<TipoEstudio>('Biopsia');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAgregar({ pacienteId, tipoEstudio: tipo, descripcion });
    setPacienteId('');
    setDescripcion('');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registrar Muestra</h2>
      <form onSubmit={handleSubmit}>
        <div className="group">
          <input required type="text" className="input" value={pacienteId} onChange={e => setPacienteId(e.target.value)} />
          <span className="bar"></span>
          <label>ID del Paciente</label>
        </div>

        <div className="group">
          <select className="input" value={tipo} onChange={e => setTipo(e.target.value as TipoEstudio)}>
            <option value="Biopsia">Biopsia</option>
            <option value="Citología">Citología</option>
            <option value="Inmunohistoquímica">Inmunohistoquímica</option>
          </select>
          <span className="bar"></span>
          <label className="active-label">Estudio</label>
        </div>

        <div className="group">
          <textarea required className="input" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          <span className="bar"></span>
          <label>Descripción</label>
        </div>

        <button type="submit" className="form-button">Guardar en Laboratorio</button>
      </form>
    </div>
  );
};