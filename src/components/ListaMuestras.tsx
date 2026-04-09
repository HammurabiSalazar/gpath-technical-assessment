import React, { useState } from 'react';
import type { Muestra } from '../types/muestra';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './ListaMuestras.css';

interface Props {
  muestras: Muestra[];
  onEliminar: (id: string) => void;
  onActualizar: (id: string, datos: Partial<Muestra>) => void;
}

export const ListaMuestras: React.FC<Props> = ({ muestras, onEliminar, onActualizar }) => {
  const [busqueda, setBusqueda] = useState('');

  // Filtramos por ID, Paciente, Estudio o incluso por la Descripción
  const filtradas = muestras.filter(m => 
    m.pacienteId.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.id.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.tipoEstudio.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const confirmarEliminar = (id: string) => {
    Swal.fire({
      title: '¿Eliminar registro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#03045E',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && onEliminar(id));
  };

  const editarMuestra = (m: Muestra) => {
    Swal.fire({
      title: 'Editar Registro',
      html: `
        <div style="text-align: left;">
          <label style="font-size: 14px; color: #0077B6;">ID Paciente</label>
          <input id="swal-p" class="swal2-input" value="${m.pacienteId}">
          <label style="font-size: 14px; color: #0077B6;">Descripción</label>
          <textarea id="swal-d" class="swal2-textarea">${m.descripcion}</textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#03045E',
      preConfirm: () => ({
        pacienteId: (document.getElementById('swal-p') as HTMLInputElement).value,
        descripcion: (document.getElementById('swal-d') as HTMLTextAreaElement).value
      })
    }).then(r => r.isConfirmed && onActualizar(m.id, r.value));
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3 className="table-title">Registros Activos</h3>
        <div className="search-box-internal">
          <FontAwesomeIcon icon={faSearch} className="search-icon-small" />
          <input 
            type="text" 
            className="search-input-internal" 
            placeholder="Buscar..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="gpath-table">
          <thead>
            <tr>
              <th>ID SISTEMA</th>
              <th>PACIENTE</th>
              <th>ESTUDIO</th>
              <th>DESCRIPCIÓN</th> {/* Columna recuperada */}
              <th>FECHA</th>
              <th className="text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.length > 0 ? (
              filtradas.map(m => (
                <tr key={m.id}>
                  <td className="id-cell"><code>#{m.id.substring(0, 8)}</code></td>
                  <td className="font-bold">{m.pacienteId}</td>
                  <td>
                    <span className={`badge ${m.tipoEstudio.toLowerCase()}`}>
                      {m.tipoEstudio}
                    </span>
                  </td>
                  {/* Celda de descripción con puntos suspensivos si es muy larga */}
                  <td className="description-cell" title={m.descripcion}>
                    <div className="text-truncate-cell">{m.descripcion}</div>
                  </td>
                  <td className="date-cell">{m.fechaRegistro}</td>
                  <td className="actions-cell">
                    <button onClick={() => editarMuestra(m)} className="btn-icon btn-edit" title="Editar">
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button onClick={() => confirmarEliminar(m.id)} className="btn-icon btn-delete" title="Eliminar">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center" style={{padding: '40px'}}>
                  No se encontraron registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};