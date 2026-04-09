import React, { useState } from 'react';
import type { Muestra } from '../types/muestra';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './ListaMuestras.css';

// --- INTERFACES ---
interface Props {
  muestras: Muestra[];
  onEliminar: (id: string) => void;
  onActualizar: (id: string, datos: Partial<Muestra>) => void;
}

// --- COMPONENTE PRINCIPAL ---
export const ListaMuestras: React.FC<Props> = ({ muestras, onEliminar, onActualizar }) => {
  
  // --- ESTADO LOCAL ---
  const [busqueda, setBusqueda] = useState('');

  // --- LÓGICA DE FILTRADO ---
  const filtradas = muestras.filter(m => 
    m.pacienteId.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.id.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.tipoEstudio.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // --- CONTROLADORES DE ACCIÓN ---
  
  /* Dispara modal de confirmación antes de eliminar */
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

  /* Dispara modal de edición (ID de paciente bloqueado) */
  const editarMuestra = (m: Muestra) => {
    Swal.fire({
      title: '<span class="swal-title-gpath">Editar Registro</span>',
      html: `
        <div class="swal-form-container">
          <div class="swal-group">
            <input id="swal-p" class="swal-input disabled-input" value="${m.pacienteId}" disabled placeholder=" ">
            <span class="swal-bar"></span>
            <label class="swal-label">ID del Paciente (No editable)</label>
          </div>

          <div class="swal-group">
            <select id="swal-t" class="swal-input">
              <option value="Biopsia" ${m.tipoEstudio === 'Biopsia' ? 'selected' : ''}>Biopsia</option>
              <option value="Citología" ${m.tipoEstudio === 'Citología' ? 'selected' : ''}>Citología</option>
              <option value="Inmunohistoquímica" ${m.tipoEstudio === 'Inmunohistoquímica' ? 'selected' : ''}>Inmunohistoquímica</option>
            </select>
            <span class="swal-bar"></span>
            <label class="swal-label">Tipo de Estudio</label>
          </div>

          <div class="swal-group">
            <textarea id="swal-d" class="swal-input swal-textarea" rows="3" placeholder=" ">${m.descripcion}</textarea>
            <span class="swal-bar"></span>
            <label class="swal-label">Descripción de la Muestra</label>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'ACTUALIZAR',
      cancelButtonText: 'CANCELAR',
      confirmButtonColor: '#03045E',
      cancelButtonColor: '#808080',
      customClass: {
        popup: 'swal-modal-card',
        confirmButton: 'swal-confirm-btn'
      },
      focusConfirm: false,
      preConfirm: () => {
        return {
          tipoEstudio: (document.getElementById('swal-t') as HTMLSelectElement).value,
          descripcion: (document.getElementById('swal-d') as HTMLTextAreaElement).value
        };
      }
    }).then(r => r.isConfirmed && onActualizar(m.id, r.value));
  };

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="table-container">
      
      {/* CABECERA DE TABLA Y BUSCADOR */}
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

      {/* CONTENIDO DE LA TABLA */}
      <div className="table-responsive">
        <table className="gpath-table">
          <thead>
            <tr>
              <th>ID MUESTRA</th>
              <th>PACIENTE</th>
              <th>ESTUDIO</th>
              <th>DESCRIPCIÓN</th>
              <th>FECHA DE REGISTRO</th>
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
                <td colSpan={6} className="text-empty">No se encontraron registros activos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};