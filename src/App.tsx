import { useState, useEffect } from 'react';
import { FormularioMuestra } from './components/FormularioMuestra';
import { ListaMuestras } from './components/ListaMuestras';
import type { Muestra } from './types/muestra';
import Swal from 'sweetalert2';
import logoGpath from './assets/Logo-gpath.png';
import './App.css';

function App() {
  // --- ESTADOS GLOBALES ---
  const [muestras, setMuestras] = useState<Muestra[]>(() => {
    const guardadas = localStorage.getItem('gpath_muestras');                           // Recuperación de datos previos almacenados
    return guardadas ? JSON.parse(guardadas) : [];                                     // Conversión de datos recuperados o arreglo vacío inicial
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);                 // Control de visibilidad del modal de registro

  // --- PERSISTENCIA DE DATOS ---
  useEffect(() => {
    localStorage.setItem('gpath_muestras', JSON.stringify(muestras));             // Actualización automática del almacenamiento local
  }, [muestras]);

  // --- CONTROLADORES DE ACCIÓN ---

  /* Función para registrar nueva muestra */
  const agregarMuestra = (datos: Omit<Muestra, 'id' | 'fechaRegistro'>) => {
    const nueva: Muestra = {
      ...datos,
      id: crypto.randomUUID(),
      fechaRegistro: new Date().toLocaleString()
    };
    setMuestras([nueva, ...muestras]);
    setMostrarFormulario(false); 
    

    //SweetAlert para confirmación de registro exitoso
    Swal.fire({
      title: '¡Muestra Registrada!',
      text: 'El registro se ha guardado exitosamente en el sistema.',
      icon: 'success',
      confirmButtonColor: '#03045E', 
      timer: 2500, 
      timerProgressBar: true,
      customClass: {
        popup: 'modal-card-swal', 
        title: 'form-title-swal'
      }
    });
  };

  /* Función para eliminar registro por ID */
  const eliminarMuestra = (id: string) => {
    setMuestras(muestras.filter(m => m.id !== id));
  };

  /* Función para actualizar registro por ID */
  const actualizarMuestra = (id: string, datos: Partial<Muestra>) => {
    setMuestras(muestras.map(m => m.id === id ? { ...m, ...datos } : m));
  };

  // --- RENDERIZADO DE  ---
  return (
    <div className="main-layout">
      
      {/* CABECERA */}
      <header className="top-nav">
        <div className="logo-box">
          <img src={logoGpath} alt="Logo" className="logo-img" />
        </div>
        <div className="gray-info">
          <div className="header-text-container">
            <span className="info-text">Panel de Gestión de Laboratorio</span>
            <span className="info-subtitle">Sistema de Registro de Tejidos</span>
          </div>
        </div>
      </header>

      {/* CONTENEDOR CENTRAL */}
      <main className="container">
        
        {/* BARRA DE ACCIÓN */}
        <div className="action-bar">
          <h1 className="title">Registro De Muestras</h1>
          <div className="button-group">
            <button 
              className="btn-add-simple" 
              onClick={() => setMostrarFormulario(true)}
            >
              <span>
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                </svg>
                Añadir
              </span>
            </button>
          </div>
        </div>

        {/* TABLA DE DATOS */}
        <ListaMuestras 
          muestras={muestras} 
          onEliminar={eliminarMuestra} 
          onActualizar={actualizarMuestra} 
        />

        {/* MODAL DE FORMULARIO */}
        {mostrarFormulario && (
          <div className="modal-overlay">
            <div className="modal-card">
              <button className="btn-close" onClick={() => setMostrarFormulario(false)}>×</button>
              <FormularioMuestra onAgregar={agregarMuestra} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;